import './navbar-style.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-color px-3">
            <img
                className="logo  p-auto"
                src="./img/logo.png"
                alt="logo Japan's Travels"
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
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
            >
                <a className="nav-item me-2 fs-2 fw-semibold" href='#0'>Loggin</a>
                <a className="nav-item mx-2 fs-2 fw-semibold" href='#0'>S'enregistrer</a>                
                <a className="nav-item mx-2 fs-2 fw-semibold" href='#0'>Profile</a>
            </div>
        </nav>    
    );
}
