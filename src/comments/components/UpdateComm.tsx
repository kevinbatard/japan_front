import { useContext, useState } from 'react';
import { TComments } from '../../navbar/components/types/TComments';
import { UserContext } from '../../context/user-context';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../constant/URL';

export default function UpdateComm(props: { content: TComments }) {
    const [bodyContent, setBodyContent] = useState('');
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

    const updater = () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.access_token}`,
            },
            body: JSON.stringify({ content: bodyContent }),
        };

        fetch(`${BASE_URL}/comments/${props.content.id}`, options)
            .then((response) => response.json())
            .then((response) => notifySuccess(response.message))
            .catch((err) => console.error(err));
    };

    return (
        <div
            className="modal fade"
            id="updateComment"
            aria-hidden="true"
            aria-labelledby="updateComment"
            tabIndex={12}
        >
            <div className="modal-dialog modal-dialog-centered modal-lg ">
                <div className="modal-content size">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="updateComment">
                            Modification de commentaire :
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className=" modal-body">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                updater();
                            }}
                        >
                            <textarea
                                className="form-control"
                                defaultValue={props.content.content}
                                onChange={(e) => setBodyContent(e.target.value)}
                            ></textarea>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-2"
                                    data-bs-dismiss="modal"
                                >
                                    Envoyer
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                        >
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
