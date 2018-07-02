import React from 'react'
import * as data from '../../../services/graphDataService'
import ProductList from '../../components/ProductList/productList'
import ProductEntry from '../../components/ProductEntry/ProductEntry'
/*
  Home => [Product List] STATE (Products)

 */
class Home extends React.Component {
  constructor(props) {
    super(props);
  }

 
render() {
    return (
      <div> 
        Home Scene
        <ProductList />
        <ProductEntry />
      </div>)
  }

  }

export default Home