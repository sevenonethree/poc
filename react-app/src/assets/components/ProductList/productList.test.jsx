import "unfetch/polyfill";

import wait from "waait";
import React from "react";
import ProductList from "./productList";
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import * as productData from "../../../services/graphDataService";
import products from "./mockProducts";
import ProductQuery from "./ProductQuery";

const allProducts = [
  {
    request: {
      query: productData.GETPRODUCTSQUERY,
      variables: {}
    },
    result: {
      data: products
    }
  }
];

const singleProduct = id => [
  {
    request: {
      query: productData.FINDPRODUCTQUERY,
      variables: {"id": id}
    },
    result: {
      data: {
        products: [products.products[id - 1]]
      }
    }
  }
];

const productByName = name => [
  {
    request: {
      query: productData.FINDPRODUCTQUERY,
      variables: {"name": name}
    },
    result: {
      data: {
        products: products.products.filter((p) => p.name == name)
      }
    }
  }
];

test("Can render all products", async () => {
  const component = renderer.create(
    <MockedProvider mocks={allProducts} addTypename={false}>
      <ProductList />
    </MockedProvider>
  );

  await wait(0);
  const li = component.root.findAllByType("li");

  expect(li.length).toBe(9);
});

test("Can render a single product", async () => {
  var productIDToReturn = 3;
  const component = renderer.create(
    <MockedProvider mocks={singleProduct(productIDToReturn)} addTypename={false}>
      <ProductQuery query={productData.FINDPRODUCTQUERY} variables={{id: productIDToReturn}}>
        {(products, { isLoading, isEmpty, isError }) => {
          return products.map((p, key) => <li key={key}>{p.id} - {p.name}</li>)
        }}
      </ProductQuery>    
      {/* <ProductList id={productIDToReturn} /> */}
    </MockedProvider>
  );

  await wait(0)
  const li = component.root.findAllByType('li')
  expect(li.length).toBe(1)
});

test('Can find product by name', async () => {
  var productName = "Product A"
  var variables = {
    name: productName
  }
  const component = renderer.create(
    <MockedProvider mocks={productByName(productName)} addTypename={false}>
      <ProductQuery query={productData.FINDPRODUCTQUERY} variables={variables}>
        {(products, { isLoading, isEmpty, isError }) => {
          return products.map((p, key) => <li key={key}>{p.id} - {p.name}</li>)
        }}
      </ProductQuery>    
      {/* <ProductList id={productIDToReturn} /> */}
    </MockedProvider>
  )

  await wait(0)
  const li = component.root.findAllByType('li')
  expect(li.length).toBe(1)
})

