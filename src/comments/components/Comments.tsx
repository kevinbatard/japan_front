import { useContext, useEffect, useRef, useState } from 'react';
import { TComments } from '../../navbar/components/types/TComments';
import { TRegion } from '../../Types/TRegion';
import '../../comments/components/styles/comments-style.css';
import { UserContext } from '../../context/user-context';
import DeleteComm from './DeleteComm';
import UpdateComm from './UpdateComm';
import { BASE_URL } from '../../constant/URL';

export default function Comments(props: {
    comments: TComments[];
    setComments: React.Dispatch<React.SetStateAction<TComments[]>>;
    dataRegion: TRegion[];
}) {
    const { user } = useContext(UserContext);
    const [hide, setHide] = useState<boolean>(false);

    const { comments, setComments, dataRegion } = props;

    const regionIdRef = useRef(dataRegion[0].id);
    useEffect(() => {
        fetch(`${BASE_URL}/comments/region/${regionIdRef.current}`)
            .then((response) => response.json())
            .then((response) => {
                setComments(response.data);
            })
            .catch((err) => console.error(err));
    }, [regionIdRef, setComments]);

    const commentsList = comments.map((elm, i) => {
        const created = new Date(elm.created_at).toLocaleDateString('fr');

        if (elm.updated_at) {
            new Date(elm.updated_at).toLocaleDateString('fr');
        }
        return (
            <div key={i} className="border p-2 b-color mb-3 rounded-1">
                <div className="d-flex justify-content-between">
                    <div className="fw-bolder">{elm.user.pseudo}</div>
                    {elm.updated_at ? (
                        <div className="f-size">
                            <span className="fw-bolder"> Modifié le</span> :{' '}
                            {elm.updated_at}
                        </div>
                    ) : (
                        <div className="f-size">
                            <span className="fw-bolder">Crée le</span> :{' '}
                            {created}
                        </div>
                    )}
                </div>
                <div className="mt-2 text-break">{elm.content}</div>
                <div className="d-flex justify-content-end mt-3">
                    {hide === false
                        ? user.pseudo === elm.user.pseudo && (
                              <>
                                  <button
                                      className="btn btn-primary me-2"
                                      type="button"
                                      data-bs-target="#updateComment"
                                      data-bs-toggle="modal"
                                  >
                                      Modifier
                                  </button>
                                  <UpdateComm content={elm} />
                              </>
                          )
                        : ''}

                    {user.pseudo === elm.user.pseudo ||
                    user.access_lvl === 2 ? (
                        <DeleteComm idComm={elm.id} setHide={setHide} />
                    ) : null}
                </div>
            </div>
        );
    });

    return <div>{commentsList}</div>;
}
