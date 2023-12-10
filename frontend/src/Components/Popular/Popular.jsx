import "./Popular.css";
//import data_Product from "../assets/data";
import { Item } from "../Item/Item";
import { useSelector } from "react-redux";

export const Popular = () => {
  const selectedProduct = useSelector((state) => state.products);

  //filter three product based on category-sensory
  const sensoryProduct = selectedProduct
    .filter((product) => product.category.category_name === "sensory")
    .slice(0, 4);

  return (
    <div className="popular">
      <h1>Sensory products</h1>
      <hr />
      <div className="popular-item">
        {sensoryProduct.map((item, i) => {
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
