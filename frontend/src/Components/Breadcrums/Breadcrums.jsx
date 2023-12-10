import "./Breadcrums.css";

export const Breadcrums = (props) => {
  const { product } = props;
  console.log(product, "from bedscrum");

  return (
    <div className="breadcrum">
      Home<i className="fa fa-chevron-right"></i>
      {product.category.category_name}
      <i className="fa fa-chevron-right"></i>
      {product.name}
    </div>
  );
};
