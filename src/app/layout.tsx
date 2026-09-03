import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import StorefrontTools from "@/components/StorefrontTools";
import ToolHarness from "@/components/ToolHarness";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chez Odette — neighborhood French bakery",
  description:
    "Bread with a memory. Order Odette's country sourdough and weekend walnut levain — direct from the bakehouse.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
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
