import React, { Component, Fragment } from 'react'
import io from 'socket.io-client'
// var styleSheet = document.styleSheets[1]
// this.socket = io(window.location.hostname)
const socket = io('https://quiet-brook-58343.herokuapp.com/')

export default class MessagesList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      username: false,
      avatarColor: '',
      message: '',
      messages: [],
      isMounted: false,
    }

    this.getRandomColor = this.getRandomColor.bind(this)
    this.setUserId = this.setUserId.bind(this)
    this.sendMessage = this.sendMessage.bind(this)
    this.addMessage = this.addMessage.bind(this)
  }

  componentDidMount() {
    const _this = this
    socket.on('RECEIVE_MESSAGE', data => {
      _this.setState({ userId: data.id })
      _this.addMessage(data.msg)
    })
  }
  componentWillUnmount() {
    socket.removeListener('RECEIVE_MESSAGE')
  }

  addMessage(data) {
    this.setState({ messages: [...this.state.messages, data] })
  }

  sendMessage(e) {
    e.preventDefault()
    socket.emit('SEND_MESSAGE', {
      userId: this.state.userId,
      author: this.state.username,
      message: this.state.message,
      avatarColor: this.state.avatarColor,
    })
    this.setState({ message: '' })
  }

  setUserId(id) {
    this.setState({ userId: id })
  }

  getRandomColor() {
    const colorCodes = [
      { color: '#333333', background: '#2196F3' },
      { color: '#ffffff', background: '#9C27B0' },
      { color: '#333333', background: '#1faa00' },
      { color: '#333333', background: '#ff3d00' },
      { color: '#ffffff', background: '#aa00ff' },
      { color: '#333333', background: '#42a5f5' },
    ]
    var color =
      colorCodes[Math.floor(Math.random() * Math.floor(colorCodes.length))]
    this.setState({ avatarColor: color })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // document.querySelector(
  //   //   '.scrollableContent'
  //   // ).scrollTop = document.querySelector('.scrollable').offsetHeight
  //   // if (prevState.userId === this.state.userId) {
  //   //   let style =
  //   //     `.bubble.` +
  //   //     this.state.username +
  //   //     ` {
  //   //       flex-direction: row-reverse;
  //   //   }
  //   //   `
  //   //   styleSheet.insertRule(style, styleSheet.cssRules.length)
  //   // } else {
  //   //   let style =
  //   //     `.bubble.` +
  //   //     this.state.username +
  //   //     ` {
  //   //       flex-direction: row;
  //   //   }
  //   //   `
  //   //   styleSheet.insertRule(style, styleSheet.cssRules.length)
  //   // }
  // }

  render() {
    return (
      <Fragment>
        <div className="messagesList">
          <div className="messagesListContent">
            <div className="scrollableContent">
              <div className="scrollable">
                {this.state.messages.map((message, index) => {
                  return (
                    <div className={`${message.author} bubble`} key={index}>
                      <div
                        style={{
                          background: message.avatarColor.background,
                          color: message.avatarColor.color,
                        }}
                        className={
                          message.author
                            ? `${message.author.charAt(0).toUpperCase()} avatar`
                            : 'avatar'
                        }
                      >
                        <span>
                          {message.author
                            ? `${message.author.charAt(0).toUpperCase()}`
                            : '?'}
                        </span>
                      </div>
                      <div className="message">
                        <span className="innerText">{message.message}</span>
                        <span className="date">
                          le {new Date().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={this.sendMessage}>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username ? this.state.username : ''}
            onChange={e => this.setState({ username: e.target.value })}
            className={this.state.username ? 'hidden' : ''}
          />
          <div style={{ display: 'flex' }}>
            <input
              placeholder="Message"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              className={this.state.username ? '' : 'hidden'}
              ref={input => (input != null ? input.focus() : null)}
              style={{ width: 300 }}
            />
            <input
              type="submit"
              value="Send"
              ref={this.getRandomColor}
              style={{ marginLeft: '1rem' }}
            />
          </div>
        </form>
      </Fragment>
    )
  }
}
