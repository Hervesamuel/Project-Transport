// context/AppContext.jsx
// Cerveau de l'application — gère les paramètres globaux

import { createContext, useContext, useState, useEffect } from "react";

// ---- Traductions Français / Malagasy ----
export const traductions = {
  fr: {
    dashboard:     "Dashboard",
    chauffeurs:    "Chauffeurs",
    vehicules:     "Véhicules",
    reservations:  "Réservations",
    parametres:    "Paramètres",
    bienvenue:     "Bienvenue sur",
    rechercher:    "Rechercher...",
    ajouter:       "Ajouter",
    modifier:      "Modifier",
    supprimer:     "Supprimer",
    annuler:       "Annuler",
    enregistrer:   "Enregistrer",
    confirmation:  "Confirmer la suppression",
    irreversible:  "Cette action est irréversible.",
    chargement:    "Chargement...",
    aucunResultat: "Aucun résultat trouvé.",
  },
  mg: {
    dashboard:     "Dahsboardy",
    chauffeurs:    "Mpamily",
    vehicules:     "Fiara",
    reservations:  "Fangatahana",
    parametres:    "Fikirana",
    bienvenue:     "Tongasoa amin'ny",
    rechercher:    "Mitady...",
    ajouter:       "Hanampy",
    modifier:      "Hanova",
    supprimer:     "Hamafa",
    annuler:       "Hafoana",
    enregistrer:   "Hitahiry",
    confirmation:  "Hamarino ny famafana",
    irreversible:  "Tsy azo averina izany.",
    chargement:    "Miandry...",
    aucunResultat: "Tsy hita ny valiny.",
  }
};

const AppContext = createContext();
const defaut = { theme: "dark", police: "medium", langue: "fr" };

export function AppProvider({ children }) {

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("nexa_settings");
      return saved ? JSON.parse(saved) : defaut;
    } catch {
      return defaut;
    }
  });

  useEffect(() => {
    // Sauvegarde dans localStorage
    localStorage.setItem("nexa_settings", JSON.stringify(settings));

    // ✅ Applique la taille de police directement sur body
    // On utilise style inline sur body pour éviter le conflit avec Tailwind
    const tailles = {
      small:  "13px",
      medium: "15px",
      large:  "18px",
    };
    document.body.style.fontSize = tailles[settings.police];

    // ✅ Applique aussi sur html pour que rem fonctionne
    document.documentElement.style.fontSize = tailles[settings.police];

  }, [settings]);

  const updateSetting = (key, value) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  const t = traductions[settings.langue];

  return (
    <AppContext.Provider value={{ settings, updateSetting, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);