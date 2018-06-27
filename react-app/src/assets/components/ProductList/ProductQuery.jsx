import React from "react";
import * as productData from "../../../services/graphDataService";
import { graphql } from "react-apollo";

export class ProductsQuery extends React.Component {


  render() {
    const { isLoading, isEmpty, isError, products, children } = this.props;
    return children && children(products, { isLoading, isEmpty, isError });
  }
}

const mapDataToProps = ({ data }) => {
  const isLoading = data.loading;
  const isEmpty = !!data.products && data.products.length === 0;
  const isError = !!data.error;
  const products = data.products || [];

  return { isLoading, isEmpty, isError, products };
};

export default graphql(productData.GETPRODUCTSQUERY, {
  props: mapDataToProps
})( ProductsQuery );
