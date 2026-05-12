// pages/Parametres.jsx
// Page des paramètres — Mode sombre, Police, Langue

import { useApp } from "../context/AppContext";

function Section({ titre, children, isDark }) {
  return (
    <div style={{
      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
      border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.08)",
      borderRadius: "16px", padding: "24px", marginBottom: "20px",
    }}>
      <h3 style={{
        color: isDark ? "#fff" : "#1A1A2E",
        fontWeight: "700", fontSize: "15px",
        marginBottom: "20px", paddingBottom: "12px",
        borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
      }}>{titre}</h3>
      {children}
    </div>
  );
}

function LigneParam({ label, description, children, isDark }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)",
    }}>
      <div>
        <div style={{ color: isDark ? "#fff" : "#1A1A2E", fontSize: "14px", fontWeight: "600" }}>
          {label}
        </div>
        {description && (
          <div style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", fontSize: "12px", marginTop: "2px" }}>
            {description}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

// Toggle ON/OFF
function Toggle({ actif, onChange }) {
  return (
    <div onClick={onChange} style={{
      width: "48px", height: "26px", borderRadius: "13px",
      background: actif ? "#6C63FF" : "rgba(150,150,150,0.3)",
      cursor: "pointer", position: "relative",
      transition: "background 0.3s ease", flexShrink: 0,
    }}>
      <div style={{
        position: "absolute", top: "3px",
        left: actif ? "25px" : "3px",
        width: "20px", height: "20px",
        borderRadius: "50%", background: "#fff",
        transition: "left 0.3s ease",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
      }} />
    </div>
  );
}

// Boutons de choix
function BoutonChoix({ options, valeur, onChange }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {options.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{
          padding: "7px 14px", borderRadius: "8px",
          border: "none", cursor: "pointer",
          fontSize: "13px", fontWeight: "600",
          background: valeur === opt.value
            ? "linear-gradient(135deg,#6C63FF,#00C9A7)"
            : "rgba(150,150,150,0.2)",
          color: valeur === opt.value ? "#fff" : "rgba(150,150,150,0.8)",
          boxShadow: valeur === opt.value ? "0 4px 12px rgba(108,99,255,0.3)" : "none",
          transition: "all 0.2s",
        }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function Parametres() {
  const { settings, updateSetting } = useApp();
  const isDark = settings.theme === "dark";

  return (
    <div style={{ maxWidth: "720px" }}>

      {/* En-tête */}
      <div style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "900", color: isDark ? "#fff" : "#1A1A2E" }}>
          ⚙️ Paramètres
        </h2>
        <p style={{ fontSize: "13px", color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", marginTop: "4px" }}>
          Personnalisez votre application Nexa Transport
        </p>
      </div>

      {/* APPARENCE */}
      <Section titre="🎨 Apparence" isDark={isDark}>
        <LigneParam label="Mode sombre" description="Activer le fond sombre" isDark={isDark}>
          <Toggle
            actif={isDark}
            onChange={() => updateSetting("theme", isDark ? "light" : "dark")}
          />
        </LigneParam>
        <LigneParam label="Taille de police" description="Taille du texte" isDark={isDark}>
          <BoutonChoix
            valeur={settings.police}
            onChange={(v) => updateSetting("police", v)}
            options={[
              { value: "small",  label: "A"   },
              { value: "medium", label: "AA"  },
              { value: "large",  label: "AAA" },
            ]}
          />
        </LigneParam>
      </Section>

      {/* LANGUE */}
      <Section titre="🌍 Langue" isDark={isDark}>
        <LigneParam label="Langue de l'interface" description="Français ou Malagasy" isDark={isDark}>
          <BoutonChoix
            valeur={settings.langue}
            onChange={(v) => updateSetting("langue", v)}
            options={[
              { value: "fr", label: "🇫🇷 Français" },
              { value: "mg", label: "🇲🇬 Malagasy"  },
            ]}
          />
        </LigneParam>
      </Section>

      {/* APERÇU */}
      <Section titre="👁️ Paramètres actuels" isDark={isDark}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "12px" }}>

          <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.2)" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{isDark ? "🌙" : "☀️"}</div>
            <div style={{ fontSize: "12px", color: "rgba(108,99,255,0.7)", marginBottom: "4px" }}>Thème</div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#6C63FF" }}>
              {isDark ? "Mode sombre" : "Mode clair"}
            </div>
          </div>

          <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(0,201,167,0.1)", border: "1px solid rgba(0,201,167,0.2)" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>🔤</div>
            <div style={{ fontSize: "12px", color: "rgba(0,201,167,0.7)", marginBottom: "4px" }}>Police</div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#00C9A7" }}>
              {settings.police === "small" ? "Petite" : settings.police === "medium" ? "Moyenne" : "Grande"}
            </div>
          </div>

          <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(255,184,48,0.1)", border: "1px solid rgba(255,184,48,0.2)" }}>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>{settings.langue === "fr" ? "🇫🇷" : "🇲🇬"}</div>
            <div style={{ fontSize: "12px", color: "rgba(255,184,48,0.7)", marginBottom: "4px" }}>Langue</div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#FFB830" }}>
              {settings.langue === "fr" ? "Français" : "Malagasy"}
            </div>
          </div>
        </div>
      </Section>

      {/* Réinitialiser */}
      <button
        onClick={() => { updateSetting("theme","dark"); updateSetting("police","medium"); updateSetting("langue","fr"); }}
        style={{
          padding: "12px 24px", borderRadius: "12px",
          border: "1px solid rgba(255,107,107,0.3)",
          background: "rgba(255,107,107,0.1)",
          color: "#FF6B6B", fontSize: "14px",
          fontWeight: "700", cursor: "pointer",
        }}
      >
        🔄 Réinitialiser les paramètres
      </button>
    </div>
  );
}