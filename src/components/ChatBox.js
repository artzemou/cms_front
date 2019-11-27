import React, { Component, Fragment } from 'react'
import MessagesList from './MessagesList.js'
import '../styles/ChatBox.css'

export default class ChatBox extends Component {
  render() {
    return (
      <Fragment>
        <div>
          <MessagesList />
        </div>
      </Fragment>
    )
  }
}
