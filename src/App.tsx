import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Card from "./carte/components/Card";
import Carte from "./carte/components/Carte";
import Navbar from "./navbar/components/Navbar";
import { TRegion } from "./Types/TRegion";
import { UserContextProvider } from "./context/user-context";
import { ToastContainer } from "react-toastify";

function App() {
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const [regionHover, setRegionHover] = useState<string>("");
  const [region, setRegion] = useState<TRegion[]>();
  const options = { method: "GET" };

  useEffect(() => {
    fetch("http://localhost:8000/api/regions/", options)
      .then((response) => response.json())
      .then((response) => setRegion(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <UserContextProvider>
      <div className="App">
        <header>
          <Navbar />
          <ToastContainer />
        </header>
        <main>
          <div className="d-flex justify-content-around align-items-center accueil">
            <div className="me-3 pb-5 card-style ">
              {showComponent && (
                <Card regionHover={regionHover} region={region} />
              )}
            </div>
            <div className="me-5 carte">
              <Carte
                setShowComponent={setShowComponent}
                setRegionHover={setRegionHover}
              />
            </div>
          </div>
        </main>
        <footer></footer>
      </div>
    </UserContextProvider>
  );
}

export default App;
