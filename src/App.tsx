import { useState } from 'react';
import './App.css';
import './carte-style.css';
import Card from './carte/components/Card';
import Carte from './carte/components/Carte';

function App() {
    const [showComponent, setShowComponent] = useState(false);
    return (
        <div className="App">
            <main>
                <div className="d-flex mt-4 justify-content-around container">
                    <div className="me-5 d-flex flex-column">
                        <img
                            className="logo ps-4 mb-5"
                            src="./img/logo.png"
                            alt="logo Japan's Travels"
                        />
                        <div className="mt-5">{showComponent && <Card />}</div>
                    </div>
                    <div className="ms-5 carte">
                        <Carte setShowComponent={setShowComponent} />
                    </div>
                </div>
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
