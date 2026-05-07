import RSVPForm from "./RSVPForm";

interface Props { src: string; }

export default function RSVPWithForm({ src }: Props) {
  return (
    <section className="flex flex-col items-center px-8 py-12 gap-7 text-center reveal"
      style={{ background: "linear-gradient(160deg, #fff0f4 0%, #fde8ed 60%, #f9d6e0 100%)" }}>

      {/* Flamingo */}
      <div className="relative flex justify-center">
        <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ background: "#d4718a", transform: "scale(0.7) translateY(20%)" }} />
        <img src={src} alt="Flamingo"
          className="relative w-[55vw] max-w-[240px] h-auto drop-shadow-xl soft-pulse" />
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-3 max-w-sm">
        <p className="font-dancing text-[7vw] text-[#c0486a] leading-snug">
          ¡Me haría muy feliz<br />que vinieras!
        </p>
        <p className="font-lato text-[3.8vw] text-[#6b4a52] leading-relaxed">
          Tu presencia hará que mi cumpleaños sea aún más especial.
          Espero compartir risas, momentos lindos y celebrar juntos este día. 🎀
        </p>
      </div>

      {/* Separador */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-[1px] bg-[#f0b8c8]" />
        <span className="text-[5vw] text-[#e8a0b0]">🌸</span>
        <div className="flex-1 h-[1px] bg-[#f0b8c8]" />
      </div>

      {/* Formulario */}
      <RSVPForm />

    </section>
  );
}
