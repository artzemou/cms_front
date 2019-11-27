import React, { useState } from 'react'
import Routes from './router/Routes'

import './styles/normalize.css'
import './styles/App.css'

const Context = React.createContext()
const initialState = {
  authToken: sessionStorage.getItem('AUTH_TOKEN'),
  date: Date(),
  locale: sessionStorage.getItem('LOCALE') || 'fr-FR',
}

function App(props) {
  const [state, updateAuthToken] = useState(initialState)
  return (
    <Context.Provider value={{ state: state, updateAuthToken, ...props }}>
      <Context.Consumer>{props => <Routes {...props} />}</Context.Consumer>
    </Context.Provider>
  )
}

export default App
