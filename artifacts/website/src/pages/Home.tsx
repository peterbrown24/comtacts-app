import { motion } from "framer-motion";
import { 
  Users, 
  MessageSquare, 
  Hash, 
  Clock, 
  AtSign, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Lock,
  Video,
  Camera,
  Mic,
  CheckCheck,
  Share2,
  Gift,
  Shield,
  Radio,
  Volume2,
  Star,
  ChevronRight,
  Fingerprint
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }
  })
};

export default function Home() {
  return (
    <PageLayout>
      {/* HERO */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-[140px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-accent/6 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              className="max-w-xl"
            >
              <motion.div
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                <span className="text-sm font-medium text-white/70">Now available on iOS</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                custom={0.08}
                className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold font-display leading-[1.05] mb-6"
              >
                What's your{" "}
                <span className="text-gradient">Comt<span className="text-accent">@</span>ct</span>?
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={0.16}
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg"
              >
                Organize your professional network, message securely, collaborate in team channels, and connect face-to-face — all encrypted, all in one premium app.
              </motion.p>

              <motion.div variants={fadeUp} custom={0.24} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-white rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={(e) => e.preventDefault()}
                  style={{ background: "linear-gradient(135deg, #4169E1 0%, #3458c9 100%)", boxShadow: "0 0 40px -8px rgba(65,105,225,0.45), inset 0 1px 0 rgba(255,255,255,0.1)" }}
                >
                  Download for iOS
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white/80 bg-white/[0.04] border border-white/[0.08] rounded-2xl hover:bg-white/[0.07] hover:border-white/[0.12] transition-all"
                >
                  Explore Features
                </a>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.32} className="mt-12 flex items-center gap-5">
                <div className="flex -space-x-2.5">
                  <div className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center text-[10px] font-bold text-white">PB</div>
                  <div className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-violet-500/40 to-primary/40 flex items-center justify-center text-[10px] font-bold text-white">MK</div>
                  <div className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-accent/40 to-emerald-500/40 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
                  <div className="w-9 h-9 rounded-full border-2 border-background bg-gradient-to-br from-amber-500/40 to-primary/40 flex items-center justify-center text-[10px] font-bold text-white">+</div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/80">10,000+ professionals</p>
                  <p className="text-xs text-muted-foreground">Growing every day</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative flex items-center justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-[60px] blur-2xl" />
                <div className="relative w-[280px] sm:w-[300px] aspect-[9/19] rounded-[36px] border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden bg-card">
                  <div className="absolute top-0 inset-x-0 h-7 bg-black/40 backdrop-blur-sm z-20 flex justify-center">
                    <div className="w-20 h-5 bg-black rounded-b-2xl"></div>
                  </div>
                  <img
                    src={`${import.meta.env.BASE_URL}images/hero-app-mockup.png`}
                    alt="Comt@cts App"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -bottom-4 -left-16 hidden md:flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-card/80 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/30"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                    <ShieldCheck size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Vendor Verified</p>
                    <p className="text-[11px] text-muted-foreground">Logistics Partner</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1 }}
                  className="absolute top-20 -right-14 hidden md:flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-card/80 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <Lock size={14} className="text-emerald-400" />
                  </div>
                  <p className="text-xs font-bold text-white">AES-256 Encrypted</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem number="6" label="Communication Tools" />
            <StatItem number="256" label="Bit AES-GCM Encryption" />
            <StatItem number="10" label="Open Radio Channels" />
            <StatItem number="$9.99" label="Premium Monthly" />
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section id="features" className="py-28 lg:py-36 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-2xl mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-primary tracking-widest uppercase mb-4">
              Core Features
            </motion.p>
            <motion.h2 variants={fadeUp} custom={0.08} className="text-3xl md:text-5xl font-display font-bold mb-5 leading-tight">
              Everything you need to stay connected.
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.16} className="text-lg text-muted-foreground leading-relaxed">
              Comt@cts combines CRM-like contact management with real-time communication — built from the ground up for professional teams.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<Users size={22} />}
              title="Professional Directory"
              description="Build a comprehensive directory. Vendor (V) and Merchant (M) badges make identifying external partners instant."
              color="primary"
              delay={0.05}
            />
            <FeatureCard
              icon={<MessageSquare size={22} />}
              title="Direct Messaging"
              description="Secure 1-on-1 chats with full history, timestamps, read receipts, and a clean interface designed for business."
              color="primary"
              delay={0.1}
            />
            <FeatureCard
              icon={<Hash size={22} />}
              title="Team Channels"
              description="Dedicated spaces for Shipping, Sales, HR, and more. Keep group conversations focused and organized."
              color="primary"
              delay={0.15}
            />
            <FeatureCard
              icon={<Clock size={22} />}
              title="Real-time Status"
              description="Know when to reach out. See if contacts are online, away, or offline instantly."
              color="accent"
              delay={0.2}
            />
            <FeatureCard
              icon={<AtSign size={22} />}
              title="Unique Handles"
              description="Every professional gets a unique @handle, making it easy to tag and find the right person quickly."
              color="accent"
              delay={0.25}
            />
            <FeatureCard
              icon={<Share2 size={22} />}
              title="Social Media Links"
              description="Connect your LinkedIn, Twitter, Instagram, and more — all accessible right from your contact profile."
              color="accent"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* BRANDED FEATURE SHOWCASE */}
      <section className="py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[-5%] w-[500px] h-[500px] rounded-full bg-primary/[0.04] blur-[120px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.p variants={fadeUp} custom={0} className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">
              The Comt@cts Suite
            </motion.p>
            <motion.h2 variants={fadeUp} custom={0.08} className="text-3xl md:text-5xl font-display font-bold mb-5 leading-tight">
              Six branded tools. One platform.
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.16} className="text-lg text-muted-foreground leading-relaxed">
              Every feature carries the @ identity — instantly recognizable, purpose-built, and encrypted by default.
            </motion.p>
          </motion.div>

          {/* HERO BRAND CARDS */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Comch@t — Large hero card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-10 rounded-3xl bg-card border border-primary/10 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/[0.04] rounded-full blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="mb-6 w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                  <MessageSquare size={28} className="text-primary" />
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-2 tracking-tight">
                  Comch<span className="text-accent">@</span>t
                </h3>
                <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Encrypted Messaging</p>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Real-time text messaging with AES-256-GCM encryption at rest. Every message is encrypted before storage and decrypted only when you read it. Includes read receipts and full chat history.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-primary/8 border border-primary/10">
                    <span className="text-xs font-bold text-primary">AES-256-GCM</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xs font-medium text-white/60">Read Receipts</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Comch@tter — Large hero card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative p-10 rounded-3xl bg-card border border-violet-500/10 overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/[0.04] rounded-full blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="mb-6 w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/15 flex items-center justify-center">
                  <Mic size={28} className="text-violet-400" />
                </div>
                <h3 className="text-4xl md:text-5xl font-display font-extrabold text-white mb-2 tracking-tight">
                  Comch<span className="text-violet-400">@</span>tter
                </h3>
                <p className="text-sm font-semibold text-violet-400 uppercase tracking-widest mb-4">Push-to-Talk</p>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Instant voice communication at the press of a button. Record and send voice notes, or use real-time walkie-talkie-style communication with your team. Fast, hands-free, and built for busy professionals.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-violet-500/8 border border-violet-500/10">
                    <span className="text-xs font-bold text-violet-400">Voice Notes</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xs font-medium text-white/60">Walkie-Talkie</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* MIDDLE ROW — F@ce2F@ce + F@ceGroup */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-8 rounded-3xl bg-card border border-accent/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-accent/[0.04] rounded-full blur-[60px] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                    <Video size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-extrabold text-white tracking-tight">
                      F<span className="text-accent">@</span>ce2F<span className="text-accent">@</span>ce
                    </h3>
                    <p className="text-xs font-semibold text-accent uppercase tracking-widest">1-on-1 Video Calls</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Jump into a private video call with any contact. High-quality, low-latency video powered by Agora — no third-party app needed. Perfect for quick check-ins and confidential conversations.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-accent/8 border border-accent/10">
                    <span className="text-xs font-bold text-accent">HD Video</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xs font-medium text-white/60">Low Latency</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative p-8 rounded-3xl bg-card border border-primary/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-primary/[0.04] rounded-full blur-[60px] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <Users size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-extrabold text-white tracking-tight">
                      F<span className="text-primary">@</span>ceGroup
                    </h3>
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest">Group Video Calls</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bring the whole team together with multi-participant group video calls. Crystal-clear video, seamless collaboration — ideal for standups, meetings, and live brainstorming sessions.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-primary/8 border border-primary/10">
                    <span className="text-xs font-bold text-primary">Multi-Party</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xs font-medium text-white/60">Team Meetings</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM ROW — Comer@ + 2W@y */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-8 rounded-3xl bg-card border border-amber-500/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/[0.04] rounded-full blur-[60px] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                    <Camera size={24} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-extrabold text-white tracking-tight">
                      Comer<span className="text-amber-400">@</span>
                    </h3>
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest">In-App Camera</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Capture photos and video right inside Comt@cts. Snap a document, a product, or a whiteboard and share it instantly in any conversation or channel. No switching apps.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-amber-500/8 border border-amber-500/10">
                    <span className="text-xs font-bold text-amber-400">Photo + Video</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xs font-medium text-white/60">Instant Share</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="relative p-8 rounded-3xl bg-card border border-emerald-500/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/[0.04] rounded-full blur-[60px] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                    <Radio size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-extrabold text-white tracking-tight">
                      2W<span className="text-emerald-400">@</span>y
                    </h3>
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">CB Radio Channels</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Open-channel, Citizens Band radio-style voice communication. 10 preset channels, push-to-talk transmission, and speakerphone toggle — classic CB radio reimagined for the modern workplace.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/10">
                    <span className="text-xs font-bold text-emerald-400">10 Channels</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/10">
                    <span className="text-xs font-bold text-emerald-400">Speakerphone</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <span className="text-xs font-medium text-white/60">PTT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* THE @ IDENTITY */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-6 sm:px-10 py-6 rounded-3xl bg-card border border-white/[0.06] max-w-md sm:max-w-none">
              <div className="text-center">
                <span className="text-5xl md:text-6xl font-display font-extrabold text-accent">@</span>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-lg font-display font-bold text-white">The @ Identity</p>
                <p className="text-sm text-muted-foreground">Every feature carries the @ mark — the signature of Comt@cts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2W@Y SPOTLIGHT */}
      <section className="py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/[0.03] blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold text-emerald-400 tracking-widest uppercase mb-4">Voice and Radio</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Talk like it's{" "}
                <span className="text-emerald-400">CB radio.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                2W@y brings Citizens Band radio into the modern workplace. Tune in to any of 10 open channels,
                hold the button to talk, and everyone listening hears you instantly.
              </p>

              <div className="space-y-5">
                <SpotlightItem
                  icon={<Radio size={18} />}
                  title="10 Open Channels"
                  description="General, Dispatch, Logistics, Sales, Warehouse, Field Ops, Support, Management, Emergency, and Open"
                  color="emerald"
                />
                <SpotlightItem
                  icon={<Volume2 size={18} />}
                  title="Speakerphone Toggle"
                  description="Switch between speaker and earpiece with one tap — hands-free or private listening"
                  color="emerald"
                />
                <SpotlightItem
                  icon={<Mic size={18} />}
                  title="Comch@tter Voice Notes"
                  description="Record and send voice messages or use push-to-talk for real-time walkie-talkie communication"
                  color="violet"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-6 rounded-[40px] bg-emerald-500/[0.04] blur-xl" />
                <div className="relative w-72 md:w-80 rounded-3xl bg-card border border-emerald-500/15 p-8 space-y-6 shadow-2xl shadow-black/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-end gap-0.5">
                        <div className="w-1 h-2 rounded-sm bg-emerald-400"></div>
                        <div className="w-1 h-3 rounded-sm bg-emerald-400"></div>
                        <div className="w-1 h-4 rounded-sm bg-emerald-400"></div>
                      </div>
                      <span className="text-emerald-400 text-xs font-bold tracking-widest">2W@Y RADIO</span>
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  </div>
                  <div>
                    <div className="text-3xl font-display font-bold text-white">CH 01</div>
                    <div className="text-muted-foreground text-sm mt-0.5">General</div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>3 listeners</span>
                    <span className="text-emerald-400 font-bold tracking-wider">RX</span>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="w-28 h-28 mx-auto rounded-full border-2 border-emerald-400/40 bg-emerald-500/[0.06] flex flex-col items-center justify-center gap-1.5 shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]"
                  >
                    <Mic size={28} className="text-emerald-400" />
                    <span className="text-[9px] font-bold text-emerald-400 tracking-[0.2em]">PUSH TO TALK</span>
                  </motion.div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                      <Volume2 size={14} className="text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400">Speaker On</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="py-28 lg:py-36 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold text-accent tracking-widest uppercase mb-4">Privacy and Security</p>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                Your data. Your business.{" "}
                <span className="text-accent">Our protection.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Every message is encrypted with AES-256-GCM before it touches the database.
                Security headers, rate limiting, and input sanitization protect the platform at every layer.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <SecurityCard icon={<Lock size={20} />} title="AES-256-GCM" description="Military-grade encryption at rest" />
                <SecurityCard icon={<Shield size={20} />} title="Security Headers" description="HSTS, XSS, strict CSP" />
                <SecurityCard icon={<Fingerprint size={20} />} title="Rate Limiting" description="Built-in abuse prevention" />
                <SecurityCard icon={<CheckCheck size={20} />} title="Read Receipts" description="Delivery confirmation" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 rounded-full border border-accent/8" />
                <div className="absolute inset-8 rounded-full border border-accent/12" />
                <div className="absolute inset-16 rounded-full border border-accent/20 bg-accent/[0.03] flex items-center justify-center">
                  <Shield size={56} className="text-accent" />
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card border border-accent/20 flex items-center justify-center shadow-lg shadow-black/20">
                    <Lock size={14} className="text-accent" />
                  </div>
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                  className="absolute inset-4"
                >
                  <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-card border border-primary/20 flex items-center justify-center shadow-lg shadow-black/20">
                    <ShieldCheck size={14} className="text-primary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PREMIUM & REFERRAL */}
      <section className="py-28 lg:py-36 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-10 rounded-3xl bg-card border border-amber-500/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/[0.04] rounded-full blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="mb-6 w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                  <Star size={22} className="text-amber-400" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/15 mb-4">
                  Premium
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  Unlock Premium for $9.99/mo
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Get access to direct mobile numbers and personal email addresses for all your contacts.
                </p>
                <div className="space-y-3">
                  <PremiumItem text="Direct mobile phone numbers" />
                  <PremiumItem text="Personal email addresses" />
                  <PremiumItem text="Priority support" />
                  <PremiumItem text="Cancel anytime" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative p-10 rounded-3xl bg-card border border-accent/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-60 h-60 bg-accent/[0.04] rounded-full blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="mb-6 w-12 h-12 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                  <Gift size={22} className="text-accent" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/15 mb-4">
                  Refer and Earn
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  Get Free Premium Time
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Share your unique referral code with colleagues and earn free Premium access.
                </p>
                <div className="space-y-2.5">
                  <ReferralTier count="1 referral" reward="1 free week" />
                  <ReferralTier count="3 referrals" reward="1 free month" />
                  <ReferralTier count="5 referrals" reward="3 free months" />
                  <ReferralTier count="10 referrals" reward="1 free year" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.05] blur-[100px]" />
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-8 flex justify-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/15 flex items-center justify-center">
                <Smartphone size={32} className="text-accent" />
              </div>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={0.08} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              What's your Comt<span className="text-accent">@</span>ct?
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.16} className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Join thousands of professionals who have simplified their workflow.
              Your next deal, your next hire, your next big move — it starts here.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.24}>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2.5 px-10 py-4.5 font-bold text-background bg-foreground rounded-2xl hover:bg-gray-200 transition-all shadow-xl shadow-black/20 active:scale-[0.98]"
                onClick={(e) => e.preventDefault()}
              >
                Download on the App Store
                <ChevronRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <p className="text-3xl md:text-4xl font-display font-extrabold text-gradient mb-1">{number}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color,
  delay = 0
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}) {
  const colorStyles: Record<string, { iconBg: string; iconText: string; border: string }> = {
    primary: { iconBg: "bg-primary/10", iconText: "text-primary", border: "border-primary/[0.06]" },
    accent: { iconBg: "bg-accent/10", iconText: "text-accent", border: "border-accent/[0.06]" },
  };
  const c = colorStyles[color] || colorStyles.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      className="group"
    >
      <div className={`h-full p-7 rounded-2xl bg-card border ${c.border} hover:border-white/[0.08] transition-all duration-300`}>
        <div className={`mb-5 w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center ${c.iconText}`}>
          {icon}
        </div>
        <h4 className="text-lg font-display font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}


function SpotlightItem({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  const bgColor = color === "violet" ? "bg-violet-500/10 border-violet-500/15" : "bg-emerald-500/10 border-emerald-500/15";
  const textColor = color === "violet" ? "text-violet-400" : "text-emerald-400";

  return (
    <div className="flex items-start gap-4">
      <div className={`mt-0.5 w-10 h-10 rounded-xl ${bgColor} border flex items-center justify-center ${textColor} flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <h4 className="font-display font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function SecurityCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-accent/[0.06] hover:border-accent/[0.12] transition-all">
      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-3">
        {icon}
      </div>
      <h4 className="font-display font-bold text-white text-sm mb-1">{title}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function PremiumItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 text-white/80 text-sm">
      <div className="w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center flex-shrink-0">
        <CheckCheck size={11} className="text-amber-400" />
      </div>
      {text}
    </div>
  );
}

function ReferralTier({ count, reward }: { count: string; reward: string }) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
      <span className="text-sm text-white/70 font-medium">{count}</span>
      <span className="text-sm text-accent font-bold">{reward}</span>
    </div>
  );
}
