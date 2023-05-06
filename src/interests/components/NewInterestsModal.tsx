import { useEffect, useState } from "react";
import { TCategories } from "../types/TCategories";
import { TRegion } from "../../Types/TRegion";
import { TInterests } from "../types/TInterests";
import { BASE_URL } from "../../constant/URL";
import Cookies from "js-cookie";

export default function NewInterestModal(props: {
  dataRegion: TRegion[];
  setInterests: React.Dispatch<React.SetStateAction<TInterests[]>>;
  interests: TInterests[];
}) {
  const [categories, setCategories] = useState<TCategories[]>([]);
  const [selected, setSelected] = useState<TCategories | null>(null);
  const [nom, setNom] = useState<string>("");
  const [adresse, setAdresse] = useState<string>("");
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);

  const token = Cookies.get("token");

  useEffect(() => {
    fetch(`${BASE_URL}/categories`)
      .then((response) => response.json())
      .then((response) => setCategories(response.data))
      .catch((err) => console.error(err));
  }, []);

  const newInterest = () => {
    fetch(`${BASE_URL}/interests`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nom,
        adress: adresse,
        latitude: lat,
        longitude: lon,
        category: selected?.id,
        province_id: props.dataRegion[0].id,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        const newInterests = [...props.interests];
        newInterests.push(response.data);
        props.setInterests(newInterests);
      })
      .catch((err) => console.error(err));
  };

  const categorieList = categories.map((elm, i) => (
    <li key={i}>
      <button className="dropdown-item" onClick={() => setSelected(elm)}>
        {" "}
        {elm.name}
      </button>
    </li>
  ));

  return (
    <div
      className="modal fade"
      id="newInterest"
      tabIndex={-1}
      aria-labelledby="newInterest"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4 text-style fw-bold modal-style">
              Point d'intéret :
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label modal-style fw-bold"
            >
              Nom :
            </label>
            <input
              type="text"
              title="name"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => setNom(e.target.value)}
            ></input>
            <div className="my-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label modal-style fw-bold"
              >
                Adresse :
              </label>
              <input
                type="text"
                title="adress"
                className="form-control"
                onChange={(e) => setAdresse(e.target.value)}
              ></input>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <div>
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label modal-style mt-3 fw-bold"
                    >
                      Latitude :
                    </label>
                    <input
                      type="text"
                      title="latitude"
                      className="form-control"
                      aria-describedby="latitude"
                      onChange={(e) => setLat(parseFloat(e.target.value))}
                    ></input>
                  </div>

                  <div className="my-3">
                    <label
                      htmlFor="longitude"
                      className="form-label modal-style fw-bold"
                    >
                      Longitude :
                    </label>
                    <input
                      type="text"
                      title="longitude"
                      className="form-control "
                      onChange={(e) => setLon(parseFloat(e.target.value))}
                    ></input>
                  </div>
                </div>
                <div id="passwordHelpBlock" className="form-text">
                  Renseignez l'adresse japonaise sur{" "}
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.google.fr/maps/"
                  >
                    google map
                  </a>{" "}
                  pour obtenir la latitude et la longitude (clique droit sur
                  l'endroit de la carte, appuis prolongé sur la carte sur
                  mobile).
                </div>
                <div className="dropdown mt-3 mb-2">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Catégorie
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    {categorieList}
                  </ul>
                </div>
                <div>{selected?.name}</div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={(e) => {
                newInterest();
              }}
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
