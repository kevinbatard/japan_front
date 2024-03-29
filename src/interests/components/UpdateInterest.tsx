import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { TInterests } from '../types/TInterests';
import { TCategories } from '../types/TCategories';
import { BASE_URL } from '../../constant/URL';
import Cookies from 'js-cookie';
import { ToastContext } from '../../context/toast-constant';

export default function UpdateInterest(props: {
    interests: TInterests[];
    dataInterest: TInterests | null;
    setInterests: React.Dispatch<React.SetStateAction<TInterests[]>>;
}) {
    const [categories, setCategories] = useState<TCategories[]>([]);
    const [selected, setSelected] = useState<TCategories>();
    const [newInterest, setNewInterest] = useState<TInterests | null>(
        props.dataInterest
    );
    const { successToast, failToast } = useContext(ToastContext);

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { title, value } = e.currentTarget;

        if (newInterest !== null) {
            if (
                (title === 'latitude' || title === 'longitude') &&
                newInterest !== null
            ) {
                const updateInterest = { ...newInterest };
                updateInterest[title] = +value;
                return setNewInterest(updateInterest);
            }

            setNewInterest({ ...newInterest, [title]: value });
        }
    };

    useEffect(() => {
        setNewInterest(props.dataInterest);
    }, [props.dataInterest]);

    useEffect(() => {
        fetch(`${BASE_URL}/categories`)
            .then((response) => response.json())
            .then((response) => {
                setCategories(response.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const categorieList = categories.map((elm, i) => (
        <li key={i}>
            <button
                className="dropdown-item"
                title="category"
                onClick={() => setSelected(elm)}
            >
                {' '}
                {elm.name}
            </button>
        </li>
    ));

    const token = Cookies.get('token');

    const update = () => {
        fetch(`${BASE_URL}/interests/${props.dataInterest!.id}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...newInterest,
                category: selected?.id,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.data) {
                    const newInterest = [...props.interests];
                    const updateInterests = newInterest.map(
                        (elm: TInterests) => {
                            if (elm.id === props.dataInterest?.id)
                                return response.data;

                            return elm;
                        }
                    );
                    props.setInterests(updateInterests);
                    successToast(response.message);
                } else {
                    failToast(response.message);
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <div
            className="modal fade"
            id="updateInterest"
            aria-hidden="true"
            aria-labelledby="updateInterest"
            tabIndex={47}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-4 text-style fw-bold modal-style">
                            Modifier un Point d'intéret :
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
                            value={newInterest?.name || ''}
                            onChange={(e) => inputChange(e)}
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
                                value={newInterest?.adress || ''}
                                onChange={(e) => inputChange(e)}
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
                                            value={newInterest?.latitude || ''}
                                            onChange={(e) => inputChange(e)}
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
                                            value={newInterest?.longitude || ''}
                                            onChange={(e) => inputChange(e)}
                                        ></input>
                                    </div>
                                </div>
                                <div
                                    id="passwordHelpBlock"
                                    className="form-text"
                                >
                                    Renseignez l'adresse japonaise sur{' '}
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href="https://www.google.fr/maps/"
                                    >
                                        google map
                                    </a>{' '}
                                    pour obtenir la latitude et la longitude
                                    (clique droit sur l'endroit de la carte,
                                    appuis prolongé sur la carte sur mobile).
                                </div>
                                <div className="dropdown mt-3 mb-2 text-center">
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
                                <div className="text-center">
                                    {' '}
                                    {selected?.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                update();
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
