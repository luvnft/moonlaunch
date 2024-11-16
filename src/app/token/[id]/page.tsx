"use client";

import { TokenInfo } from "@/components/token/token-info";
import { TokenTrading } from "@/components/token/token-trading";
import { TokenComments } from "@/components/token/token-comments";
import { TOKENS } from "@/lib/tokens";
import { notFound } from "next/navigation";

 function generateStaticParams() {
  return TOKENS.map((token) => ({
    id: token.id,
  }));
}

export default function TokenPage({ params }: { params: { id: string } }) {
  const token = TOKENS.find((t) => t.id === params.id);

  if (!token) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <TokenInfo token={token} />
          <TokenComments token={token} />
        </div>
        <div>
          <TokenTrading token={token} />
        </div>
      </div>
    </div>
  );
}