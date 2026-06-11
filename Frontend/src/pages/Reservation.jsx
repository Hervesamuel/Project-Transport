import { useEffect, useState, useCallback } from "react";
import ReservationForm  from "../components/ReservationForm";
import ReservationTable from "../components/ReservationTable";
import { getReservations, addReservation, updateReservation, deleteReservation } from "../services/reservationServices";
import { getVehicules } from "../services/vehiculeServices";
import axios from "axios";





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
    }}>
      {msg}
    </div>
  );
}

// ---- Modele de confirmation suppression ----
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

export default function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [vehicules, setVehicules]       = useState([]);
  const [selected, setSelected]         = useState(null);
  const [showForm, setShowForm]         = useState(false);
  const [confirmId, setConfirmId]       = useState(null);
  const [toast, setToast]               = useState({ msg: "", type: "success" });
  const [recherche, setRecherche]       = useState("");
  const [loading, setLoading]           = useState(false);
  const [selectedReservations, setSelectedReservations] = useState([]);
  // ouverture/fermeture de la fenêtre notification
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // message écrit par l'administrateur
  const [notificationMessage, setNotificationMessage] = useState("");



  // Affiche toast 3 secondes
  const notif = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type }), 3000);
  };

  // Charge réservations + véhicules en parallèle
  const charger = useCallback(async () => {
    setLoading(true);
    try {
      const [resR, resV] = await Promise.all([getReservations(), getVehicules()]);
      setReservations(resR.data);
      setVehicules(resV.data);
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
        await updateReservation(selected.id_res, form);
        notif("✅ Réservation modifiée !");
      } else {
        await addReservation(form);
        notif("✅ Réservation créée !");
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
      await deleteReservation(confirmId);
      notif("🗑 Réservation supprimée !", "info");
      setConfirmId(null);
      charger();
    } catch {
      notif("❌ Erreur lors de la suppression", "error");
    }
  };

  const handleEdit = (r) => {
    setSelected(r);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filtrage par nom voyageur ou ville
  const filtres = reservations.filter((r) =>
    r.nom_voyageur?.toLowerCase().includes(recherche.toLowerCase()) ||
    r.ville_depart?.toLowerCase().includes(recherche.toLowerCase()) ||
    r.ville_arrive?.toLowerCase().includes(recherche.toLowerCase())
  );

  // Cocher / décocher une réservation
  const handleSelectReservation = (id) => {
       // si l'id est déjà dans la liste
    if (selectedReservations.includes(id)) {
      // on retire cet id
      setSelectedReservations(
        selectedReservations.filter(resId => resId !== id)
      );
    } else {
      // sinon on l'ajoute
      setSelectedReservations([
        ...selectedReservations,
        id
      ]);
    }
  };
    // COCHER OU DECOCHER TOUTES LES RESERVATIONS
    const handleSelectAll = () => {

      // si toutes les réservations sont déjà cochées
      if (selectedReservations.length === filtres.length) {

        // on vide la sélection
        setSelectedReservations([]);

      } else {

        // sinon on sélectionne toutes les réservations
        setSelectedReservations(
          filtres.map((r) => r.id_res)
        );

      }

    };

     // ENVOI DE NOTIFICATION VERS SPRING BOOT
     const handleSendNotification = async () => {

       try {

         // envoie des données vers le backend
         await axios.post(

           "http://localhost:8080/api/notifications/send",

           {

             // liste des réservations cochées
             reservationIds: selectedReservations,

             // message saisi dans le textarea
             message: notificationMessage

           }

         );

         // message de succès
         notif(
           "✅ Notification envoyée avec succès",
           "success"
         );

         // fermer la fenêtre modal
         setShowNotificationModal(false);

         // vider le message
         setNotificationMessage("");

         // décocher toutes les réservations
         setSelectedReservations([]);

       }

       catch(error){

         console.error(error);

         notif(
           "❌ Erreur lors de l'envoi",
           "error"
         );

       }

     };


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Toast msg={toast.msg} type={toast.type} />

      {/* Barre d'actions supérieure */}
      <div style={{ display: "flex", justifyContent: "between", alignItems: "center", gap: "12px" }}>

        {/* Titre et compteur */}
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#fff" }}>🎫 Réservations</h2>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>
            {reservations.length} réservation{reservations.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Boutons d'actions */}
        <div style={{ display: "flex", gap: "12px", marginLeft: "auto" }}>
         {selectedReservations.length > 0 && (

           <button
             onClick={() => setShowNotificationModal(true)}
             style={{
               padding: "10px 20px",
               borderRadius: "12px",
               border: "none",
               background: "linear-gradient(135deg,#FFB830,#FF6B6B)",
               color: "#fff",
               fontSize: "14px",
               fontWeight: "700",
               cursor: "pointer"
             }}
           >
             📩 Envoyer notification ({selectedReservations.length})
           </button>

         )}

          <button
            onClick={() => {
              setShowForm(!showForm);
              setSelected(null);
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "12px",
              border: "none",
              background:
                showForm && !selected
                  ? "rgba(255,107,107,0.2)"
                  : "linear-gradient(135deg,#6C63FF,#00C9A7)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(108,99,255,0.3)"
            }}
          >
            {showForm && !selected ? "✕ Fermer" : "+ Nouvelle réservation"}
          </button>
        </div>
      </div>

      {/* Formulaire */}
      {showForm && (
        <ReservationForm
          initial={selected}
          vehicules={vehicules}
          onSubmit={handleSubmit}
          onCancel={() => { setShowForm(false); setSelected(null); }}
        />
      )}

      {/* Recherche */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.03)",
      }}>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>🔍</span>
        <input
          type="text"
          placeholder="Rechercher un voyageur, une ville..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: "#fff",
            outline: "none",
            fontSize: "14px"
          }}
        />
      </div>

      {/* Tableau des réservations */}
      {loading ? (
        <p style={{ color: "#fff" }}>Chargement...</p>
      ) : (
        <ReservationTable
          reservations={filtres}
          onEdit={handleEdit}
          onDelete={(id) => setConfirmId(id)}
          selectedReservations={selectedReservations}
          onSelectReservation={handleSelectReservation}
           onSelectAll={handleSelectAll}
        />
      )}

      {/* Modal de confirmation */}
      {confirmId && (
        <ModalConfirm
          onConfirm={handleDelete}
          onCancel={() => setConfirmId(null)}
        />
      )}

    {showNotificationModal && (

      <ModalNotification

        message={notificationMessage}

        setMessage={setNotificationMessage}

        onSend={handleSendNotification}

        onCancel={() => setShowNotificationModal(false)}

        nbSelection={selectedReservations.length}

      />

    )}

    </div>
  );
}




// ---- Modal Notification ----

function ModalNotification({

  message,
  setMessage,
  onSend,
  onCancel,
  nbSelection

}) {

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onCancel}
    >

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#1A1A2E",
          borderRadius: "16px",
          padding: "24px",
          width: "500px",
          maxWidth: "95%",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >

        <h2
          style={{
            color: "#fff",
            marginBottom: "10px"
          }}
        >
          📩 Notification Nexa Transport
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            marginBottom: "15px"
          }}
        >
          Destinataires sélectionnés :
          <strong style={{ color: "#FFB830" }}>
            {" "}
            {nbSelection}
          </strong>
        </p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrire votre message ici..."
          rows={6}
          style={{
            width: "100%",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.03)",
            color: "#fff",
            padding: "12px",
            resize: "none",
            outline: "none"
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px"
          }}
        >

          <button
            onClick={onCancel}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Annuler
          </button>

          <button
            onClick={onSend}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "none",
              background: "#6C63FF",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Envoyer
          </button>

        </div>

      </div>

    </div>

  );

}