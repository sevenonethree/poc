import React from 'react'
import * as data from '../../../services/graphDataService'
import ProductList from '../../components/ProductList/productList'

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
      </div>)
  }

  }

export default Home