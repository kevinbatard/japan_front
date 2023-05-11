import { useContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./carte/components/styles/carte-style.css";
import Card from "./carte/components/Card";
import Carte from "./carte/components/Carte";
import Navbar from "./navbar/components/Navbar";
import { TRegion } from "./Types/TRegion";
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

  const { onTokenChange, onUserChange, user } = useContext(ConnectedContext);

  /* useEffect(() => {
    if (user.visited_regions.length >= 0 && user.visited_regions.length <= 1){
      const newRank = {...user}
      newRank.ranks = 
    }
    if(user.visited_regions.length >= 2 && user.visited_regions.length <= 4)
    if(user.visited_regions.length >= 5 && user.visited_regions.length <= 7)
    if(user.visited_regions.length === 8)
  }); */

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

            <div className="d-flex justify-content-around align-items-center accueil card-region mt-4">
              <div className="me-3 pb-5 card-style carte">
                {showComponent ? (
                  <Card regionHover={regionHover} region={region} />
                ) : (
                  <p className="fs-2 font fw-bold">
                    Survolez les régions de la carte pour en savoir plus !<br />
                    Cliquez pour en parler.
                  </p>
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
