// ============================================
// Sidebar.jsx — Menu latéral de navigation
// Contient : logo Nexa + liens vers toutes les pages
// Utilise react-router-dom pour la navigation
// ============================================
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
// useLocation : permet de savoir sur quelle page on est
// pour mettre en évidence le lien actif

// Liste des éléments du menu
// On centralise ici pour faciliter les modifications futures
const navItems = [
  { label: "Dashboard",    icon: "⊞", path: "/" },
  { label: "Chauffeurs",  icon: "👤", path: "/chauffeurs" },
  { label: "Véhicules",   icon: "🚌", path: "/vehicules" },
  { label: "Voyageurs",icon: "👨‍🦼‍➡️", path: "/voyageurs" },
  { label: "Réservations",icon: "🎫", path: "/reservations" },
  { label: "Paramètres",  icon: "⚙️", path: "/parametres" },
];

function Sidebar() {
  // Récupère l'URL actuelle (ex: "/vehicules")
  const location = useLocation();

  return (
    // Conteneur principal de la sidebar
    <aside style={{
      width: "240px",
      minWidth: "240px",          /* Ne rétrécit jamais */
      background: "linear-gradient(180deg, #1A1A2E 0%, #16213E 100%)", /* Dégradé sombre */
      borderRight: "1px solid rgba(108, 99, 255, 0.15)", /* Bordure violette subtile */
      display: "flex",
      flexDirection: "column",
      position: "fixed",          /* Fixée : ne scroll pas avec le contenu */
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 20,                 /* Au-dessus de tout */
      boxShadow: "4px 0 24px rgba(0,0,0,0.4)", /* Ombre portée vers la droite */
    }}>

      {/* ---- LOGO / EN-TÊTE ---- */}
      <div style={{
        padding: "28px 24px 20px",
        borderBottom: "1px solid rgba(108, 99, 255, 0.12)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

          {/* Carré avec la lettre N (logo simplifié) */}
          <div style={{
            width: "38px",
            height: "38px",
            background: "linear-gradient(135deg, #6C63FF, #00C9A7)", /* Dégradé violet → vert */
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bold",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(108, 99, 255, 0.4)", /* Lueur violette */
          }}>
            N
          </div>

          {/* Texte du logo */}
          <div>
            <div style={{ fontWeight: "800", fontSize: "16px", color: "#fff" }}>
              Nexa
            </div>
            <div style={{
              fontSize: "11px",
              color: "#6C63FF",
              fontWeight: "600",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}>
              Transport
            </div>
          </div>

        </div>
      </div>

      {/* ---- NAVIGATION ---- */}
      <nav style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>

        {/* Petit label au-dessus du menu */}
        <div style={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.3)",
          fontWeight: "700",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          padding: "0 12px",
          marginBottom: "8px",
        }}>
          Menu principal
        </div>

        {/* Boucle sur les éléments du menu */}
        {navItems.map((item) => {
          // Vérifie si ce lien est la page active
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "11px 14px",
                borderRadius: "10px",
                marginBottom: "2px",
                fontWeight: isActive ? "700" : "500",
                fontSize: "14px",
                color: isActive ? "#6C63FF" : "rgba(255,255,255,0.55)",

                /* Fond coloré uniquement sur le lien actif */
                background: isActive
                  ? "linear-gradient(90deg, rgba(108,99,255,0.25), rgba(108,99,255,0.05))"
                  : "transparent",

                /* Barre verticale gauche sur le lien actif */
                borderLeft: isActive
                  ? "3px solid #6C63FF"
                  : "3px solid transparent",

                transition: "all 0.2s ease", /* Animation fluide */
              }}
            >
              {/* Icône du menu */}
              <span style={{ fontSize: "16px", opacity: isActive ? 1 : 0.7 }}>
                {item.icon}
              </span>

              {/* Nom de la page */}
              {item.label}

              {/* Petit point lumineux sur le lien actif */}
              {isActive && (
                <div style={{
                  marginLeft: "auto",
                  width: "6px",
                  height: "6px",
                  background: "#6C63FF",
                  borderRadius: "50%",
                  boxShadow: "0 0 6px #6C63FF", /* Effet néon */
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ---- PIED DE SIDEBAR ---- */}
      <div style={{
        padding: "16px 24px",
        borderTop: "1px solid rgba(108, 99, 255, 0.12)",
        fontSize: "12px",
        color: "rgba(255,255,255,0.3)",
      }}>
        v1.0.0 • Madagascar 🇲🇬
      </div>

    </aside>
  );
}

export default Sidebar;
