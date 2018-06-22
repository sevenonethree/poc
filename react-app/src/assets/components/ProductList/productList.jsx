import React from "react";
import * as data from "../../../services/graphDataService";
import styles from './styles'
const GRAPHURL = "http://localhost:4000/graphql"
const getProducts = () =>
  data.post(GRAPHURL, {
    query: "{products {id, name, shortDescription}}"
  });


const addProduct = (product) => {
  data.post(GRAPHURL, {
    query:`
      mutation CreateProducts{
        createProduct(product:${JSON.stringify(product)}) {
          id, 
          name, 
          shortDescription
        }
      }
    `
  })
}

// addProduct({id:6, name: "The Sixth Sense", shortDescription: "Seeing dead people."})
addProduct({id:7, name: "7th Heaven", shortDescription: "Controversy at its finest"})

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
    getProducts().then(res => {
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