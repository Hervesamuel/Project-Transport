// components/ChauffeurForm.jsx
// Formulaire Ajouter / Modifier un chauffeur
// Props : initial (null=ajout, objet=modif), onSubmit, onCancel
// Attributs : id_chauf, nom(100), tel(13), genre(8), email(120)

import { useState, useEffect } from "react";

// ---- Styles inline ----
const inp = {
  width: "100%", padding: "10px 14px",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px", color: "#fff",
  fontSize: "14px", outline: "none", fontFamily: "inherit",
};
const lbl = {
  display: "block", fontSize: "11px", fontWeight: "700",
  textTransform: "uppercase", letterSpacing: "1px",
  marginBottom: "6px", color: "rgba(255,255,255,0.5)",
};
const errSt = { fontSize: "12px", marginTop: "4px", color: "#FF6B6B" };
const vide  = { nom: "", tel: "", genre: "", email: "" };

export default function ChauffeurForm({ initial = null, onSubmit, onCancel }) {
  const [form, setForm]     = useState(vide);
  const [errors, setErrors] = useState({});

  // Préremplir si modification, vider si ajout

  useEffect(() => {
    if (initial) {
      setForm({
        nom:   initial.nom   ?? "",
        tel:   initial.tel   ?? "",
        genre: initial.genre ?? "",
        email: initial.email ?? "",
      });
    } else {
      setForm(vide);
    }
    setErrors({});
  }, [initial]);

  // ---- Contrôle strict clavier ----

  // Nom : lettres et espaces uniquement — bloque chiffres et caractères spéciaux
  const onKeyNom = (e) => {
    if (!/^[a-zA-ZÀ-ÿ\s]$/.test(e.key) &&
        !["Backspace","Delete","Tab","ArrowLeft","ArrowRight"].includes(e.key))
      e.preventDefault();
  };

  // Téléphone : chiffres uniquement + "+" en première position
  const onKeyTel = (e) => {
    if (!/^[0-9]$/.test(e.key) &&
        !["Backspace","Delete","Tab","ArrowLeft","ArrowRight"].includes(e.key)) {
      // Autorise "+" seulement si curseur en position 0
      if (e.key === "+" && e.target.selectionStart === 0) return;
      e.preventDefault();
    }
  };

  // Mise à jour champ + efface erreur en temps réel
  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  // ---- Validation ----
  const valider = () => {
    const e = {};

    // Nom : obligatoire, min 3 caractères, max 100 (nullable=false, length=100)
    if (!form.nom.trim() || form.nom.trim().length < 3)
      e.nom = "Nom requis (min 3 caractères, lettres uniquement).";

    // Téléphone : format Madagascar, max 13 (nullable=false, length=13, unique=true)
    if (!/^\d{10}$/.test(form.tel.trim()))
      e.tel = "Le numéro doit contenir exactement 10 chiffres.";

    // Genre : obligatoire (nullable=false, length=8)
    if (!form.genre)
      e.genre = "Veuillez sélectionner un genre.";

    // Email : obligatoire, format valide, max 120 (nullable=false, length=120)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Email invalide. Ex: nom@email.com";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (valider()) onSubmit(form);
  };

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", padding: "24px", marginBottom: "24px",
    }}>
      {/* Titre */}
      <h3 style={{ color: "#fff", fontWeight: "700", marginBottom: "20px" }}>
        {initial ? "✏️ Modifier le chauffeur" : "➕ Nouveau chauffeur"}
      </h3>

      {/* Grille 2 colonnes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>

        {/* Nom — lettres uniquement */}
        <div>
          <label style={lbl}>Nom complet *</label>
          <input
            style={{ ...inp, borderColor: errors.nom ? "#FF6B6B" : "rgba(255,255,255,0.1)" }}
            name="nom" value={form.nom} onChange={change}
            onKeyDown={onKeyNom}        // Bloque chiffres et caractères spéciaux
            placeholder="Ex: Rakoto Jean"
            maxLength={100}             // Correspond à length=100 en Java
          />
          {errors.nom && <p style={errSt}>⚠ {errors.nom}</p>}
        </div>

        {/* Téléphone — chiffres uniquement */}

        <div>
          <label style={lbl}>Téléphone * (MG)</label>
          <input
            style={{ ...inp, borderColor: errors.tel ? "#FF6B6B" : "rgba(255,255,255,0.1)" }}
            name="tel" value={form.tel} onChange={change}
            onKeyDown={onKeyTel}        // Bloque lettres et caractères non numériques
            placeholder="+261341234567"
            maxLength={10}              // Correspond à length=13 en Java
          />
          {errors.tel && <p style={errSt}>⚠ {errors.tel}</p>}
        </div>

        {/* Genre — select fixe */}
        <div>
          <label style={lbl}>Genre *</label>
          <select
            style={{ ...inp, borderColor: errors.genre ? "#FF6B6B" : "rgba(255,255,255,0.1)", cursor: "pointer" }}
            name="genre" value={form.genre} onChange={change}
          >
            <option value="" style={{ background: "#1A1A2E" }}>-- Sélectionner --</option>
            <option value="Homme" style={{ background: "#1A1A2E" }}>Homme</option>
            <option value="Femme" style={{ background: "#1A1A2E" }}>Femme</option>
          </select>
          {errors.genre && <p style={errSt}>⚠ {errors.genre}</p>}
        </div>

        {/* Email */}
        <div>
          <label style={lbl}>Email *</label>
          <input
            style={{ ...inp, borderColor: errors.email ? "#FF6B6B" : "rgba(255,255,255,0.1)" }}
            type="email" name="email" value={form.email} onChange={change}
            placeholder="nom@email.com"
            maxLength={120}             // Correspond à length=120 en Java
          />
          {errors.email && <p style={errSt}>⚠ {errors.email}</p>}
        </div>
      </div>

      {/* Boutons */}
      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
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