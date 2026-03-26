import { Link } from "wouter";
import { BrandLogo } from "./BrandLogo";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <BrandLogo className="mb-4" />
            <p className="text-muted-foreground max-w-sm">
              The professional contact management and team messaging hub built for modern organizations. 
              Organize your network, message directly, and collaborate.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-accent transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Download App
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Legal & Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-accent transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <a href="mailto:support@comtacts.inc" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground/60">
          <p>© {new Date().getFullYear()} Comt@cts, Inc. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            Designed for professionals.
          </div>
        </div>
      </div>
    </footer>
  );
}
