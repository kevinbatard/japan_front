import { useState } from 'react';
import { TInterests } from '../types/TInterests';
import Cookies from 'js-cookie';

export default function DeleteInterest(props: {
    hide: boolean;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
    popId: number;
    interests: TInterests[];
    setInterests: React.Dispatch<React.SetStateAction<TInterests[]>>;
}) {
    const [onDelete, setOnDelete] = useState<boolean>(false);

    const token = Cookies.get('token');

    const options = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const deleteInterest = () =>
        fetch(`http://localhost:8000/api/interests/${props.popId}`, options)
            .then((response) => response.json())
            .then((response) =>
                props.setInterests(
                    props.interests.filter((elm) => elm.id !== props.popId)
                )
            )
            .catch((err) => console.error(err));

    return (
        <>
            {onDelete === false ? (
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setOnDelete(true);
                        props.setHide(true);
                    }}
                >
                    Supprimer
                </button>
            ) : (
                <div>
                    <button
                        className="btn btn-color me-2"
                        onClick={() => {
                            setOnDelete(false);
                            props.setHide(false);
                            deleteInterest();
                        }}
                    >
                        Confirmer
                    </button>
                    <button
                        className="btn btn-primary mx-1"
                        onClick={() => {
                            setOnDelete(false);
                            props.setHide(false);
                        }}
                    >
                        Retour
                    </button>
                </div>
            )}
        </>
    );
}
