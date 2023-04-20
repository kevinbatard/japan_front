import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './carte/components/styles/carte-style.css';
import Card from './carte/components/Card';
import Carte from './carte/components/Carte';
import Navbar from './navbar/components/Navbar';
import { TRegion } from './Types/TRegion';
import { UserContextProvider } from './context/user-context';
import { ToastContainer } from 'react-toastify';
import Regions from './region/components/Regions';
import Details from './details/Details';

function App() {
    const [showComponent, setShowComponent] = useState<boolean>(false);
    const [page, setPage] = useState<string>('Accueil');
    const [regionHover, setRegionHover] = useState<string>('');
    const [region, setRegion] = useState<TRegion[]>([]);

    useEffect(() => {
        const options = { method: 'GET' };
        fetch('http://localhost:8000/api/regions/', options)
            .then((response) => response.json())
            .then((response) => setRegion(response.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <UserContextProvider>
            <div className="App">
                <header>
                    <Navbar setPage={setPage} />
                    <ToastContainer />
                </header>
                <main>
                    {page === 'Details' && (
                        <Details regionHover={regionHover} region={region} />
                    )}
                    {page === 'Accueil' && (
                        <div>
                            <Regions
                                region={region}
                                setPage={setPage}
                                setRegionHover={setRegionHover}
                            />
                            <div className="d-flex justify-content-around align-items-center accueil card-region mt-4">
                                <div className="me-3 pb-5 card-style carte">
                                    {showComponent && (
                                        <Card
                                            regionHover={regionHover}
                                            region={region}
                                        />
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
                </main>
                <footer></footer>
            </div>
        </UserContextProvider>
    );
}

export default App;
