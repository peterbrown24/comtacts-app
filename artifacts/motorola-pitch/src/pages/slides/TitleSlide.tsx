const base = import.meta.env.BASE_URL;

export default function TitleSlide() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <img
        src={`${base}hero.png`}
        crossOrigin="anonymous"
        alt="Professional with PTT device"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,22,40,0.92) 0%, rgba(0,95,190,0.25) 50%, rgba(10,22,40,0.95) 100%)" }} />
      <div className="absolute top-[6vh] left-[6vw] flex items-center gap-[1.5vw]">
        <div className="w-[3vw] h-[3vw] rounded-full bg-accent flex items-center justify-center">
          <span className="font-display text-[1.4vw] font-bold text-text">C</span>
        </div>
        <span className="font-display text-[1.6vw] font-semibold text-text tracking-tight">
          Comt@cts, Inc.
        </span>
      </div>
      <div className="absolute top-[6vh] right-[6vw]">
        <span className="font-body text-[1.3vw] text-muted">Partnership Proposal — 2026</span>
      </div>
      <div className="absolute left-[6vw] top-[30vh] max-w-[55vw]">
        <p className="font-body text-[1.5vw] font-semibold text-primary tracking-widest uppercase mb-[2vh]">
          Strategic Partnership
        </p>
        <h1 className="font-display text-[5.5vw] font-extrabold text-text leading-none tracking-tighter">
          Comt@cts
        </h1>
        <h1 className="font-display text-[5.5vw] font-extrabold leading-none tracking-tighter mt-[1vh]" style={{ color: "#005FBE" }}>
          x Motorola
        </h1>
        <p className="font-body text-[2vw] text-muted mt-[4vh] leading-relaxed max-w-[45vw]">
          A proposal for co-developing a purpose-built PTT communication device powered by Comt@cts software.
        </p>
      </div>
      <div className="absolute bottom-[6vh] left-[6vw]">
        <div className="w-[8vw] h-[0.3vh] bg-primary mb-[2vh]" />
        <p className="font-body text-[1.3vw] text-muted">Presented by Peter Douglas Brown</p>
        <p className="font-body text-[1.3vw] text-muted">Founder, Comt@cts, Inc.</p>
      </div>
      <div className="absolute bottom-[6vh] right-[6vw] flex items-center gap-[1vw]">
        <div className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary" />
        <span className="font-body text-[1.2vw] text-muted">comtacts.ca</span>
      </div>
    </div>
  );
}
