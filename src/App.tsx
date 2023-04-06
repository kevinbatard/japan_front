import { useState } from 'react';
import './App.css';
import Card from './carte/components/Card';
import Carte from './carte/components/Carte';
import Navbar from './navbar/components/Navbar';

function App() {
    const [showComponent, setShowComponent] = useState<boolean>(false);
    const [region, setRegion] = useState<string>('');

    return (
        <div className="App">
            <header>
                <Navbar />
            </header>
            <main>
                <div className="d-flex justify-content-between align-items-center container">
                    <div className="me-3 pb-5">
                        {showComponent && <Card region={region} />}
                    </div>
                    <div className="me-5 carte">
                        <Carte
                            setShowComponent={setShowComponent}
                            setRegion={setRegion}
                        />
                    </div>
                </div>
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
