export default function Proposal() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0A1628 0%, #0D1D35 100%)" }} />

      <div className="absolute left-[6vw] top-[7vh]">
        <div className="w-[4vw] h-[0.3vh] bg-accent mb-[1.5vh]" />
        <p className="font-body text-[1.2vw] font-semibold text-accent tracking-widest uppercase">
          The Vision
        </p>
      </div>

      <div className="absolute left-[6vw] top-[14vh] max-w-[45vw]">
        <h2 className="font-display text-[3.2vw] font-bold text-text leading-tight tracking-tight">
          A co-developed device built for professional teams.
        </h2>
      </div>

      <div className="absolute left-[6vw] top-[33vh] flex gap-[2vw]">
        <div className="w-[27vw] rounded-[1vw] p-[2vw]" style={{ background: "rgba(0,95,190,0.06)", border: "1px solid rgba(0,95,190,0.12)" }}>
          <p className="font-display text-[1.5vw] font-bold text-text mb-[1.5vh]">Device Concept</p>
          <div className="flex items-center gap-[0.8vw] mb-[1.2vh]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-primary" />
            <p className="font-body text-[1.1vw] text-muted">Dedicated PTT hardware button</p>
          </div>
          <div className="flex items-center gap-[0.8vw] mb-[1.2vh]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-primary" />
            <p className="font-body text-[1.1vw] text-muted">Rugged, field-ready construction</p>
          </div>
          <div className="flex items-center gap-[0.8vw] mb-[1.2vh]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent" />
            <p className="font-body text-[1.1vw] text-muted">Comt@cts pre-installed</p>
          </div>
          <div className="flex items-center gap-[0.8vw] mb-[1.2vh]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent" />
            <p className="font-body text-[1.1vw] text-muted">Front-facing speaker for PTT</p>
          </div>
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.1vw] text-muted">Extended battery for all-day use</p>
          </div>
        </div>

        <div className="w-[27vw] rounded-[1vw] p-[2vw]" style={{ background: "rgba(65,105,225,0.06)", border: "1px solid rgba(65,105,225,0.12)" }}>
          <p className="font-display text-[1.5vw] font-bold text-text mb-[1.5vh]">Revenue Model</p>
          <div className="flex items-center gap-[0.8vw] mb-[1.2vh]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-accent" />
            <p className="font-body text-[1.1vw] text-muted">Hardware sales via Motorola distribution</p>
          </div>
          <div className="flex items-center gap-[0.8vw] mb-[1.2vh]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full bg-primary" />
            <p className="font-body text-[1.1vw] text-muted">Premium subscription at $9.99/mo per user</p>
          </div>
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.1vw] text-muted">Enterprise licensing for fleet deployments</p>
          </div>
        </div>

        <div className="w-[27vw] rounded-[1vw] p-[2vw]" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
          <p className="font-display text-[1.5vw] font-bold text-text mb-[1.5vh]">Target Markets</p>
          <div className="flex items-center gap-[0.8vw] mb-[1.2vh]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.1vw] text-muted">Logistics, warehousing, supply chain</p>
          </div>
          <div className="flex items-center gap-[0.8vw] mb-[1.2vh]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.1vw] text-muted">Construction, utilities, field services</p>
          </div>
          <div className="flex items-center gap-[0.8vw]">
            <div className="w-[0.4vw] h-[0.4vw] rounded-full" style={{ background: "#10B981" }} />
            <p className="font-body text-[1.1vw] text-muted">Hospitality, events, security teams</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[6vh] left-[6vw]">
        <p className="font-body text-[1.2vw] text-muted">Motorola builds the device. Comt@cts powers the experience.</p>
      </div>
    </div>
  );
}
