"use client";
import { useEffect, useState } from "react";

interface Props { eventDate: string; }

const DAYS = ["D","L","M","M","J","V","S"];

// Junio 2026: empieza el lunes
const JUN_2026 = [
  null,1,2,3,4,5,6,
  7,8,9,10,11,12,13,
  14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,
  28,29,30,null,null,null,null,
];

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function CalendarioCountdown({ eventDate }: Props) {
  const [time, setTime] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const target = new Date(eventDate).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return;
      setTime({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor(diff % 86400000 / 3600000)),
        m: pad(Math.floor(diff % 3600000 / 60000)),
        s: pad(Math.floor(diff % 60000 / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [eventDate]);

  return (
    <section className="bg-[#fdf6f0] flex flex-col items-center px-6 py-12 gap-6">

      {/* Mes */}
      <span className="font-dancing text-[14vw] text-[#d4718a] leading-none">Junio</span>

      {/* Calendario */}
      <div className="grid grid-cols-7 w-full max-w-xs text-center">
        {DAYS.map((d, i) => (
          <span key={i} className="font-lato text-[3vw] font-bold text-[#2a1a1f] pb-3 tracking-wide">{d}</span>
        ))}
        {JUN_2026.map((day, i) => (
          <span key={i} className={`font-lato text-[4vw] py-2 font-light ${
            !day ? "text-transparent" :
            day === 6 ? "font-bold text-[#c0486a]" : "text-[#2a1a1f]"
          }`}>
            {day === 6 ? (
              <span className="inline-flex items-center justify-center w-[8vw] h-[8vw] max-w-[32px] max-h-[32px] border-2 border-[#d4718a] rounded-full">6</span>
            ) : (day ?? "")}
          </span>
        ))}
      </div>

      {/* Destellos */}
      <div className="flex justify-center gap-3 text-[4.5vw] text-[#e8a0b0]">✦ ✧ ✦ ✧ ✦</div>

      {/* Texto superior countdown */}
      <p className="font-dancing text-[6vw] text-[#c0486a] text-center leading-snug">
        ¡Falta muy poco!
      </p>

      {/* Arco decorativo */}
      <div className="w-[55%] h-3 border-t border-l border-r border-[#f0b8c8] rounded-t-full -mb-1" />

      {/* Countdown */}
      <div className="flex items-center gap-[1.5vw] bg-white border-2 border-[#f0b8c8] rounded-full px-6 py-4 shadow-md w-full max-w-xs justify-center">
        {[
          { val: time.d, lbl: "DÍAS" },
          { sep: "·" },
          { val: time.h, lbl: "HORAS" },
          { sep: "·" },
          { val: time.m, lbl: "MIN" },
          { sep: "·" },
          { val: time.s, lbl: "SEG" },
        ].map((item, i) =>
          "sep" in item ? (
            <span key={i} className="font-playfair text-[8vw] text-[#e8b0c0] mb-2 leading-none">{item.sep}</span>
          ) : (
            <div key={i} className="flex flex-col items-center min-w-[11vw]">
              <span className="font-playfair text-[10vw] font-bold text-[#c0486a] leading-none">{item.val}</span>
              <span className="font-lato text-[1.8vw] tracking-widest text-[#d4718a] uppercase mt-0.5 font-bold">{item.lbl}</span>
            </div>
          )
        )}
      </div>

      {/* Texto inferior countdown */}
      <p className="font-dancing text-[5.5vw] text-[#d4718a] text-center leading-snug max-w-xs">
        para vivir juntos este momento<br />tan especial 💕
      </p>

    </section>
  );
}
