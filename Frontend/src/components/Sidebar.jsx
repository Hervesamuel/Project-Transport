// components/Sidebar.jsx
// Menu latéral — s'adapte au thème sombre/clair

import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Sidebar() {
  const location       = useLocation();
  const { t, settings } = useApp();

  // ✅ Couleurs selon le thème
  const isDark   = settings.theme === "dark";
  const bgSide   = isDark ? "linear-gradient(180deg,#1A1A2E 0%,#16213E 100%)" : "linear-gradient(180deg,#1E293B 0%,#0F172A 100%)";
  const textMuted= isDark ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.7)";

  const navItems = [
    { label: t.dashboard,    icon: "⊞", path: "/"            },
    { label: t.chauffeurs,   icon: "👤", path: "/chauffeurs"  },
    { label: t.vehicules,    icon: "🚌", path: "/vehicules"   },
    { label: t.reservations, icon: "🎫", path: "/reservations"},
    { label: t.parametres,   icon: "⚙️", path: "/parametres" },
  ];

  return (
    <aside style={{
      width: "240px", minWidth: "240px",
      background: bgSide,
      borderRight: "1px solid rgba(108,99,255,0.15)",
      display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, bottom: 0,
      zIndex: 20,
      boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
      transition: "background 0.3s ease",
    }}>

      {/* LOGO */}
      <div style={{ padding: "28px 24px 20px", borderBottom: "1px solid rgba(108,99,255,0.12)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "38px", height: "38px",
            background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: "bold", color: "#fff",
            boxShadow: "0 4px 14px rgba(108,99,255,0.4)",
          }}>N</div>
          <div>
            <div style={{ fontWeight: "800", fontSize: "16px", color: "#fff" }}>Nexa</div>
            <div style={{ fontSize: "11px", color: "#6C63FF", fontWeight: "600", letterSpacing: "1.5px", textTransform: "uppercase" }}>
              Transport
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
        <div style={{
          fontSize: "10px", color: "rgba(255,255,255,0.3)",
          fontWeight: "700", letterSpacing: "1.5px",
          textTransform: "uppercase", padding: "0 12px", marginBottom: "8px",
        }}>
          Menu principal
        </div>

        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "11px 14px", borderRadius: "10px", marginBottom: "2px",
              fontWeight: isActive ? "700" : "500", fontSize: "14px",
              color: isActive ? "#6C63FF" : textMuted,
              background: isActive
                ? "linear-gradient(90deg,rgba(108,99,255,0.25),rgba(108,99,255,0.05))"
                : "transparent",
              borderLeft: isActive ? "3px solid #6C63FF" : "3px solid transparent",
              transition: "all 0.2s ease", textDecoration: "none",
            }}>
              <span style={{ fontSize: "16px", opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
              {item.label}
              {isActive && (
                <div style={{
                  marginLeft: "auto", width: "6px", height: "6px",
                  background: "#6C63FF", borderRadius: "50%",
                  boxShadow: "0 0 6px #6C63FF",
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* PIED */}
      <div style={{
        padding: "16px 24px",
        borderTop: "1px solid rgba(108,99,255,0.12)",
        fontSize: "12px", color: "rgba(255,255,255,0.3)",
      }}>
        v1.0.0 • Madagascar 🇲🇬
      </div>
    </aside>
  );
}

export default Sidebar;