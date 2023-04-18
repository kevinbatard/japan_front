import { TRegion } from '../../Types/TRegion';
import '../styles/region-style.css';

export default function Regions(props: {
    region: TRegion[];
    setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
    const unicRegion = props.region.map((elm, key) => (
        <div key={key} className="accordion-item region-list">
            <div className="test">
                <img
                    id="flush-headingTwoX"
                    src={`./img/${elm.name}.jpg`}
                    alt={`${elm.name}`}
                    className="accordion-button"
                    data-mdb-toggle="collapse"
                    data-mdb-target={`#flush-collapseOne${elm.name}`}
                    aria-controls={`flush-collapseOne${elm.name}`}
                />
            </div>
            <div
                id={`flush-collapseOne${elm.name}`}
                className="accordion-collapse collapse"
                aria-labelledby={`flush-headingOne${elm.name}`}
                data-mdb-parent="#accordionFlushExampleX"
            >
                <h2 className="accordion-body">{elm.name}</h2>
                <div className="accordion-body">{elm.description}</div>
                <div className=" text-center ">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => props.setPage('Details')}
                    >
                        En savoir plus
                    </button>
                </div>
            </div>
        </div>
    ));
    return (
        <div
            className="accordion accordion-borderless"
            id="accordionFlushExampleX"
        >
            {unicRegion}
        </div>
    );
}
