import type { Metadata } from "next";
import { Cormorant_Garamond, Oswald, Inter } from "next/font/google";
import "./globals.css";
import StorefrontTools from "@/components/StorefrontTools";
import ToolHarness from "@/components/ToolHarness";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
  title: "Chez Amélie — back of house",
  description:
    "The bakery's back office. Amélie runs the whole shop from one board — and so can her agent, through WebMCP.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Registers Chez Amélie's WebMCP tools (renders nothing). */}
        <StorefrontTools />
        {/* Dev-only manual tool tester. */}
        <ToolHarness />
      </body>
    </html>
  );
}
