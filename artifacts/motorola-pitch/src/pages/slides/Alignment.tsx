export default function Alignment() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0A1628 0%, #0F2240 50%, #0A1628 100%)" }} />
      <div className="absolute right-[8vw] top-[10vh] w-[25vw] h-[25vw] rounded-full opacity-[0.03]" style={{ background: "radial-gradient(circle, #005FBE, transparent)" }} />
      <div className="absolute left-[6vw] top-[8vh]">
        <div className="w-[4vw] h-[0.3vh] bg-primary mb-[2vh]" />
        <p className="font-body text-[1.4vw] font-semibold text-primary tracking-widest uppercase">
          Strategic Alignment
        </p>
      </div>
      <div className="absolute left-[6vw] top-[17vh] max-w-[88vw]">
        <h2 className="font-display text-[3.8vw] font-bold text-text leading-tight tracking-tight">
          Why Motorola Solutions?
        </h2>
      </div>
      <div className="absolute left-[6vw] top-[32vh] flex gap-[3vw]">
        <div className="w-[25vw]">
          <div className="w-full h-[0.2vh] bg-primary/30 mb-[3vh]" />
          <p className="font-display text-[2vw] font-bold text-text mb-[1.5vh]">Heritage</p>
          <p className="font-body text-[1.5vw] text-muted leading-relaxed">
            Motorola Solutions invented the modern two-way radio. Their name is synonymous with professional communication hardware worldwide.
          </p>
        </div>
        <div className="w-[25vw]">
          <div className="w-full h-[0.2vh] bg-accent/30 mb-[3vh]" />
          <p className="font-display text-[2vw] font-bold text-text mb-[1.5vh]">Distribution</p>
          <p className="font-body text-[1.5vw] text-muted leading-relaxed">
            Global reach into enterprise, government, and public safety markets. Established dealer and partner networks across every continent.
          </p>
        </div>
        <div className="w-[25vw]">
          <div className="w-full h-[0.2vh] mb-[3vh]" style={{ background: "rgba(16,185,129,0.3)" }} />
          <p className="font-display text-[2vw] font-bold text-text mb-[1.5vh]">Expertise</p>
          <p className="font-body text-[1.5vw] text-muted leading-relaxed">
            Decades of rugged hardware engineering. Purpose-built devices for field-ready, mission-critical environments.
          </p>
        </div>
      </div>
      <div className="absolute left-[6vw] bottom-[10vh] right-[6vw] rounded-[1vw] p-[3vw] flex items-center gap-[4vw]" style={{ background: "rgba(0,95,190,0.06)", border: "1px solid rgba(0,95,190,0.12)" }}>
        <div className="flex-shrink-0">
          <p className="font-display text-[2.2vw] font-bold text-text">Comt@cts brings</p>
        </div>
        <div className="flex gap-[3vw]">
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-primary" />
            <p className="font-body text-[1.4vw] text-muted">Modern software platform</p>
          </div>
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[0.6vw] h-[0.6vw] rounded-full bg-accent" />
            <p className="font-body text-[1.4vw] text-muted">AES-256-GCM encryption</p>
          </div>
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[0.6vw] h-[0.6vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.4vw] text-muted">PTT-ready architecture</p>
          </div>
        </div>
      </div>
    </div>
  );
}
