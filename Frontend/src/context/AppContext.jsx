// context/AppContext.jsx
// Cerveau de l'application — gère les paramètres globaux

import { createContext, useContext, useState, useEffect } from "react";

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

// ✅ Multiplicateurs de taille
// Utilisés directement dans les composants
export const taillePolice = {
  small:  { xs: "10px", sm: "11px", base: "13px", lg: "15px", xl: "18px", xxl: "20px" },
  medium: { xs: "11px", sm: "12px", base: "14px", lg: "16px", xl: "20px", xxl: "24px" },
  large:  { xs: "13px", sm: "14px", base: "16px", lg: "19px", xl: "24px", xxl: "28px" },
};

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
    localStorage.setItem("nexa_settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) =>
    setSettings(prev => ({ ...prev, [key]: value }));

  const t  = traductions[settings.langue];

  // ✅ fs = tailles de police selon le choix
  const fs = taillePolice[settings.police];

  return (
    // ✅ On expose "fs" dans le contexte
    <AppContext.Provider value={{ settings, updateSetting, t, fs }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);