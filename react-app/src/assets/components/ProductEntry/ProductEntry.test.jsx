import React from 'react'
import jest from 'jest'
import renderer from "react-test-renderer";
import { MockedProvider } from "react-apollo/test-utils";
import ProductEntry from './ProductEntry'

describe('Product Entry Tests', () => {
  it('can render a product entry component', () => {
    var component = renderer.create(
      <ProductEntry />
    )
    expect(component.root.findAllByType('input').length).toBeGreaterThan(0)
  });
})