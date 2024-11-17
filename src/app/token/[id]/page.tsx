"use client";

// import { TokenInfo } from "@/components/token/token-info";
// import { TokenTrading } from "@/components/token/token-trading";
// import { TokenComments } from "@/components/token/token-comments";
import { TOKENS } from "@/lib/tokens";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar";

 function generateStaticParams() {
  return TOKENS.map((token) => ({
    id: 1,
  }));
}

export default function TokenPage({ params }: { params: { id: string } }) {
  const token = TOKENS.find((t) => t.id === params.id);

  if (!token) {
    notFound();
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-8 px-4">
      <div className="grid gap-6 md:grid-cols-3">
        {/* <div className="md:col-span-2 space-y-6">
          <TokenInfo  />
          <TokenComments token={token} />
        </div>
        <div>
          <TokenTrading token={token} />
        </div> */}
        Meme
      </div>
    </div>
    </>
  );
}