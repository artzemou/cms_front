import React, { useEffect, useRef } from 'react'
// import T from 'i18n-react'
// var uniqid = require('uniqid')
var count = 0

function TypingText(props) {
  const inputEl = useRef()

  useEffect(() => {
    count = 0
  }, [])

  const randDelay = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const printLetter = (string, inputEl) => {
    console.log(string)
    let letters = string.split('')
    setTimeout(() => {
      if (count < string.length) {
        if (inputEl.current) {
          inputEl.current.placeholder += letters[count]
          count++
          printLetter(string, inputEl)
        }
      }
    }, randDelay(100, 180))
  }
  const onChange = e => {
    props.setInput(e.target.value)
  }
  console.log(inputEl)
  return (
    <>
      <input
        className="Typing-text"
        ref={inputEl}
        name={props.name}
        beforeinput={printLetter(props.text, inputEl)}
        onChange={onChange}
        type="text"
      />
    </>
  )
}

export default TypingText
