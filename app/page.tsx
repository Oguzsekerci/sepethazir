import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>SepetHazır</h1>

      <Link href="/shop">
        <button style={{ marginTop: 20 }}>
          Alışverişe Başla
        </button>
      </Link>
    </div>
  );
}