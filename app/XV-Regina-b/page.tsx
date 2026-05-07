import type { Metadata } from "next";
import Petals from "@/components/invitaciones/Petals";
import MusicPlayer from "@/components/invitaciones/MusicPlayer";
import CalendarioCountdown from "@/components/invitaciones/CalendarioCountdown";
import Fotos from "@/components/invitaciones/Fotos";
import DressCode from "@/components/invitaciones/DressCode";
import Venue from "@/components/invitaciones/Venue";
import RSVPWithForm from "@/components/invitaciones/RSVPWithForm";
import Footer from "@/components/invitaciones/Footer";
import ScrollReveal from "@/components/invitaciones/ScrollReveal";
import ScrollHint from "@/components/invitaciones/ScrollHint";
import { images } from "@/lib/regina-images";

export const metadata: Metadata = {
  title: "XV Años – Regina 🎀",
  description: "¡Estás invitado a celebrar los XV años de Regina! 6 de Junio 2026",
};

function Divider() {
  return (
    <div className="w-full py-3 flex items-center justify-center gap-2"
      style={{ background: "#fdf0f3" }}>
      <div className="flex-1 h-[1px] max-w-[60px]"
        style={{ background: "linear-gradient(to right, transparent, #f0b8c8)" }} />
      <span style={{ color: "#e8a0b0", fontSize: "3vw" }}>✦ ✧ ✦</span>
      <div className="flex-1 h-[1px] max-w-[60px]"
        style={{ background: "linear-gradient(to left, transparent, #f0b8c8)" }} />
    </div>
  );
}

export default function XVReginaB() {
  return (
    <main className="relative w-full overflow-x-hidden" style={{ background: "#fdf0f3" }}>
      <Petals />

      {/* 1. INTRO */}
      <section className="w-full leading-none relative">
        <img src={images.intro} alt="Invitación XV años Regina" className="w-full h-auto block" />
        <ScrollHint />
      </section>

      {/* 2. MÚSICA */}
      <section className="w-full" style={{ background: "#fff8fa", paddingBottom: "8vw" }}>
        <MusicPlayer src={images.musica} />
      </section>

      <Divider />

      {/* 3. CALENDARIO + COUNTDOWN */}
      <CalendarioCountdown eventDate="2026-06-06T16:00:00" />

      <Divider />

      {/* 4. FOTOS */}
      <Fotos collage={images.collage} tira={images.tira} />

      <Divider />

      {/* 5. DRESS CODE + LUGAR */}
      <DressCode />
      <Venue porDefinir />

      <Divider />

      {/* 6. RSVP CON FORMULARIO */}
      <RSVPWithForm src={images.flamingo} />

      <Footer />
      <ScrollReveal />
    </main>
  );
}
