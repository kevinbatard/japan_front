import { useContext } from "react";
import { ConnectedContext } from "../../context/user-context";

export default function Profil() {
  const { user } = useContext(ConnectedContext);

  return (
    <div className="m-2 border border-2 rounded rounded-4 px-4 pt-4 ">
      <h1 className="mb-5">Profile :</h1>
      <p>
        <span className="fw-bold">Pseudo</span> : {user.pseudo}
      </p>
      <div className="d-flex align-center mb-5 flex-wrap align-items-end">
        <p>
          <span className="fw-bold">E-Mail</span> : {user.email}
        </p>
      </div>
    </div>
  );
}
