// components/Header.jsx
// Barre de navigation supérieure
// S'adapte au thème sombre/clair

import { useApp } from "../context/AppContext";

function Header() {
  const { settings } = useApp();
  const isDark = settings.theme === "dark";

  return (
    <header style={{
      background: isDark ? "rgba(15,15,26,0.85)" : "rgba(255,255,255,0.9)",
      backdropFilter: "blur(16px)",
      borderBottom: isDark
        ? "1px solid rgba(108,99,255,0.1)"
        : "1px solid rgba(0,0,0,0.08)",
      padding: "0 28px", height: "68px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 5,
      transition: "background 0.3s ease",
    }}>

      {/* Titre */}
      <div>
        <div style={{ fontWeight: "800", fontSize: "18px", color: isDark ? "#fff" : "#1A1A2E" }}>
          Nexa Transport MG
        </div>
      </div>

      {/* Droite : recherche + notif + profil */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

        {/* Recherche */}
        <div style={{
          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
          borderRadius: "10px", padding: "8px 14px",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", fontSize: "13px" }}>🔍</span>
          <input placeholder="Rechercher..." style={{
            background: "none", border: "none", outline: "none",
            color: isDark ? "#fff" : "#1A1A2E",
            fontSize: "13px", width: "140px", fontFamily: "inherit",
          }} />
        </div>

        {/* Notification */}
        <div style={{ position: "relative" }}>
          <button style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
            borderRadius: "10px", width: "40px", height: "40px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "17px", cursor: "pointer",
          }}>🔔</button>
          <div style={{
            position: "absolute", top: "6px", right: "6px",
            width: "8px", height: "8px",
            background: "#FF6B6B", borderRadius: "50%",
            border: `1.5px solid ${isDark ? "#0F0F1A" : "#fff"}`,
          }} />
        </div>

        {/* Profil Admin */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px",
          background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
          border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
          borderRadius: "10px", padding: "6px 12px 6px 6px", cursor: "pointer",
        }}>
          <div style={{
            width: "30px", height: "30px",
            background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
            borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: "800", color: "#fff",
          }}>A</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: isDark ? "#fff" : "#1A1A2E" }}>Admin</div>
            <div style={{ fontSize: "10px", color: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)" }}>Super Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;