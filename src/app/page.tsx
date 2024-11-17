"use client";

import { Button } from "@/components/ui/button";
import { Rocket, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { Interface, Signer, InterfaceAbi } from "ethers";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSigner } from "./context/signerContext";
import Chronicle from "../../abi/Chronicle.json";
import TokenFactoryABI from "../../abi/TokenFactory.json";

export default function Home() {
  const app_id = "cm3jx7dfj071frmti0390p7cc";
  const TokenFactoryAddr = "0x42b93a5eE5839Ff8436c3CF1F310b07fAeCc0834";
  const Chronicle_ETH = "0x787c701b7303D0913f9c5c4Eb1F2DA347781b4b5";

  const { signer, setSigner } = useSigner();

  // const [signer, setSigner] = useState<Signer | null>(null);
  const [provider, setProvider] = useState<any>(null);
  const blockScoutURL = "";

  const get_price_eth = async()=>{
    const contract = new ethers.Contract(Chronicle, Chronicle_ETH, signer);
    let price =  await contract.read();
    console.log({price})
  }

  const connect_wallet = async () => {
    console.log("Wallet Connected");
    let signer = null;

    let provider;
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
      setProvider(provider);
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
      setSigner(signer);
    }

    console.log("address: ", signer?.address);
  };

  const create_token = async (data: any) => {
    const contract = new ethers.Contract(
      TokenFactoryAddr,
      TokenFactoryABI.abi as InterfaceAbi,
      signer
    );

    console.log({ contract });

    const addr = await signer?.getAddress();
    const res = await contract.create_token(10_000_000, "sample", "SMBL");
    console.log({ res });
  };

  useEffect(() => {
    connect_wallet();
    // get_price_eth();
  }, []);

  return (
    <>
      <Navbar connect_wallet={connect_wallet} />
      <button onClick={create_token}>Click me</button>
      <br />
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
  );
}
