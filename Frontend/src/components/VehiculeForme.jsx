
import { useState, useEffect } from "react";

// ---- Marques courantes à Madagascar ----
const MARQUES = ["PRINTER", "CRAFTER", "MERCEDES", "MERCEDES BENZ", "Autre"];


// ---- Styles inline ----

const inp = {
  width: "100%", padding: "10px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px", color: "#fff",
  fontSize: "14px", outline: "none", fontFamily: "inherit",
};
const lbl   = { display: "block", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px", color: "rgba(255,255,255,0.5)" };
const errSt = { fontSize: "12px", marginTop: "4px", color: "#FF6B6B" };
const vide  = { marque: "", modele: "", matricule: "", nbr_place: "", id_chauf: "" };

export default function VehiculeForm({ initial = null, chauffeurs = [], onSubmit, onCancel }) {
  const [form, setForm]           = useState(vide);
  const [errors, setErrors]       = useState({});

  // placesOccupees = liste des numéros de places cochées (ex: [1, 3, 5])
  const [placesOccupees, setPlacesOccupees] = useState([]);

  // Préremplir si modification
  useEffect(() => {
    if (initial) {
      setForm({
        marque:    initial.marque              ?? "",
        modele:    initial.modele              ?? "",
        matricule: initial.matricule           ?? "",
        nbr_place: initial.nbr_place?.toString() ?? "",
        id_chauf:  initial.chauffeur?.id_chauf?.toString() ?? "",
      });
      // Récupère les places déjà occupées si elles existent
      setPlacesOccupees(initial.placesOccupees ?? []);
    } else {
      setForm(vide);
      setPlacesOccupees([]);
    }
    setErrors({});
  }, [initial]);

  // ---- Contrôle strict clavier ----

  // Modèle/Marque : lettres, chiffres et espaces uniquement
  const onKeyTexte = (e) => {
    if (!/^[a-zA-ZÀ-ÿ0-9\s\-]$/.test(e.key) &&
        !["Backspace","Delete","Tab","ArrowLeft","ArrowRight"].includes(e.key))
      e.preventDefault();
  };

  // Matricule : lettres, chiffres, espaces et tirets
  const onKeyMatricule = (e) => {
    if (!/^[a-zA-Z0-9\s\-]$/.test(e.key) &&
        !["Backspace","Delete","Tab","ArrowLeft","ArrowRight"].includes(e.key))
      e.preventDefault();
  };

  // Nombre de places : chiffres uniquement, max 2 chiffres
  const onKeyNombre = (e) => {
    if (!/^[0-9]$/.test(e.key) &&
        !["Backspace","Delete","Tab","ArrowLeft","ArrowRight"].includes(e.key))
      e.preventDefault();
  };

  // Mise à jour champ
  const change = (e) => {
    const val = e.target.name === "matricule" ? e.target.value.toUpperCase() : e.target.value;
    setForm({ ...form, [e.target.name]: val });
    setErrors({ ...errors, [e.target.name]: null });
    // Reset les places cochées si on change le nombre de places
    if (e.target.name === "nbr_place") setPlacesOccupees([]);
  };

  // Cocher / décocher une place
  const togglePlace = (num) => {
    setPlacesOccupees((prev) =>
      prev.includes(num) ? prev.filter((p) => p !== num) : [...prev, num]
    );
  };

  // ---- Validation ----
  const valider = () => {
    const e = {};

    if (!form.marque)
      e.marque = "La marque est obligatoire.";

    if (!form.modele.trim() || form.modele.trim().length < 2)
      e.modele = "Le modèle est obligatoire (min 2 caractères).";

    if (!form.matricule.trim() || form.matricule.trim().length < 5)
      e.matricule = "Matricule invalide. Ex: 1234 TAA";

    const places = parseInt(form.nbr_place);
    if (!form.nbr_place || isNaN(places) || places < 1 || places > 60)
      e.nbr_place = "Nombre de places requis (1 à 60).";

    if (!form.id_chauf)
      e.id_chauf = "Veuillez sélectionner un chauffeur.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ✅ APRÈS — envoie objet chauffeur imbriqué
  const handleSubmit = () => {
    if (valider()) onSubmit({
      marque:    form.marque,
      modele:    form.modele,
      matricule: form.matricule,
      nbr_place: parseInt(form.nbr_place),
      chauffeur: {
        id_chauf: parseInt(form.id_chauf) // ✅ objet imbriqué !
      }
    });
  };

  // Nombre total de places (pour générer les checkboxes)
  const totalPlaces = parseInt(form.nbr_place) || 0;

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", padding: "24px", marginBottom: "24px",
    }}>
      <h3 style={{ color: "#fff", fontWeight: "700", marginBottom: "20px" }}>
        {initial ? "✏️ Modifier le véhicule" : "➕ Nouveau véhicule"}
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>

        {/* Marque */}
        <div>
          <label style={lbl}>Marque *</label>
          <select name="marque" value={form.marque} onChange={change}
            style={{ ...inp, borderColor: errors.marque ? "#FF6B6B" : "rgba(255,255,255,0.1)", cursor: "pointer" }}>
            <option value="" style={{ background: "#1A1A2E" }}>-- Sélectionner --</option>
            {MARQUES.map((m) => (
              <option key={m} value={m} style={{ background: "#1A1A2E" }}>{m}</option>
            ))}
          </select>
          {errors.marque && <p style={errSt}>⚠ {errors.marque}</p>}
        </div>

        {/* Modèle */}
        <div>
          <label style={lbl}>Modèle *</label>
          <input style={{ ...inp, borderColor: errors.modele ? "#FF6B6B" : "rgba(255,255,255,0.1)" }}
            name="modele" value={form.modele} onChange={change}
            onKeyDown={onKeyTexte}
            placeholder="Ex: Hiace, Sprinter..." maxLength={50} />
          {errors.modele && <p style={errSt}>⚠ {errors.modele}</p>}
        </div>

        {/* Matricule — auto uppercase */}
        <div>
          <label style={lbl}>Matricule *</label>
          <input style={{ ...inp, borderColor: errors.matricule ? "#FF6B6B" : "rgba(255,255,255,0.1)", textTransform: "uppercase" }}
            name="matricule" value={form.matricule} onChange={change}
            onKeyDown={onKeyMatricule}
            placeholder="Ex: 1234 TAA" maxLength={15} />
          {errors.matricule && <p style={errSt}>⚠ {errors.matricule}</p>}
        </div>

        {/* Nombre de places */}
        <div>
          <label style={lbl}>Nombre de places *</label>
          <input style={{ ...inp, borderColor: errors.nbr_place ? "#FF6B6B" : "rgba(255,255,255,0.1)" }}
            type="number" name="nbr_place" value={form.nbr_place} onChange={change}
            onKeyDown={onKeyNombre}
            placeholder="Ex: 15" min={1} max={60} />
          {errors.nbr_place && <p style={errSt}>⚠ {errors.nbr_place}</p>}
        </div>

        {/* Chauffeur (ManyToOne) — pleine largeur */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Chauffeur assigné *</label>
          <select name="id_chauf" value={form.id_chauf} onChange={change}
            style={{ ...inp, borderColor: errors.id_chauf ? "#FF6B6B" : "rgba(255,255,255,0.1)", cursor: "pointer" }}>
            <option value="" style={{ background: "#1A1A2E" }}>-- Sélectionner un chauffeur --</option>
            {chauffeurs.map((c) => (
              <option key={c.id_chauf} value={c.id_chauf} style={{ background: "#1A1A2E" }}>
                {c.nom} — {c.tel}
              </option>
            ))}
          </select>
          {errors.id_chauf && <p style={errSt}>⚠ {errors.id_chauf}</p>}
        </div>
      </div>

      {/* ============ CHECKBOXES DES PLACES ============ */}
      {/* Générées automatiquement selon nbr_place saisi */}
      {totalPlaces > 0 && (
        <div style={{ marginTop: "24px" }}>

          {/* En-tête checkboxes */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
            <label style={{ ...lbl, marginBottom: 0 }}>
              Places du véhicule ({totalPlaces} places)
            </label>

            {/* Compteur places occupées */}
            <span style={{
              fontSize: "12px", fontWeight: "700", padding: "3px 10px",
              borderRadius: "20px", background: "rgba(255,107,107,0.15)", color: "#FF6B6B",
            }}>
              🔴 {placesOccupees.length} occupée{placesOccupees.length > 1 ? "s" : ""}
              {"  "}
              <span style={{ color: "#00C9A7" }}>
                🟢 {totalPlaces - placesOccupees.length} libre{(totalPlaces - placesOccupees.length) > 1 ? "s" : ""}
              </span>
            </span>
          </div>

          {/* Grille de checkboxes — 4 colonnes */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))",
            gap: "8px",
            padding: "16px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            {Array.from({ length: totalPlaces }, (_, i) => i + 1).map((num) => {
              const occupe = placesOccupees.includes(num);
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => togglePlace(num)}
                  style={{
                    padding: "8px 4px",
                    borderRadius: "8px",
                    border: `2px solid ${occupe ? "#FF6B6B" : "rgba(0,201,167,0.3)"}`,
                    background: occupe ? "rgba(255,107,107,0.15)" : "rgba(0,201,167,0.08)",
                    color: occupe ? "#FF6B6B" : "#00C9A7",
                    fontSize: "12px", fontWeight: "700",
                    cursor: "pointer", transition: "all 0.2s",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", gap: "4px",
                  }}
                >
                  {/* Icône siège */}
                  <span style={{ fontSize: "16px" }}>{occupe ? "🔴" : "🟢"}</span>
                  {/* Numéro de place */}
                  <span>P{num}</span>
                </button>
              );
            })}
          </div>

          {/* Légende */}
          <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
            <span style={{ fontSize: "11px", color: "#00C9A7" }}>🟢 Libre</span>
            <span style={{ fontSize: "11px", color: "#FF6B6B" }}>🔴 Occupée</span>
          </div>
        </div>
      )}

      {/* Boutons */}
      <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
        <button onClick={handleSubmit} style={{
          padding: "10px 20px", borderRadius: "10px", border: "none",
          background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
          color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer",
        }}>
          {initial ? "💾 Enregistrer" : "✅ Ajouter"}
        </button>
        <button onClick={onCancel} style={{
          padding: "10px 20px", borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "700", cursor: "pointer",
        }}>
          Annuler
        </button>
      </div>
    </div>
  );
}