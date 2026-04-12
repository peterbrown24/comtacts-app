export default function Opportunity() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0A1628 0%, #0D1F3C 60%, #0A1628 100%)" }} />
      <div className="absolute top-[3vh] right-[4vw] w-[18vw] h-[18vw] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #005FBE, transparent)" }} />
      <div className="absolute left-[6vw] top-[8vh]">
        <div className="w-[4vw] h-[0.3vh] bg-primary mb-[2vh]" />
        <p className="font-body text-[1.4vw] font-semibold text-primary tracking-widest uppercase">
          The Opportunity
        </p>
      </div>
      <div className="absolute left-[6vw] top-[18vh] max-w-[42vw]">
        <h2 className="font-display text-[4vw] font-bold text-text leading-tight tracking-tight">
          Professional PTT is evolving.
        </h2>
        <p className="font-body text-[1.6vw] text-muted mt-[3vh] leading-relaxed">
          The global push-to-talk market continues to grow as industries demand instant, reliable voice communication beyond traditional cellular.
        </p>
      </div>
      <div className="absolute right-[6vw] top-[18vh] w-[38vw]">
        <div className="rounded-[1vw] p-[3vw] mb-[2.5vh]" style={{ background: "rgba(0,95,190,0.08)", border: "1px solid rgba(0,95,190,0.15)" }}>
          <p className="font-display text-[5vw] font-extrabold text-primary leading-none">45B+</p>
          <p className="font-body text-[1.5vw] text-muted mt-[1vh]">Projected global PTT market value by 2030 (USD)</p>
        </div>
        <div className="flex gap-[1.5vw]">
          <div className="flex-1 rounded-[0.8vw] p-[2vw]" style={{ background: "rgba(65,105,225,0.08)", border: "1px solid rgba(65,105,225,0.12)" }}>
            <p className="font-display text-[2.8vw] font-bold text-accent leading-none">9.5%</p>
            <p className="font-body text-[1.3vw] text-muted mt-[1vh]">Annual growth rate (CAGR)</p>
          </div>
          <div className="flex-1 rounded-[0.8vw] p-[2vw]" style={{ background: "rgba(65,105,225,0.08)", border: "1px solid rgba(65,105,225,0.12)" }}>
            <p className="font-display text-[2.8vw] font-bold text-accent leading-none">78%</p>
            <p className="font-body text-[1.3vw] text-muted mt-[1vh]">Of field teams prefer PTT over phone calls</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[6vh] left-[6vw] right-[6vw] flex items-center gap-[2vw]">
        <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary" />
        <p className="font-body text-[1.3vw] text-muted">
          Sources: Market research estimates. Field team preference data from industry surveys.
        </p>
      </div>
    </div>
  );
}
