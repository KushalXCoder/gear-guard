import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Gear Guard",
  description: "Protect your gear, track your assets, and stay secure with Gear Guard.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
