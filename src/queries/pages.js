import gql from 'graphql-tag'

export const GET_ALL_PAGES = gql`
  query allPagesQuery {
    allPages {
      id
      content
      sort
    }
  }
`

export const CREATE_PAGE = gql`
  mutation createPage($input: PageInput!) {
    createPage(input: $input) {
      content
      sort
    }
  }
`

export const UPDATE_PAGE = gql`
  mutation updatePage($input: UpdatePageInput!) {
    updatePage(input: $input) {
      id
      content
      sort
    }
  }
`

export const DELETE_PAGE = gql`
  mutation deletePage($input: DeletePageInput!) {
    deletePage(input: $input) {
      id
    }
  }
`
