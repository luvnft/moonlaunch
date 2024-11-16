"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const MOCK_TOKENS = [
  {
    id: "1",
    name: "PepeCoin",
    ticker: "PEPE",
    price: "0.000001",
    change: "+15.4%",
    marketCap: "1.2M",
    image: "https://images.unsplash.com/photo-1701135034151-0e040f846866?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: "2",
    name: "DogeMoon",
    ticker: "DGMN",
    price: "0.00004",
    change: "-5.2%",
    marketCap: "850K",
    image: "https://images.unsplash.com/photo-1701135034151-0e040f846866?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  // Add more mock tokens as needed
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("marketCap");

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Explore Tokens</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search tokens..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:max-w-[300px]"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="sm:max-w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="marketCap">Market Cap</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="change">24h Change</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_TOKENS.map((token) => (
            <Link href={`/token/${token.id}`} key={token.id}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                  <img
                    src={token.image}
                    alt={token.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <CardTitle className="text-xl">{token.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      ${token.ticker}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="font-semibold">${token.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">24h Change</p>
                      <p
                        className={
                          token.change.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {token.change}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Market Cap</p>
                      <p className="font-semibold">${token.marketCap}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}