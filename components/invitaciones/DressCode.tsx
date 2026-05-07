export default function DressCode() {
  return (
    <section className="bg-[#fdf0f3] flex flex-col items-center px-6 py-12 gap-6 text-center reveal">

      {/* Título */}
      <div className="flex flex-col items-center gap-1">
        <span className="font-dancing text-[10vw] text-[#c0486a] leading-none">
          Dress Code
        </span>
        <span className="font-lato text-[3.5vw] tracking-[4px] text-[#6b4a52] uppercase">
          Coctel
        </span>
      </div>

      {/* Separador */}
      <div className="w-16 h-[1px] bg-[#f0b8c8]" />

      {/* Íconos vestimenta */}
      <div className="flex items-end justify-center gap-8">
        {/* Vestido */}
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 80 120" className="w-[18vw] max-w-[70px]" fill="#c0486a">
            <path d="M30 0 L20 30 L5 25 L15 120 L65 120 L75 25 L60 30 L50 0 Z
                     M35 0 L45 0 L50 18 L40 22 L30 18 Z"/>
          </svg>
          <span className="font-lato text-[2.8vw] text-[#6b4a52] tracking-wide uppercase">Damas</span>
        </div>

        {/* Corazón central */}
        <span className="text-[6vw] text-[#f0b8c8] mb-6">♡</span>

        {/* Traje */}
        <div className="flex flex-col items-center gap-2">
          <svg viewBox="0 0 80 120" className="w-[18vw] max-w-[70px]" fill="#2a1a1f">
            <path d="M25 0 L20 20 L5 15 L5 120 L35 120 L35 55 L45 55 L45 120 L75 120 L75 15 L60 20 L55 0 
                     M30 0 L40 15 L50 0 L50 50 L30 50 Z"/>
          </svg>
          <span className="font-lato text-[2.8vw] text-[#6b4a52] tracking-wide uppercase">Caballeros</span>
        </div>
      </div>

      {/* Separador */}
      <div className="w-16 h-[1px] bg-[#f0b8c8]" />

      {/* Color a evitar */}
      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <span className="font-lato text-[3.5vw] tracking-[3px] text-[#6b4a52] uppercase font-bold">
          Color reservado para la quinceañera
        </span>
        <span className="font-lato text-[3vw] text-[#b5566e] tracking-wide">
          Favor de evitarlo
        </span>

        {/* Muestra de color rosa */}
        <div className="flex items-center gap-3 bg-white border border-[#f0b8c8] rounded-full px-6 py-3 shadow-sm">
          <div className="w-[8vw] h-[8vw] max-w-[32px] max-h-[32px] rounded-full border-2 border-white shadow"
            style={{ background: "#d4718a" }} />
          <span className="font-lato text-[3.5vw] text-[#6b4a52]">Rosa</span>
          <span className="text-[4vw]">🚫</span>
        </div>
      </div>

    </section>
  );
}
