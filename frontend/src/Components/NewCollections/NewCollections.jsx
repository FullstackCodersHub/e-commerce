import "./NewCollection.css";
//import new_Collection from "../assets/new-collections";
import { Item } from "../Item/Item";
import { useSelector } from "react-redux";

export const NewCollections = () => {
  const selectedProduct = useSelector((state) => state.products);
  const socialProduct = selectedProduct
    .filter((product) => product.category.category_name === "social skill")
    .slice(0, 4);
  return (
    <div className="new-collections">
      <h1>Social Skill Material</h1>
      <hr />
      <div className="collections">
        {socialProduct.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.product_id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};
