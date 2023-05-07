import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./carte/components/styles/carte-style.css";
import Card from "./carte/components/Card";
import Carte from "./carte/components/Carte";
import Navbar from "./navbar/components/Navbar";
import { TRegion } from "./Types/TRegion";
import { ToastContainer } from "react-toastify";
import Regions from "./region/components/Regions";
import Details from "./details/components/Details";
import { BASE_URL } from "./constant/URL";
import { ConnectedContext } from "./context/user-context";
import Cookies from "js-cookie";
import Profil from "./profil/components/Profil";

function App() {
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const [page, setPage] = useState<string>("Accueil");
  const [regionHover, setRegionHover] = useState<string>("");
  const [region, setRegion] = useState<TRegion[]>([]);

  const { onTokenChange } = useContext(ConnectedContext);
  const { onUserChange } = useContext(ConnectedContext);

  useEffect(() => {
    const token = Cookies.get("token");
    const userCook = Cookies.get("user");
    if (token && userCook) {
      const user = JSON.parse(userCook);

      onTokenChange(token);
      onUserChange(user);
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/regions/`)
      .then((response) => response.json())
      .then((response) => setRegion(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <header>
        <Navbar setPage={setPage} />
        <ToastContainer />
      </header>
      <main>
        {page === "Details" && (
          <Details regionHover={regionHover} region={region} />
        )}
        {page === "Accueil" && (
          <div>
            <Regions
              region={region}
              setPage={setPage}
              setRegionHover={setRegionHover}
            />
            <ToastContainer />
            <div className="d-flex justify-content-around align-items-center accueil card-region mt-4">
              <div className="me-3 pb-5 card-style carte">
                {showComponent && (
                  <Card regionHover={regionHover} region={region} />
                )}
              </div>
              <div className="me-5 carte">
                <Carte
                  setShowComponent={setShowComponent}
                  setRegionHover={setRegionHover}
                  setPage={setPage}
                />
              </div>
            </div>
          </div>
        )}
        {page === "Profil" && <Profil />}
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
