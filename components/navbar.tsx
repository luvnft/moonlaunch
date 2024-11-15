"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, Coins, User, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

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