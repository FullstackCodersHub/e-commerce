import { useState } from "react";
import { useDispatch } from "react-redux";
import "./DescriptionsBox.css";
import { newComment } from "../../reducers/productReducer";

export const DescriptionsBox = (props) => {
  const dispatch = useDispatch();
  const [showDescription, setShowDescription] = useState(true);
  const [addComment, setaddComment] = useState("");

  const handleInputChange = (event) => {
    setaddComment(event.target.value);
  };

  const handleAddcomment = (object) => {
    dispatch(newComment(object.product_id, { comment_text: addComment }));
    setaddComment("");
  };
  const handleTabClick = (tab) => {
    if (tab === "description") {
      setShowDescription(true);
    } else if (tab === "reviews") {
      console.log("reviews");
      setShowDescription(false);
    }
  };
  return (
    <div className="description-box">
      <div className="block-tabs">
        <div
          className={showDescription ? "tabs active-tabs" : "tabs"}
          onClick={() => handleTabClick("description")}
        >
          Description
        </div>
        <div
          className={!showDescription ? "tabs active-tabs" : "tabs"}
          onClick={() => handleTabClick("reviews")}
        >
          Reviews(122)
        </div>
      </div>
      <div className="content-tab">
        {showDescription ? (
          <div className="content active-content">
            <h2>Description</h2>
            <hr />
            <p>{props.product.description}</p>
          </div>
        ) : (
          <div className="content">
            <h2>Reviews</h2>
            <hr />
            <div className="comments-container">
              <div className="comments">
                {props.product.comments.map((comment) => (
                  <div key={comment.comment_id} className="comment">
                    <strong>{comment.user.name}: </strong>
                    {comment.comment_text}
                  </div>
                ))}
              </div>
              <div className="add-comment">
                <input
                  type="text"
                  value={addComment}
                  onChange={handleInputChange}
                />
                <button onClick={() => handleAddcomment(props.product)}>
                  Add comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
