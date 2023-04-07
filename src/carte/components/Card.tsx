import './card-style.css';

export default function Card(props: { region: string }) {
    return (
        <div className="card m-auto card-style">
            <img
                src={`./img/${props.region}.jpg`}
                className="card-img-top img-size"
                alt={` ${props.region}`}
            />
            <div className="card-body">
                <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </p>
            </div>
        </div>
    );
}
