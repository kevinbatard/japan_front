import { useContext, useEffect, useRef, useState } from 'react';
import { TRegion } from '../../Types/TRegion';
import NewCommentModal from '../../comments/components/NewCommentModal';
import Comments from '../../comments/components/Comments';
import '../styles/details-style.css';
import { TComments } from '../../navbar/components/types/TComments';
import NewInterestModal from '../../interests/components/NewInterestsModal';
import MapInterest from './MapInterest';
import { TInterests } from '../../interests/types/TInterests';
import { BASE_URL } from '../../constant/URL';
import { ConnectedContext } from '../../context/user-context';
import ConnexionModal from '../../navbar/components/ConnexionModal';
import Cookies from 'js-cookie';
import { newRank } from '../../context/ranks_function';
import { TRank } from '../../profil/components/TRank';

export default function Details(props: {
    regionHover: string;
    region: TRegion[];
}) {
    const [comments, setComments] = useState<TComments[]>([]);
    const [interests, setInterests] = useState<TInterests[]>([]);
    const { token, user, onUserChange } = useContext(ConnectedContext);
    const [rank, setRank] = useState<TRank>(user.ranks);
    const dataRegion = props.region.filter(
        (elm) => elm.name === props.regionHover
    );

    const isVisited = user.visited_regions
        .map((elm) => elm.id)
        .includes(dataRegion[0].id);

    const [visited, setVisited] = useState<boolean>(isVisited);

    const region = useRef(dataRegion[0].id);

    useEffect(() => {
        fetch(`${BASE_URL}/interests/region/${region.current}`)
            .then((response) => response.json())
            .then((response) => {
                setInterests(response.data);
            })
            .catch((err) => console.error(err));
    }, [region]);

    const iVisited = () => {
        const token = Cookies.get('token');

        if (visited === false) {
            return fetch(`${BASE_URL}/users/add`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ region_id: region.current }),
            })
                .then((response) => response.json())
                .then((response) => {
                    onUserChange(response.data);
                    setVisited(true);
                    //newRank(user, token!, onUserChange, setRank, rank!);
                })
                .catch((err) => console.error(err));
        }
        if (visited === true) {
            return fetch(`${BASE_URL}/users/remove`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ region_id: region.current }),
            })
                .then((response) => response.json())
                .then((response) => {
                    onUserChange(response.data);
                    setVisited(false);
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <>
            <div className="first-block">
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
                        {isVisited ? (
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                defaultChecked
                                id="checkVisit"
                                onClick={iVisited}
                            />
                        ) : (
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="checkVisit"
                                onClick={iVisited}
                            />
                        )}
                        <label
                            className="form-check-label"
                            htmlFor="checkVisit"
                        >
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
                        data-bs-target={token ? '#newComment' : '#connexion'}
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
                    <p className="size fw-semibold ">
                        Ils l'ont déjà visités :{' '}
                    </p>
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
                            data-bs-target={
                                token ? '#newInterest' : '#connexion'
                            }
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
                    <p className="size fw-semibold ">
                        Ils vous recommandent :{' '}
                    </p>
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
