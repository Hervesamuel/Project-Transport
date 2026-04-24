// components/ReservationForm.jsx
// Formulaire Ajouter / Modifier une réservation
// Props : initial, vehicules, onSubmit, onCancel

import { useState, useEffect } from "react";

// ---- Villes de Madagascar ----
const VILLES = [
  "Antananarivo", "Toamasina", "Mahajanga", "Fianarantsoa",
  "Toliara", "Antsiranana", "Antsirabe", "Ambositra",
  "Morondava", "Fort-Dauphin"
];

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
const errStyle = { fontSize: "12px", marginTop: "4px", color: "#FF6B6B" };

const vide = {
  id_veh: "", nom_voyageur: "", tel: "", email: "",
  ville_depart: "", ville_arrive: "", date_reservation: "",
};

export default function ReservationForm({ initial = null, vehicules = [], onSubmit, onCancel }) {
  const [form, setForm]     = useState(vide);
  const [errors, setErrors] = useState({});

  // Préremplir si modification
  useEffect(() => {
    if (initial) setForm({ ...initial, id_veh: initial.id_veh?.toString() });
    else setForm(vide);
    setErrors({});
  }, [initial]);

  // ---- Contrôle strict clavier ----

  // Nom : bloque chiffres et caractères spéciaux
  const onKeyNom = (e) => {
    if (!/^[a-zA-ZÀ-ÿ\s]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab")
      e.preventDefault();
  };

  // Téléphone : bloque tout sauf chiffres + + au début
  const onKeyTel = (e) => {
    const allowed = /^[0-9+]$/;
    if (!allowed.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab")
      e.preventDefault();
    // + uniquement en première position
    if (e.key === "+" && e.target.value.length > 0) e.preventDefault();
  };

  // Mise à jour champ
  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  // ---- Validation ----
  const valider = () => {
    const e = {};

    if (!form.id_veh)
      e.id_veh = "Veuillez sélectionner un véhicule.";

    if (!form.nom_voyageur.trim() || form.nom_voyageur.trim().length < 3)
      e.nom_voyageur = "Nom requis (min 3 caractères, pas de chiffres).";

    if (!/^(\+261|0)(32|33|34|38)\d{7}$/.test(form.tel.trim()))
      e.tel = "Format invalide. Ex: +261341234567 ou 0341234567";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Email invalide. Ex: nom@email.com";

    if (!form.ville_depart)
      e.ville_depart = "Ville de départ requise.";

    if (!form.ville_arrive)
      e.ville_arrive = "Ville d'arrivée requise.";

    // Départ et arrivée ne peuvent pas être identiques
    if (form.ville_depart && form.ville_arrive && form.ville_depart === form.ville_arrive)
      e.ville_arrive = "La destination doit être différente du départ.";

    if (!form.date_reservation)
      e.date_reservation = "La date est obligatoire.";
    else {
      const auj = new Date(); auj.setHours(0, 0, 0, 0);
      if (new Date(form.date_reservation) < auj)
        e.date_reservation = "La date ne peut pas être dans le passé.";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (valider()) onSubmit({ ...form, id_veh: parseInt(form.id_veh) });
  };

  // Villes disponibles pour l'arrivée (exclut la ville de départ)
  const villesArrivee = VILLES.filter((v) => v !== form.ville_depart);
  // Villes disponibles pour le départ (exclut la ville d'arrivée)
  const villesDepart  = VILLES.filter((v) => v !== form.ville_arrive);

  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px", padding: "24px", marginBottom: "24px",
    }}>
      <h3 style={{ color: "#fff", fontWeight: "700", marginBottom: "20px" }}>
        {initial ? "✏️ Modifier la réservation" : "➕ Nouvelle réservation"}
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>

        {/* Véhicule — pleine largeur */}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>Véhicule *</label>
          <select
            name="id_veh" value={form.id_veh} onChange={change}
            style={{ ...inp, borderColor: errors.id_veh ? "#FF6B6B" : "rgba(255,255,255,0.1)", cursor: "pointer" }}
          >
            <option value="" style={{ background: "#1A1A2E" }}>-- Sélectionner un véhicule --</option>
            {vehicules.map((v) => (
              <option key={v.id_vehicule} value={v.id_vehicule} style={{ background: "#1A1A2E" }}>
                {v.matricule} — {v.marque} {v.modele} — {v.nbr_place} places
                {v.chauffeur ? ` | 👤 ${v.chauffeur.nom}` : ""}
              </option>
            ))}
          </select>
          {errors.id_veh && <p style={errStyle}>⚠ {errors.id_veh}</p>}
        </div>

        {/* Affiche le chauffeur automatiquement selon véhicule sélectionné */}
        {form.id_veh && vehicules.find(v => v.id_vehicule === parseInt(form.id_veh))?.chauffeur && (
          <div style={{ gridColumn: "1 / -1" }}>
            <div style={{
              padding: "10px 16px", borderRadius: "10px",
              background: "rgba(0,201,167,0.1)",
              border: "1px solid rgba(0,201,167,0.2)",
              color: "#00C9A7", fontSize: "13px", fontWeight: "600",
            }}>
              👤 Chauffeur : {vehicules.find(v => v.id_vehicule === parseInt(form.id_veh)).chauffeur.nom}
            </div>
          </div>
        )}

        {/* Nom voyageur */}
        <div>
          <label style={lbl}>Nom du voyageur *</label>
          <input
            style={{ ...inp, borderColor: errors.nom_voyageur ? "#FF6B6B" : "rgba(255,255,255,0.1)" }}
            name="nom_voyageur" value={form.nom_voyageur} onChange={change}
            onKeyDown={onKeyNom}   // Bloque chiffres et caractères spéciaux
            placeholder="Ex: Rakoto Jean" maxLength={100}
          />
          {errors.nom_voyageur && <p style={errStyle}>⚠ {errors.nom_voyageur}</p>}
        </div>

        {/* Téléphone */}
        <div>
          <label style={lbl}>Téléphone * (MG)</label>
          <input
            style={{ ...inp, borderColor: errors.tel ? "#FF6B6B" : "rgba(255,255,255,0.1)" }}
            name="tel" value={form.tel} onChange={change}
            onKeyDown={onKeyTel}   // Bloque lettres et caractères non numériques
            placeholder="+261341234567" maxLength={13}
          />
          {errors.tel && <p style={errStyle}>⚠ {errors.tel}</p>}
        </div>

        {/* Email */}
        <div>
          <label style={lbl}>Email *</label>
          <input
            style={{ ...inp, borderColor: errors.email ? "#FF6B6B" : "rgba(255,255,255,0.1)" }}
            type="email" name="email" value={form.email} onChange={change}
            placeholder="nom@email.com" maxLength={100}
          />
          {errors.email && <p style={errStyle}>⚠ {errors.email}</p>}
        </div>

        {/* Date */}
        <div>
          <label style={lbl}>Date de réservation *</label>
          <input
            style={{ ...inp, borderColor: errors.date_reservation ? "#FF6B6B" : "rgba(255,255,255,0.1)", colorScheme: "dark" }}
            type="date" name="date_reservation" value={form.date_reservation} onChange={change}
          />
          {errors.date_reservation && <p style={errStyle}>⚠ {errors.date_reservation}</p>}
        </div>

        {/* Ville départ */}
        <div>
          <label style={lbl}>Ville de départ *</label>
          <select
            name="ville_depart" value={form.ville_depart} onChange={change}
            style={{ ...inp, borderColor: errors.ville_depart ? "#FF6B6B" : "rgba(255,255,255,0.1)", cursor: "pointer" }}
          >
            <option value="" style={{ background: "#1A1A2E" }}>-- Sélectionner --</option>
            {villesDepart.map((v) => (
              <option key={v} value={v} style={{ background: "#1A1A2E" }}>{v}</option>
            ))}
          </select>
          {errors.ville_depart && <p style={errStyle}>⚠ {errors.ville_depart}</p>}
        </div>

        {/* Ville arrivée — exclut automatiquement la ville de départ */}
        <div>
          <label style={lbl}>Ville d'arrivée *</label>
          <select
            name="ville_arrive" value={form.ville_arrive} onChange={change}
            style={{ ...inp, borderColor: errors.ville_arrive ? "#FF6B6B" : "rgba(255,255,255,0.1)", cursor: "pointer" }}
          >
            <option value="" style={{ background: "#1A1A2E" }}>-- Sélectionner --</option>
            {villesArrivee.map((v) => (
              <option key={v} value={v} style={{ background: "#1A1A2E" }}>{v}</option>
            ))}
          </select>
          {errors.ville_arrive && <p style={errStyle}>⚠ {errors.ville_arrive}</p>}
        </div>
      </div>

      {/* Boutons */}
      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button onClick={handleSubmit} style={{
          padding: "10px 20px", borderRadius: "10px", border: "none",
          background: "linear-gradient(135deg,#6C63FF,#00C9A7)",
          color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer",
        }}>
          {initial ? "💾 Enregistrer" : "✅ Créer"}
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