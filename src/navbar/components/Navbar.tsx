import "./styles/navbar-style.css";
import ConnexionModal from "./ConnexionModal";
import RegisterModal from "./RegisterModal";
import "../../region/styles/region-style.css";
import Cookies from "js-cookie";
import { useContext } from "react";
import { ConnectedContext } from "../../context/user-context";
import { DEFAULT_USER } from "../../constant/visitor";

export default function Navbar(props: {
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { token, onTokenChange, onUserChange } = useContext(ConnectedContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-color">
      <div className="container-fluid justify-content-between ">
        <img
          className="logo p-auto"
          src="./img/logo.png"
          alt="logo Japan's Travels"
          onClick={() => props.setPage("Accueil")}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-person-circle"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {!token && (
              <>
                <li className="nav-item">
                  <a
                    className=" mx-2 fs-2 fw-semibold nav-link connect"
                    href="#0"
                    data-bs-toggle="modal"
                    data-bs-target="#connexion"
                  >
                    Connexion
                  </a>
                </li>

                <li className="nav-item">
                  <ConnexionModal />

                  <a
                    className=" mx-2 fs-2 fw-semibold nav-link connect"
                    href="#0"
                    data-bs-toggle="modal"
                    data-bs-target="#register"
                  >
                    S'enregistrer
                  </a>
                  <RegisterModal />
                </li>
              </>
            )}

            {token && (
              <>
                <li>
                  <div className="navbar-nav">
                    <a
                      className=" mx-2 fs-2 fw-semibold nav-link connect"
                      href="#0"
                      onClick={() => props.setPage("Profil")}
                    >
                      Profil
                    </a>
                  </div>
                </li>
                <li>
                  <div className="navbar-nav">
                    <a
                      className=" mx-2 fs-2 fw-semibold nav-link connect"
                      href="#0"
                      onClick={() => {
                        Cookies.remove("user");
                        Cookies.remove("token");
                        props.setPage("Accueil");
                        onTokenChange(null);
                        onUserChange(DEFAULT_USER);
                      }}
                    >
                      Déconnexion
                    </a>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
