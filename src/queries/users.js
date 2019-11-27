import gql from 'graphql-tag'
// const networkStatus = navigator.onLine ? 'online' : 'offline'

export const GET_ALL_USERS = gql`
  query allUsersQuery {
    allUsers {
      id
      email
      firstName
      lastName
      roles
    }
  }
`

export const SIGN_UP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input)
  }
`
export const LOG_IN = gql`
  mutation logIn($input: LogInInput!) {
    logIn(input: $input)
  }
`
