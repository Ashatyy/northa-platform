import { PublicNav } from "@/components/public-nav";
import { PublicFooter } from "@/components/public-footer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background dot-grid relative overflow-hidden font-sans text-foreground flex flex-col">
      <PublicNav />

      <main className="flex-1 relative z-10 pt-20 pb-32 px-6 flex flex-col items-center text-center max-w-5xl mx-auto w-full">
        <span className="inline-block px-3 py-1 bg-background border border-border rounded-full text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6 shadow-sm">
          GET IN TOUCH
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Do you have a question?
        </h1>
        <p className="text-lg text-muted-foreground mb-16 max-w-2xl leading-relaxed">
          Feel free to contact us. We are always ready to discuss strategic partnerships, division specific bookings, and end-to-end execution models.
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left w-full max-w-4xl">
          <div className="space-y-8">
            <div className="bg-card p-8 rounded-3xl shadow-soft border border-border/50 hover:shadow-float hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Our Address</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                2nd floor Annex B building, Hajj House complex, central business District<br />
                Second Floor, City Centre, Plot 7 Guda Abdullahi Rd, Farm Centre Road,<br />
                Tarauni, Kano
              </p>
            </div>

            <div className="bg-card p-8 rounded-3xl shadow-soft border border-border/50 hover:shadow-float hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Direct Lines</h3>
              <div className="space-y-2 mt-4">
                <a href="tel:+23409137771777" className="block text-primary hover:underline font-mono text-lg">
                  +234 0913 777 1777
                </a>
                <a href="mailto:Northagroupltd@gmail.com" className="block text-muted-foreground hover:text-foreground text-sm">
                  Northagroupltd@gmail.com
                </a>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-3xl shadow-soft border border-border/50 hover:shadow-float hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-xl font-bold mb-2">Operations</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Monday - Friday: 9 Am - 5 Pm
              </p>
            </div>
          </div>

          <form className="bg-card p-8 rounded-3xl shadow-float border border-border/50 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/10 transition-colors duration-500"></div>
            <h3 className="text-2xl font-bold mb-4 relative z-10">Send Us A Message</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Name</label>
                <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Email</label>
                <input type="email" className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="name@company.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Message</label>
                <textarea rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none" placeholder="How can we help you?"></textarea>
              </div>
            </div>
            <button type="button" className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-sm shadow-soft font-medium transition-colors mt-2">
              Transmit Message
            </button>
          </form>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
