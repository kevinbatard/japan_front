import { useContext, useEffect, useRef, useState } from "react";
import { TRegion } from "../../Types/TRegion";
import NewCommentModal from "../../comments/components/NewCommentModal";
import Comments from "../../comments/components/Comments";
import "../styles/details-style.css";
import { TComments } from "../../navbar/components/types/TComments";
import NewInterestModal from "../../interests/components/NewInterestsModal";
import MapInterest from "./MapInterest";
import { TInterests } from "../../interests/types/TInterests";
import { BASE_URL } from "../../constant/URL";
import { ConnectedContext } from "../../context/user-context";
import ConnexionModal from "../../navbar/components/ConnexionModal";
import Cookies from "js-cookie";

export default function Details(props: {
  regionHover: string;
  region: TRegion[];
}) {
  const [comments, setComments] = useState<TComments[]>([]);
  const [interests, setInterests] = useState<TInterests[]>([]);
  const [visited, setVisited] = useState<boolean>(false);
  const { token } = useContext(ConnectedContext);

  const dataRegion = props.region.filter(
    (elm) => elm.name === props.regionHover
  );

  const region = useRef(dataRegion[0].id);

  useEffect(() => {
    fetch(`${BASE_URL}/interests/region/${region.current}`)
      .then((response) => response.json())
      .then((response) => {
        setInterests(response.data);
      })
      .catch((err) => console.error(err));
  }, [region]);

  const isVisited = () => {
    const token = Cookies.get("token");

    fetch(`${BASE_URL}/users/`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ region_id: region.current }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);

        if (visited === false) setVisited(true);
        if (visited === true) setVisited(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className=" first-block">
        <img
          src={`./img/articles/${dataRegion[0].name}.jpg`}
          className="img-fluid banner photo-brightness"
          alt={`${dataRegion[0].name}`}
        />
        <div className="overlay">
          <p className="text-centers">
            <span className="data-name">{dataRegion[0].name}</span>
          </p>
        </div>
      </div>
      <div className="container">
        {token && (
          <div className="form-check d-flex justify-content-center mt-4">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="checkVisit"
              onClick={isVisited}
            />
            <label className="form-check-label" htmlFor="checkVisit">
              Visité !
            </label>
          </div>
        )}
        <div className="mt-4 size">
          <p>{dataRegion[0].description}</p>
        </div>
        <div className="text-center">
          <button
            className="btn btn-primary my-4"
            type="button"
            data-bs-target={token ? "#newComment" : "#connexion"}
            data-bs-toggle="modal"
          >
            Partagez votre expérience !
          </button>
          <ConnexionModal />
          <NewCommentModal
            comments={comments}
            setComments={setComments}
            dataRegion={dataRegion}
          />
        </div>
        <div>
          <p className="size fw-semibold ">Ils l'ont déjà visités : </p>
          <div className="border color border-danger rounded-1 p-3">
            <Comments
              comments={comments}
              setComments={setComments}
              dataRegion={dataRegion}
            />
          </div>
          <div className="text-center">
            <button
              className="btn btn-primary my-5"
              type="button"
              data-bs-target={token ? "#newInterest" : "#connexion"}
              data-bs-toggle="modal"
            >
              Que recommandez vous ?!
            </button>
            <NewInterestModal
              dataRegion={dataRegion}
              setInterests={setInterests}
              interests={interests}
            />
          </div>
          <p className="size fw-semibold ">Ils vous recommandes : </p>
          <MapInterest
            interests={interests}
            dataRegion={dataRegion}
            setInterests={setInterests}
          />
        </div>
      </div>
    </>
  );
}
