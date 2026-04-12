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
  Smartphone,
  Lock,
  Video,
  Camera,
  Mic,
  CheckCheck,
  Share2,
  Gift,
  Shield,
  Radio
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
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
                Organize your professional network, message securely, collaborate in team channels, 
                and connect face-to-face — all encrypted, all in one premium app.
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

                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                  className="absolute top-24 -right-14 glass-panel p-3 rounded-2xl flex items-center gap-2 hidden md:flex"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                    <Lock size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">AES-256 Encrypted</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* LOGO STRIP */}
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
              Comt@cts is designed from the ground up for professional teams, combining CRM-like contact management with real-time communication.
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
              description="Secure 1-on-1 chats with full history, timestamps, read receipts, and a clean interface designed for business."
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
              icon={<Share2 className="text-accent" size={28} />}
              title="Social Media Links"
              description="Connect your LinkedIn, Twitter, Instagram, and more — all accessible right from your contact profile."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* COMMUNICATION SUITE */}
      <section className="py-24 lg:py-32 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-accent font-semibold tracking-wider uppercase mb-3">Communication Suite</h2>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Comch<span className="text-accent">@</span>t. Talk. See. Capture. Transmit.
            </h3>
            <p className="text-lg text-muted-foreground">
              Six powerful ways to connect with your team — from encrypted text to push-to-talk voice, one-on-one and group video, in-app camera, and CB radio-style open channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <SuiteCard
              icon={<MessageSquare size={32} />}
              title={<>Comch<span className="text-accent">@</span>t</>}
              subtitle="Encrypted Messaging"
              description="Real-time text messaging with AES-256-GCM encryption at rest. Every message is encrypted before it's stored and decrypted only when you read it. Includes read receipts so you always know when your message has been seen."
              color="primary"
              delay={0.1}
            />
            <SuiteCard
              icon={<Mic size={32} />}
              title={<>Comch<span className="text-accent">@</span>tter</>}
              subtitle="Push-to-Talk"
              description="Instant voice communication at the press of a button. Record and send voice notes, or use push-to-talk for real-time walkie-talkie-style communication with your team. Fast, hands-free, and built for busy professionals."
              color="violet"
              delay={0.2}
            />
            <SuiteCard
              icon={<Video size={32} />}
              title={<>F<span className="text-accent">@</span>ce2F<span className="text-accent">@</span>ce</>}
              subtitle="1-on-1 Video Calls"
              description="Jump into a private video call with any contact directly from the app. High-quality, low-latency video powered by Agora — no third-party app needed. Perfect for quick check-ins and private conversations."
              color="accent"
              delay={0.3}
            />
            <SuiteCard
              icon={<Users size={32} />}
              title={<>F<span className="text-accent">@</span>ce-To-F<span className="text-accent">@</span>ce</>}
              subtitle="Group Video Calls"
              description="Bring the whole team together with group video calls. Multiple participants, crystal-clear video, and seamless collaboration — all within Comt@cts. Ideal for team meetings, standups, and live brainstorming."
              color="primary"
              delay={0.35}
            />
            <SuiteCard
              icon={<Camera size={32} />}
              title={<>Comer<span className="text-accent">@</span></>}
              subtitle="In-App Camera"
              description="Capture photos and videos right inside Comt@cts. Snap a photo of a document, a product, or a whiteboard and share it instantly in any conversation or channel."
              color="amber"
              delay={0.4}
            />
            <SuiteCard
              icon={<Radio size={32} />}
              title={<>2W<span className="text-accent">@</span>y</>}
              subtitle="CB Radio Channels"
              description="Open-channel, Citizens Band radio-style voice communication. Tune in to a channel and anyone listening can hear and talk — just like classic CB radio. Perfect for warehouse floors, field teams, and live coordination."
              color="emerald"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* SECURITY & PRIVACY */}
      <section className="py-24 lg:py-32 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-accent font-semibold tracking-wider uppercase mb-3">Privacy & Security</h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Your data. Your business. <br />
                <span className="text-accent">Our protection.</span>
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every message is encrypted with AES-256-GCM before it touches the database. 
                Security headers, rate limiting, and input sanitization protect the platform at every layer. 
                Your conversations stay between you and your contacts — always.
              </p>

              <div className="space-y-4">
                <SecurityFeature 
                  icon={<Lock size={20} />} 
                  title="AES-256-GCM Encryption" 
                  description="Military-grade encryption for every message stored at rest"
                />
                <SecurityFeature 
                  icon={<Shield size={20} />} 
                  title="Security Headers" 
                  description="HSTS, XSS protection, and strict content policies on every request"
                />
                <SecurityFeature 
                  icon={<CheckCheck size={20} />} 
                  title="Read Receipts" 
                  description="Know exactly when your message has been delivered and read"
                />
                <SecurityFeature 
                  icon={<ShieldCheck size={20} />} 
                  title="Rate Limiting" 
                  description="Built-in abuse prevention to keep the platform safe and fast"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div className="absolute inset-0 rounded-full bg-accent/5 border border-accent/10"></div>
                <div className="absolute inset-8 rounded-full bg-accent/10 border border-accent/20"></div>
                <div className="absolute inset-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <Shield size={64} className="text-accent" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-accent/30 flex items-center justify-center">
                    <Lock size={16} className="text-accent" />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="absolute inset-4"
                >
                  <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-card border border-primary/30 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-primary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREMIUM & REFERRAL */}
      <section className="py-24 lg:py-32 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-card to-card border border-amber-500/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="mb-6 w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                  <Star size={28} className="text-amber-400" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Premium
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold mt-4 mb-4">
                  Unlock Premium for $9.99/mo
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Get access to direct mobile numbers and personal email addresses for all your contacts. 
                  Reach the right person, the right way, every time.
                </p>
                <ul className="space-y-3 text-sm">
                  <PremiumItem text="Direct mobile phone numbers" />
                  <PremiumItem text="Personal email addresses" />
                  <PremiumItem text="Priority support" />
                  <PremiumItem text="Cancel anytime" />
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative p-10 rounded-3xl bg-gradient-to-br from-accent/10 via-card to-card border border-accent/20 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl"></div>
              <div className="relative">
                <div className="mb-6 w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Gift size={28} className="text-accent" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/20 text-accent border border-accent/30">
                  Refer & Earn
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold mt-4 mb-4">
                  Get Free Premium Time
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Share your unique referral code with colleagues and earn free Premium access. 
                  The more you refer, the more you earn.
                </p>
                <ul className="space-y-3 text-sm">
                  <ReferralTier count="1 referral" reward="1 free week" />
                  <ReferralTier count="3 referrals" reward="1 free month" />
                  <ReferralTier count="5 referrals" reward="3 free months" />
                  <ReferralTier count="10 referrals" reward="1 free year" />
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-primary/5"></div>
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Smartphone size={48} className="mx-auto text-accent mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">What's your Comt<span className="text-accent">@</span>ct?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have simplified their workflow with Comt@cts. 
            Your next deal, your next hire, your next big move — it all starts with one question.
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

