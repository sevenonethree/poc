import React from 'react'
import * as data from '../../../services/graphDataService'


const getProducts = () => data
.post('http://localhost:4000/graphql', {query: "products { id, name, shortDescription}"})
   

const Product = (props) => {
  
  return (
    <div className="product">
      {props.name} - {props.shortDescription}
    </div>
  )
}
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: []
    }
  }
  componentWillMount() {
    getProducts().then(res => {
      if (res.data)
      {
        var products = res.data.products.map(((product, key) => <Product key={key} id={product.id} name={product.name} shortDescription={product.shortDescription} />))
        this.setState({products: products})
      }
  })
}
 
render() {
    return (
      <div> 
        Home Scene
        {this.state.products}      
      </div>)
  }

  }

export default Home