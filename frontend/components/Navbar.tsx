import Link from "next/link";
import Container from "./Container";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-white">
              S
            </span>
            <span className="font-semibold tracking-tight">SewAI</span>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/create"
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Create
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
