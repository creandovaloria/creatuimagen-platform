export default function DressCode() {
  return (
    <section className="flex flex-col items-center px-6 py-10 gap-6 text-center reveal"
      style={{ background: "#fff8fa" }}>

      {/* Header */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-dancing text-[12vw] text-[#c0486a] leading-none">
          Dress Code
        </span>
        <div className="flex items-center gap-3 w-full mt-1">
          <div className="flex-1 h-[1px] bg-[#f0b8c8]" />
          <span className="font-lato text-[3vw] tracking-[4px] text-[#b5566e] uppercase">Cóctel Elegante</span>
          <div className="flex-1 h-[1px] bg-[#f0b8c8]" />
        </div>
      </div>

      {/* Card principal */}
      <div className="w-full max-w-xs flex flex-col gap-5">

        {/* Vístete fabuloso */}
        <div className="bg-white rounded-3xl px-6 py-5 shadow-sm border border-[#f5c2d0]">
          <p className="font-playfair text-[5.5vw] text-[#2a1a1f] italic leading-snug">
            "¡Vístete fabuloso<br />y a brillar!"
          </p>
        </div>

        {/* Aviso rosa */}
        <div className="rounded-3xl px-6 py-5 border-2 border-[#f0b8c8]"
          style={{ background: "linear-gradient(135deg, #fde8ed, #fff0f4)" }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[5vw]">🌸</span>
            <p className="font-lato font-bold text-[4vw] text-[#b5566e] tracking-wide uppercase">
              Color reservado
            </p>
            <span className="text-[5vw]">🌸</span>
          </div>
          <p className="font-lato text-[3.8vw] text-[#6b4a52] leading-relaxed">
            El <strong className="text-[#c0486a]">rosa</strong> es exclusivo<br />
            para la quinceañera.<br />
            <span className="font-bold">¡Favor de evitarlo! 🚫</span>
          </p>
        </div>

        {/* Chicas */}
        <div className="bg-white rounded-3xl px-6 py-5 shadow-sm border border-[#f5c2d0] flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-[6vw]">💃</span>
            <span className="font-dancing text-[7vw] text-[#c0486a]">Chicas</span>
          </div>
          <p className="font-lato text-[4vw] text-[#6b4a52] leading-relaxed">
            Vestiditos lindos <strong>midi o cortos</strong>,<br />
            tacones o flats elegantes,<br />
            ¡es momento de brillar! ✨
          </p>
        </div>

        {/* Chicos */}
        <div className="bg-white rounded-3xl px-6 py-5 shadow-sm border border-[#f5c2d0] flex flex-col gap-2">
          <div className="flex items-center gap-2 justify-center">
            <span className="text-[6vw]">🎉</span>
            <span className="font-dancing text-[7vw] text-[#c0486a]">Chicos</span>
          </div>
          <p className="font-lato text-[4vw] text-[#6b4a52] leading-relaxed">
            <strong>Traje oscuro + corbata</strong>,<br />
            o saco con pantalón de vestir,<br />
            ¡listos para la fiesta!
          </p>
        </div>

      </div>
    </section>
  );
}
