// pages/Statistiques.jsx
// Page des statistiques — chauffeurs, véhicules, réservations
// Données réelles depuis le backend Spring Boot

import { useEffect, useState } from "react";
import { getStatistiques } from "../services/statistiqueService";

// ---- Composant carte stat simple ----
function CarteChiffre({ icon, label, value, color, bg }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: `1px solid ${color}22`,
      borderRadius: "16px", padding: "24px",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "100px", height: "100px",
        background: `radial-gradient(circle at top right,${color}18 0%,transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        width: "44px", height: "44px", borderRadius: "12px",
        background: bg, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "22px", marginBottom: "14px",
      }}>
        {icon}
      </div>
      <div style={{ fontSize: "36px", fontWeight: "900", color: "#fff", marginBottom: "4px" }}>
        {value ?? "..."}
      </div>
      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{label}</div>
    </div>
  );
}

// ---- Composant barre de progression ----
function BarreStat({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", color: "#fff", fontWeight: "600" }}>{label}</span>
        <span style={{ fontSize: "13px", color, fontWeight: "700" }}>
          {value} <span style={{ color: "rgba(255,255,255,0.3)", fontWeight: "400" }}>({pct}%)</span>
        </span>
      </div>
      <div style={{
        height: "8px", background: "rgba(255,255,255,0.07)",
        borderRadius: "10px", overflow: "hidden",
      }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg,${color},${color}99)`,
          borderRadius: "10px", transition: "width 0.8s ease",
        }} />
      </div>
    </div>
  );
}

// ---- Composant section ----
function Section({ titre, children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", padding: "24px",
    }}>
      <h3 style={{
        color: "#fff", fontWeight: "700", fontSize: "15px",
        marginBottom: "20px", paddingBottom: "12px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {titre}
      </h3>
      {children}
    </div>
  );
}

