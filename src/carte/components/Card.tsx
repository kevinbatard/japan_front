import { TRegion } from "../../Types/TRegion";
import "./styles/card-style.css";

export default function Card(props: {
  regionHover: string;
  region: TRegion[] | undefined;
}) {
  const dataRegion = props.region?.filter(
    (elm) => elm.name === props.regionHover
  );

  return (
    <div className="card m-auto card-style">
      <img
        src={`./img/${props.regionHover}.jpg`}
        className="card-img-top img-size"
        alt={` ${props.regionHover}`}
      />
      <div className="card-body">
        <h1>{dataRegion![0].name}</h1>
        <p className="card-text">{dataRegion![0].description_mini}</p>
      </div>
    </div>
  );
}
