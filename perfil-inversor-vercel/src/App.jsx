import { useState, useRef } from "react";

const QUESTIONS = [
  {
    id: 1,
    text: "Tengo planificado empezar a retirar dinero de mis inversiones en...",
    options: [
      { label: "Menos de 1 año", points: 0 },
      { label: "1 – 2 años", points: 1 },
      { label: "3 – 5 años", points: 4 },
      { label: "6 – 10 años", points: 7 },
      { label: "11 – 15 años", points: 12 },
      { label: "Más de 15 años", points: 17 },
    ],
  },
  {
    id: 2,
    text: "Al retirar dinero de estas inversiones, tengo planificado gastarlo en un período de...",
    options: [
      { label: "2 años o menos", points: 0 },
      { label: "3 – 5 años", points: 1 },
      { label: "6 – 10 años", points: 3 },
      { label: "11 – 15 años", points: 5 },
      { label: "Más de 15 años", points: 8 },
    ],
  },
  {
    id: 3,
    text: "Al hacer una inversión a largo plazo, tengo planificado mantener invertido el dinero durante...",
    options: [
      { label: "1 – 2 años", points: 0 },
      { label: "3 – 4 años", points: 1 },
      { label: "5 – 6 años", points: 3 },
      { label: "7 – 8 años", points: 5 },
      { label: "Más de 8 años", points: 7 },
    ],
  },
  {
    id: 4,
    text: "Si tuviera una inversión en acciones que perdiera 31% de su valor en tres meses, yo habría...",
    options: [
      { label: "Vendido toda la inversión restante", points: 1 },
      { label: "Vendido una parte de la inversión restante", points: 3 },
      { label: "Conservado la inversión y no habría vendido nada", points: 5 },
      { label: "Comprado más de la inversión", points: 6 },
    ],
  },
  {
    id: 5,
    text: "Generalmente prefiero una inversión que tenga pocas o ninguna caída o subida en valor y estoy dispuesto a aceptar los rendimientos más bajos.",
    options: [
      { label: "Estoy en total desacuerdo", points: 6 },
      { label: "Estoy en desacuerdo", points: 5 },
      { label: "Estoy un poco de acuerdo", points: 3 },
      { label: "Estoy de acuerdo", points: 1 },
      { label: "Estoy totalmente de acuerdo", points: 0 },
    ],
  },
  {
    id: 6,
    text: "Cuando el mercado baja tiendo a vender algunas de mis inversiones con más riesgo y poner el dinero en inversiones más seguras.",
    options: [
      { label: "Estoy en total desacuerdo", points: 5 },
      { label: "Estoy en desacuerdo", points: 4 },
      { label: "Estoy un poco de acuerdo", points: 3 },
      { label: "Estoy de acuerdo", points: 2 },
      { label: "Estoy totalmente de acuerdo", points: 1 },
    ],
  },
  {
    id: 7,
    text: "Yo invertiría en un Fondo Común de Inversión basado únicamente en una breve conversación con un amigo, compañero de trabajo o pariente.",
    options: [
      { label: "Estoy en total desacuerdo", points: 5 },
      { label: "Estoy en desacuerdo", points: 4 },
      { label: "Estoy un poco de acuerdo", points: 3 },
      { label: "Estoy de acuerdo", points: 2 },
      { label: "Estoy totalmente de acuerdo", points: 1 },
    ],
  },
  {
    id: 8,
    text: "Si tuviera una inversión en bonos que perdiera casi 4% de su valor en dos meses, yo habría...",
    options: [
      { label: "Vendido toda la inversión restante", points: 1 },
      { label: "Vendido una parte de la inversión restante", points: 3 },
      { label: "Conservado la inversión y no habría vendido nada", points: 5 },
      { label: "Comprado más de la inversión", points: 6 },
    ],
  },
  {
    id: 9,
    text: "El siguiente gráfico muestra la mayor ganancia y la mayor pérdida posible en un año para tres inversiones hipotéticas de $10.000. ¿En cuál invertirías?",
    hasChart: true,
    options: [
      { label: "Inversión A", points: 1 },
      { label: "Inversión B", points: 3 },
      { label: "Inversión C", points: 5 },
    ],
  },
  {
    id: 10,
    text: "Mis fuentes de ingresos actuales y futuras (salario, jubilación, pensión) son...",
    options: [
      { label: "Muy inestables", points: 1 },
      { label: "Inestables", points: 2 },
      { label: "Algo estables", points: 3 },
      { label: "Estables", points: 4 },
      { label: "Muy estables", points: 5 },
    ],
  },
  {
    id: 11,
    text: "Cuando se refiere a invertir en Fondos Comunes de Inversión, acciones o bonos, me describiría a mí mismo como...",
    options: [
      { label: "Muy inexperto", points: 1 },
      { label: "Algo inexperto", points: 2 },
      { label: "Algo experimentado", points: 3 },
      { label: "Experimentado", points: 4 },
      { label: "Muy experimentado", points: 5 },
    ],
  },
];

