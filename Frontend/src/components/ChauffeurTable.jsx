// components/ChauffeurTable.jsx
// Tableau liste des chauffeurs
// Props : chauffeurs, onEdit, onDelete

export default function ChauffeurTable({ chauffeurs, onEdit, onDelete }) {

  if (chauffeurs.length === 0)
    return (
      <p style={{ textAlign: "center", padding: "48px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
        Aucun chauffeur enregistré.
      </p>
    );

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {["Nom Chauffeur", "Téléphone", "Genre", "Email", "Actions"].map((h) => (
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
          {chauffeurs.map((c) => (
            <tr key={c.id_chauf}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(108,99,255,0.07)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              style={{ transition: "background 0.15s" }}>

              {/* Nom + avatar initiale */}
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "10px", flexShrink: 0,
                    background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: "800", color: "#fff",
                  }}>
                    {c.nom?.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{c.nom}</span>
                </div>
              </td>

              {/* Téléphone */}
              <td style={{ padding: "12px 16px", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
                {c.tel}
              </td>

              {/* Genre badge coloré */}
              <td style={{ padding: "12px 16px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "20px",
                  background: c.genre === "Homme" ? "rgba(108,99,255,0.15)" : "rgba(255,107,107,0.15)",
                  color: c.genre === "Homme" ? "#6C63FF" : "#FF6B6B",
                }}>
                  {c.genre === "Homme" ? "♂" : "♀"} {c.genre}
                </span>
              </td>

              {/* Email */}
              <td style={{ padding: "12px 16px", fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
                {c.email}
              </td>

              {/* Actions */}
              <td style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => onEdit(c)} style={{
                    padding: "6px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: "700",
                    background: "rgba(108,99,255,0.15)", color: "#6C63FF",
                    border: "1px solid rgba(108,99,255,0.2)", cursor: "pointer",
                  }}>✏️ Modifier</button>
                  <button onClick={() => onDelete(c.id_chauf)} style={{
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