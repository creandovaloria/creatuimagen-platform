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
  description: "¡Estás invitado a celebrar los XV años de Regina! 6 de Junio 2026",
};

export default function XVRegina() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#fdf0f3]">
      <Petals />

      {/* 1. INTRO */}
      <section className="w-full leading-none relative">
        <img src={images.intro} alt="Invitación XV años Regina" className="w-full h-auto block" />
        <ScrollHint />
      </section>

      {/* 2. MÚSICA */}
      <MusicPlayer src={images.musica} youtubeId="7kzPMz7bSGo" />

      {/* 3. CALENDARIO + COUNTDOWN */}
      <CalendarioCountdown eventDate="2026-06-06T16:00:00" />

      {/* 4. COLLAGE */}
      <Collage src={images.collage} />

      {/* 5. LUGAR — por definir */}
      <Venue porDefinir />

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
