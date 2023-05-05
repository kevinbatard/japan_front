import { useState } from 'react';
import { toast } from 'react-toastify';
import '../components/styles/comments-style.css';
import { BASE_URL } from '../../constant/URL';
import Cookies from 'js-cookie';
import { TComments } from '../../navbar/components/types/TComments';

export default function DeleteComm(props: {
    idComm: number;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
    comments: TComments[];
    setComments: React.Dispatch<React.SetStateAction<TComments[]>>;
}) {
    const [onDelete, setOnDelete] = useState<boolean>(false);

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
    const token = Cookies.get('token');
    const deleteComm = () => {
        fetch(`${BASE_URL}/comments/${props.idComm}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((response) => {
                props.setComments(
                    props.comments.filter((item) => item.id !== props.idComm)
                );
                notifySuccess(response.message);
            })
            .catch((err) => console.error(err));
    };

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
                            deleteComm();
                            setOnDelete(false);
                            props.setHide(false);
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
