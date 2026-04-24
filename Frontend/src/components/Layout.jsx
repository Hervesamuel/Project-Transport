// ============================================
// Layout.jsx — Structure générale de l'application
// Combine : Sidebar (gauche) + Header (haut) + Contenu (centre)
// Toutes les pages passent par ce Layout
// ============================================

import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom"



function Layout({ children }) {
  // children = le contenu de la page active (ex: Dashboard, Véhicules...)

  return (
    // Conteneur global : flex horizontal (sidebar à gauche, reste à droite)
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#0F0F1A",   /* Fond sombre global */
      position: "relative",
      overflow: "hidden",
    }}>

      {/* ---- DÉCORATION DE FOND (effets lumineux) ---- */}

      {/* Blob violet en haut à droite */}
      <div style={{
        position: "fixed",
        top: "-120px",
        right: "-80px",
        width: "400px",
        height: "400px",
        background: "radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 70%)",
        pointerEvents: "none", /* Ne bloque pas les clics */
        zIndex: 0,
      }} />

      {/* Blob vert en bas à gauche (derrière le contenu) */}
      <div style={{
        position: "fixed",
        bottom: "-100px",
        left: "220px",
        width: "350px",
        height: "350px",
        background: "radial-gradient(circle, rgba(0,201,167,0.10) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* ---- SIDEBAR FIXE À GAUCHE ---- */}
      <Sidebar />

      {/* ---- ZONE PRINCIPALE (header + contenu) ---- */}
      {/* marginLeft: 240px pour ne pas être caché derrière la sidebar fixe */}
      <div style={{
        flex: 1,
        marginLeft: "240px",    /* Exactement la largeur de la Sidebar */
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,              /* Au-dessus des blobs de fond */
      }}>

        {/* Header collé en haut */}
        <Header />

        {/* Contenu de la page active */}
        {/* children est injecté par AppRouter selon la route */}
        <main style={{ padding: "28px", flex: 1 }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
export default Layout;
