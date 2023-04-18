import { useContext } from 'react';
import './styles/navbar-style.css';
import { UserContext } from '../../context/user-context';
import ConnexionModal from './ConnexionModal';
import RegisterModal from './RegisterModal';
import '../../region/styles/region-style.css';

export default function Navbar(props: {
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const { user } = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-color px-3 ">
            <img
                className="logo p-auto"
                src="./img/logo.png"
                alt="logo Japan's Travels"
                onClick={() => props.setPage('Accueil')}
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
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse d-flex mobile-nav"
                id="navbarNav"
            >
                {!user.access_token && (
                    <>
                        <div>
                            <a
                                className="nav-item me-2 fs-2 fw-semibold"
                                href="#0"
                                data-bs-toggle="modal"
                                data-bs-target="#connexion"
                            >
                                Connexion
                            </a>
                            <ConnexionModal />
                        </div>
                        <div>
                            <a
                                className="nav-item mx-2 fs-2 fw-semibold"
                                href="#0"
                                data-bs-toggle="modal"
                                data-bs-target="#register"
                            >
                                S'enregistrer
                            </a>
                            <RegisterModal />
                        </div>
                    </>
                )}
                {user.access_token && (
                    <a className="nav-item mx-2 fs-2 fw-semibold" href="#0">
                        Profile
                    </a>
                )}
            </div>
        </nav>
    );
}
