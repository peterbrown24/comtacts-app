import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLocation } from "wouter";

export function PageLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  // Scroll to top on route change unless it's a hash link
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col relative z-10 pt-[80px]">
        {children}
      </main>
      <Footer />
      
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
        {/* Top glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        {/* Right glow */}
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
        
        {/* We use an image for the rich abstract background if available, falling back to gradients */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/abstract-glow.png)` }}
        />
      </div>
    </div>
  );
}
