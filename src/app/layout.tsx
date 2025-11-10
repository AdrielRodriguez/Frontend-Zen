import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zentrais Debate Engine",
  description: "Truth through structured argumentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold text-indigo-900">Zentrais</h1>
                <div className="flex gap-4">
                  <a href="/debate" className="text-gray-700 hover:text-indigo-600">Debates</a>
                  <a href="/debate/new" className="text-gray-700 hover:text-indigo-600">New Debate</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Guest User</span>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}