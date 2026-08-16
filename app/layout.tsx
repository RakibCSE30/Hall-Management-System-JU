import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JU Hall Management System",
  description: "Jahangirnagar University Hall Management System",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
