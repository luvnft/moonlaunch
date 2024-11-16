"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Twitter, Telegram, Globe } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TokenData } from "@/types/token";

export function TokenInfo({ token }: { token: TokenData }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-4">
        <img
          src={token.image}
          alt={token.name}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1">
          <CardTitle className="text-2xl">{token.name}</CardTitle>
          <p className="text-muted-foreground">${token.ticker}</p>
        </div>
        <div className="flex space-x-2">
          <a
            href={token.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href={token.social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Telegram className="h-5 w-5" />
          </a>
          <a
            href={token.social.website}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <Globe className="h-5 w-5" />
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="text-xl font-bold">${token.price}</p>
          </div>
          <div>
            <p className="text-muted-foreground">24h Change</p>
            <p className={`text-xl font-bold ${token.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
              {token.change}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Market Cap</p>
            <p className="text-xl font-bold">${token.marketCap}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Holders</p>
            <p className="text-xl font-bold">{token.holders}</p>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={token.priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2">About {token.name}</h3>
          <p className="text-muted-foreground">{token.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}