import React from "react";
import ProductQuery from "./ProductQuery";
import * as productData from '../../../services/graphDataService'
export const Product = props => {
  return (
    <div className="product">
      {props.name} - {props.shortDescription}
    </div>
  );
};

const ProductList = props => {
    return (
      <ProductQuery query={productData.GETPRODUCTSQUERY}>
        {(products, { isLoading, isEmpty, isError }) => {
          if (isLoading) {
            return <div>Loading</div>;
          }
  
          if (isEmpty) {
            return <div>This is empty</div>;
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
                  />
                </li>
              ))}
            </ul>
          );
        }}
      </ProductQuery>
    );
};
export default ProductList;
