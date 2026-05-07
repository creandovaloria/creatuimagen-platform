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
import { images } from "@/lib/regina-images";

export const metadata: Metadata = {
  title: "XV Años – Regina 🎀",
  description: "¡Estás invitado a celebrar los XV años de Regina! 23 de Mayo 2026 · Limmon · San Juan del Río",
};

export default function XVRegina() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#fdf0f3]">
      <Petals />

      {/* ── HERO: intro + música en 100vh, ambas completas ── */}
      <section
        className="w-full flex flex-col"
        style={{ height: "100svh" }}
      >
        {/* Intro: ocupa 58% del alto */}
        <div className="w-full overflow-hidden" style={{ flex: "0 0 58%" }}>
          <img
            src={images.intro}
            alt="Invitación XV años Regina"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Música: ocupa 42% del alto */}
        <div className="w-full overflow-hidden" style={{ flex: "0 0 42%" }}>
          <MusicPlayer
            src={images.musica}
            youtubeId="7kzPMz7bSGo"
          />
        </div>
      </section>

      {/* ── RESTO DE LA INVITACIÓN ── */}
      <CalendarioCountdown eventDate="2026-05-23T16:00:00" />
      <Collage src={images.collage} />
      <Venue
        src={images.restaurante}
        nombre="Limmon"
        direccion="Paso de los Guzmán 12, Centro, San Juan del Río, Qro."
        fecha="Sábado 23 de Mayo, 2026"
        hora="4:00 pm"
        mapsUrl="https://maps.google.com/?q=Limmon+Paso+de+los+Guzman+12+Centro+76800+San+Juan+del+Rio+Qro"
      />
      <Tira src={images.tira} />
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
