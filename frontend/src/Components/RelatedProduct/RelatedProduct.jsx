import "./RelatedProduct.css";
//import data_Product from "../assets/data";
import { useSelector } from "react-redux";
import { Item } from "../Item/Item";

export const RelatedProduct = () => {
  const data_Product = useSelector((state) => state.products);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_Product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.product_id}
              name={item.name}
              image={item.image}
              price={item.price}
              // old={item.old}
            />
          );
        })}
      </div>
    </div>
  );
};
