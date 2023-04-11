
import { TRegion } from '../../Types/TRegion';
import './card-style.css';

export default function Card(props: { regionHover: string, region: TRegion[] | undefined }) {

    const dataRegion = props.region?.map((elm) => elm).filter(elm => elm.name === props.regionHover)

    return (
        <div className="card m-auto card-style">
            <img
                src={`./img/${props.regionHover}.jpg`}
                className="card-img-top img-size"
                alt={` ${props.regionHover}`}
            />
            <div className="card-body">
                <h1>{dataRegion![0].name}</h1>
                <p className="card-text">
                   {dataRegion![0].description} 
                </p>
            </div>
        </div>
    );
}

/* const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: props.region})
      };

      
      fetch('http://localhost:8000/api/regions/get', options)
        .then(response => response.json())
        .then(response => setHover(response.data))
        .catch(err => console.error(err));

 */