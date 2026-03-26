import { Link } from "wouter";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link 
      href="/" 
      className={`font-display font-bold text-2xl tracking-tight flex items-center gap-1 group transition-opacity hover:opacity-90 ${className}`}
    >
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mr-1 shadow-lg shadow-primary/20">
        <span className="text-white text-lg leading-none mt-[-2px]">C</span>
      </div>
      <span className="text-foreground">Comt</span>
      <span className="text-accent transition-colors duration-300 group-hover:text-primary">@</span>
      <span className="text-foreground">cts</span>
    </Link>
  );
}
