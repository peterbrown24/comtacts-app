import { motion } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  Hash, 
  Clock, 
  AtSign, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Smartphone
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Hero Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-sm font-medium">Now available on iOS</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-4">
                What's your <br />
                <span className="text-gradient">Comt<span className="text-accent">@</span>ct</span>?
              </h1>

              <p className="text-2xl sm:text-3xl font-display font-semibold text-white/80 mb-6">
                Your Business Communication Hub
              </p>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
                Organize your professional network, message directly, and collaborate in team channels. 
                Everything you need to keep your business moving, all in one premium app.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#" 
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-primary rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(65,105,225,0.5)]"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative flex items-center gap-2">
                    Download for iOS
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-8 py-4 font-medium text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  Explore Features
                </a>
              </div>
              
              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-secondary flex items-center justify-center overflow-hidden">
                       <img src={`https://images.unsplash.com/photo-15${i}13361500-118121111000?w=100&h=100&fit=crop&q=80`} alt="User avatar" className="w-full h-full object-cover opacity-80" />
                    </div>
                  ))}
                </div>
                <p>Joined by 10,000+ professionals</p>
              </div>
            </motion.div>

            {/* Hero Image / Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center lg:justify-end perspective-1000"
            >
              <div className="relative w-full max-w-[320px] aspect-[9/19] rounded-[40px] border-[8px] border-secondary/50 shadow-2xl shadow-primary/20 overflow-hidden bg-card">
                <div className="absolute top-0 inset-x-0 h-6 bg-secondary/50 rounded-b-3xl z-20 flex justify-center">
                  <div className="w-16 h-4 bg-background rounded-b-xl mt-[-2px]"></div>
                </div>
                <img 
                  src={`${import.meta.env.BASE_URL}images/hero-app-mockup.png`} 
                  alt="Comt@cts App Interface" 
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Floating UI element */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-10 -left-12 glass-panel p-4 rounded-2xl flex items-center gap-3 hidden md:flex"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Vendor Verified</p>
                    <p className="text-xs text-muted-foreground">Logistics Partner</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* FEATURES LOGO STRIP */}
      <section className="border-y border-white/5 bg-black/20 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2"><Building2 size={24} /> <span className="font-display font-bold text-xl">Acme Corp</span></div>
            <div className="flex items-center gap-2"><Building2 size={24} /> <span className="font-display font-bold text-xl">Globex</span></div>
            <div className="flex items-center gap-2"><Building2 size={24} /> <span className="font-display font-bold text-xl">Soylent</span></div>
            <div className="flex items-center gap-2"><Building2 size={24} /> <span className="font-display font-bold text-xl">Initech</span></div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section id="features" className="py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-primary font-semibold tracking-wider uppercase mb-3">Core Features</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6">Everything you need to stay connected.</h3>
            <p className="text-lg text-muted-foreground">
              Comt@cts is designed from the ground up for professional teams, combining CRM-like contact management with real-time chat.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Users className="text-primary" size={28} />}
              title="Professional Directory"
              description="Build a comprehensive directory. Vendor (V) and Merchant (M) badges make identifying external partners instant."
              delay={0.1}
            />
            <FeatureCard 
              icon={<MessageSquare className="text-primary" size={28} />}
              title="Direct Messaging"
              description="Secure 1-on-1 chats with full history, timestamps, and a clean interface designed for business."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Hash className="text-primary" size={28} />}
              title="Team Channels"
              description="Dedicated spaces for Shipping, Sales, HR, and more. Keep group conversations focused and organized."
              delay={0.3}
            />
            <FeatureCard 
              icon={<Clock className="text-accent" size={28} />}
              title="Real-time Status"
              description="Know when to reach out. See if contacts are online, away, or offline instantly."
              delay={0.4}
            />
            <FeatureCard 
              icon={<AtSign className="text-accent" size={28} />}
              title="Unique Handles"
              description="Every professional gets a unique @handle, making it easy to tag and find the right person quickly."
              delay={0.5}
            />
            <FeatureCard 
              icon={<Star className="text-amber-400" size={28} />}
              title="Premium Insights"
              description="Upgrade to unlock direct mobile numbers and personal emails when you need to reach them fast."
              isPremium={true}
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Smartphone size={48} className="mx-auto text-accent mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">What's your Comt<span className="text-accent">@</span>ct?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have simplified their workflow with Comt@cts. Your next deal, your next hire, your next big move — it all starts with one question.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center justify-center px-8 py-4 font-bold text-background bg-foreground rounded-2xl hover:bg-gray-200 transition-colors shadow-xl"
            onClick={(e) => e.preventDefault()}
          >
            Download on the App Store
          </a>
        </div>
      </section>
    </PageLayout>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description, 
  isPremium = false,
  delay = 0 
}: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  isPremium?: boolean,
  delay?: number
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative h-full p-8 rounded-3xl bg-card border border-white/5 hover:border-white/10 transition-colors">
        <div className="mb-6 w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-inner">
          {icon}
        </div>
        <div className="flex items-center gap-3 mb-3">
          <h4 className="text-xl font-display font-bold text-white">{title}</h4>
          {isPremium && (
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Premium
            </span>
          )}
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
