"use client";
import { useEffect, useRef, useState } from "react";

interface Props { src: string; youtubeId: string; }

declare global {
  interface Window { YT: any; onYouTubeIframeAPIReady: () => void; }
}

export default function MusicPlayer({ src, youtubeId }: Props) {
  const playerRef = useRef<any>(null);
  const playerTargetRef = useRef<HTMLDivElement>(null); // ref directo como target
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    function createPlayer() {
      if (!playerTargetRef.current) return;
      playerRef.current = new window.YT.Player(playerTargetRef.current, {
        videoId: youtubeId,
        width: "1",
        height: "1",
        playerVars: {
          autoplay: 0,
          controls: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            console.log("YT Player ready ✅");
            setReady(true);
          },
          onStateChange: onStateChange,
          onError: (e: any) => console.error("YT Error:", e.data),
        },
      });
    }

    function loadAPI() {
      if (window.YT && window.YT.Player) {
        createPlayer();
        return;
      }
      if (!document.getElementById("yt-api-script")) {
        const tag = document.createElement("script");
        tag.id = "yt-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    // Pequeño delay para asegurar que el DOM esté montado
    const timer = setTimeout(loadAPI, 300);
    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [youtubeId]);

  function onStateChange(e: any) {
    const isPlaying = e.data === 1;
    setPlaying(isPlaying);
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        try {
          const pct = (playerRef.current.getCurrentTime() / playerRef.current.getDuration()) * 100;
          if (progressRef.current) progressRef.current.style.width = `${pct}%`;
        } catch {}
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }

  function toggle() {
    if (!ready || !playerRef.current) {
      console.warn("Player no listo aún");
      return;
    }
    try {
      const state = playerRef.current.getPlayerState();
      if (state === 1) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (e) {
      console.error("Toggle error:", e);
    }
  }

  return (
    <section className="relative w-full leading-none select-none" onClick={toggle} style={{ cursor: "pointer" }}>
      <img src={src} alt="Dale play a mi canción favorita" className="w-full h-auto block" />

      {/* Zona click sobre triángulo */}
      <div className="absolute rounded-full z-20"
        style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "26vw", height: "26vw", maxWidth: 110, maxHeight: 110 }}
      />

      {/* Ecualizador */}
      {playing && (
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-[3px] items-end z-10 pointer-events-none" style={{ bottom: "10%" }}>
          {[6, 14, 8, 16, 6].map((h, i) => (
            <div key={i} className="eq-bar rounded-sm bg-[#d4718a]"
              style={{ width: 3, height: h, animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }} />
          ))}
        </div>
      )}

      {/* Progreso */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden transition-opacity duration-300"
        style={{ height: 3, background: "rgba(212,113,138,.15)", opacity: playing ? 1 : 0 }}>
        <div ref={progressRef} className="h-full transition-all duration-500"
          style={{ width: "0%", background: "linear-gradient(90deg,#d4718a,#f0b8c8)" }} />
      </div>

      {/* Indicador ready */}
      {!ready && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="font-lato text-[2.5vw] text-[#d4718a] opacity-50">♪ cargando...</span>
        </div>
      )}

      {/* TARGET del player — ref directo, sin ID */}
      <div
        ref={playerTargetRef}
        style={{ position: "absolute", top: -9999, left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />
    </section>
  );
}
