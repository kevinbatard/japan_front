import { useContext, useEffect, useState } from "react";
import { TComments } from "../../navbar/components/types/TComments";
import { BASE_URL } from "../../constant/URL";
import Cookies from "js-cookie";
import { ToastContext } from "../../context/toast-constant";

export default function UpdateComm(props: {
  dataComms: TComments | null;
  comments: TComments[];
  setComments: React.Dispatch<React.SetStateAction<TComments[]>>;
}) {
  const [bodyContent, setBodyContent] = useState<string | undefined>("");
  const { successToast } = useContext(ToastContext);

  useEffect(() => {
    setBodyContent(props.dataComms?.content);
  }, [props.dataComms]);

  const updater = () => {
    const token = Cookies.get("token");

    fetch(`${BASE_URL}/comments/${props.dataComms!.id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: bodyContent }),
    })
      .then((response) => response.json())
      .then((response) => {
        const newComments = [...props.comments];
        const updateComments = newComments.map((elm: TComments) => {
          if (elm.id === props.dataComms?.id) return response.data;
          return elm;
        });
        props.setComments(updateComments);
        successToast(response.message);
      })
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
                value={bodyContent}
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
            <button className="btn btn-primary" data-bs-dismiss="modal">
              Retour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