const PROFILES = [
  { min: 0, max: 22, name: "Conservador — Ingresos", stocks: 0, bonds: 100, color: "#1e40af", desc: "Enfoque en preservación de capital y generación de ingresos estables. Portafolio 100% en bonos y renta fija." },
  { min: 23, max: 28, name: "Conservador — Moderado", stocks: 20, bonds: 80, color: "#1d4ed8", desc: "Pequeña exposición a acciones para crecimiento moderado, con base sólida en bonos." },
  { min: 29, max: 35, name: "Moderado — Conservador", stocks: 30, bonds: 70, color: "#2563eb", desc: "Combinación que prioriza estabilidad con algo de crecimiento." },
  { min: 36, max: 41, name: "Equilibrado", stocks: 40, bonds: 60, color: "#3b82f6", desc: "Balance entre crecimiento y estabilidad. Apropiado para horizontes de mediano plazo." },
  { min: 42, max: 48, name: "Equilibrado — Crecimiento", stocks: 50, bonds: 50, color: "#0ea5e9", desc: "Mitad acciones, mitad bonos. Busca crecimiento aceptando volatilidad moderada." },
  { min: 49, max: 54, name: "Crecimiento — Moderado", stocks: 60, bonds: 40, color: "#10b981", desc: "Mayor peso en acciones para crecimiento a largo plazo, con colchón de bonos." },
  { min: 55, max: 61, name: "Crecimiento", stocks: 70, bonds: 30, color: "#059669", desc: "Orientado al crecimiento. Acepta volatilidad significativa a cambio de mayores retornos potenciales." },
  { min: 62, max: 68, name: "Crecimiento — Agresivo", stocks: 80, bonds: 20, color: "#f59e0b", desc: "Alta exposición a acciones. Para inversores con horizonte largo y alta tolerancia al riesgo." },
  { min: 69, max: 75, name: "Agresivo", stocks: 100, bonds: 0, color: "#ef4444", desc: "100% acciones. Máximo potencial de crecimiento con máxima volatilidad. Solo para horizontes muy largos." },
];

const getProfile = (score) => PROFILES.find(p => score >= p.min && score <= p.max) || PROFILES[0];

