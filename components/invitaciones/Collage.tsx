"use client";
// Por ahora usa la imagen del collage como estática
// En V2 con Cloudinary será un slideshow real con múltiples fotos
interface Props { src: string; }

export default function Collage({ src }: Props) {
  return (
    <section className="w-full leading-none reveal">
      <img src={src} alt="Fotos de Regina" className="w-full h-auto block" />
    </section>
  );
}
