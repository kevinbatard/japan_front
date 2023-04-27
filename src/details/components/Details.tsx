import { useEffect, useRef, useState } from 'react';
import { TRegion } from '../../Types/TRegion';
import NewCommentModal from '../../comments/components/NewCommentModal';
import Comments from '../../comments/components/Comments';
import '../styles/details-style.css';
import { TComments } from '../../navbar/components/types/TComments';
import NewInterestModal from '../../interests/components/NewInterestsModal';
import MapInterest from './MapInterest';
import { TInterests } from '../../interests/types/TInterests';
import { BASE_URL } from '../../constant/URL';

export default function Details(props: {
    regionHover: string;
    region: TRegion[];
}) {
    const [comments, setComments] = useState<TComments[]>([]);
    const [interests, setInterests] = useState<TInterests[]>([]);

    const dataRegion = props.region.filter(
        (elm) => elm.name === props.regionHover
    );

    const region = useRef(dataRegion[0].id);

    useEffect(() => {
        fetch(`${BASE_URL}/interests/region/${region.current}`)
            .then((response) => response.json())
            .then((response) => {
                response.data = response.data.map((elm: TInterests) => {
                    elm.latitude = Number(elm.latitude);
                    elm.longitude = Number(elm.longitude);
                    return elm;
                });

                setInterests(response.data);
            })
            .catch((err) => console.error(err));
    }, [region]);

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
                <div className="mt-4 size">
                    <p>{dataRegion[0].description}</p>
                </div>
                <div className="text-center">
                    <button
                        className="btn btn-primary my-4"
                        type="button"
                        data-bs-target="#newComment"
                        data-bs-toggle="modal"
                    >
                        Partagez votre expérience !
                    </button>
                    <NewCommentModal
                        comments={comments}
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
                            data-bs-target="#newInterest"
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
