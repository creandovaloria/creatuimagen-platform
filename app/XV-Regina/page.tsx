import type { Metadata } from "next";
import Petals from "@/components/invitaciones/Petals";
import Intro from "@/components/invitaciones/Intro";
import MusicPlayer from "@/components/invitaciones/MusicPlayer";
import CalendarioCountdown from "@/components/invitaciones/CalendarioCountdown";
import Collage from "@/components/invitaciones/Collage";
import Venue from "@/components/invitaciones/Venue";
import Tira from "@/components/invitaciones/Tira";
import RSVP from "@/components/invitaciones/RSVP";
import Footer from "@/components/invitaciones/Footer";
import ScrollReveal from "@/components/invitaciones/ScrollReveal";
import { images } from "@/lib/regina-images";

export const metadata: Metadata = {
  title: "XV Años – Regina 🎀",
  description: "¡Estás invitado a celebrar los XV años de Regina! 23 de Mayo 2026 · Limmon · San Juan del Río",
  openGraph: {
    title: "XV Años – Regina 🎀",
    description: "¡Estás invitado a celebrar los XV años de Regina!",
    type: "website",
  },
};

export default function XVRegina() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#fdf0f3]">
      {/* Pétalos cayendo — fixed, sobre todo */}
      <Petals />

      {/* 1. Intro */}
      <Intro src={images.intro} />

      {/* 2. Música */}
      <MusicPlayer
        src={images.musica}
        youtubeId="7kzPMz7bSGo"
      />

      {/* 3. Calendario + Countdown */}
      <CalendarioCountdown eventDate="2026-05-23T16:00:00" />

      {/* 4. Collage Slideshow */}
      <Collage src={images.collage} />

      {/* 5. Lugar del evento */}
      <Venue
        src={images.restaurante}
        nombre="Limmon"
        direccion="Paso de los Guzmán 12, Centro, San Juan del Río, Qro."
        fecha="Sábado 23 de Mayo, 2026"
        hora="4:00 pm"
        mapsUrl="https://maps.google.com/?q=Limmon+Paso+de+los+Guzman+12+Centro+76800+San+Juan+del+Rio+Qro"
      />

      {/* 6. Tira fotográfica */}
      <Tira src={images.tira} />

      {/* 7. Mensaje + Flamingo + RSVP */}
      <RSVP
        src={images.flamingo}
        whatsapp="524272199374"
        mensaje="Hola Liz Barrón, te escribo referente a mi asistencia/inasistencia a la fiesta de Regina 🎀 Mi nombre es: "
      />

      {/* Footer branding */}
      <Footer />
    <ScrollReveal />
    </main>
  );
}
