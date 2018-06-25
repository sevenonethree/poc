import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });
export var getProducts = () => {
  return client.query({
    query: gql`
      {
        products {
          id
          name
          shortDescription
        }
      }
    `
  });
};

export var addProduct = product => {
  client.mutate({
    mutation: gql`
          mutation CreateProducts{
            createProduct(product:{
              id:${product.id}, 
              name: "${product.name}", 
              shortDescription: "${product.shortDescription}" 
            }) {
              id, 
              name, 
              shortDescription
            }
          }
        `
  });
};
