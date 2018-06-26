import React from "react";
import ProductQuery from "./ProductQuery";

export const Product = props => {
  return (
    <div className="product">
      {props.name} - {props.shortDescription}
    </div>
  );
};

const ProductList = props => {
  return (
    <ProductQuery>
      {(products, { isLoading, isEmpty, isError }) => {
        if (isLoading) {
          return <div>Loading</div>;
        }

        if (isEmpty) {
          return <div>No items match your postal code</div>;
        }

        if (isError) {
          return <div>There was an error processing your search</div>;
        }

        return (
          <ul>
            {products.map(product => (
              <li key={product.id}>
                <Product
                  name={product.name}
                  shortDescription={product.shortDescription}
                />{" "}
              </li>
            ))}
          </ul>
        );
      }}
    </ProductQuery>
  );
};
export default ProductList;
