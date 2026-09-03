import type { Metadata } from "next";
import { Playfair_Display, Oswald, Inter } from "next/font/google";
import "./globals.css";
import StorefrontTools from "@/components/StorefrontTools";
import ToolHarness from "@/components/ToolHarness";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chez Odette — neighbourhood French bakery",
  description:
    "Bread with a memory. Order Odette's country sourdough and weekend walnut levain — direct from the bakehouse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Registers Chez Odette's WebMCP tools (renders nothing). */}
        <StorefrontTools />
        {/* Dev-only manual tool tester. */}
        <ToolHarness />
      </body>
    </html>
  );
}
