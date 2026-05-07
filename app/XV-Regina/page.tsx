import type { Metadata } from "next";
import Petals from "@/components/invitaciones/Petals";
import MusicPlayer from "@/components/invitaciones/MusicPlayer";
import CalendarioCountdown from "@/components/invitaciones/CalendarioCountdown";
import Collage from "@/components/invitaciones/Collage";
import Venue from "@/components/invitaciones/Venue";
import Tira from "@/components/invitaciones/Tira";
import RSVP from "@/components/invitaciones/RSVP";
import Footer from "@/components/invitaciones/Footer";
import ScrollReveal from "@/components/invitaciones/ScrollReveal";
import ScrollHint from "@/components/invitaciones/ScrollHint";
import { images } from "@/lib/regina-images";

export const metadata: Metadata = {
  title: "XV Años – Regina 🎀",
  description: "¡Estás invitado a celebrar los XV años de Regina! 23 de Mayo 2026 · Limmon · San Juan del Río",
};

export default function XVRegina() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#fdf0f3]">
      <Petals />

      {/* 1. INTRO — imagen completa sin cortar */}
      <section className="w-full leading-none relative">
        <img src={images.intro} alt="Invitación XV años Regina" className="w-full h-auto block" />
        {/* Flecha scroll hint */}
        <ScrollHint />
      </section>

      {/* 2. MÚSICA */}
      <MusicPlayer src={images.musica} youtubeId="7kzPMz7bSGo" />

      {/* 3. CALENDARIO + COUNTDOWN */}
      <CalendarioCountdown eventDate="2026-05-23T16:00:00" />

      {/* 4. COLLAGE */}
      <Collage src={images.collage} />

      {/* 5. LUGAR DEL EVENTO */}
      <Venue
        src={images.restaurante}
        nombre="Limmon"
        direccion="Paso de los Guzmán 12, Centro, San Juan del Río, Qro."
        fecha="Sábado 23 de Mayo, 2026"
        hora="4:00 pm"
        mapsUrl="https://maps.google.com/?q=Limmon+Paso+de+los+Guzman+12+Centro+76800+San+Juan+del+Rio+Qro"
      />

      {/* 6. TIRA FOTOGRÁFICA */}
      <Tira src={images.tira} />

      {/* 7. RSVP */}
      <RSVP
        src={images.flamingo}
        whatsapp="524272199374"
        mensaje="Hola Liz Barrón, te escribo referente a mi asistencia/inasistencia a la fiesta de Regina 🎀 Mi nombre es: "
      />

      <Footer />
      <ScrollReveal />
    </main>
  );
}
