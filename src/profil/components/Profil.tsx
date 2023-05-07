import { useContext } from "react";
import { ConnectedContext } from "../../context/user-context";

export default function Profil() {
  const { user } = useContext(ConnectedContext);

  return (
    <div className=" d-flex justify-content-center flex-wrap">
      <div className="m-2  px-4 pt-4">
        <h1 className="mb-5">Profile :</h1>
        <p>
          <span className="fw-bold">Pseudo</span> : {user.pseudo}
        </p>
        <p>
          <span className="fw-bold">E-Mail</span> : {user.email}
        </p>
        <p>
          <span className="fw-bold">Regions visitées</span> :{" "}
          {user.visited_regions.length}
        </p>
      </div>
      <div className="align-self-center">
        {user.visited_regions.length > 0 && (
          <img
            style={{ height: 220 }}
            src={`./img/ranks/bronze.png`}
            alt="badge bronze"
          />
        )}
        {user.visited_regions.length > 3 && (
          <img
            style={{ height: 220 }}
            src={`./img/ranks/argent.png`}
            alt="badge argent"
          />
        )}
        {user.visited_regions.length > 5 && (
          <img
            style={{ height: 220 }}
            src={`./img/ranks/or.png`}
            alt="badge or"
          />
        )}
      </div>
    </div>
  );
}
