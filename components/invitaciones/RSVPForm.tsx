"use client";
import { useState } from "react";

type Estado = "idle" | "loading" | "success" | "duplicate" | "error";

export default function RSVPForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [asiste, setAsiste] = useState<boolean | null>(null);
  const [numPersonas, setNumPersonas] = useState(1);
  const [restricciones, setRestricciones] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState<Estado>("idle");
  const [respuesta, setRespuesta] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (asiste === null) return;
    setEstado("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre, telefono, asiste,
          num_personas: asiste ? numPersonas : 0,
          restricciones: restricciones || null,
          mensaje_regina: mensaje || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRespuesta(data);
      setEstado(data.action === "updated" ? "duplicate" : "success");
    } catch (err: any) {
      setEstado("error");
    }
  }

  // ── Pantalla de éxito ──
  if (estado === "success") return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="text-[15vw]">🎀</span>
      <p className="font-dancing text-[8vw] text-[#c0486a]">¡Confirmado!</p>
      <p className="font-lato text-[4vw] text-[#6b4a52] max-w-xs leading-relaxed">
        Gracias <strong>{nombre}</strong>, ya tienes tu lugar reservado.<br />
        ¡Te esperamos el 6 de junio! 💕
      </p>
    </div>
  );

  if (estado === "duplicate") return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="text-[15vw]">✅</span>
      <p className="font-dancing text-[7vw] text-[#c0486a]">Ya tienes registro</p>
      <p className="font-lato text-[4vw] text-[#6b4a52] max-w-xs leading-relaxed">
        Actualizamos tu confirmación, <strong>{nombre}</strong>.<br />
        ¡Nos vemos el 6 de junio! 🎉
      </p>
    </div>
  );

  // ── Formulario ──
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-4">

      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label className="font-lato text-[3.5vw] text-[#b5566e] font-bold tracking-wide uppercase">
          Tu nombre completo *
        </label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="María García"
          required
          className="w-full rounded-2xl px-4 py-3 font-lato text-[4vw] text-[#2a1a1f] border-2 border-[#f0b8c8] outline-none focus:border-[#d4718a] bg-white"
        />
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1">
        <label className="font-lato text-[3.5vw] text-[#b5566e] font-bold tracking-wide uppercase">
          Tu teléfono (WhatsApp) *
        </label>
        <input
          type="tel"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          placeholder="4271234567"
          required
          className="w-full rounded-2xl px-4 py-3 font-lato text-[4vw] text-[#2a1a1f] border-2 border-[#f0b8c8] outline-none focus:border-[#d4718a] bg-white"
        />
      </div>

      {/* ¿Asiste? */}
      <div className="flex flex-col gap-2">
        <label className="font-lato text-[3.5vw] text-[#b5566e] font-bold tracking-wide uppercase">
          ¿Asistirás? *
        </label>
        <div className="flex gap-3">
          <button type="button" onClick={() => setAsiste(true)}
            className="flex-1 py-3 rounded-2xl font-lato font-bold text-[4vw] border-2 transition-all"
            style={{
              background: asiste === true ? "#c0486a" : "white",
              color: asiste === true ? "white" : "#c0486a",
              borderColor: "#d4718a",
            }}>
            🎉 ¡Sí voy!
          </button>
          <button type="button" onClick={() => setAsiste(false)}
            className="flex-1 py-3 rounded-2xl font-lato font-bold text-[4vw] border-2 transition-all"
            style={{
              background: asiste === false ? "#6b4a52" : "white",
              color: asiste === false ? "white" : "#6b4a52",
              borderColor: "#c4a0a8",
            }}>
            😔 No puedo
          </button>
        </div>
      </div>

      {/* Número de personas — solo si asiste */}
      {asiste === true && (
        <>
          <div className="flex flex-col gap-1">
            <label className="font-lato text-[3.5vw] text-[#b5566e] font-bold tracking-wide uppercase">
              ¿Cuántos asistirán contigo?
            </label>
            <div className="flex items-center gap-4 bg-white border-2 border-[#f0b8c8] rounded-2xl px-4 py-3">
              <button type="button"
                onClick={() => setNumPersonas(Math.max(1, numPersonas - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[5vw] text-[#c0486a]"
                style={{ background: "#fde8ed" }}>−</button>
              <span className="flex-1 text-center font-playfair text-[6vw] font-bold text-[#c0486a]">
                {numPersonas}
              </span>
              <button type="button"
                onClick={() => setNumPersonas(Math.min(10, numPersonas + 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[5vw] text-[#c0486a]"
                style={{ background: "#fde8ed" }}>+</button>
            </div>
            <p className="font-lato text-[3vw] text-[#b5566e] opacity-70 text-center">
              Inclúyete a ti
            </p>
          </div>

          {/* Restricciones */}
          <div className="flex flex-col gap-1">
            <label className="font-lato text-[3.5vw] text-[#b5566e] font-bold tracking-wide uppercase">
              Restricciones alimentarias
            </label>
            <input
              type="text"
              value={restricciones}
              onChange={e => setRestricciones(e.target.value)}
              placeholder="Ej: vegetariana, sin gluten..."
              className="w-full rounded-2xl px-4 py-3 font-lato text-[4vw] text-[#2a1a1f] border-2 border-[#f0b8c8] outline-none focus:border-[#d4718a] bg-white"
            />
          </div>

          {/* Mensaje para Regina */}
          <div className="flex flex-col gap-1">
            <label className="font-lato text-[3.5vw] text-[#b5566e] font-bold tracking-wide uppercase">
              Mensaje para Regina 💕
            </label>
            <textarea
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
              placeholder="Escríbele algo bonito..."
              rows={3}
              className="w-full rounded-2xl px-4 py-3 font-lato text-[4vw] text-[#2a1a1f] border-2 border-[#f0b8c8] outline-none focus:border-[#d4718a] bg-white resize-none"
            />
          </div>
        </>
      )}

      {/* Error */}
      {estado === "error" && (
        <p className="font-lato text-[3.5vw] text-red-500 text-center">
          Ocurrió un error. Intenta de nuevo.
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={estado === "loading" || asiste === null}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          borderRadius: "20px",
          padding: "20px 24px",
          background: asiste === null ? "#e0b0ba" : "linear-gradient(135deg, #c0486a 0%, #d4718a 100%)",
          color: "white",
          fontFamily: "var(--font-lato), sans-serif",
          fontSize: "4.5vw",
          fontWeight: "700",
          letterSpacing: "2px",
          textTransform: "uppercase",
          border: "none",
          cursor: asiste === null ? "not-allowed" : "pointer",
          boxShadow: asiste === null ? "none" : "0 8px 30px rgba(192,72,106,0.45)",
        }}
      >
        {estado === "loading" ? "Guardando..." : "✅ Confirmar"}
      </button>
    </form>
  );
}
