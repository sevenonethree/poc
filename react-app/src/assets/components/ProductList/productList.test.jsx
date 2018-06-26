import "unfetch/polyfill"

import wait from 'waait'
import React from "react"
import ProductList, { Product } from "./productList"
import renderer from "react-test-renderer"
import { MockedProvider } from "react-apollo/test-utils"
import * as productData from "../../../services/graphDataService"


const mocks = [
  {
    request: {
      query: productData.GETPRODUCTSQUERY,
      variables: {}
    },
    result: {
      data: {
        products: {
          id: "1",
          name: "Product 1",
          shortDescription: "I am a product."
        }
      }
    }
  }
]

test("Can render a product", async () => {

  const component = renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ProductList />
    </MockedProvider>
  )

  await wait(0)
})
