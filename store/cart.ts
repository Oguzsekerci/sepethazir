import { create } from "zustand";
import { persist } from "zustand/middleware";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  emoji: string;
  image?: string;
  imageAlt?: string;
  blurb?: string;
  status?: string;
  meme?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  isTrending?: boolean;
  dopamineScore?: number;
  reasonToBuy?: string;
  affiliateUrl?: string;
  query: string;
  category: string;
};

export type CartItem = Product & {
  qty: number;
};

export type OrderStatus = "preparing" | "courier" | "delivered";

export type FakeOrder = {
  id: string;
  remoteId?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: string;
  status: OrderStatus;
  createdAt: string;
  courier: {
    name: string;
    vehicle: string;
    plate: string;
    etaMinutes: number;
  };
};

export type AffiliateClick = {
  id: string;
  productId: number;
  productName: string;
  category: string;
  href: string;
  source: string;
  createdAt: string;
};

type CheckoutInput = {
  address: string;
  fantasyNote?: string;
};

type CartState = {
  items: CartItem[];
  orders: FakeOrder[];
  affiliateClicks: AffiliateClick[];
  add: (product: Product) => void;
  addMany: (items: CartItem[]) => void;
  inc: (id: number) => void;
  dec: (id: number) => void;
  clear: () => void;
  createFakeOrder: (input: CheckoutInput) => Promise<FakeOrder>;
  markDelivered: (id: string) => void;
  trackAffiliateClick: (
    click: Omit<AffiliateClick, "id" | "createdAt">
  ) => void;
};

const couriers = [
  { name: "Kaan Ş.", vehicle: "Elektrikli motor", plate: "34 SH 108" },
  { name: "Melis G.", vehicle: "Kurye motoru", plate: "61 OF 420" },
  { name: "Oğuz S.", vehicle: "Scooter", plate: "34 HAZ 16" },
  { name: "Micheal J.", vehicle: "Mini van", plate: "06 SE 777" },
];

function formatOrderId() {
  return `SH-${Math.floor(Math.random() * 90000 + 10000)}`;
}

export function getCartTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = Math.round(subtotal * 0.08);
  const shipping = subtotal > 1500 || subtotal === 0 ? 0 : 39;
  const total = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, total };
}

async function syncOrderToSupabase(order: FakeOrder, fantasyNote?: string) {
  if (!isSupabaseConfigured || !supabase) {
    return undefined;
  }

  try {
    const { data: userData } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        public_id: order.id,
        user_id: userData.user?.id ?? null,
        items: order.items,
        subtotal: order.subtotal,
        discount: order.discount,
        shipping: order.shipping,
        total: order.total,
        address: order.address,
        status: order.status,
        courier: order.courier,
        fantasy_note: fantasyNote ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.warn("Supabase order sync failed", error);
      return undefined;
    }

    return data?.id;
  } catch (error) {
    console.warn("Supabase order sync failed", error);
    return undefined;
  }
}

async function syncAffiliateClickToSupabase(click: AffiliateClick) {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  try {
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from("affiliate_clicks").insert({
      public_id: click.id,
      user_id: userData.user?.id ?? null,
      product_id: click.productId,
      product_name: click.productName,
      category: click.category,
      href: click.href,
      source: click.source,
      created_at: click.createdAt,
    });

    if (error) {
      console.warn("Supabase affiliate click sync failed", error);
    }
  } catch (error) {
    console.warn("Supabase affiliate click sync failed", error);
  }
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],
      affiliateClicks: [],
      add: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
              ),
            };
          }

          return { items: [...state.items, { ...product, qty: 1 }] };
        }),
      addMany: (items) =>
        set((state) => {
          const nextItems = [...state.items];

          items.forEach((incomingItem) => {
            const existingIndex = nextItems.findIndex(
              (item) => item.id === incomingItem.id
            );

            if (existingIndex >= 0) {
              nextItems[existingIndex] = {
                ...nextItems[existingIndex],
                qty: nextItems[existingIndex].qty + incomingItem.qty,
              };
              return;
            }

            nextItems.push({ ...incomingItem });
          });

          return { items: nextItems };
        }),
      inc: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, qty: item.qty + 1 } : item
          ),
        })),
      dec: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, qty: item.qty - 1 } : item
            )
            .filter((item) => item.qty > 0),
        })),
      clear: () => set({ items: [] }),
      createFakeOrder: async ({ address, fantasyNote }) => {
        const items = get().items;

        if (items.length === 0) {
          throw new Error("Sepet boş.");
        }

        const totals = getCartTotals(items);
        const courier = couriers[Math.floor(Math.random() * couriers.length)];
        const order: FakeOrder = {
          id: formatOrderId(),
          items,
          ...totals,
          address,
          status: "courier",
          createdAt: new Date().toISOString(),
          courier: {
            ...courier,
            etaMinutes: Math.floor(Math.random() * 12) + 8,
          },
        };

        const remoteId = await syncOrderToSupabase(order, fantasyNote);
        const savedOrder = remoteId ? { ...order, remoteId } : order;

        set((state) => ({
          items: [],
          orders: [savedOrder, ...state.orders],
        }));

        return savedOrder;
      },
      markDelivered: (id) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status: "delivered" } : order
          ),
        })),
      trackAffiliateClick: (click) => {
        const savedClick = {
          ...click,
          id: `CLK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          affiliateClicks: [savedClick, ...state.affiliateClicks].slice(0, 100),
        }));

        void syncAffiliateClickToSupabase(savedClick);
      },
    }),
    {
      name: "sepethazir-state",
    }
  )
);
