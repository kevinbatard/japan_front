import { useContext, useState } from 'react';
import './styles/modal-style.css';
import { UserContext } from '../../context/user-context';
import { TUser } from '../../Types/TUser';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../constant/URL';

export default function ConnexionModal() {
    const { onUserChange } = useContext(UserContext);
    const [ident, setIdent] = useState<string>('');
    const [mdp, setMdp] = useState<string>('');

    const notifySuccess = (msg: string) =>
        toast.success(msg, {
            position: 'bottom-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    const notifyError = (msg: string) =>
        toast.error(msg, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    const connexion = () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pseudo: ident, password: mdp }),
        };

        fetch(`${BASE_URL}/auth/login`, options)
            .then((response) => response.json())
            .then((response) => {
                if (response.data) {
                    changeUser(response.data);
                    notifySuccess(response.message);
                } else {
                    notifyError(response.message);
                }
            })
            .catch((err) => console.error(err));
    };

    function changeUser(users: TUser) {
        onUserChange(users);
    }

    return (
        <>
            <div
                className="modal fade"
                id="connexion"
                tabIndex={-1}
                aria-labelledby="connexion"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content  fw-bold">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-4 text-style fw-bold modal-style"
                                id="exampleModalLabel"
                            >
                                Connexion
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label
                                    htmlFor="exampleInputEmail1"
                                    className="form-label modal-style"
                                >
                                    Identifiant :
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    onChange={(e) => setIdent(e.target.value)}
                                ></input>
                                <div className="my-3">
                                    <label
                                        htmlFor="exampleInputPassword1"
                                        className="form-label modal-style"
                                    >
                                        Mot de passe :
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        onChange={(e) => {
                                            setMdp(e.target.value);
                                        }}
                                    ></input>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={connexion}
                                data-bs-dismiss="modal"
                                id="loginButton"
                            >
                                Connexion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
