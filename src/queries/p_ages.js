import gql from 'graphql-tag'

export const GET_ALL_P_AGES = gql`
  query allP_agesQuery {
    allP_ages {
      id
      content
      sort
      parentId
    }
  }
`

export const CREATE_P_AGE = gql`
  mutation createP_age($input: P_ageInput!) {
    createP_age(input: $input) {
      content
      sort
    }
  }
`

export const UPDATE_P_AGE = gql`
  mutation updateP_age($input: UpdateP_ageInput!) {
    updateP_age(input: $input) {
      id
      content
      sort
    }
  }
`

export const DELETE_P_AGE = gql`
  mutation deleteP_age($input: DeleteP_ageInput!) {
    deleteP_age(input: $input) {
      id
    }
  }
`
