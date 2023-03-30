import './App.css';
import './carte-style.css';
import Carte from './carte/components/Carte';

function App() {
    return (
        <div className="App">
            <header className=""></header>
            <main>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <Carte />
                </div>
            </main>
            <footer></footer>
        </div>
    );
}

export default App;
