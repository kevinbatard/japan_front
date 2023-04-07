import { useState } from 'react';
import { TRegion } from '../../Types/TRegion';
import './card-style.css';

export default function Card(props: { region: string }) {

    const [hover, setHover] = useState<TRegion>()

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: props.region})
      };

      
      fetch('http://localhost:8000/api/regions/get', options)
        .then(response => response.json())
        .then(response => setHover(response.data))
        .catch(err => console.error(err));


    return (
        <div className="card m-auto card-style">
            <img
                src={`./img/${props.region}.jpg`}
                className="card-img-top img-size"
                alt={` ${props.region}`}
            />
            <div className="card-body">
                <h1>{hover?.name}</h1>
                <p className="card-text">
                    {hover?.description}
                </p>
            </div>
        </div>
    );
}
