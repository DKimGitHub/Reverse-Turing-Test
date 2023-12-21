import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Reverse Turing Test",
  description: "Can you pass as an AI??",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <div className="w-screen h-screen bg-slate-600 pt-2">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
