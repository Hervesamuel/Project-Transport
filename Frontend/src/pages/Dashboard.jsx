import Layout from "../components/Layout"

function Dashboard() {

    return (

        <Layout>

                {/* Titre */}
                  <h2 className="text-2xl font-bold mb-6">
                    Tableau de bord
                  </h2>

                  {/* Cartes statistiques */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* Carte véhicules */}
                    <div className="bg-white p-6 rounded shadow">
                      <h3 className="text-gray-500">Véhicules</h3>
                      <p className="text-2xl font-bold">12</p>
                    </div>

                    {/* Carte chauffeurs */}
                    <div className="bg-white p-6 rounded shadow">
                      <h3 className="text-gray-500">Chauffeurs</h3>
                      <p className="text-2xl font-bold">8</p>
                    </div>

                    {/* Carte trajets */}
                    <div className="bg-white p-6 rounded shadow">
                      <h3 className="text-gray-500">Trajets</h3>
                      <p className="text-2xl font-bold">5</p>
                    </div>

                    {/* Carte réservations */}
                    <div className="bg-white p-6 rounded shadow">
                      <h3 className="text-gray-500">Réservations</h3>
                      <p className="text-2xl font-bold">40</p>
                    </div>

                  </div>

       </Layout>

        )

  }
export default Dashboard