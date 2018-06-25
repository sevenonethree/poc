import React from "react"
import * as productData from "../../../services/graphDataService"
import { Query } from 'react-apollo'
import styles from './styles'

// data.addProduct({id:9, name: "Ninety Nine Problems", shortDescription: "You know what ain't one."})

const Product = props => {
  return (
    <div className="product">
      {props.name} - {props.shortDescription}
    </div>
  )
}


const ProductList = (props) =>  {
  return (
    <Query query={productData.GETPRODUCTSQUERY}>
      {({loading, error, data}) => {
        if (loading) return <p>Loading</p>

        if (error) return <p>Error: {JSON.stringify(error)}</p>

        return (
            <ul>
              {
                data.products.map(((p, key) =>
                  <li key={key} className="product-item">
                    <Product
                      id={p.id}
                      name={p.name}
                      shortDescription={p.shortDescription}
                    />
                  </li>))
              }
            </ul>
            )
        }
      }
    </Query>)
}

export default ProductList
