//import { useContext } from "react";
import "./CartItems.css";
//import { ShopContext } from "../../Context/ShopContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Model } from "../Model/Model";

import {
  increaseQuantity,
  minusQuantity,
  removeCart,
} from "../../reducers/userReducer";
import { useState } from "react";
export const CartItems = () => {
  const [modal, setModal] = useState(false);

  const handleOpenModel = () => {
    setModal(true);
  };
  const handleCloseModel = () => {
    setModal(false);
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const cartItem = useSelector((state) => state.user);

  const subTotal =
    cartItem === null || cartItem.cartItems === undefined
      ? null
      : cartItem.cartItems.reduce(
          (accumulator, currentVal) => accumulator + currentVal.price,
          0
        );

  const getProductDetails = (productId) => {
    return products.find((product) => product.product_id === productId);
  };

  const updateQuantity = (obj) => {
    dispatch(increaseQuantity(obj));
  };
  const decreaseQuantity = (obj) => {
    dispatch(minusQuantity(obj));
  };
  const removeFromCart = (id) => {
    dispatch(removeCart(id));
  };

  return (
    <div className="cartItems">
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>remove</p>
      </div>
      <hr />
      {cartItem === null || cartItem.cartItems === undefined
        ? null
        : cartItem.cartItems.map((item) => {
            const product = getProductDetails(item.product_id);

            if (product) {
              return (
                <div key={item.id}>
                  <div className="cartitem-format cartitem-format-main">
                    <img
                      src={product.image}
                      alt=""
                      className="carticon-product-icon"
                    />
                    <p>{product.name}</p>
                    <p>Rs{product.price}</p>

                    <div className="cartitem-quantity-display">
                      <button
                        className="quantity-btn"
                        onClick={() => decreaseQuantity(item)}
                      >
                        -
                      </button>
                      <p className="quantity">{item ? item.quantity : 0}</p>
                      <button
                        className="quantity-btn"
                        onClick={() => updateQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                    <p>Rs {item ? item.price : 0}</p>

                    <FontAwesomeIcon
                      className="cartitems-remove-icon"
                      icon={faXmark}
                      onClick={() => {
                        removeFromCart(item.id);
                      }}
                    />
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}
      <div className="cartitems-down">
        <div className="cartItems-total">
          <h1>carts Totals</h1>
          <div>
            <div className="cartitems-total-items">
              <p>Subtotal</p>
              <p>Rs{subTotal}</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-items">
              <h3>Total</h3>
              <h3>Rs {subTotal}</h3>
            </div>
          </div>
          <button onClick={handleOpenModel}>PROCEED TO CHECKOUT</button>
          {modal && <Model onClose={handleCloseModel} />}
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code,Enter it her</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