function SuiteCard({
  icon,
  title,
  subtitle,
  description,
  color,
  delay = 0
}: {
  icon: React.ReactNode,
  title: React.ReactNode,
  subtitle: string,
  description: string,
  color: string,
  delay?: number
}) {
  const colorMap: Record<string, { bg: string, border: string, text: string, glow: string }> = {
    primary: { bg: "bg-primary/10", border: "border-primary/20", text: "text-primary", glow: "bg-primary/5" },
    accent: { bg: "bg-accent/10", border: "border-accent/20", text: "text-accent", glow: "bg-accent/5" },
    amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", glow: "bg-amber-500/5" },
    violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", glow: "bg-violet-500/5" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", glow: "bg-emerald-500/5" },
  };
  const c = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group relative"
    >
      <div className={`absolute top-0 right-0 w-40 h-40 ${c.glow} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className={`relative h-full p-8 rounded-3xl bg-card border ${c.border} hover:border-opacity-40 transition-colors`}>
        <div className={`mb-5 w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center ${c.text}`}>
          {icon}
        </div>
        <h4 className="text-2xl font-display font-bold text-white mb-1">{title}</h4>
        <p className={`text-sm font-semibold ${c.text} uppercase tracking-wider mb-4`}>{subtitle}</p>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

function SecurityFeature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-display font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function PremiumItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-white/80">
      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
        <CheckCheck size={12} className="text-amber-400" />
      </div>
      {text}
    </li>
  );
}

function ReferralTier({ count, reward }: { count: string, reward: string }) {
  return (
    <li className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
      <span className="text-white/80 font-medium">{count}</span>
      <span className="text-accent font-bold">{reward}</span>
    </li>
  );
}
