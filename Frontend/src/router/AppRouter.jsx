import { BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from "../pages/Dashboard"


import Chauffeurs from "../pages/Chauffeurs"
import Vehicule from "../pages/Vehicule"
import Reservation from "../pages/Reservation"
import Layout from "../components/Layout"


// Routes : Routes est un conteneur qui contient toutes les routes de l'application.
// Route :
function AppRouter() {

   return (

       <BrowserRouter>
        {/* Routes contient toutes les routes */}
        <Routes>

            {/* Route Parent (La coquille fixe) */}
            <Route path="/" element={<Layout />}>
                {/* Route dashboard
                   Path = "/": vehicule
                   Element : Interface afficher comme exemple chauffeurs
                */}

                <Route path="vehicules" element={<Vehicule />} />
                <Route path="chauffeurs" element={<Chauffeurs />} />
                <Route path="Reservations" element={<Reservation />} />
                <Route path="Vehicule" element={<Vehicule />} />
            </Route>
        </Routes>

     </BrowserRouter>
  );

}
export default AppRouter