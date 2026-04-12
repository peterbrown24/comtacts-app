const base = import.meta.env.BASE_URL;

export default function Closing() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <img
        src={`${base}hero.png`}
        crossOrigin="anonymous"
        alt="Professional communication"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(0,95,190,0.15) 50%, rgba(10,22,40,0.97) 100%)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-center gap-[2vw] mb-[2vh]">
          <div className="w-[4vw] h-[4vw] rounded-full bg-accent flex items-center justify-center">
            <span className="font-display text-[1.8vw] font-bold text-text">C</span>
          </div>
          <div className="w-[6vw] h-[0.2vh] bg-muted/30" />
          <div className="w-[4vw] h-[4vw] rounded-full bg-primary flex items-center justify-center">
            <span className="font-display text-[1.8vw] font-bold text-text">M</span>
          </div>
        </div>
        <h2 className="font-display text-[4.5vw] font-extrabold text-text tracking-tight text-center">
          Let's build it together.
        </h2>
        <p className="font-body text-[2vw] text-muted mt-[2vh] text-center max-w-[50vw]">
          We'd welcome the opportunity to discuss how Comt@cts and Motorola Solutions can redefine professional push-to-talk communication.
        </p>
        <div className="mt-[6vh] flex gap-[4vw] items-start">
          <div className="text-center">
            <p className="font-display text-[1.6vw] font-bold text-text mb-[0.5vh]">Peter Douglas Brown</p>
            <p className="font-body text-[1.3vw] text-muted">Founder, Comt@cts, Inc.</p>
          </div>
          <div className="w-[0.15vw] h-[6vh] bg-muted/20" />
          <div className="text-center">
            <p className="font-display text-[1.6vw] font-bold text-primary mb-[0.5vh]">comtacts.ca</p>
            <p className="font-body text-[1.3vw] text-muted">Available on iOS</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-[6vh] left-[6vw] right-[6vw] flex justify-between items-center">
        <p className="font-body text-[1.2vw] text-muted/60">Confidential — Comt@cts, Inc. 2026</p>
        <p className="font-body text-[1.2vw] text-muted/60">What's your Comt@ct?</p>
      </div>
    </div>
  );
}
