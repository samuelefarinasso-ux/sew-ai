import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "SewAI",
  description: "Generate sewing patterns from your photos and measurements."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <Navbar />
        <main className="py-10">
          <Container>{children}</Container>
        </main>
        <footer className="border-t bg-white">
          <Container>
            <div className="py-6 text-sm text-zinc-500">
              © {new Date().getFullYear()} SewAI — Pattern generation UI
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
