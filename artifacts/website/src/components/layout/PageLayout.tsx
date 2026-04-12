import { ReactNode, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useLocation } from "wouter";

export function PageLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <main className="flex-1 flex flex-col relative z-10 pt-[72px]">
        {children}
      </main>
      <Footer />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
        <div className="absolute top-[-15%] left-[-5%] w-[45%] h-[45%] rounded-full bg-primary/[0.06] blur-[140px]" />
        <div className="absolute top-[30%] right-[-8%] w-[35%] h-[35%] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[30%] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>
    </div>
  );
}
