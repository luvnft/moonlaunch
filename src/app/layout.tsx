import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { SignerProvider } from "./context/signerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoonLaunch - Memecoin Launchpad",
  description: "Create and launch your own memecoin in minutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SignerProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <main>{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </SignerProvider>
      </body>
    </html>
  );
}
