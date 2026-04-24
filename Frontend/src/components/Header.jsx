// Header de l'application
// Contient la barre de recherche et le profil admin
import React, { useEffect, useState } from "react";
import { getNotificationCount } from "../services/notificationService";




const handleNotificationClick = async () => {

  setShowNotif(!showNotif);

  // marquer comme lu
  await markNotificationsAsRead();

  setCount(0);

};

function Header() {

      const [showNotif, setShowNotif] = useState(false);

    // stocker le nombre de notifications
      const [count, setCount] = useState(0);

      // récupérer les notifications au chargement
      useEffect(() => {

        fetchNotifications();

        // actualiser toutes les 5 secondes
        const interval = setInterval(() => {
          fetchNotifications();
        }, 5000);

        return () => clearInterval(interval);

      }, []);

      // fonction pour récupérer le nombre
      const fetchNotifications = async () => {

        try {

          const response = await getNotificationCount();

          setCount(response.data);

        } catch (error) {

          console.error("Erreur notification", error);

        }

      };
  return (
    // Barre fixe en haut, fond sombre avec flou (glassmorphism)
    <header style={{
      background: "rgba(15, 15, 26, 0.85)",   /* Fond semi-transparent */
      backdropFilter: "blur(16px)",            /* Effet de flou derrière */
      borderBottom: "1px solid rgba(108, 99, 255, 0.1)", /* Ligne violette subtile */
      padding: "0 28px",
      height: "68px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",   /* Reste collé en haut au scroll */
      top: 0,
      zIndex: 5,            /* Passe au-dessus du contenu */
    }}>

      {/* ---- GAUCHE : Titre de la page ---- */}
      <div>
        <div style={{
          fontWeight: "800",
          fontSize: "18px",
          color: "#fff"
        }}>
          Nexa Transport MG
        </div>

        {/* Sous-titre avec la date */}
        <div style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.4)"  /* Texte discret */
        }}>

        </div>
      </div>

      {/* ---- DROITE : Recherche + Notif + Profil ---- */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px"   /* Espacement entre chaque élément */
      }}>


        {/* -- Cloche de notification -- */}

        <div style={{ position: "relative" }}>
           <button
              onClick={handleNotificationClick} // Fusion du clic ici
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                cursor: "pointer", // Ajouté pour montrer que c'est cliquable
              }}
            >
              🔔
            </button>

            {showNotif && (
              <div style={{
                position: "absolute",
                top: "50px",
                right: "0",
                width: "250px",
                background: "#1A1A2E",
                borderRadius: "10px",
                padding: "10px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.5)"
              }}>

                <div style={{color:"#fff", fontSize:"13px"}}>
                  Nouvelle notification
                </div>

              </div>
            )}

          {/* compteur de notification */}
          {count > 0 && (
            <span style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              background: "#FF6B6B",
              color: "#fff",
              fontSize: "11px",
              fontWeight: "bold",
              padding: "2px 6px",
              borderRadius: "10px",
            }}>
              {count}
            </span>
          )}

          {/* Badge rouge : indique qu'il y a une notif non lue */}
          <div style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            width: "8px",
            height: "8px",
            background: "#FF6B6B",       /* Rouge alerte */
            borderRadius: "50%",
            border: "1.5px solid #0F0F1A", /* Bordure pour bien séparer du bouton */
          }} />
        </div>

        {/* -- Profil ADMIN -- */}

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px",
          padding: "6px 12px 6px 6px",
          cursor: "pointer",
        }}>
          {/* Avatar avec initiale "A" */}
          <div style={{
            width: "30px",
            height: "30px",
            background: "linear-gradient(135deg, #6C63FF, #00C9A7)", /* Dégradé violet → vert */
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: "800",
            color: "#fff",
          }}>
            A
          </div>

          {/* Nom et rôle */}
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>
              Admin
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
              Super Admin
            </div>
          </div>
        </div>

      </div>
    </header>
  )
}

export default Header