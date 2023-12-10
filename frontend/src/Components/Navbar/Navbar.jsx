import "./Navbar.css";
import logo from "../assets/forth.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { ShopContext } from "../../Context/ShopContext";

export const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  //const { getTotalCartItems } = useContext(ShopContext);
  const loggedInUser = useSelector((state) => state.user);
  const userWithCart = useSelector((state) => state.user);
  const total =
    userWithCart && userWithCart.cartItems ? userWithCart.cartItems.length : 0;

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img className="logo" width="100%" src={logo} alt="" />
      </div>
      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("Home");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Home
          </Link>
          {menu === "Home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("social skill");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/social">
            Social skill
          </Link>
          {menu === "social skill" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("sensory");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/sensory">
            Sensory
          </Link>
          {menu === "sensory" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-login-cart">
        {loggedInUser ? (
          <div>
            <div>welcome, {loggedInUser.name}</div>
            <button>Logout</button>
          </div>
        ) : (
          <Link to="/login">
            <button>login</button>
          </Link>
        )}

        <Link to="/cart">
          {" "}
          <FontAwesomeIcon className="cart" icon={faCartShopping} />
        </Link>

        <div className="nav-cart-count">{total}</div>
      </div>
    </div>
  );
};
