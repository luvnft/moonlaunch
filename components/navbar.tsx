"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Coins, User, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useState } from "react";
import Capsule, { CapsuleModal, Environment } from "@usecapsule/react-sdk";
import "@usecapsule/react-sdk/styles.css";
import "@usecapsule/evm-wallet-connectors";
import dynamic from "next/dynamic";

export default function Navbar({
  connect_wallet,
}: {
  connect_wallet?: () => void;
}) {
  const capsule = new Capsule(Environment.BETA, process.env.REACT_APP_CAPSULE_API_KEY);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const CapsuleModal = dynamic(
    () => import("@usecapsule/react-sdk")
    .then((mod) => mod.CapsuleModal), { ssr: false }
    );
  // const { wallets } = useWallets();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Rocket className="h-6 w-6" />
          <span className="font-bold text-xl">MoonLaunch</span>
        </Link>

        <div className="ml-auto flex items-center space-x-4">
          <Link href="/create">
            <Button variant="ghost" className="flex items-center">
              <Rocket className="mr-2 h-4 w-4" />
              Create
            </Button>
          </Link>

          <Link href="/explore">
            <Button variant="ghost" className="flex items-center">
              <Coins className="mr-2 h-4 w-4" />
              Explore
            </Button>
          </Link>

          <Link href="/profile">
            <Button variant="ghost" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </Link>

          <Button
            variant="ghost"
            className="flex items-center"
            onClick={connect_wallet}
          >
            Connect Wallet
          </Button>

          {/* <button onClick={() => setIsOpen(true)}>Sign in with Capsule</button>

          <CapsuleModal
            capsule={capsule}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            appName="Your App Name"
            logo="https://yourapp.com/logo.png"
            theme={{
              backgroundColor: "#ffffff",
              foregroundColor: "#000000",
            }}
            oAuthMethods={["GOOGLE", "TWITTER", "DISCORD"]}
            externalWallets={["METAMASK", "PHANTOM"]}
          /> */}

          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button> */}
        </div>
      </div>
    </nav>
  );
}
