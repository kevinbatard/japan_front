import './navbar-style.css';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-color px-5">
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
                <button className="nav-item btn btn-lg">Loggin</button>
                <button className="nav-item btn btn-lg">S'enregistrer</button>
                <button className="nav-item btn btn-lg">Profile</button>
            </div>
        </nav>
    );
}
