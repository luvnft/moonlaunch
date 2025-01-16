// Remove 'use client' since this page is statically generated

import { TOKENS } from "@/lib/tokens";
import Navbar from "@/components/navbar";
import { notFound } from "next/navigation";

// generateStaticParams is used for static paths
export function generateStaticParams() {
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
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Add components or data related to the token */}
          Meme
        </div>
      </div>
    </>
  );
}
