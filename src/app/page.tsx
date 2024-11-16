"use client";

import { Button } from "@/components/ui/button";
import { Rocket, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { PrivyProvider } from "@privy-io/react-auth";
import Navbar from "@/components/navbar";
import { Signer } from "ethers";
import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const app_id = "cm3jx7dfj071frmti0390p7cc";
  const [signer, setSigner] = useState<Signer | null>(null);
  const [provider, setProvider] = useState<any>(null);

  const connect_wallet = async () => {
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
      setProvider(provider);
    } else {
      // provider = new ethers.BrowserProvider(window.ethereum);
      // signer = await provider.getSigner();
      // setSigner(signer);
    }
  };

  return (
    // <PrivyProvidern
    //   appId="cm3jx7dfj071frmti0390p7cc"
    //   config={{
    //     // Customize Privy's appearance in your app
    //     appearance: {
    //       theme: "light",
    //       accentColor: "#676FFF",
    //       logo: "https://your-logo-url",
    //     },
    //     // Create embedded wallets for users who don't have a wallet
    //     embeddedWallets: {
    //       createOnLogin: "users-without-wallets",
    //     },
    //   }}
    // >
    <>
      <Navbar connect_wallet={connect_wallet} />

      <div className="flex flex-col min-h-[calc(100vh-4rem)]">
        <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-background to-secondary/20">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            Launch Your Memecoin to the Moon 🚀
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-4">
            Create, launch, and trade memecoins in minutes. Join the next
            generation of crypto innovation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/create">
              <Button size="lg" className="text-lg">
                <Rocket className="mr-2 h-5 w-5" />
                Launch AI Meme
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="text-lg">
                <TrendingUp className="mr-2 h-5 w-5" />
                Explore Tokens
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <Rocket className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Easy Launch</h3>
              <p className="text-muted-foreground">
                Create your memecoin in minutes with our simple AI launchpad
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <TrendingUp className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Trading</h3>
              <p className="text-muted-foreground">
                Track your tokens with advanced charts and trading features
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
              <Shield className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Copy Traders</h3>
              <p className="text-muted-foreground">
                Copy trade the top traders on our platform securely
              </p>
            </div>
          </div>
        </section>
      </div>
      </>
    // </PrivyProvider>
  );
}
