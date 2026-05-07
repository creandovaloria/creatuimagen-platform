interface Props {
  src: string;
  whatsapp: string;
  mensaje: string;
}

export default function RSVP({ src, whatsapp, mensaje }: Props) {
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <section className="bg-gradient-to-b from-[#fff5f7] to-[#fde8ed] flex flex-col items-center px-8 py-10 gap-6 text-center reveal">
      <img
        src={src}
        alt="Flamingo"
        className="w-[55%] max-w-[220px] h-auto drop-shadow-lg"
      />

      <p className="font-playfair text-[4.8vw] text-[#3a1a22] leading-relaxed max-w-sm">
        ¡Me haría muy feliz que vinieras a mi fiesta!<br /><br />
        Tu presencia haría que mi cumpleaños sea aún más especial.<br /><br />
        Espero poder compartir risas, momentos lindos y celebrar juntos este día. 🎀
      </p>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#b5566e] text-white rounded-full px-10 py-4 font-lato text-[4vw] font-bold tracking-widest uppercase shadow-lg"
      >
        🎉 Confirmar Asistencia
      </a>
    </section>
  );
}
