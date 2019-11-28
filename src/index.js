import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import App from './App'
import { client, waitOnCache } from './apollo'
import { HelmetProvider } from 'react-helmet-async'
import registerServiceWorker from './registerServiceWorker'

waitOnCache.then(() => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <HelmetProvider>
        <App client={client} />
      </HelmetProvider>
    </ApolloProvider>,
    document.getElementById('root')
  )
})
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


// registerServiceWorker()
