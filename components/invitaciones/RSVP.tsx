interface Props {
  src: string;
  whatsapp: string;
  mensaje: string;
}

export default function RSVP({ src, whatsapp, mensaje }: Props) {
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <section className="flex flex-col items-center px-8 py-12 gap-7 text-center reveal"
      style={{ background: "linear-gradient(160deg, #fff0f4 0%, #fde8ed 60%, #f9d6e0 100%)" }}>

      {/* Flamingo con glow */}
      <div className="relative flex justify-center">
        <div className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ background: "#d4718a", transform: "scale(0.7) translateY(20%)" }} />
        <img
          src={src}
          alt="Flamingo"
          className="relative w-[55vw] max-w-[240px] h-auto drop-shadow-xl soft-pulse"
        />
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-3 max-w-sm">
        <p className="font-dancing text-[7vw] text-[#c0486a] leading-snug">
          ¡Me haría muy feliz<br />que vinieras!
        </p>
        <p className="font-lato text-[3.8vw] text-[#6b4a52] leading-relaxed">
          Tu presencia haría que mi cumpleaños sea aún más especial.
          Espero compartir risas, momentos lindos y celebrar juntos este día. 🎀
        </p>
      </div>

      {/* Separador decorativo */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-[1px] bg-[#f0b8c8]" />
        <span className="text-[5vw] text-[#e8a0b0]">🌸</span>
        <div className="flex-1 h-[1px] bg-[#f0b8c8]" />
      </div>

      {/* Botón RSVP — claramente un botón */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full max-w-xs flex items-center justify-center gap-3 rounded-2xl py-5 px-6 font-lato font-bold tracking-wider uppercase shadow-xl active:scale-95 transition-transform"
        style={{
          background: "linear-gradient(135deg, #c0486a 0%, #d4718a 100%)",
          color: "white",
          fontSize: "4vw",
          letterSpacing: "2px",
          boxShadow: "0 8px 30px rgba(192,72,106,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <span style={{ fontSize: "5vw" }}>🎉</span>
        Confirmar Asistencia
      </a>

      <p className="font-lato text-[3vw] text-[#b5566e] opacity-70">
        Te redirigirá a WhatsApp con Liz Barrón
      </p>
    </section>
  );
}