// ── Chart for Q9 ──
const InvestmentChart = () => {
  const data = [
    { label: "A", gain: 593, loss: -164, color: "#3b82f6" },
    { label: "B", gain: 1921, loss: -1020, color: "#f59e0b" },
    { label: "C", gain: 4229, loss: -3639, color: "#ef4444" },
  ];
  const maxVal = 4500;
  const W = 420, H = 280, PAD_L = 60, PAD_R = 20, PAD_T = 30, PAD_B = 50;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;
  const zeroY = PAD_T + (maxVal / (maxVal * 2)) * chartH;
  const barGroupW = chartW / 3;
  const barW = 32;

  const scaleY = (v) => PAD_T + ((maxVal - v) / (maxVal * 2)) * chartH;

  const yTicks = [-4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000];

  return (
    <div style={{ background: "#0f172a", borderRadius: 12, padding: "16px 8px", marginBottom: 16, border: "1px solid #1e293b" }}>
      <p style={{ color: "#94a3b8", fontSize: 12, textAlign: "center", margin: "0 0 12px 0", lineHeight: 1.4 }}>
        Mayor ganancia y mayor pérdida posible en un año<br/>
        <span style={{ fontSize: 11, color: "#64748b" }}>sobre una inversión hipotética de $10.000</span>
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, display: "block", margin: "0 auto" }}>
        {/* Y axis ticks */}
        {yTicks.map(v => (
          <g key={v}>
            <line x1={PAD_L} y1={scaleY(v)} x2={W - PAD_R} y2={scaleY(v)} stroke="#1e293b" strokeWidth={1} />
            <text x={PAD_L - 6} y={scaleY(v) + 3} textAnchor="end" fill="#64748b" fontSize={9} fontFamily="sans-serif">
              {v < 0 ? `-$${Math.abs(v).toLocaleString()}` : `$${v.toLocaleString()}`}
            </text>
          </g>
        ))}
        {/* Zero line */}
        <line x1={PAD_L} y1={zeroY} x2={W - PAD_R} y2={zeroY} stroke="#475569" strokeWidth={1.5} />

        {/* Bars */}
        {data.map((d, i) => {
          const cx = PAD_L + barGroupW * i + barGroupW / 2;
          const gainH = Math.abs(scaleY(d.gain) - zeroY);
          const lossH = Math.abs(scaleY(d.loss) - zeroY);
          return (
            <g key={d.label}>
              {/* Gain bar */}
              <rect x={cx - barW / 2 - 2} y={scaleY(d.gain)} width={barW} height={gainH} rx={4} fill={d.color} opacity={0.85} />
              <text x={cx - 2} y={scaleY(d.gain) - 6} textAnchor="middle" fill={d.color} fontSize={10} fontWeight={700} fontFamily="sans-serif">
                +${d.gain.toLocaleString()}
              </text>
              {/* Loss bar */}
              <rect x={cx - barW / 2 + 2} y={zeroY} width={barW} height={lossH} rx={4} fill={d.color} opacity={0.45} />
              <text x={cx + 2} y={scaleY(d.loss) + 14} textAnchor="middle" fill={d.color} fontSize={10} fontWeight={700} fontFamily="sans-serif" opacity={0.8}>
                -${Math.abs(d.loss).toLocaleString()}
              </text>
              {/* Label */}
              <text x={cx} y={H - PAD_B + 20} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight={700} fontFamily="sans-serif">
                {d.label}
              </text>
              <text x={cx} y={H - PAD_B + 34} textAnchor="middle" fill="#64748b" fontSize={9} fontFamily="sans-serif">
                {d.label === "A" ? "Bajo riesgo" : d.label === "B" ? "Riesgo moderado" : "Alto riesgo"}
              </text>
            </g>
          );
        })}
      </svg>
      <p style={{ color: "#475569", fontSize: 10, textAlign: "center", margin: "8px 0 0 0", fontStyle: "italic" }}>
        Los rangos son hipotéticos y están diseñados para medir tu tolerancia al riesgo.
      </p>
    </div>
  );
};