// ============================================
export default function Statistiques() {

  const [data,    setData   ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur,  setErreur ] = useState(false);

  // Charge les statistiques au montage
  useEffect(() => {
    getStatistiques()
      .then(res => setData(res.data))
      .catch(() => setErreur(true))
      .finally(() => setLoading(false));
  }, []);

  // ---- Chargement ----
  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px", color: "rgba(255,255,255,0.3)" }}>
      ⏳ Chargement des statistiques...
    </div>
  );

  // ---- Erreur ----
  if (erreur) return (
    <div style={{
      textAlign: "center", padding: "60px",
      background: "rgba(255,107,107,0.1)",
      border: "1px solid rgba(255,107,107,0.3)",
      borderRadius: "16px", color: "#FF6B6B",
    }}>
      ❌ Erreur de chargement des statistiques.
      Vérifiez que le backend est lancé !
    </div>
  );

  // ---- Données ----
  const genreData    = data?.chauffeurParGenre   ?? {};
  const marqueData   = data?.vehiculeParMarque   ?? {};
  const modeleData   = data?.vehiculeParModele   ?? {};
  const vehActif     = data?.vehiculePlusUtilise ?? null;
  const chaufActif   = data?.chauffeurPlusActif  ?? null;

  // Total chauffeurs pour les % de genre
  const totalChauffeurs = Object.values(genreData).reduce((a, b) => a + b, 0);
  const totalVehicules  = Object.values(marqueData).reduce((a, b) => a + b, 0);
  const totalModeles    = Object.values(modeleData).reduce((a, b) => a + b, 0);

  // Couleurs pour les barres
  const couleurs = ["#6C63FF","#00C9A7","#FFB830","#FF6B6B","#A78BFA","#34D399"];

  return (
    <div className="space-y-6">

      {/* ---- En-tête ---- */}
      <div>
        <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#fff" }}>
          📊 Statistiques
        </h2>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
          Vue d'ensemble de Nexa Transport Madagascar
        </p>
      </div>

      {/* ---- Cartes chiffres clés ---- */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
        gap: "16px",
      }}>
        <CarteChiffre
          icon="👤" label="Chauffeurs"
          value={data?.totalChauffeurs}
          color="#6C63FF" bg="rgba(108,99,255,0.15)"
        />
        <CarteChiffre
          icon="🚌" label="Véhicules"
          value={data?.totalVehicules}
          color="#00C9A7" bg="rgba(0,201,167,0.15)"
        />
        <CarteChiffre
          icon="🎫" label="Réservations"
          value={data?.totalReservations}
          color="#FFB830" bg="rgba(255,184,48,0.15)"
        />
        <CarteChiffre
          icon="🪑" label="Places totales"
          value={data?.totalPlaces}
          color="#FF6B6B" bg="rgba(255,107,107,0.15)"
        />
      </div>

      {/* ---- Ligne 1 : Genre + Chauffeur actif ---- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

        {/* Répartition par genre */}
        <Section titre="👤 Chauffeurs par genre">
          {Object.entries(genreData).map(([genre, count], i) => (
            <BarreStat
              key={genre}
              label={genre === "Homme" ? "♂ Homme" : "♀ Femme"}
              value={count}
              total={totalChauffeurs}
              color={genre === "Homme" ? "#6C63FF" : "#FF6B6B"}
            />
          ))}
          {Object.keys(genreData).length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
              Aucun chauffeur enregistré.
            </p>
          )}
        </Section>

        {/* Chauffeur le plus actif */}
        <Section titre="🏆 Chauffeur le plus actif">
          {chaufActif ? (
            <div>
              {/* Avatar + infos */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div style={{
                  width: "60px", height: "60px", borderRadius: "16px", flexShrink: 0,
                  background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "24px", fontWeight: "900", color: "#fff",
                  boxShadow: "0 4px 16px rgba(108,99,255,0.4)",
                }}>
                  {chaufActif.nom?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>
                    {chaufActif.nom}
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                    📱 {chaufActif.tel}
                  </div>
                  <div style={{ marginTop: "8px" }}>
                    <span style={{
                      fontSize: "11px", fontWeight: "700", padding: "3px 10px",
                      borderRadius: "20px",
                      background: chaufActif.genre === "Homme"
                        ? "rgba(108,99,255,0.15)" : "rgba(255,107,107,0.15)",
                      color: chaufActif.genre === "Homme" ? "#6C63FF" : "#FF6B6B",
                    }}>
                      {chaufActif.genre === "Homme" ? "♂" : "♀"} {chaufActif.genre}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badge véhicule actif */}
              {vehActif && (
                <div style={{
                  padding: "12px 16px", borderRadius: "12px",
                  background: "rgba(0,201,167,0.1)",
                  border: "1px solid rgba(0,201,167,0.2)",
                }}>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>
                    Véhicule assigné
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#00C9A7" }}>
                    🚌 {vehActif.label} — {vehActif.matricule}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
                    {vehActif.count} réservation{vehActif.count > 1 ? "s" : ""}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
              Pas encore de données.
            </p>
          )}
        </Section>
      </div>

      {/* ---- Ligne 2 : Marques + Modèles ---- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

        {/* Véhicules par marque */}
        <Section titre="🚌 Véhicules par marque">
          {Object.entries(marqueData).map(([marque, count], i) => (
            <BarreStat
              key={marque}
              label={marque}
              value={count}
              total={totalVehicules}
              color={couleurs[i % couleurs.length]}
            />
          ))}
          {Object.keys(marqueData).length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
              Aucun véhicule enregistré.
            </p>
          )}
        </Section>

        {/* Véhicules par modèle */}
        <Section titre="🔧 Véhicules par modèle">
          {Object.entries(modeleData).map(([modele, count], i) => (
            <BarreStat
              key={modele}
              label={modele}
              value={count}
              total={totalModeles}
              color={couleurs[(i + 2) % couleurs.length]}
            />
          ))}
          {Object.keys(modeleData).length === 0 && (
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
              Aucun véhicule enregistré.
            </p>
          )}
        </Section>
      </div>

      {/* ---- Véhicule le plus utilisé ---- */}
      {vehActif && (
        <Section titre="🏅 Véhicule le plus utilisé">
          <div style={{
            display: "flex", alignItems: "center", gap: "20px",
            padding: "16px", borderRadius: "12px",
            background: "rgba(255,184,48,0.08)",
            border: "1px solid rgba(255,184,48,0.2)",
          }}>
            <div style={{
              fontSize: "40px",
              width: "64px", height: "64px", borderRadius: "16px", flexShrink: 0,
              background: "rgba(255,184,48,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>🚌</div>
            <div>
              <div style={{ fontSize: "18px", fontWeight: "800", color: "#fff" }}>
                {vehActif.label}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>
                Matricule : <span style={{ color: "#FFB830", fontWeight: "700" }}>{vehActif.matricule}</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{
                  fontSize: "12px", fontWeight: "700", padding: "4px 12px",
                  borderRadius: "20px", background: "rgba(255,184,48,0.15)", color: "#FFB830",
                }}>
                  🎫 {vehActif.count} réservation{vehActif.count > 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}