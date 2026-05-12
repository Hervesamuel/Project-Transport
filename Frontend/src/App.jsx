// App.jsx
// Applique le thème (sombre/clair) selon les paramètres

import AppRouter from "./router/AppRouter";
import { useApp } from "./context/AppContext";

function App() {
  // Récupère le thème depuis AppContext
  const { settings } = useApp();

  return (
    // ✅ Applique le fond selon le thème choisi
    <div style={{
      minHeight: "100vh",
      background: settings.theme === "dark" ? "#0F0F1A" : "#F1F5F9",
      color:      settings.theme === "dark" ? "#E8E8F0" : "#1A1A2E",
      transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <AppRouter />
    </div>
  );
}

export default App;