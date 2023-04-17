import { TRegion } from "../../Types/TRegion";
import "../styles/region-style.css";

export default function Regions(props: { region: TRegion[] }) {
  const isPair = (key: number) => {
    if (key % 2 === 1) return true;
  };

  const unicRegion = props.region.map((elm, key) => (
    <div
      key={key}
      className={
        isPair(key)
          ? "d-flex justify-content-center my-3 slide-in-right photo-brightness"
          : "d-flex justify-content-center my-3 slide-in-left photo-brightness"
      }
    >
      <img
        src={`./img/${elm.name}.jpg`}
        style={{ height: 11 + "em" }}
        className="m-2 "
        alt={`${elm.name}`}
      />
    </div>
  ));
  return <div className="region-list">{unicRegion}</div>;
}

//version gauche droite photo + text
{
  /* <div
      key={key}
      className={
        isPair(key)
          ? "container d-flex flex-row-reverse mt-5 align-items-center"
          : "container d-flex mt-5 align-items-center"
      }
    >
      <img
        src={`./img/mobile/${elm.name}.jpg`}
        style={{ height: 11 + "em" }}
        className="m-2"
        alt={`${elm.name}`}
      />
      <div className=" text">
        <h1 className="fs-4">{elm.name}</h1>
        <p className="">{elm.description_mini}</p>
      </div>
    </div>
  )); */
}
