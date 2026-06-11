
export default function VehiculeTable({ vehicules, onEdit, onDelete }) {

  if (vehicules.length === 0)
    return <p style={{ textAlign: "center", padding: "48px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
      Aucun véhicule enregistré.
    </p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Marque / Modèle", "Matricule", "Places", "Chauffeur", "Actions"].map((h) => (
              <th key={h} style={{
                textAlign: "left", padding: "12px 16px",
                fontSize: "11px", fontWeight: "700",
                textTransform: "uppercase", letterSpacing: "1px",
                color: "rgba(255,255,255,0.3)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vehicules.map((v) => {
            // Calcul places libres / occupées
            const occupees = v.placesOccupees?.length ?? 0;
            const libres   = (v.nbr_place ?? 0) - occupees;

            return (
              <tr key={v.id_vehicule}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(108,99,255,0.07)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                style={{ transition: "background 0.15s" }}>

                {/* ID */}
                <td style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#6C63FF" }}>
                  {v.id_vehicule}
                </td>

                {/* Marque + Modèle */}

                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "34px", height: "34px", borderRadius: "10px", flexShrink: 0,
                      background: "rgba(0,201,167,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
                    }}>🚌</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "#fff" }}>{v.marque}</div>
                      <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{v.modele}</div>
                    </div>
                  </div>
                </td>

                {/* Matricule badge */}
                <td style={{ padding: "12px 16px" }}>
                  <span style={{
                    fontSize: "11px", fontWeight: "700", padding: "4px 10px",
                    borderRadius: "8px", background: "rgba(255,184,48,0.15)", color: "#FFB830",
                    letterSpacing: "1px",
                  }}>
                    {v.matricule}
                  </span>
                </td>

                {/* Places libres / occupées */}
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontSize: "12px" }}>
                    <span style={{ color: "#00C9A7", fontWeight: "700" }}>🟢 {libres} libre{libres > 1 ? "s" : ""}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 4px" }}>/</span>
                    <span style={{ color: "#FF6B6B", fontWeight: "700" }}>🔴 {occupees} occupée{occupees > 1 ? "s" : ""}</span>
                  </div>
                  {/* Mini barre de progression */}
                  <div style={{
                    marginTop: "4px", height: "4px",
                    background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", borderRadius: "4px",
                      width: `${(occupees / (v.nbr_place || 1)) * 100}%`,
                      background: "linear-gradient(90deg,#6C63FF,#FF6B6B)",
                    }} />
                  </div>
                </td>

                {/* Chauffeur assigné (ManyToOne) */}

                <td style={{ padding: "12px 16px" }}>
                  {v.chauffeur ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
                        background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "11px", fontWeight: "800", color: "#fff",
                      }}>
                        {v.chauffeur.nom?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{v.chauffeur.nom}</div>
                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{v.chauffeur.tel}</div>
                      </div>
                    </div>
                  ) : (
                    <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>— Non assigné</span>
                  )}
                </td>

                {/* Actions */}
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => onEdit(v)} style={{
                      padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700",
                      background: "rgba(108,99,255,0.15)", color: "#6C63FF",
                      border: "1px solid rgba(108,99,255,0.2)", cursor: "pointer",
                    }}>✏️ Modifier</button>
                    <button onClick={() => onDelete(v.id_vehicule)} style={{
                      padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700",
                      background: "rgba(255,107,107,0.15)", color: "#FF6B6B",
                      border: "1px solid rgba(255,107,107,0.2)", cursor: "pointer",
                    }}>🗑 Supprimer</button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}