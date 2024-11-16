"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MOCK_PORTFOLIO = {
  totalValue: "12,450.00",
  tokens: [
    {
      name: "PepeCoin",
      ticker: "PEPE",
      amount: "1,000,000",
      value: "1,000.00",
      price: "0.000001",
      change: "+15.4%",
    },
    {
      name: "DogeMoon",
      ticker: "DGMN",
      amount: "500,000",
      value: "20.00",
      price: "0.00004",
      change: "-5.2%",
    },
  ],
  transactions: [
    {
      id: "1",
      type: "Buy",
      token: "PEPE",
      amount: "500,000",
      price: "0.000001",
      date: "2024-01-15",
    },
    {
      id: "2",
      type: "Sell",
      token: "DGMN",
      amount: "100,000",
      price: "0.00004",
      date: "2024-01-14",
    },
  ],
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">My Portfolio</h1>
          <Card>
            <CardHeader>
              <CardTitle>Total Portfolio Value</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">${MOCK_PORTFOLIO.totalValue}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="holdings">
          <TabsList>
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="holdings">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Token</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24h Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PORTFOLIO.tokens.map((token) => (
                    <TableRow key={token.ticker}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{token.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {token.ticker}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{token.amount}</TableCell>
                      <TableCell>${token.value}</TableCell>
                      <TableCell>${token.price}</TableCell>
                      <TableCell
                        className={
                          token.change.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {token.change}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Token</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PORTFOLIO.transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <span
                          className={
                            tx.type === "Buy"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {tx.type}
                        </span>
                      </TableCell>
                      <TableCell>{tx.token}</TableCell>
                      <TableCell>{tx.amount}</TableCell>
                      <TableCell>${tx.price}</TableCell>
                      <TableCell>{tx.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}