
// Formate date en français
const fDate = (d) => d ? new Date(d).toLocaleDateString("fr-FR", {
  day: "2-digit", month: "short", year: "numeric"
}) : "—";

export default function ReservationTable({ reservations, onEdit, onDelete }) {

  if (reservations.length === 0)
    return <p style={{ textAlign: "center", padding: "48px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
      Aucune réservation enregistrée.
    </p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["ID", "Véhicule", "Voyageur", "Téléphone", "Trajet", "Date", "Actions"].map((h) => (
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
          {reservations.map((r) => (
            <tr key={r.id_res}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(108,99,255,0.07)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              style={{ transition: "background 0.15s" }}>

              {/* ID */}
              <td style={{ padding: "12px 16px", fontSize: "12px", fontWeight: "600", color: "#6C63FF" }}>
                RES-{String(r.id_res).padStart(3, "0")}
              </td>

              {/* Véhicule ID */}
              <td style={{ padding: "12px 16px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: "700", padding: "3px 10px",
                  borderRadius: "20px", background: "rgba(255,184,48,0.15)", color: "#FFB830",
                }}>
                  🚌 #{r.id_veh}
                </span>
              </td>

              {/* Nom voyageur */}
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "8px", flexShrink: 0,
                    background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: "800", color: "#fff",
                  }}>
                    {r.nom_voyageur?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{r.nom_voyageur}</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{r.email}</div>
                  </div>
                </div>
              </td>

              {/* Téléphone */}
              <td style={{ padding: "12px 16px", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                {r.tel}
              </td>

              {/* Trajet départ → arrivée */}
              <td style={{ padding: "12px 16px" }}>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ color: "#6C63FF", fontWeight: "600" }}>{r.ville_depart}</span>
                  <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 6px" }}>→</span>
                  <span style={{ color: "#00C9A7", fontWeight: "600" }}>{r.ville_arrive}</span>
                </div>
              </td>

              {/* Date */}
              <td style={{ padding: "12px 16px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: "700", padding: "3px 10px",
                  borderRadius: "8px", background: "rgba(108,99,255,0.15)", color: "#6C63FF",
                }}>
                  📅 {fDate(r.date_reservation)}
                </span>
              </td>

              {/* Actions */}
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => onEdit(r)} style={{
                    padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700",
                    background: "rgba(108,99,255,0.15)", color: "#6C63FF",
                    border: "1px solid rgba(108,99,255,0.2)", cursor: "pointer",
                  }}>✏️ Modifier</button>
                  <button onClick={() => onDelete(r.id_res)} style={{
                    padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700",
                    background: "rgba(255,107,107,0.15)", color: "#FF6B6B",
                    border: "1px solid rgba(255,107,107,0.2)", cursor: "pointer",
                  }}>🗑 Supprimer</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}