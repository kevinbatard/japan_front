import { useState } from "react";
import { TComments } from "../../navbar/components/types/TComments";
import { TRegion } from "../../Types/TRegion";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function NewCommentModal(props: {
  comments: TComments[];
  setComments: React.Dispatch<React.SetStateAction<TComments[]>>;
  dataRegion: TRegion[];
}) {
  const [content, setContent] = useState<string>("");

  const notifySuccess = (msg: string) =>
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  const notifyError = (msg: string) =>
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });

  const newComment = () => {
    const regionId = props.dataRegion[0].id;

    const accessToken = Cookies.get("token");

    fetch("http://localhost:8000/api/comments", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        content,
        region_id: regionId,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.StatusCode === 201) {
          const newComments = [...props.comments];
          newComments.unshift(response.data);
          props.setComments(newComments);
          return notifySuccess(response.message);
        } else {
          return notifyError(response.message);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div
        className="modal fade"
        id="newComment"
        aria-hidden="true"
        aria-labelledby="newComment"
        tabIndex={12}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg ">
          <div className="modal-content size">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="newComment">
                Ajouter un commentaire :
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
                  newComment();
                  setContent("");
                }}
              >
                <textarea
                  className="form-control"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
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
          </div>
        </div>
      </div>
    </div>
  );
}
