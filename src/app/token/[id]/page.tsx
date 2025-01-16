// Import necessary components
import { TOKENS } from "@/lib/tokens";
import Navbar from "@/components/navbar";
import { notFound } from "next/navigation";

// Define `generateStaticParams` to generate paths for all tokens
export function generateStaticParams() {
  return TOKENS.map((token) => ({
    id: token.id,
  }));
}

// TokenPage component with params as a server component
export default function TokenPage({ params }: { params: { id: string } }) {
  const token = TOKENS.find((t) => t.id === params.id);

  // Handle the case where the token doesn't exist
  if (!token) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Your token content goes here */}
          <div>
            <h1>{token.name}</h1>
            {/* Other token details */}
            Meme
          </div>
        </div>
      </div>
    </>
  );
}
