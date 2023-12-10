/* eslint-disable react/prop-types */
import "./Banner.css";

export const Banner = (props) => {
  return (
    <div className="container">
      <div className="banner">
        <div className="banner-text">
          <h2>{props.category}</h2>
        </div>
      </div>
    </div>
  );
};
