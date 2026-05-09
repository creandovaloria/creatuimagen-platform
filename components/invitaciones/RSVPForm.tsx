"use client";
import { useState } from "react";

type Estado = "idle" | "loading" | "success" | "duplicate" | "error";

const inputStyle = {
  width: "100%",
  borderRadius: "16px",
  padding: "14px 16px",
  fontFamily: "var(--font-lato), sans-serif",
  fontSize: "4vw",
  color: "#2a1a1f",
  border: "2px solid #f0b8c8",
  outline: "none",
  background: "white",
};

const labelStyle = {
  fontFamily: "var(--font-lato), sans-serif",
  fontSize: "3.2vw",
  color: "#b5566e",
  fontWeight: "700",
  letterSpacing: "1px",
  textTransform: "uppercase" as const,
};

export default function RSVPForm() {
  const [nombre, setNombre]           = useState("");
  const [telefono, setTelefono]       = useState("");
  const [email, setEmail]             = useState("");
  const [asiste, setAsiste]           = useState<boolean | null>(null);
  const [numPersonas, setNumPersonas] = useState(1);
  const [restricciones, setRestricciones] = useState("");
  const [mensaje, setMensaje]         = useState("");
  const [estado, setEstado]           = useState<Estado>("idle");
  const [respNombre, setRespNombre]   = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (asiste === null) return;
    setEstado("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre, telefono,
          email: email || null,
          asiste,
          num_personas: asiste ? numPersonas : 0,
          restricciones: restricciones || null,
          mensaje_regina: mensaje || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRespNombre(nombre);
      setEstado(data.action === "updated" ? "duplicate" : "success");
    } catch {
      setEstado("error");
    }
  }

  // ── Éxito ──
  if (estado === "success") return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <span style={{ fontSize: "15vw" }}>🎀</span>
      <p className="font-dancing" style={{ fontSize: "8vw", color: "#c0486a" }}>¡Confirmado!</p>
      <p className="font-lato" style={{ fontSize: "4vw", color: "#6b4a52", lineHeight: 1.7, maxWidth: 280 }}>
        Gracias <strong>{respNombre}</strong>,<br />
        ya tienes tu lugar reservado.<br />
        ¡Te esperamos el 6 de junio! 💕
      </p>
    </div>
  );

  if (estado === "duplicate") return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <span style={{ fontSize: "15vw" }}>✅</span>
      <p className="font-dancing" style={{ fontSize: "7vw", color: "#c0486a" }}>Registro actualizado</p>
      <p className="font-lato" style={{ fontSize: "4vw", color: "#6b4a52", lineHeight: 1.7, maxWidth: 280 }}>
        Actualizamos tu confirmación,<br />
        <strong>{respNombre}</strong>.<br />
        ¡Nos vemos el 6 de junio! 🎉
      </p>
    </div>
  );

  // ── Formulario ──
  return (
    <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 320, display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Nombre */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>Tu nombre completo *</label>
        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)}
          placeholder="María García" required style={inputStyle} />
      </div>

      {/* Teléfono */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>Tu WhatsApp *</label>
        <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)}
          placeholder="4271234567" required style={inputStyle} />
      </div>

      {/* Email — opcional */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={labelStyle}>
          Email <span style={{ fontWeight: 400, opacity: 0.7, textTransform: "none", letterSpacing: 0 }}>(opcional)</span>
        </label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="maria@email.com" style={inputStyle} />
        <p style={{ fontFamily: "var(--font-lato)", fontSize: "2.8vw", color: "#b5566e", opacity: 0.7, margin: 0 }}>
          Te enviaremos tu confirmación por correo
        </p>
      </div>

      {/* ¿Asiste? */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={labelStyle}>¿Asistirás? *</label>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { val: true,  label: "🎉 ¡Sí voy!", activeColor: "#c0486a" },
            { val: false, label: "😔 No puedo", activeColor: "#6b4a52" },
          ].map(({ val, label, activeColor }) => (
            <button key={String(val)} type="button" onClick={() => setAsiste(val)}
              style={{
                flex: 1, padding: "14px 8px", borderRadius: 16,
                fontFamily: "var(--font-lato)", fontSize: "4vw", fontWeight: 700,
                border: `2px solid ${asiste === val ? activeColor : "#f0b8c8"}`,
                background: asiste === val ? activeColor : "white",
                color: asiste === val ? "white" : "#6b4a52",
                cursor: "pointer", transition: "all 0.2s",
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Si asiste */}
      {asiste === true && (
        <>
          {/* # Personas */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={labelStyle}>¿Cuántos asistirán contigo?</label>
            <div style={{ display: "flex", alignItems: "center", gap: 16, background: "white", border: "2px solid #f0b8c8", borderRadius: 16, padding: "10px 16px" }}>
              <button type="button" onClick={() => setNumPersonas(Math.max(1, numPersonas - 1))}
                style={{ width: 36, height: 36, borderRadius: "50%", background: "#fde8ed", border: "none", fontSize: "5vw", color: "#c0486a", cursor: "pointer", fontWeight: 700 }}>−</button>
              <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-playfair)", fontSize: "7vw", fontWeight: 700, color: "#c0486a" }}>{numPersonas}</span>
              <button type="button" onClick={() => setNumPersonas(Math.min(10, numPersonas + 1))}
                style={{ width: 36, height: 36, borderRadius: "50%", background: "#fde8ed", border: "none", fontSize: "5vw", color: "#c0486a", cursor: "pointer", fontWeight: 700 }}>+</button>
            </div>
            <p style={{ fontFamily: "var(--font-lato)", fontSize: "2.8vw", color: "#b5566e", opacity: 0.7, margin: 0, textAlign: "center" }}>Inclúyete a ti</p>
          </div>

          {/* Restricciones */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={labelStyle}>
              Restricciones alimentarias <span style={{ fontWeight: 400, opacity: 0.7, textTransform: "none", letterSpacing: 0 }}>(opcional)</span>
            </label>
            <input type="text" value={restricciones} onChange={e => setRestricciones(e.target.value)}
              placeholder="Ej: vegetariana, sin gluten..." style={inputStyle} />
          </div>

          {/* Mensaje */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={labelStyle}>
              Mensaje para Regina 💕 <span style={{ fontWeight: 400, opacity: 0.7, textTransform: "none", letterSpacing: 0 }}>(opcional)</span>
            </label>
            <textarea value={mensaje} onChange={e => setMensaje(e.target.value)}
              placeholder="Escríbele algo bonito..." rows={3}
              style={{ ...inputStyle, resize: "none" }} />
          </div>
        </>
      )}

      {/* Error */}
      {estado === "error" && (
        <p style={{ fontFamily: "var(--font-lato)", fontSize: "3.5vw", color: "#e53e3e", textAlign: "center" }}>
          Ocurrió un error. Por favor intenta de nuevo.
        </p>
      )}

      {/* Submit */}
      <button type="submit" disabled={estado === "loading" || asiste === null}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          width: "100%", borderRadius: 20, padding: "20px 24px",
          background: asiste === null ? "#e0b0ba" : "linear-gradient(135deg, #c0486a 0%, #d4718a 100%)",
          color: "white",
          fontFamily: "var(--font-lato), sans-serif",
          fontSize: "4.5vw", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase",
          border: "none",
          cursor: asiste === null ? "not-allowed" : "pointer",
          boxShadow: asiste === null ? "none" : "0 8px 30px rgba(192,72,106,0.45)",
          transition: "all 0.2s",
        }}>
        {estado === "loading" ? "⏳ Guardando..." : "✅ Confirmar Asistencia"}
      </button>

    </form>
  );
}
