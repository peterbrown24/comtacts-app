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
          ? "bg-background/70 backdrop-blur-2xl border-b border-white/[0.06] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <BrandLogo />

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="#"
            className="ml-3 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.12] transition-all active:scale-95"
            onClick={(e) => e.preventDefault()}
          >
            Get App
          </a>
        </nav>

        <button
          className="md:hidden text-white/70 hover:text-white p-2 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-card/95 backdrop-blur-2xl border-b border-white/[0.06] p-6 flex flex-col gap-1 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-base font-medium text-white/80 py-3 px-4 rounded-xl hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#"
              className="mt-3 px-5 py-3.5 rounded-xl bg-primary text-white font-semibold text-center"
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
