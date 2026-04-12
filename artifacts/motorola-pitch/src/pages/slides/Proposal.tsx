export default function Proposal() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0A1628 0%, #0D1D35 100%)" }} />
      <div className="absolute left-[6vw] top-[8vh]">
        <div className="w-[4vw] h-[0.3vh] bg-accent mb-[2vh]" />
        <p className="font-body text-[1.4vw] font-semibold text-accent tracking-widest uppercase">
          The Vision
        </p>
      </div>
      <div className="absolute left-[6vw] top-[17vh] max-w-[50vw]">
        <h2 className="font-display text-[3.8vw] font-bold text-text leading-tight tracking-tight">
          A co-developed device built for professional teams.
        </h2>
      </div>
      <div className="absolute right-[6vw] top-[17vh] w-[30vw] rounded-[1vw] p-[3vw]" style={{ background: "rgba(0,95,190,0.06)", border: "1px solid rgba(0,95,190,0.12)" }}>
        <p className="font-display text-[1.8vw] font-bold text-text mb-[2vh]">Device Concept</p>
        <div className="flex items-center gap-[1vw] mb-[1.8vh]">
          <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary" />
          <p className="font-body text-[1.4vw] text-muted">Dedicated PTT hardware button</p>
        </div>
        <div className="flex items-center gap-[1vw] mb-[1.8vh]">
          <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary" />
          <p className="font-body text-[1.4vw] text-muted">Rugged, field-ready construction</p>
        </div>
        <div className="flex items-center gap-[1vw] mb-[1.8vh]">
          <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-accent" />
          <p className="font-body text-[1.4vw] text-muted">Comt@cts pre-installed</p>
        </div>
        <div className="flex items-center gap-[1vw] mb-[1.8vh]">
          <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-accent" />
          <p className="font-body text-[1.4vw] text-muted">Front-facing speaker optimized for PTT</p>
        </div>
        <div className="flex items-center gap-[1vw]">
          <div className="w-[0.5vw] h-[0.5vw] rounded-full" style={{ background: "#10B981" }} />
          <p className="font-body text-[1.4vw] text-muted">Extended battery for all-day field use</p>
        </div>
      </div>
      <div className="absolute left-[6vw] top-[48vh] flex gap-[2vw]">
        <div className="w-[42vw] rounded-[1vw] p-[2.5vw]" style={{ background: "rgba(65,105,225,0.06)", border: "1px solid rgba(65,105,225,0.12)" }}>
          <p className="font-display text-[1.8vw] font-bold text-text mb-[1.5vh]">Revenue Model</p>
          <div className="flex items-center gap-[1vw] mb-[1.5vh]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-accent" />
            <p className="font-body text-[1.4vw] text-muted">Hardware sales (Motorola manufacturing + distribution)</p>
          </div>
          <div className="flex items-center gap-[1vw] mb-[1.5vh]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary" />
            <p className="font-body text-[1.4vw] text-muted">Premium software subscription at $9.99/month per user</p>
          </div>
          <div className="flex items-center gap-[1vw]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.4vw] text-muted">Enterprise licensing for fleet deployments</p>
          </div>
        </div>
        <div className="w-[42vw] rounded-[1vw] p-[2.5vw]" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
          <p className="font-display text-[1.8vw] font-bold text-text mb-[1.5vh]">Target Markets</p>
          <div className="flex items-center gap-[1vw] mb-[1.5vh]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.4vw] text-muted">Logistics, warehousing, and supply chain</p>
          </div>
          <div className="flex items-center gap-[1vw] mb-[1.5vh]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.4vw] text-muted">Construction, utilities, and field services</p>
          </div>
          <div className="flex items-center gap-[1vw]">
            <div className="w-[0.5vw] h-[0.5vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.4vw] text-muted">Hospitality, events, and security teams</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[6vh] left-[6vw]">
        <p className="font-body text-[1.3vw] text-muted">Motorola builds the device. Comt@cts powers the experience.</p>
      </div>
    </div>
  );
}
