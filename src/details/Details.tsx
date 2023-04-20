import { TRegion } from '../Types/TRegion';
import Comments from '../comments/components/Comments';
import './styles/details-style.css';

export default function Details(props: {
    regionHover: string;
    region: TRegion[];
}) {
    const dataRegion = props.region
        ?.map((elm) => elm)
        .filter((elm) => elm.name === props.regionHover);

    return (
        <>
            <div className=" first-block">
                <img
                    src={`./img/articles/${dataRegion[0].name}.jpg`}
                    className="img-fluid test photo-brightness"
                    alt={`${dataRegion[0].name}`}
                />
                <div className="overlay">
                    <p className="text-centers">
                        <span className="data-name">{dataRegion[0].name}</span>
                    </p>
                </div>
            </div>
            <div className="container">
                <div className="my-4 size">
                    <p>{dataRegion[0].description}</p>
                </div>
                <br />
                <div>
                    <p className="size fw-semibold ">
                        Ils l'ont déjà visités :{' '}
                    </p>
                    <Comments />
                </div>
            </div>
        </>
    );
}
