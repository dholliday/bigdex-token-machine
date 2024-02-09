import type { Metadata } from "next";
import { Providers } from "./providers";
import NavBar from "@/components/NavBar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Big Dex Token Machine",
  description: "Create some tokens you twat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
