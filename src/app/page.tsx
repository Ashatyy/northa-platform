import Link from "next/link";
import { PublicNav } from "@/components/public-nav";
import { PublicFooter } from "@/components/public-footer";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background dot-grid relative overflow-hidden font-sans text-foreground">
      
      {/* Navigation */}
      <PublicNav />

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        {/* Floating Icons Removed per user request */}

        {/* Center Floating Icon */}
        <div className="w-16 h-16 bg-card rounded-2xl shadow-float flex items-center justify-center mb-8">
           <div className="grid grid-cols-2 gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <div className="w-3 h-3 rounded-full bg-foreground" />
            <div className="w-3 h-3 rounded-full bg-foreground" />
            <div className="w-3 h-3 rounded-full bg-foreground" />
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">Building Value</span>
          <br />
          <span className="text-muted-foreground">Across Sectors.</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
          A diversified leader in Construction, Oil & Gas, Agriculture, and Hospitality, dedicated to sustainable growth and excellence.
        </p>
        
        <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-primary hover:opacity-90 text-primary-foreground px-8 h-14 text-base shadow-soft font-medium transition-opacity">
          Get Started
        </Link>
      </main>

      {/* Feature Preview Section */}
      <section id="features" className="bg-gradient-to-b from-transparent to-background/50 py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-3 py-1 bg-background border border-border rounded-full text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6 shadow-sm">
            WHO WE ARE
          </span>
          <h2 className="text-4xl font-bold mb-16">Driven by Excellence</h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-card p-8 rounded-3xl shadow-soft border border-border/50 hover:-translate-y-2 hover:shadow-float transition-all duration-300 group cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 group-hover:text-primary transition-colors">Value Creation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">Northa Group is a diversified conglomerate established to drive value across multiple sectors. We are focused on value creation through strategic partnerships and a commitment to sustainable growth.</p>
            </div>
            
            <div className="bg-card p-8 rounded-3xl shadow-soft border border-border/50 hover:-translate-y-2 hover:shadow-float transition-all duration-300 group cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 group-hover:text-primary transition-colors">Accountability</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">We uphold the highest standards of corporate governance, ensuring every decision and action reflects our commitment to integrity, transparency, and delivering on promises.</p>
            </div>

            <div className="bg-card p-8 rounded-3xl shadow-soft border border-border/50 hover:-translate-y-2 hover:shadow-float transition-all duration-300 group cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 group-hover:text-primary transition-colors">Our Vision</h3>
              <p className="text-muted-foreground text-sm leading-relaxed relative z-10">To build a diversified global powerhouse that drives sustainable growth and creates long-term value through strategic partnerships and asset-focused thinking across every sector we touch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <PublicFooter />

    </div>
  );
}
