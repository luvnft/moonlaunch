"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { TokenData } from "@/types/token";

export function TokenTrading({ token }: { token: TokenData }) {
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState("buy");

  const handleTransaction = (type: "buy" | "sell") => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: `${type === "buy" ? "Buy" : "Sell"} Order Placed`,
      description: `Successfully ${type === "buy" ? "bought" : "sold"} ${amount} ${token.ticker}`,
    });
    setAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade {token.ticker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy" className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Button
                  onClick={() => handleTransaction("buy")}
                  className="w-full"
                >
                  <ArrowUp className="mr-2 h-4 w-4" />
                  Buy
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="sell" className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Button
                  onClick={() => handleTransaction("sell")}
                  variant="destructive"
                  className="w-full"
                >
                  <ArrowDown className="mr-2 h-4 w-4" />
                  Sell
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}