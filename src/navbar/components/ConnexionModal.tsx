import { useContext, useState } from 'react';
import './styles/modal-style.css';
import { BASE_URL } from '../../constant/URL';
import Cookies from 'js-cookie';
import { ConnectedContext } from '../../context/user-context';
import { ToastContext } from '../../context/toast-constant';

export default function ConnexionModal() {
    const [ident, setIdent] = useState<string>('');
    const [mdp, setMdp] = useState<string>('');
    const { onUserChange, onTokenChange } = useContext(ConnectedContext);
    const { successToast, failToast } = useContext(ToastContext);

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
                    Cookies.set('token', response.data.access_token, {
                        secure: false,
                        expires: 1,
                        SameSite: 'strict',
                    });
                    Cookies.set('user', JSON.stringify(response.data.user), {
                        secure: false,
                        expires: 1,
                        SameSite: 'strict',
                    });
                    onUserChange(response.data.user);
                    onTokenChange(response.data.access_token);
                    successToast(response.message);
                } else {
                    failToast(response.message);
                }
            })
            .catch((err) => console.error(err));
    };

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
                                <div className="fw-light">
                                    Pas encore de compte ?{' '}
                                    <a
                                        data-bs-toggle="modal"
                                        data-bs-target="#register"
                                        href="/#"
                                    >
                                        Cliquez-ici !
                                    </a>
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
