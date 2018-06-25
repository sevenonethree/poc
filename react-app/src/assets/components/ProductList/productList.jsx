import React from "react";
import * as data from "../../../services/graphDataService";
import styles from './styles'
const GRAPHURL = "http://localhost:4000/graphql"

// data.addProduct({id:9, name: "Ninety Nine Problems", shortDescription: "You know what ain't one."})

const Product = props => {
  return (
    <div className="product">
      {props.name} - {props.shortDescription}
    </div>
  );
};

class ProductList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: []
    }
  }
  componentWillMount() {
    data.getProducts().then(res => {
      if (res.data) {
        var products = res.data.products.map((product, key) => (
          <li key={key} className="product-item"><Product
            id={product.id}
            name={product.name}
            shortDescription={product.shortDescription}
          /></li>
        ));
        this.setState({ products: products });
      }
    });
  }

  render() {
    return(
      <ul>
        {this.state.products}
      </ul>
    ) ;
  }
}

export default ProductList;