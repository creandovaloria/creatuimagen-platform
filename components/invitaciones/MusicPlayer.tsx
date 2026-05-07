"use client";
import { useEffect, useRef, useState } from "react";

interface Props { src: string; youtubeId: string; }

declare global {
  interface Window { YT: any; onYouTubeIframeAPIReady: () => void; }
}

export default function MusicPlayer({ src, youtubeId }: Props) {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (window.YT) { initPlayer(); return; }
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = initPlayer;
  }, []);

  function initPlayer() {
    playerRef.current = new window.YT.Player("yt-iframe", {
      videoId: youtubeId,
      playerVars: { autoplay: 0, controls: 0, playsinline: 1, rel: 0, modestbranding: 1 },
      events: { onStateChange: onState },
    });
  }

  function onState(e: any) {
    const isPlaying = e.data === window.YT?.PlayerState?.PLAYING;
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
    if (!playerRef.current?.getPlayerState) return;
    playerRef.current.getPlayerState() === window.YT.PlayerState.PLAYING
      ? playerRef.current.pauseVideo()
      : playerRef.current.playVideo();
  }

  return (
    <section className="relative w-full leading-none cursor-pointer select-none" onClick={toggle}>
      <img src={src} alt="Dale play a mi canción favorita" className="w-full h-auto block" />

      {/* Zona click sobre el triángulo */}
      <div
        className="absolute rounded-full z-10"
        style={{ top: "44%", left: "50%", transform: "translate(-50%,-50%)", width: "26vw", height: "26vw", maxWidth: 110, maxHeight: 110 }}
      />

      {/* Ecualizador */}
      {playing && (
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex gap-[3px] items-end h-[18px]">
          {[6,14,8,16,6].map((h, i) => (
            <div
              key={i}
              className="eq-bar w-[3px] rounded-sm bg-[#d4718a]"
              style={{ height: h, animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
            />
          ))}
        </div>
      )}

      {/* Barra de progreso */}
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] bg-pink-100 overflow-hidden transition-opacity ${playing ? "opacity-100" : "opacity-0"}`}>
        <div ref={progressRef} className="h-full bg-gradient-to-r from-[#d4718a] to-[#f0b8c8] w-0 transition-all duration-500" />
      </div>

      {/* YouTube iframe oculto */}
      <div className="absolute -top-[9999px] -left-[9999px] w-px h-px opacity-0 pointer-events-none">
        <div id="yt-iframe" />
      </div>
    </section>
  );
}