export default function InvestorQuestionnaire() {
  const [step, setStep] = useState("intro"); // intro | questions | name | result | sent
  const [answers, setAnswers] = useState({});
  const [currentQ, setCurrentQ] = useState(0);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientBirth, setClientBirth] = useState("");
  const [sending, setSending] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://script.google.com/macros/s/AKfycby0uwX3aFejtJlP1yFxw6i8qVoHrSBXaH3a9KSgSE3Xt3yuf_MBnPISudLojiXuLtOs/exec");
  const [configMode, setConfigMode] = useState(false);
  const containerRef = useRef(null);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const profile = getProfile(totalScore);
  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  const handleAnswer = (qId, points) => {
    setAnswers(prev => ({ ...prev, [qId]: points }));
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) setCurrentQ(currentQ + 1);
      else setStep("name");
    }, 300);
  };

  const sendToSheets = async () => {
    if (!webhookUrl) { setStep("result"); return; }
    setSending(true);
    try {
      const data = {
        timestamp: new Date().toISOString(),
        nombre: clientName,
        email: clientEmail,
        celular: clientPhone,
        fecha_nacimiento: clientBirth,
        puntaje: totalScore,
        perfil: profile.name,
        acciones_pct: profile.stocks,
        bonos_pct: profile.bonds,
        ...Object.fromEntries(QUESTIONS.map((q, i) => [`p${i + 1}`, answers[q.id] ?? ""])),
        respuestas_texto: QUESTIONS.map((q) => {
          const pts = answers[q.id];
          const opt = q.options.find(o => o.points === pts);
          return opt ? opt.label : "";
        }).join(" | "),
      };
      await fetch(webhookUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setStep("sent");
    } catch (e) { console.error(e); setStep("result"); }
    setSending(false);
  };

  const font = "'Playfair Display', Georgia, serif";
  const bodyFont = "'DM Sans', 'Segoe UI', sans-serif";
  const inputStyle = { width: "100%", padding: "12px 16px", fontSize: 15, background: "#0f172a", color: "#f8fafc", border: "1px solid #334155", borderRadius: 8, fontFamily: bodyFont, marginBottom: 16, boxSizing: "border-box" };

  // ── INTRO ──
  if (step === "intro") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: bodyFont, padding: 20 }}>
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          <div style={{ width: 80, height: 80, margin: "0 auto 24px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>📊</div>
          <h1 style={{ fontFamily: font, fontSize: 36, fontWeight: 700, color: "#f8fafc", marginBottom: 12, lineHeight: 1.2 }}>Perfil de Inversor</h1>
          <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
            Este cuestionario te ayudará a determinar tu perfil de riesgo y la asignación de activos
            más adecuada para tus objetivos financieros.
          </p>
          <p style={{ color: "#64748b", fontSize: 13, marginBottom: 32 }}>11 preguntas · 3 minutos</p>
          <button onClick={() => setStep("questions")}
            style={{ padding: "16px 48px", fontSize: 16, fontWeight: 600, fontFamily: bodyFont, background: "linear-gradient(135deg, #3b82f6, #2563eb)", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", boxShadow: "0 4px 24px rgba(59,130,246,0.4)", transition: "transform 0.15s" }}
            onMouseEnter={e => e.target.style.transform = "scale(1.03)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          >Comenzar</button>
        </div>
      </div>
    );
  }

  // ── QUESTIONS ──
  if (step === "questions") {
    const q = QUESTIONS[currentQ];
    return (
      <div ref={containerRef} style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", fontFamily: bodyFont, padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: 600, marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: "#64748b", fontSize: 12 }}>Pregunta {currentQ + 1} de {QUESTIONS.length}</span>
            <span style={{ color: "#64748b", fontSize: 12 }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 4, background: "#1e293b", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #3b82f6, #10b981)", borderRadius: 2, transition: "width 0.4s ease" }} />
          </div>
        </div>
        <div style={{ maxWidth: 600, width: "100%", animation: "fadeIn 0.3s ease" }}>
          <h2 style={{ fontFamily: font, fontSize: 24, fontWeight: 600, color: "#f8fafc", marginBottom: 12, lineHeight: 1.3 }}>{q.text}</h2>
          {q.hasChart && <InvestmentChart />}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: q.hasChart ? 8 : 20 }}>
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === opt.points;
              return (
                <button key={i} onClick={() => handleAnswer(q.id, opt.points)}
                  style={{
                    padding: "14px 20px", fontSize: 15, fontFamily: bodyFont, textAlign: "left",
                    background: selected ? "linear-gradient(135deg, #1e3a5f, #1e4d40)" : "#0f172a",
                    color: selected ? "#f8fafc" : "#cbd5e1",
                    border: `1px solid ${selected ? "#3b82f6" : "#1e293b"}`,
                    borderRadius: 10, cursor: "pointer", transition: "all 0.15s",
                    boxShadow: selected ? "0 0 0 2px rgba(59,130,246,0.3)" : "none",
                  }}
                  onMouseEnter={e => { if (!selected) { e.target.style.background = "#1e293b"; e.target.style.borderColor = "#334155"; } }}
                  onMouseLeave={e => { if (!selected) { e.target.style.background = "#0f172a"; e.target.style.borderColor = "#1e293b"; } }}
                >
                  <span style={{ color: "#3b82f6", fontWeight: 700, marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
            <button onClick={() => currentQ > 0 && setCurrentQ(currentQ - 1)} disabled={currentQ === 0}
              style={{ padding: "8px 20px", fontSize: 13, background: "transparent", color: currentQ === 0 ? "#334155" : "#94a3b8", border: "1px solid #1e293b", borderRadius: 8, cursor: currentQ === 0 ? "default" : "pointer", fontFamily: bodyFont }}>← Anterior</button>
            {Object.keys(answers).length === QUESTIONS.length && (
              <button onClick={() => setStep("name")}
                style={{ padding: "8px 24px", fontSize: 13, background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontFamily: bodyFont }}>Ver resultado →</button>
            )}
          </div>
        </div>
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }

  // ── NAME/DATA INPUT ──
  if (step === "name") {
    const canSubmit = clientName.trim() && clientEmail.trim() && clientPhone.trim() && clientBirth;
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", fontFamily: bodyFont, padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 480, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <h2 style={{ fontFamily: font, fontSize: 28, color: "#f8fafc", marginBottom: 8 }}>¡Cuestionario completado!</h2>
          <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 32 }}>Ingresá tus datos para ver tu resultado personalizado.</p>
          <div style={{ textAlign: "left" }}>
            <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 4 }}>Nombre completo *</label>
            <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Juan Pérez" style={inputStyle} />

            <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 4 }}>Fecha de nacimiento *</label>
            <input value={clientBirth} onChange={e => setClientBirth(e.target.value)} type="date" style={inputStyle} />

            <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 4 }}>Celular *</label>
            <input value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="+54 9 11 1234-5678" type="tel" style={inputStyle} />

            <label style={{ color: "#94a3b8", fontSize: 12, display: "block", marginBottom: 4 }}>Email *</label>
            <input value={clientEmail} onChange={e => setClientEmail(e.target.value)} placeholder="email@ejemplo.com" type="email" style={inputStyle} />
          </div>
          <button
            onClick={() => { if (canSubmit) { if (webhookUrl) sendToSheets(); else setStep("result"); } }}
            disabled={!canSubmit}
            style={{ padding: "14px 40px", fontSize: 16, fontWeight: 600, fontFamily: bodyFont, background: canSubmit ? "linear-gradient(135deg, #3b82f6, #2563eb)" : "#334155", color: "#fff", border: "none", borderRadius: 10, cursor: canSubmit ? "pointer" : "default", boxShadow: canSubmit ? "0 4px 20px rgba(59,130,246,0.3)" : "none" }}
          >{sending ? "Enviando..." : "Ver mi perfil de inversor"}</button>
        </div>
      </div>
    );
  }

  // ── RESULT ──
  const showResult = step === "result" || step === "sent";
  if (showResult) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)", fontFamily: bodyFont, padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ maxWidth: 560, width: "100%", animation: "fadeIn 0.5s ease" }}>
          {step === "sent" && (
            <div style={{ background: "#064e3b", border: "1px solid #10b981", borderRadius: 8, padding: "10px 16px", marginBottom: 16, fontSize: 13, color: "#6ee7b7", textAlign: "center" }}>
              ✅ Resultado guardado exitosamente
            </div>
          )}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 4 }}>Resultado para</p>
            <h2 style={{ fontFamily: font, fontSize: 28, color: "#f8fafc", margin: "0 0 4px 0" }}>{clientName}</h2>
            {clientEmail && <p style={{ color: "#475569", fontSize: 12 }}>{clientEmail}</p>}
          </div>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 100, height: 100, borderRadius: "50%", border: `3px solid ${profile.color}`, background: "#0f172a" }}>
              <div>
                <div style={{ fontSize: 32, fontWeight: 800, color: profile.color, fontFamily: font }}>{totalScore}</div>
                <div style={{ fontSize: 10, color: "#64748b" }}>puntos</div>
              </div>
            </div>
          </div>
          <div style={{ background: "#0f172a", border: `2px solid ${profile.color}`, borderRadius: 16, padding: 28, marginBottom: 24 }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: profile.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Tu perfil</div>
              <h3 style={{ fontFamily: font, fontSize: 26, color: "#f8fafc", margin: 0 }}>{profile.name}</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>{profile.desc}</p>
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8, fontWeight: 600 }}>ASIGNACIÓN SUGERIDA</div>
              <div style={{ height: 40, borderRadius: 8, overflow: "hidden", display: "flex" }}>
                {profile.stocks > 0 && (
                  <div style={{ width: `${profile.stocks}%`, background: "linear-gradient(135deg, #3b82f6, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", transition: "width 0.6s ease" }}>
                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{profile.stocks}% Acciones</span>
                  </div>
                )}
                {profile.bonds > 0 && (
                  <div style={{ width: `${profile.bonds}%`, background: "linear-gradient(135deg, #10b981, #059669)", display: "flex", alignItems: "center", justifyContent: "center", transition: "width 0.6s ease" }}>
                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{profile.bonds}% Bonos</span>
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 24 }}>
              <div style={{ background: "#1e293b", borderRadius: 8, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#3b82f6", fontFamily: font }}>{profile.stocks}%</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Acciones / Renta Variable</div>
              </div>
              <div style={{ background: "#1e293b", borderRadius: 8, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#10b981", fontFamily: font }}>{profile.bonds}%</div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Bonos / Renta Fija</div>
              </div>
            </div>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <p style={{ color: "#64748b", fontSize: 11, lineHeight: 1.5, margin: 0 }}>
              <strong style={{ color: "#94a3b8" }}>Aviso:</strong> Este cuestionario es una herramienta orientativa.
              No constituye asesoramiento financiero personalizado. La asignación sugerida es un punto de partida
              que tu asesor financiero adaptará a tu situación particular, considerando tus otros activos, situación
              impositiva y objetivos específicos.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#475569", fontSize: 10 }}>
              Puntaje: {totalScore}/75 · {new Date().toLocaleDateString("es-AR")}
            </p>
          </div>
          <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
      </div>
    );
  }
  return null;
}
