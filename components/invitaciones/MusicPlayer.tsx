"use client";
import { useEffect, useRef, useState } from "react";

interface Props { src: string; }

const SC_TRACK = "https://soundcloud.com/wearebigbeat/icona-pop-i-love-it-feat-charli-xcx";
const SC_EMBED = `https://w.soundcloud.com/player/?url=${encodeURIComponent(SC_TRACK)}&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;

declare global {
  interface Window { SC: any; }
}

export default function MusicPlayer({ src }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Cargar SoundCloud Widget SDK
    if (!document.getElementById("sc-sdk")) {
      const script = document.createElement("script");
      script.id = "sc-sdk";
      script.src = "https://w.soundcloud.com/player/api.js";
      script.onload = initWidget;
      document.head.appendChild(script);
    } else if (window.SC) {
      initWidget();
    }
  }, []);

  function initWidget() {
    if (!iframeRef.current || !window.SC) return;
    widgetRef.current = window.SC.Widget(iframeRef.current);
    widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
      setReady(true);
    });
    widgetRef.current.bind(window.SC.Widget.Events.PLAY, () => setPlaying(true));
    widgetRef.current.bind(window.SC.Widget.Events.PAUSE, () => setPlaying(false));
    widgetRef.current.bind(window.SC.Widget.Events.FINISH, () => setPlaying(false));
  }

  function toggle() {
    if (!ready || !widgetRef.current) return;
    if (playing) {
      widgetRef.current.pause();
    } else {
      widgetRef.current.play();
    }
  }

  return (
    <section
      className="relative w-full leading-none select-none"
      style={{ cursor: "pointer" }}
      onClick={toggle}
    >
      <img
        src={src}
        alt="Dale play a mi canción favorita"
        className="w-full h-auto block"
      />

      {/* Zona click sobre triángulo */}
      <div
        className="absolute rounded-full z-20"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "26vw", height: "26vw",
          maxWidth: 110, maxHeight: 110,
        }}
      />

      {/* Ecualizador animado */}
      {playing && (
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-[3px] items-end z-10 pointer-events-none"
          style={{ bottom: "10%" }}>
          {[6, 14, 8, 16, 6].map((h, i) => (
            <div key={i} className="eq-bar rounded-sm bg-[#d4718a]"
              style={{ width: 3, height: h, animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }} />
          ))}
        </div>
      )}

      {/* Barra progreso */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden transition-opacity duration-300"
        style={{ height: 3, background: "rgba(212,113,138,.15)", opacity: playing ? 1 : 0 }}>
        <div className="h-full"
          style={{ width: playing ? "60%" : "0%", background: "linear-gradient(90deg,#d4718a,#f0b8c8)", transition: "width 0.5s" }} />
      </div>

      {/* Indicador cargando */}
      {!ready && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="font-lato text-[2.5vw] text-[#d4718a] opacity-50">♪ cargando...</span>
        </div>
      )}

      {/* SoundCloud iframe */}
      <iframe
        ref={iframeRef}
        src={SC_EMBED}
        style={{ position: "absolute", top: -9999, left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
        allow="autoplay"
        title="music-player"
      />
    </section>
  );
}
