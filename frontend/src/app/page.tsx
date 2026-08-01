import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background px-4">
      <main className="flex flex-col items-center justify-center max-w-4xl text-center space-y-8">
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          Built on Web3
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
          Immutable Credential Verification
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          A decentralized academic ledger for Nigerian tertiary institutions. Instantly verify degrees using cryptographic proofs on the blockchain.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/verify">
            <Button size="lg" className="w-full sm:w-auto font-semibold">
              Verify a Credential
            </Button>
          </Link>
          <Link href="/issuer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold">
              University Portal
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
