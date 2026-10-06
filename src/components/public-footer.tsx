export function PublicFooter() {
  return (
    <footer className="bg-card border-t border-border pt-20 pb-10 w-full mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="grid grid-cols-2 gap-[2px]">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
              <div className="w-2.5 h-2.5 rounded-full bg-foreground" />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-foreground">Northa Group</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Building value across Construction, Oil & Gas, Agriculture, and Hospitality. Focused on sustainable growth and strategic partnerships.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold text-foreground mb-4">Divisions</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>Construction</li>
            <li>Oil & Gas</li>
            <li>Hospitality</li>
            <li>Agriculture</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-foreground mb-4">Head Office</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>2nd floor Annex B building, Hajj House complex, central business District</li>
            <li>Second Floor, City Centre, Plot 7 Guda Abdullahi Rd, Farm Centre Road</li>
            <li>Tarauni, Kano</li>
            <li className="pt-2"><a href="mailto:Northagroupltd@gmail.com" className="text-primary hover:underline">Northagroupltd@gmail.com</a></li>
            <li><a href="tel:+23409137771777" className="hover:text-foreground">+234 0913 777 1777</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-mono">
        <p>© {new Date().getFullYear()} Northa Group. All Rights Reserved.</p>
        <p>Operations: Mon - Fri (9 Am - 5 Pm)</p>
      </div>
    </footer>
  );
}
