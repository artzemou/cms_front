import gql from 'graphql-tag'

export const GET_ALL_ITEMS = gql`
  query allItemsQuery {
    allItems {
      id
      content
      sort
      imgPath
      pageId
    }
  }
`

export const CREATE_ITEM = gql`
  mutation createItem($input: ItemInput!) {
    createItem(input: $input) {
      content
      sort
      imgPath
      pageId
    }
  }
`

export const UPDATE_ITEM = gql`
  mutation updateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      id
      content
      sort
      imgPath
      pageId
    }
  }
`

export const DELETE_ITEM = gql`
  mutation deleteItem($input: DeleteItemInput!) {
    deleteItem(input: $input) {
      id
    }
  }
`
