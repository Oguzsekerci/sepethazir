create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  public_id text not null,
  user_id uuid null references auth.users(id) on delete set null,
  items jsonb not null,
  subtotal integer not null,
  discount integer not null default 0,
  shipping integer not null default 0,
  total integer not null,
  address text not null,
  status text not null default 'courier',
  courier jsonb not null,
  fantasy_note text null,
  created_at timestamptz not null default now()
);

alter table public.orders
  add column if not exists public_id text,
  add column if not exists user_id uuid null references auth.users(id) on delete set null,
  add column if not exists items jsonb,
  add column if not exists subtotal integer,
  add column if not exists discount integer not null default 0,
  add column if not exists shipping integer not null default 0,
  add column if not exists total integer,
  add column if not exists address text,
  add column if not exists status text not null default 'courier',
  add column if not exists courier jsonb,
  add column if not exists fantasy_note text,
  add column if not exists created_at timestamptz not null default now();

alter table public.orders enable row level security;

drop policy if exists "Allow anonymous fake order inserts" on public.orders;
create policy "Allow anonymous fake order inserts"
on public.orders
for insert
to anon
with check (true);

drop policy if exists "Allow users to read own orders" on public.orders;
create policy "Allow users to read own orders"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);
