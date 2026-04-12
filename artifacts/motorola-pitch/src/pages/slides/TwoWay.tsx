const base = import.meta.env.BASE_URL;

export default function TwoWay() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-bg">
      <img
        src={`${base}device.png`}
        crossOrigin="anonymous"
        alt="PTT device"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.7) 50%, rgba(10,22,40,0.95) 100%)" }} />
      <div className="absolute left-[6vw] top-[8vh]">
        <div className="w-[4vw] h-[0.3vh] mb-[2vh]" style={{ background: "#10B981" }} />
        <p className="font-body text-[1.4vw] font-semibold tracking-widest uppercase" style={{ color: "#10B981" }}>
          The Hardware Opportunity
        </p>
      </div>
      <div className="absolute left-[6vw] top-[18vh] max-w-[50vw]">
        <h2 className="font-display text-[4.2vw] font-bold text-text leading-tight tracking-tight">
          2W@y — CB Radio,
        </h2>
        <h2 className="font-display text-[4.2vw] font-bold leading-tight tracking-tight" style={{ color: "#10B981" }}>
          Reimagined.
        </h2>
        <p className="font-body text-[1.7vw] text-muted mt-[3vh] leading-relaxed max-w-[42vw]">
          Ten open channels. Push-to-talk simplicity. Speakerphone toggle. All encrypted. Now imagine it with a dedicated hardware button.
        </p>
      </div>
      <div className="absolute left-[6vw] top-[58vh] flex gap-[2.5vw]">
        <div className="text-center">
          <div className="w-[12vw] h-[12vw] rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.08)", border: "2px solid rgba(16,185,129,0.2)" }}>
            <span className="font-display text-[4vw] font-extrabold" style={{ color: "#10B981" }}>10</span>
          </div>
          <p className="font-body text-[1.3vw] text-muted mt-[1.5vh]">Open Channels</p>
        </div>
        <div className="text-center">
          <div className="w-[12vw] h-[12vw] rounded-full flex items-center justify-center" style={{ background: "rgba(0,95,190,0.08)", border: "2px solid rgba(0,95,190,0.2)" }}>
            <span className="font-display text-[2vw] font-bold text-primary">PTT</span>
          </div>
          <p className="font-body text-[1.3vw] text-muted mt-[1.5vh]">Push-to-Talk</p>
        </div>
        <div className="text-center">
          <div className="w-[12vw] h-[12vw] rounded-full flex items-center justify-center" style={{ background: "rgba(65,105,225,0.08)", border: "2px solid rgba(65,105,225,0.2)" }}>
            <span className="font-display text-[2vw] font-bold text-accent">AES</span>
          </div>
          <p className="font-body text-[1.3vw] text-muted mt-[1.5vh]">256-GCM Encrypted</p>
        </div>
        <div className="text-center">
          <div className="w-[12vw] h-[12vw] rounded-full flex items-center justify-center" style={{ background: "rgba(16,185,129,0.08)", border: "2px solid rgba(16,185,129,0.2)" }}>
            <span className="font-display text-[1.6vw] font-bold" style={{ color: "#10B981" }}>SPK</span>
          </div>
          <p className="font-body text-[1.3vw] text-muted mt-[1.5vh]">Speakerphone</p>
        </div>
      </div>
      <div className="absolute bottom-[6vh] right-[6vw]">
        <p className="font-body text-[1.3vw] text-muted italic">Software-ready for hardware integration</p>
      </div>
    </div>
  );
}
