//import { useContext } from "react";
//import { ShopContext } from "../Context/ShopContext";
import { useMatch } from "react-router-dom";
import { Breadcrums } from "../Components/Breadcrums/Breadcrums";
import { ProductDisplay } from "../Components/ProductDisplay/ProductDisplay";
import { DescriptionsBox } from "../Components/DescriptionBox/DescriptionsBox";
import { RelatedProduct } from "../Components/RelatedProduct/RelatedProduct";
import { useSelector } from "react-redux";

export const Product = () => {
  const all_Product = useSelector((state) => state.products);
  const match = useMatch("/product/:id");
  const product = match
    ? all_Product.find((item) => item.product_id === Number(match.params.id))
    : null;

  //const { all_Product } = useContext(ShopContext);
  // const { productId } = useParams();
  // console.log(productId, "productId");
  // const product = all_Product.find((e) => e.product_id === productId);
  // console.log(product, "from product page");

  return (
    <div>
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DescriptionsBox product={product} />
      <RelatedProduct />
    </div>
  );
};
