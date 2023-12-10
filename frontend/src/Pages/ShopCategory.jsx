//import { useContext } from 'react'
import "./CSS/ShopCategory.css";
//import { ShopContext } from '../Context/ShopContext'
import { Item } from "../Components/Item/Item";
import { useSelector } from "react-redux";

export const ShopCategory = (props) => {
  const all_Product = useSelector((state) => state.products);
  //const {all_Product} = useContext(ShopContext)
  return (
    <div className="shop-category">
      <div className="shopcategory-indexshort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          sort by <i className="fa fa-caret-down"></i>
        </div>
      </div>
      <div className="shopcategory-products">
        {all_Product.map((item, i) => {
          if (props.category === item.category.category_name) {
            return (
              <Item
                key={i}
                id={item.product_id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore more</div>
    </div>
  );
};
