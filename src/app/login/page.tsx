import { login } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function LoginPage(props: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="min-h-screen dot-grid bg-background flex flex-col items-center justify-center p-4">
      
      {/* Brand Badge */}
      <Link href="/" className="flex items-center gap-2 mb-8 bg-card px-4 py-2 rounded-full shadow-sm border border-border/50 hover:bg-muted transition-colors cursor-pointer">
        <div className="grid grid-cols-2 gap-[2px]">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-foreground" />
          <div className="w-2 h-2 rounded-full bg-foreground" />
          <div className="w-2 h-2 rounded-full bg-foreground" />
        </div>
        <span className="font-display text-lg font-bold tracking-tight">Northa</span>
      </Link>

      <div className="max-w-md w-full bg-card rounded-3xl shadow-float border border-border/50 p-10 space-y-8 relative overflow-hidden">
        <div className="space-y-2 text-center relative z-10">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access the platform.
          </p>
        </div>

        {searchParams?.error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-center relative z-10">
            <p className="text-sm text-destructive font-medium">{searchParams.error}</p>
          </div>
        )}
        
        {searchParams?.message && (
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center relative z-10">
            <p className="text-sm text-primary font-medium">{searchParams.message}</p>
          </div>
        )}

        <form className="space-y-6 relative z-10">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="operative@northa.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-foreground">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="submit"
              formAction={login}
              className="w-full rounded-full h-12 bg-primary text-primary-foreground hover:opacity-90 shadow-soft font-semibold text-base transition-opacity flex items-center justify-center"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
