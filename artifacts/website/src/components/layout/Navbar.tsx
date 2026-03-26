import { Link, useLocation } from "wouter";
import { BrandLogo } from "./BrandLogo";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "/#features" },
    { label: "Privacy", href: "/privacy" },
    { label: "Support", href: "/support" },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    // Smooth scroll for hash links if on the same page
    if (href.startsWith("/#") && location === "/") {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <BrandLogo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <a 
            href="#"
            className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-all hover:border-white/20 active:scale-95"
            onClick={(e) => e.preventDefault()}
          >
            Get App
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-2xl p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-lg font-medium text-foreground py-2 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
            <a 
              href="#"
              className="mt-4 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-center"
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
              }}
            >
              Download App
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
