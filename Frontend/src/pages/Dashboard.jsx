// pages/Dashboard.jsx
// Page d'accueil — Tableau de bord
// PAS de Layout ici → déjà dans AppRouter.jsx via <Outlet />

import { useApp } from "../context/AppContext";

// ---- Statistiques ----
const stats = [
  { label: "Véhicules",    value: 12, icon: "🚌", color: "#6C63FF", bg: "rgba(108,99,255,0.12)", trend: "+2 ce mois"  },
  { label: "Chauffeurs",   value: 8,  icon: "👤", color: "#00C9A7", bg: "rgba(0,201,167,0.12)",  trend: "+1 ce mois"  },
  { label: "Réservations", value: 40, icon: "🎫", color: "#FFB830", bg: "rgba(255,184,48,0.12)", trend: "+8 ce mois"  },
  { label: "Trajets",      value: 5,  icon: "🗺️", color: "#FF6B6B", bg: "rgba(255,107,107,0.12)",trend: "Actifs"      },
];

// ---- Trajets en cours ----
// Renommé "trajetsList" pour éviter conflit avec variable "t" de useApp()
const trajetsList = [
  { from: "Antananarivo", to: "Tamatave",     chauffeur: "Rakoto A.",  vehicule: "Bus 01", progress: 68 },
  { from: "Antananarivo", to: "Diego Suarez", chauffeur: "Rabe C.",    vehicule: "Bus 03", progress: 35 },
  { from: "Antananarivo", to: "Majunga",      chauffeur: "Randria P.", vehicule: "Bus 07", progress: 82 },
];

// ---- Réservations récentes ----
const recentRes = [
  { id: "RES-001", client: "Rakoto Jean", trajet: "Tana → Tamatave",     date: "16 Avr 2026", montant: "85 000 Ar"  },
  { id: "RES-002", client: "Rasoa Marie", trajet: "Tana → Diego",        date: "17 Avr 2026", montant: "120 000 Ar" },
  { id: "RES-003", client: "Rabe Luc",    trajet: "Tana → Majunga",      date: "17 Avr 2026", montant: "95 000 Ar"  },
  { id: "RES-004", client: "Ravelo Haja", trajet: "Tana → Fianarantsoa", date: "18 Avr 2026", montant: "60 000 Ar"  },
];

// ---- Stats rapides ----
const statsRapides = [
  { label: "Taux de remplissage", value: "78%",          color: "#6C63FF" },
  { label: "Revenus du mois",     value: "4 250 000 Ar", color: "#00C9A7" },
  { label: "Satisfaction client", value: "94%",          color: "#FFB830" },
  { label: "Incidents signalés",  value: "0",            color: "#FF6B6B" },
];

