import "./ProductDisplay.css";
//import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
//import { addCart } from "../../reducers/cartReducer";

import { faStarHalfStroke } from "@fortawesome/free-regular-svg-icons";
import { joinCart } from "../../reducers/userReducer";

//import { ShopContext } from "../../Context/ShopContext";

export const ProductDisplay = (props) => {
  const { product } = props;

  const dispatch = useDispatch();
  const handleAddToCart = () => {
    //dispatch(addCart(product.product_id));
    dispatch(joinCart(product.product_id));
  };
  //const { addToCart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStarHalfStroke} />

          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          {/* <div className="productdisplay-right-price-old">Rs{product.price}</div> */}
          <div className="productdisplay-right-price-new">
            Rs{product.price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          Autism-Products.com proudly introduces the Pencil Fidgets (Set of 4
          Pencils with Fidgets)! Have kids who break their pencils? Chew off
          their erasers? Destroy all their writing tools? Pencil Fidgets are the
          answer. This set of fidgets are a finger fantasy. Set includes four
          pencils, each with a different fidget (Spin Snapper, Nut N Bolt,
          Wingnut and Bump N Run Maze). So let them fidget and focus. Pencil
          style may vary. Set of 4 Includes 4 pencils with fidgets Great for
          students that love to fidget Slide, spin, pull, or bump the pencil
          fidgets Note: Pencil style may vary
        </div>
        {/* <div className="productdisplay-right-size">
          <h1>Select size</h1>
          <div className="productdisplay-right-size">
            <div>S</div>
            <div>L</div>
          </div>
        </div> */}
        <button onClick={handleAddToCart}>Add to CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>
          {product.category.category_name}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern,latest
        </p>
      </div>
    </div>
  );
};
