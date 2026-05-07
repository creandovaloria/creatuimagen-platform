"use client";
import { useEffect, useRef, useState } from "react";

interface Props { src: string; youtubeId: string; }

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function MusicPlayer({ src, youtubeId }: Props) {
  const playerRef = useRef<any>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Crear el div del player dinámicamente
    const container = iframeContainerRef.current;
    if (!container) return;

    const playerDiv = document.createElement("div");
    playerDiv.id = "yt-player-regina";
    container.appendChild(playerDiv);

    function createPlayer() {
      playerRef.current = new window.YT.Player("yt-player-regina", {
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          playsinline: 1,
          rel: 0,
          modestbranding: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: onStateChange,
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      // Cargar el script si no está
      if (!document.getElementById("yt-api-script")) {
        const tag = document.createElement("script");
        tag.id = "yt-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [youtubeId]);

  function onStateChange(e: any) {
    const isPlaying = e.data === 1; // YT.PlayerState.PLAYING = 1
    setPlaying(isPlaying);
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (!playerRef.current?.getDuration) return;
        const pct = (playerRef.current.getCurrentTime() / playerRef.current.getDuration()) * 100;
        if (progressRef.current) progressRef.current.style.width = `${pct}%`;
      }, 500);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }

  function toggle() {
    if (!ready || !playerRef.current) return;
    const state = playerRef.current.getPlayerState();
    if (state === 1) {
      // Playing → pause
      playerRef.current.pauseVideo();
    } else {
      // Paused/stopped → play
      playerRef.current.playVideo();
    }
  }

  return (
    <section
      className="relative w-full leading-none select-none"
      style={{ cursor: "pointer" }}
    >
      {/* Imagen del reproductor */}
      <img
        src={src}
        alt="Dale play a mi canción favorita"
        className="w-full h-auto block"
        onClick={toggle}
      />

      {/* Zona de click centrada sobre el triángulo de play */}
      <div
        onClick={toggle}
        className="absolute rounded-full z-20"
        style={{
          top: "44%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "26vw",
          height: "26vw",
          maxWidth: "110px",
          maxHeight: "110px",
          cursor: "pointer",
        }}
      />

      {/* Ecualizador animado cuando suena */}
      {playing && (
        <div
          className="absolute left-1/2 -translate-x-1/2 flex gap-[3px] items-end pointer-events-none"
          style={{ bottom: "10%" }}
        >
          {[6, 14, 8, 16, 6].map((h, i) => (
            <div
              key={i}
              className="eq-bar rounded-sm bg-[#d4718a]"
              style={{
                width: 3,
                height: h,
                animationDelay: `${i * 0.15}s`,
                animationDuration: "0.8s",
              }}
            />
          ))}
        </div>
      )}

      {/* Barra de progreso */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden transition-opacity duration-300"
        style={{ height: 3, background: "rgba(212,113,138,0.15)", opacity: playing ? 1 : 0 }}
      >
        <div
          ref={progressRef}
          className="h-full transition-all duration-500"
          style={{ width: "0%", background: "linear-gradient(90deg, #d4718a, #f0b8c8)" }}
        />
      </div>

      {/* Indicador "no listo aún" */}
      {!ready && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ background: "rgba(0,0,0,0)" }}
        />
      )}

      {/* Contenedor del iframe de YouTube — completamente oculto */}
      <div
        ref={iframeContainerRef}
        style={{
          position: "absolute",
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      />
    </section>
  );
}