export default function Dashboard() {

  // ✅ "trad" au lieu de "t" pour éviter tout conflit
  const { t: trad } = useApp();

  return (
    <div className="space-y-6">

      {/* ============ BANNIÈRE BIENVENUE ============ */}
      <div
        className="rounded-2xl p-6 flex items-center justify-between overflow-hidden relative border"
        style={{
          background: "linear-gradient(135deg,rgba(108,99,255,0.2),rgba(0,201,167,0.1))",
          borderColor: "rgba(108,99,255,0.2)",
        }}
      >
        {/* Cercle décoratif arrière-plan */}
        <div className="absolute pointer-events-none" style={{
          right: "-20px", top: "-20px",
          width: "180px", height: "180px",
          background: "radial-gradient(circle,rgba(108,99,255,0.3) 0%,transparent 70%)",
        }} />

        <div>
          {/* Sous-titre bienvenue depuis traduction */}
          <div className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "#6C63FF" }}>
            🇲🇬 {trad.bienvenue}
          </div>
          <div className="text-2xl font-black text-white mb-1">
            Nexa Transport Madagascar
          </div>
          <div className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            Gérez vos véhicules, chauffeurs et réservations en temps réel.
          </div>
        </div>

        {/* Icône décorative droite */}
        <div className="rounded-xl p-4 text-center border hidden md:block"
          style={{ background: "rgba(108,99,255,0.2)", borderColor: "rgba(108,99,255,0.25)" }}>
          <div className="text-3xl">🚀</div>
          <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            Tout roule !
          </div>
        </div>
      </div>

      {/* ============ CARTES STATISTIQUES ============ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <div key={i}
            className="rounded-2xl p-6 relative overflow-hidden border transition-all duration-200 hover:-translate-y-1"
            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
          >
            {/* Lueur décorative coin haut-droit */}
            <div className="absolute top-0 right-0 pointer-events-none" style={{
              width: "100px", height: "100px",
              background: `radial-gradient(circle at top right,${s.color}18 0%,transparent 70%)`,
            }} />

            {/* Icône */}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4 border"
              style={{ background: s.bg, borderColor: `${s.color}30` }}>
              {s.icon}
            </div>

            {/* Chiffre */}
            <div className="text-4xl font-black text-white leading-none mb-1">
              {s.value}
            </div>

            {/* Label */}
            <div className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>
              {s.label}
            </div>

            {/* Badge tendance */}
            <div className="text-xs font-semibold px-2 py-1 rounded-md inline-block"
              style={{ color: s.color, background: s.bg }}>
              ↑ {s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* ============ LIGNE DU MILIEU ============ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ---- Trajets en cours ---- */}
        <div className="rounded-2xl p-6 border"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>

          <div className="flex justify-between items-center mb-5">
            <div className="font-bold text-white text-base">🗺️ Trajets en cours</div>
            <span className="text-xs px-3 py-1 rounded-full font-semibold"
              style={{ background: "rgba(0,201,167,0.15)", color: "#00C9A7" }}>
              ● Live
            </span>
          </div>

          {/* ✅ trajetsList au lieu de t pour éviter conflit */}
          {trajetsList.map((trajet, i) => (
            <div key={i} className="mb-4">
              {/* Ligne : from → to + pourcentage */}
              <div className="flex justify-between mb-1">
                <div>
                  <span className="font-semibold text-sm text-white">{trajet.from}</span>
                  <span className="text-xs mx-1" style={{ color: "rgba(255,255,255,0.3)" }}>→</span>
                  <span className="font-semibold text-sm" style={{ color: "#6C63FF" }}>{trajet.to}</span>
                </div>
                <span className="text-xs font-bold" style={{ color: "#00C9A7" }}>
                  {trajet.progress}%
                </span>
              </div>

              {/* Chauffeur et véhicule */}
              <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                {trajet.chauffeur} • {trajet.vehicule}
              </div>

              {/* Barre de progression */}
              <div className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}>
                <div className="h-full rounded-full" style={{
                  width: `${trajet.progress}%`,
                  background: "linear-gradient(90deg,#6C63FF,#00C9A7)",
                  transition: "width 0.8s ease",
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* ---- Statistiques rapides ---- */}
        <div className="rounded-2xl p-6 border"
          style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>

          <div className="font-bold text-white text-base mb-5">📊 Statistiques rapides</div>

          {statsRapides.map((item, i) => (
            <div key={i} className="flex justify-between items-center py-3"
              style={{ borderBottom: i < statsRapides.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                {item.label}
              </span>
              <span className="text-sm font-bold px-3 py-1 rounded-lg"
                style={{ color: item.color, background: `${item.color}18` }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ============ TABLEAU RÉSERVATIONS RÉCENTES ============ */}
      <div className="rounded-2xl p-6 border"
        style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>

        <div className="flex justify-between items-center mb-5">
          <div className="font-bold text-white text-base">
            🎫 {trad.reservations} récentes
          </div>
          <button className="text-xs font-semibold px-4 py-2 rounded-lg border cursor-pointer"
            style={{
              background: "rgba(108,99,255,0.15)",
              borderColor: "rgba(108,99,255,0.3)",
              color: "#6C63FF",
            }}>
            Voir tout →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["ID", "Client", "Trajet", "Date", "Montant"].map((h) => (
                  <th key={h}
                    className="text-left px-4 py-3 text-xs uppercase tracking-wider font-bold"
                    style={{ color: "rgba(255,255,255,0.3)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentRes.map((r, i) => (
                <tr key={i} className="transition-colors"
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(108,99,255,0.07)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td className="px-4 py-3 text-xs font-semibold" style={{ color: "#6C63FF" }}>{r.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-white">{r.client}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{r.trajet}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{r.date}</td>
                  <td className="px-4 py-3 text-sm font-bold text-white">{r.montant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}