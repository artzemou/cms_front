import gql from 'graphql-tag'

export const testQuery = gql`
  mutation testQuery($input: TestInput) {
    test(input: $input) {
      id
      tokenId
    }
  }
`
