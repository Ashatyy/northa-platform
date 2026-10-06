import { PublicNav } from "@/components/public-nav";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-background dot-grid relative overflow-hidden font-sans text-foreground flex flex-col">
      <PublicNav />

      <main className="flex-1 relative z-10 pt-20 pb-32 px-6 flex flex-col items-center max-w-5xl mx-auto w-full">
        
        {/* Section 1: About */}
        <div className="text-center mb-24">
          <span className="inline-block px-3 py-1 bg-background border border-border rounded-full text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6 shadow-sm">
            Meet our company • About Northa Group
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="text-foreground">Building Value</span> <br /> 
            <span className="text-muted-foreground">Across Sectors</span>
          </h1>
          <div className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed space-y-6 text-left">
            <p>
              Northa Group is a diversified business group operating across Construction, Oil and Gas, Hospitality, and Agriculture, with a clear focus on value creation, strategic partnerships, and sustainable growth.
            </p>
            <p>
              Our business model is built on diversified income streams, joint venture collaborations, and end-to-end project execution. Through an asset-focused and partnership-driven approach, we deliver solutions that are efficient, scalable, and aligned with long-term industry demands.
            </p>
            <p>
              In Construction and Contracting, Northa Group delivers private and commercial developments, infrastructure projects, and rehabilitation works. Within the Oil and Gas sector, we provide technical support services, procurement, maintenance, and project-related solutions that support upstream and downstream operations.
            </p>
            <p>
              Our Hospitality and Property Management operations focus on facility maintenance, asset management, and recurring service-based solutions, while our Agricultural investments include scalable and sustainable ventures such as poultry farming and equine management.
            </p>
            <p>
              Across all sectors, our operations are driven by strong execution capability, disciplined management, and a commitment to professional excellence. We prioritize partnerships that align with our long-term growth vision and consistently deliver value to clients, investors, and stakeholders.
            </p>
            <div className="pt-8 text-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base shadow-soft font-medium transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Section 2: Corporate Structure */}
        <div className="w-full max-w-4xl mt-12 bg-card p-10 md:p-14 rounded-[2.5rem] shadow-float border border-border/50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:border-primary/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-colors duration-500"></div>
          
          <span className="inline-block px-3 py-1 bg-background border border-border rounded-full text-xs font-mono uppercase tracking-widest text-primary mb-6 shadow-sm relative z-10">
            Corporate Structure
          </span>
          
          <h2 className="text-4xl font-bold mb-6 relative z-10">
            Ownership and Management
          </h2>
          
          <div className="text-muted-foreground leading-relaxed space-y-6 relative z-10">
            <p>
              Northa Group operates under a structured corporate governance framework led by a Board of Directors and Group Managing Director, <strong>Ahmad Idris Kasim</strong>, supported by divisional heads overseeing Construction, Oil and Gas, Hospitality, Agriculture, and Finance and Administration.
            </p>
            <p>
              This structure enables efficient decision-making, accountability, and effective execution across all business units, ensuring alignment with the group's strategic objectives and long-term vision.
            </p>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
