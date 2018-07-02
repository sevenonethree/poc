import React from "react";
import { Query } from "react-apollo";

const ProductQuery = props => {
  return (
    <Query query={props.query} variables={props.variables}>
      {props2 => {
        const { isLoading, isEmpty, isError, products } = mapDataToProps(
          props2
        );
        return (
          props.children &&
          props.children(products, { isLoading, isEmpty, isError })
        );
      }}
    </Query>
  );
};

const mapDataToProps = props => {
  var { data, error, loading } = props;
  const isLoading = loading;
  const isEmpty = !!data.products && data.products.length === 0;
  const isError = error;
  const products = data.products || [];
  return { isLoading, isEmpty, isError, products };
};

export default ProductQuery;
