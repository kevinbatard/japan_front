import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterModal() {
  const [ident, setIdent] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mdp, setMdp] = useState<string>("");
  const [mdpConfirm, setMdpConfirm] = useState<string>("");

  const notifySuccess = (msg: string) =>
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (msg: string) =>
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pseudo: ident,
      email: email,
      password: mdp,
      passwordConfirm: mdpConfirm,
    }),
  };

  const newUser = () => {
    fetch("http://localhost:8000/api/users/register", options)
      .then((response) => response.json())
      .then((response) => {
        if (response.data) notifySuccess(response.message);
        else response.message.map((msg: string) => notifyError(msg));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="modal fade"
      id="register"
      tabIndex={-1}
      aria-labelledby="register"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4 text-style fw-bold modal-style">
              S'enregistrer
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body" onMouse>
            <label
              htmlFor="exampleInputEmail1"
              className="form-label modal-style fw-bold"
            >
              Identifiant :
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setIdent(e.target.value);
              }}
            ></input>
            <div className="my-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label modal-style fw-bold"
              >
                E-Mail :
              </label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label modal-style mt-3 fw-bold"
                >
                  Mot de passe :
                </label>
                <input
                  type="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setMdp(e.target.value);
                  }}
                ></input>
                <div id="passwordHelpBlock" className="form-text">
                  Votre mot de passe doit contenir entre 8-32 caractères,
                  contenir lettre et nombre, sans espace, au moins un caractère
                  spécial et une majuscule.
                </div>
                <div className="my-3">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label modal-style fw-bold"
                  >
                    Confirmer le mot de passe :
                  </label>
                  <input
                    type="password"
                    className="form-control "
                    onChange={(e) => {
                      setMdpConfirm(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button type="submit" className="btn btn-primary" onClick={newUser}>
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
