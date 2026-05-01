import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const multiplane = localFont({
  src: [
    {
      path: "../../public/fonts/MultiplaneTWDC-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/fonts/MultiplaneTWDC-SemiBold.otf",
      weight: "600",
    },
  ],
  variable: "--font-multiplane",
});

export const metadata: Metadata = {
  title: {
    default: "Pascal Docs",
    template: "%s · Pascal Docs",
  },
  description:
    "Documentation hub for the Pascal commerce design system — foundations, components, patterns, and resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${multiplane.variable}`}>
      <body className="min-h-full">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
