import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { persistCache } from 'apollo-cache-persist'
import { RetryLink } from 'apollo-link-retry'
import { concat } from 'apollo-link'

console.log(process.env)
const httpLink = createUploadLink({ uri: process.env.REACT_APP_URI })
// Set up your cache.
const cache = new InMemoryCache()
// Set up cache persistence.
export const waitOnCache = persistCache({
  cache,
  storage: window.localStorage,
  debug: true,
})

const retry = new RetryLink({ attempts: { max: Infinity } })
const link = concat(retry, httpLink)
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
  },
  query: {
    fetchPolicy: 'cache-and-network',
  },
}
export const client = new ApolloClient({
  link,
  cache,
  defaultOptions,
})
