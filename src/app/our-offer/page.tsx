import { PublicNav } from "@/components/public-nav";
import { PublicFooter } from "@/components/public-footer";

export default function OurOfferPage() {
  return (
    <div className="min-h-screen bg-background dot-grid relative overflow-hidden font-sans text-foreground flex flex-col">
      <PublicNav />

      <main className="flex-1 relative z-10 pt-20 pb-32 px-6 flex flex-col items-center text-center max-w-6xl mx-auto w-full">
        <span className="inline-block px-3 py-1 bg-background border border-border rounded-full text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6 shadow-sm">
          WHAT WE DO
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-20 text-foreground">
          Our Offer.
        </h1>

        <div className="grid lg:grid-cols-2 gap-10 text-left w-full">
          
          {/* Construction & Contracting */}
          <div className="bg-card p-10 rounded-3xl shadow-float border border-border/50 relative overflow-hidden flex flex-col h-full group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-300"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-primary transition-colors">Construction & Contracting</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
              Northa Group delivers construction and contracting solutions across public and private sector projects. Our services cover infrastructure development, commercial and residential buildings, and specialized construction works executed to high quality and safety standards.
            </p>
            <ul className="text-sm font-medium space-y-3 mt-auto relative z-10">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Road construction and asphalting</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Drainage systems and roadway infrastructure</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Location platforms, dams, and retaining walls</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Bridges and civil structures</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Residential and commercial buildings</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Hospitals, schools, and office complexes</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Low and medium-rise developments</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> General maintenance and rehabilitation works</li>
            </ul>
            <p className="text-xs text-muted-foreground mt-6 italic relative z-10">
              Design and planning services are provided in support of our construction and development projects.
            </p>
          </div>

          {/* Oil & Gas Services */}
          <div className="bg-card p-10 rounded-3xl shadow-float border border-border/50 relative overflow-hidden flex flex-col h-full group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-300"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-primary transition-colors">Oil & Gas Services</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
              Northa Group provides oil and gas support services focused on project execution, procurement, maintenance, and technical support for upstream and downstream operations. Our delivery model emphasizes efficiency, compliance, and strategic partnerships.
            </p>
            <ul className="text-sm font-medium space-y-3 mt-auto relative z-10">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Technical support services</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Procurement and supply of oilfield equipment</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Maintenance and inspection services</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Pipeline and flowline support works</li>
            </ul>
          </div>

          {/* Hospitality & Property Management */}
          <div className="bg-card p-10 rounded-3xl shadow-float border border-border/50 relative overflow-hidden flex flex-col h-full group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-300"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-primary transition-colors">Hospitality & Property Management</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
              Our hospitality and property management operations focus on asset maintenance, facility management, and long-term value preservation through structured and recurring service-based solutions.
            </p>
            <ul className="text-sm font-medium space-y-3 mt-auto relative z-10">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Facility and property maintenance</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Asset and operations management</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Hospitality support services</li>
            </ul>
          </div>

          {/* Agriculture Investments */}
          <div className="bg-card p-10 rounded-3xl shadow-float border border-border/50 relative overflow-hidden flex flex-col h-full group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-colors duration-300"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-primary transition-colors">Agriculture Investments</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 relative z-10">
              Northa Group invests in scalable and sustainable agricultural ventures designed to support food production and long-term returns through disciplined management and operational efficiency.
            </p>
            <ul className="text-sm font-medium space-y-3 mt-auto relative z-10">
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Poultry farming, layers and broilers</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Equine, horse management</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span> Sustainable agricultural operations</li>
            </ul>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
