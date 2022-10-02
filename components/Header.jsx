import Link from "next/link";

export default function Header() {
  return (
    <header className="container mx-auto py-6 flex justify-between flex-wrap">
      <Link href="/">
        <a className="text-[20px]">
          <b className="uppercase">Xkdc</b>App
        </a>
      </Link>
      <div className="flex gap-8 text-[20px]">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/">Search</Link>
      </div>
    </header>
  );
}
