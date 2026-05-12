// components/Layout.jsx
// Structure générale : Sidebar + Header + Contenu
// S'adapte au thème sombre/clair via AppContext

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header  from "./Header";
import { useApp } from "../context/AppContext";

function Layout() {
  const { settings } = useApp();

  // Couleurs selon le thème
  const isDark  = settings.theme === "dark";
  const bgMain  = isDark ? "#0F0F1A"           : "#F1F5F9";
  const bgBlob1 = isDark ? "rgba(108,99,255,0.18)" : "rgba(108,99,255,0.08)";
  const bgBlob2 = isDark ? "rgba(0,201,167,0.10)"  : "rgba(0,201,167,0.05)";

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: bgMain,
      position: "relative",
      overflow: "hidden",
      transition: "background 0.3s ease",
    }}>

      {/* Blob violet haut droite */}
      <div style={{
        position: "fixed", top: "-120px", right: "-80px",
        width: "400px", height: "400px",
        background: `radial-gradient(circle,${bgBlob1} 0%,transparent 70%)`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Blob vert bas gauche */}
      <div style={{
        position: "fixed", bottom: "-100px", left: "220px",
        width: "350px", height: "350px",
        background: `radial-gradient(circle,${bgBlob2} 0%,transparent 70%)`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Sidebar fixe */}
      <Sidebar />

      {/* Zone principale */}
      <div style={{
        flex: 1,
        marginLeft: "240px",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
      }}>
        <Header />
        <main style={{ padding: "28px", flex: 1 }}>
          {/* Outlet affiche la page active selon la route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;