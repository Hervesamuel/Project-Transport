// pages/Chauffeurs.jsx
// Page principale chauffeurs : Form + Table + Notifications

import { useEffect, useState, useCallback } from "react";
import ChauffeurForm  from "../components/ChauffeurForm";
import ChauffeurTable from "../components/ChauffeurTable";
import { getChauffeurs, addChauffeur, updateChauffeur, deleteChauffeur } from "../services/chauffeurServices";

// ---- Toast notification ----
function Toast({ msg, type }) {
  if (!msg) return null;
  const bg = { success: "#00C9A7", error: "#FF6B6B", info: "#6C63FF" };
  return (
    <div style={{
      position: "fixed", top: "20px", right: "20px", zIndex: 999,
      padding: "12px 20px", borderRadius: "12px",
      background: bg[type] ?? bg.info,
      color: "#fff", fontSize: "14px", fontWeight: "600",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    }}>{msg}</div>
  );
}

// ---- Modal confirmation suppression ----
function ModalConfirm({ onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }} onClick={onCancel}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#1A1A2E", borderRadius: "16px", padding: "28px",
        border: "1px solid rgba(255,107,107,0.3)", maxWidth: "380px", width: "90%",
      }}>
        <div style={{ fontSize: "40px", textAlign: "center", marginBottom: "12px" }}>⚠️</div>
        <h3 style={{ color: "#fff", fontWeight: "700", textAlign: "center", marginBottom: "8px" }}>
          Confirmer la suppression
        </h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px", textAlign: "center", marginBottom: "24px" }}>
          Cette action est irréversible.
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={onConfirm} style={{
            flex: 1, padding: "10px", borderRadius: "10px", border: "none",
            background: "#FF6B6B", color: "#fff", fontWeight: "700", cursor: "pointer",
          }}>Oui, supprimer</button>
          <button onClick={onCancel} style={{
            flex: 1, padding: "10px", borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.6)", fontWeight: "700", cursor: "pointer",
          }}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default function Chauffeurs() {
  const [chauffeurs, setChauffeurs] = useState([]);
  const [selected, setSelected]     = useState(null);
  const [showForm, setShowForm]     = useState(false);
  const [confirmId, setConfirmId]   = useState(null);
  const [toast, setToast]           = useState({ msg: "", type: "success" });
  const [recherche, setRecherche]   = useState("");
  const [loading, setLoading]       = useState(false);

  // Affiche toast 3 secondes
  const notif = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type }), 3000);
  };

  // Charge tous les chauffeurs depuis le backend
  const charger = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getChauffeurs();
      setChauffeurs(res.data);
    } catch {
      notif("❌ Erreur de chargement", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { charger(); }, [charger]);

  // Ajouter ou modifier
  const handleSubmit = async (form) => {
    try {
      if (selected) {
        await updateChauffeur(selected.id_chauf, form);
        notif("✅ Chauffeur modifié !");
      } else {
        await addChauffeur(form);
        notif("✅ Chauffeur ajouté !");
      }
      setShowForm(false);
      setSelected(null);
      charger();
    } catch {
      notif("❌ Erreur lors de l'enregistrement", "error");
    }
  };

  // Supprimer après confirmation
  const handleDelete = async () => {
    try {
      await deleteChauffeur(confirmId);
      notif("🗑 Chauffeur supprimé !", "info");
      setConfirmId(null);
      charger();
    } catch {
      notif("❌ Erreur lors de la suppression", "error");
    }
  };

  const handleEdit = (c) => {
    setSelected(c);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filtrage par nom, tel ou email
  const filtres = chauffeurs.filter((c) =>
    c.nom?.toLowerCase().includes(recherche.toLowerCase())   ||
    c.tel?.includes(recherche)                               ||
    c.email?.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      <Toast msg={toast.msg} type={toast.type} />

      {/* En-tête */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#fff" }}>👤 Chauffeurs</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
            {chauffeurs.length} chauffeur{chauffeurs.length > 1 ? "s" : ""} enregistré{chauffeurs.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setSelected(null); }}
          style={{
            padding: "10px 20px", borderRadius: "12px", border: "none",
            background: showForm && !selected ? "rgba(255,107,107,0.2)" : "linear-gradient(135deg,#6C63FF,#00C9A7)",
            color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer",
            boxShadow: "0 4px 14px rgba(108,99,255,0.3)",
          }}>
          {showForm && !selected ? "✕ Fermer" : "+ Ajouter un chauffeur"}
        </button>
      </div>

      {/* Formulaire */}

      {showForm && (
        <ChauffeurForm
          initial={selected}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setSelected(null); }}
        />
      )}

      {/* Recherche */}

      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "12px 16px", borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
      }}>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>🔍</span>
        <input
          style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: "14px" }}
          placeholder="Rechercher par nom, téléphone ou email..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
        {recherche && (
          <button onClick={() => setRecherche("")}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "18px", cursor: "pointer" }}>
            ✕
          </button>
        )}
      </div>

      {/* Tableau */}

      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "16px", padding: "20px",
      }}>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", marginBottom: "12px" }}>
          {filtres.length} résultat{filtres.length > 1 ? "s" : ""}
        </p>
        {loading ? (
          <p style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.3)" }}>
            ⏳ Chargement...
          </p>
        ) : (
          <ChauffeurTable
            chauffeurs={filtres}
            onEdit={handleEdit}
            onDelete={(id) => setConfirmId(id)}
          />
        )}
      </div>

      {/* Modal suppression */}

      {confirmId && (
        <ModalConfirm
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}
    </div>
  );
}