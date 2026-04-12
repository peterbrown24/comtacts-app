export default function Platform() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0A1628 0%, #0E1E38 100%)" }} />
      <div className="absolute left-[6vw] top-[8vh]">
        <div className="w-[4vw] h-[0.3vh] bg-accent mb-[2vh]" />
        <p className="font-body text-[1.4vw] font-semibold text-accent tracking-widest uppercase">
          The Platform
        </p>
      </div>
      <div className="absolute left-[6vw] top-[17vh] max-w-[88vw]">
        <h2 className="font-display text-[3.8vw] font-bold text-text leading-tight tracking-tight">
          Introducing Comt@cts
        </h2>
        <p className="font-body text-[1.6vw] text-muted mt-[1.5vh]">
          A complete business communication hub with AES-256-GCM encryption built into every feature.
        </p>
      </div>
      <div className="absolute left-[6vw] top-[36vh] flex gap-[2vw]">
        <div className="w-[26vw] rounded-[0.8vw] p-[2.5vw]" style={{ background: "rgba(0,95,190,0.06)", border: "1px solid rgba(0,95,190,0.12)" }}>
          <div className="w-[3vw] h-[3vw] rounded-[0.6vw] bg-primary/20 flex items-center justify-center mb-[1.5vh]">
            <span className="font-display text-[1.4vw] font-bold text-primary">CH</span>
          </div>
          <p className="font-display text-[1.8vw] font-bold text-text">Comch@t</p>
          <p className="font-body text-[1.3vw] text-muted mt-[0.8vh] leading-relaxed">Encrypted 1-on-1 and group messaging with read receipts</p>
        </div>
        <div className="w-[26vw] rounded-[0.8vw] p-[2.5vw]" style={{ background: "rgba(0,95,190,0.06)", border: "1px solid rgba(0,95,190,0.12)" }}>
          <div className="w-[3vw] h-[3vw] rounded-[0.6vw] bg-primary/20 flex items-center justify-center mb-[1.5vh]">
            <span className="font-display text-[1.4vw] font-bold text-primary">CT</span>
          </div>
          <p className="font-display text-[1.8vw] font-bold text-text">Comch@tter</p>
          <p className="font-body text-[1.3vw] text-muted mt-[0.8vh] leading-relaxed">Push-to-talk voice notes and walkie-talkie communication</p>
        </div>
        <div className="w-[26vw] rounded-[0.8vw] p-[2.5vw]" style={{ background: "rgba(0,95,190,0.06)", border: "1px solid rgba(0,95,190,0.12)" }}>
          <div className="w-[3vw] h-[3vw] rounded-[0.6vw] bg-accent/20 flex items-center justify-center mb-[1.5vh]">
            <span className="font-display text-[1.4vw] font-bold text-accent">F2</span>
          </div>
          <p className="font-display text-[1.8vw] font-bold text-text">F@ce2F@ce</p>
          <p className="font-body text-[1.3vw] text-muted mt-[0.8vh] leading-relaxed">Encrypted 1-on-1 video calling for private conversations</p>
        </div>
      </div>
      <div className="absolute left-[6vw] top-[62vh] flex gap-[2vw]">
        <div className="w-[26vw] rounded-[0.8vw] p-[2.5vw]" style={{ background: "rgba(65,105,225,0.06)", border: "1px solid rgba(65,105,225,0.12)" }}>
          <div className="w-[3vw] h-[3vw] rounded-[0.6vw] bg-accent/20 flex items-center justify-center mb-[1.5vh]">
            <span className="font-display text-[1.4vw] font-bold text-accent">FG</span>
          </div>
          <p className="font-display text-[1.8vw] font-bold text-text">F@ceGroup</p>
          <p className="font-body text-[1.3vw] text-muted mt-[0.8vh] leading-relaxed">Group video conferencing for team collaboration</p>
        </div>
        <div className="w-[26vw] rounded-[0.8vw] p-[2.5vw]" style={{ background: "rgba(65,105,225,0.06)", border: "1px solid rgba(65,105,225,0.12)" }}>
          <div className="w-[3vw] h-[3vw] rounded-[0.6vw] bg-accent/20 flex items-center justify-center mb-[1.5vh]">
            <span className="font-display text-[1.4vw] font-bold text-accent">CM</span>
          </div>
          <p className="font-display text-[1.8vw] font-bold text-text">Comer@</p>
          <p className="font-body text-[1.3vw] text-muted mt-[0.8vh] leading-relaxed">Integrated camera for sharing visual updates instantly</p>
        </div>
        <div className="w-[26vw] rounded-[0.8vw] p-[2.5vw]" style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.12)" }}>
          <div className="w-[3vw] h-[3vw] rounded-[0.6vw] flex items-center justify-center mb-[1.5vh]" style={{ background: "rgba(16,185,129,0.2)" }}>
            <span className="font-display text-[1.4vw] font-bold" style={{ color: "#10B981" }}>2W</span>
          </div>
          <p className="font-display text-[1.8vw] font-bold text-text">2W@y</p>
          <p className="font-body text-[1.3vw] text-muted mt-[0.8vh] leading-relaxed">CB radio-style channels with push-to-talk and speakerphone</p>
        </div>
      </div>
      <div className="absolute bottom-[5vh] right-[6vw]">
        <p className="font-body text-[1.3vw] text-muted">Available on iOS — comtacts.ca</p>
      </div>
    </div>
  );
}
