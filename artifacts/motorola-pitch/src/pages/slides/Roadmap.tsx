export default function Roadmap() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0A1628 0%, #0E1E38 60%, #0A1628 100%)" }} />
      <div className="absolute left-[6vw] top-[8vh]">
        <div className="w-[4vw] h-[0.3vh] bg-primary mb-[2vh]" />
        <p className="font-body text-[1.4vw] font-semibold text-primary tracking-widest uppercase">
          Partnership Roadmap
        </p>
      </div>
      <div className="absolute left-[6vw] top-[17vh] max-w-[88vw]">
        <h2 className="font-display text-[3.8vw] font-bold text-text leading-tight tracking-tight">
          A phased approach to market.
        </h2>
      </div>
      <div className="absolute left-[6vw] top-[33vh] right-[6vw]">
        <div className="flex items-start gap-[1vw]">
          <div className="flex flex-col items-center">
            <div className="w-[4vw] h-[4vw] rounded-full bg-primary flex items-center justify-center">
              <span className="font-display text-[1.6vw] font-bold text-text">1</span>
            </div>
            <div className="w-[0.2vw] h-[8vh] bg-primary/30" />
          </div>
          <div className="pt-[0.5vh] ml-[1.5vw]">
            <p className="font-display text-[2.2vw] font-bold text-text">Discovery and Alignment</p>
            <p className="font-body text-[1.5vw] text-muted mt-[0.5vh]">Introductory meeting to explore mutual interest and define scope</p>
          </div>
        </div>
        <div className="flex items-start gap-[1vw]">
          <div className="flex flex-col items-center">
            <div className="w-[4vw] h-[4vw] rounded-full bg-accent flex items-center justify-center">
              <span className="font-display text-[1.6vw] font-bold text-text">2</span>
            </div>
            <div className="w-[0.2vw] h-[8vh] bg-accent/30" />
          </div>
          <div className="pt-[0.5vh] ml-[1.5vw]">
            <p className="font-display text-[2.2vw] font-bold text-text">Technical Evaluation</p>
            <p className="font-body text-[1.5vw] text-muted mt-[0.5vh]">API integration review, hardware requirements, security audit</p>
          </div>
        </div>
        <div className="flex items-start gap-[1vw]">
          <div className="flex flex-col items-center">
            <div className="w-[4vw] h-[4vw] rounded-full flex items-center justify-center" style={{ background: "#10B981" }}>
              <span className="font-display text-[1.6vw] font-bold text-text">3</span>
            </div>
            <div className="w-[0.2vw] h-[8vh]" style={{ background: "rgba(16,185,129,0.3)" }} />
          </div>
          <div className="pt-[0.5vh] ml-[1.5vw]">
            <p className="font-display text-[2.2vw] font-bold text-text">Prototype Development</p>
            <p className="font-body text-[1.5vw] text-muted mt-[0.5vh]">Co-develop first device prototype with integrated Comt@cts software</p>
          </div>
        </div>
        <div className="flex items-start gap-[1vw]">
          <div className="flex flex-col items-center">
            <div className="w-[4vw] h-[4vw] rounded-full flex items-center justify-center" style={{ background: "rgba(245,158,11,0.9)" }}>
              <span className="font-display text-[1.6vw] font-bold text-text">4</span>
            </div>
          </div>
          <div className="pt-[0.5vh] ml-[1.5vw]">
            <p className="font-display text-[2.2vw] font-bold text-text">Market Launch</p>
            <p className="font-body text-[1.5vw] text-muted mt-[0.5vh]">Joint go-to-market strategy targeting enterprise and field teams</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[6vh] left-[6vw] right-[6vw] flex justify-between items-center">
        <p className="font-body text-[1.3vw] text-muted">Flexible timeline — built around Motorola's development cycles</p>
        <div className="flex items-center gap-[1vw]">
          <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary" />
          <span className="font-body text-[1.2vw] text-muted">Comt@cts, Inc.</span>
        </div>
      </div>
    </div>
  );
}
