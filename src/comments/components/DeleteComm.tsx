import { useContext, useState } from 'react';
import { UserContext } from '../../context/user-context';
import { toast } from 'react-toastify';
import '../components/styles/comments-style.css';
import { BASE_URL } from '../../constant/URL';

export default function DeleteComm(props: {
    idComm: number;
    setHide: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [onDelete, setOnDelete] = useState<boolean>(false);
    const { user } = useContext(UserContext);

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

    const deleteComm = () => {
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.access_token}`,
            },
        };

        fetch(`${BASE_URL}/comments/${props.idComm}`, options)
            .then((response) => response.json())
            .then((response) => notifySuccess(response.message))
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
