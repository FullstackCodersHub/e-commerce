import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Model.css";
import { updateUser } from "../../reducers/userReducer";

export const Model = ({ onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [address, setAddress] = useState(user ? user.address : "");
  const [contact, setContact] = useState(user ? user.contact : "");
  const [name, setName] = useState(user ? user.name : "");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUser({ name, address, contact }));

    //onSubmit({ address, contact });
  };

  return (
    <>
      <div className="modal-wrapper"></div>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Update your Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
            <label>
              Contact:
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </label>
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    </>
  );
};
