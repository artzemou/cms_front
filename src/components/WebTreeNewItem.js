import { useMutation, useQuery } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { GET_ALL_PAGES, CREATE_PAGE } from '../queries/pages'
// import { getPending, setPending } from '../queries/OffLineMutation'
import T from 'i18n-react'
import Typed from 'react-typed'
import useOnlineStatus from '@rehooks/online-status'
var uniqid = require('uniqid')

export const WebTreeNewItem = props => {
  const onlineStatus = useOnlineStatus()
  const [createPage] = useMutation(CREATE_PAGE)
  const { data } = useQuery(GET_ALL_PAGES)
  const [input, setInput] = useState('')
  const { client } = props
  const onChange = e => {
    setInput(e.target.value)
  }
  const onSubmit = e => {
    e.preventDefault()
    //fetch @n@gram
    // fetch('http://localhost:3001/api', {
    //   method: 'post',
    //   headers: {
    //     'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //   },
    //   body: `content=${input}`,
    // })
    //   .then(function(response) {
    //     return response.json()
    //   })
    //   .then(function(data) {
    //     console.log('Request succeeded with JSON response', data)
    //   })
    //   .catch(function(error) {
    //     console.log('Request failed', error)
    //   })

    if (input) {
      console.log(onlineStatus)
      if (!onlineStatus) {
        client.writeQuery({
          query: GET_ALL_PAGES,
          data: {
            allPages: [
              ...data.allPages,
              {
                id: uniqid(),
                content: input,
                sort: data.allPages.length++,
                __typename: 'Page',
              },
            ],
          },
        })
        setInput('')
      }
      createPage({
        variables: {
          input: {
            content: input,
            sort: data.allPages.length++,
          },
        },
        refetchQueries: [{ query: GET_ALL_PAGES }],
      }).then(res => {
        setInput('')
        console.log({
          success: 'The page was created!',
        })
      })
    } else {
      alert('il faut saisir un titre')
    }
  }
  return (
    <li className="New-droppable-item">
      <form
        autoComplete="off"
        onSubmit={onSubmit}
        className="New-droppable-item-content"
      >
        {/* <Typed strings={['Here you can find anything']} typeSpeed={40} /> */}
        {/* <span className="input input--nao">
          <input
            className="input__field input__field--nao"
            type="text"
            id="input-2"
          />
          <label className="input__label input__label--nao" htmlFor="input-2">
            <span className="input__label-content input__label-content--nao">
              City
            </span>
          </label>
          <svg
            className="graphic graphic--nao"
            width="300%"
            height="100%"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
          >
            <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"></path>
          </svg>
        </span> */}
        <Typed
          className="Typed-input"
          strings={[
            T.translate('newItem'),
            T.translate('typeNewTitle'),
            T.translate('validate'),
          ]}
          typeSpeed={70}
          smartBackspace
          attr="placeholder"
          backSpeed={60}
          backDelay={250}
          loop
          // loop
        >
          <input
            autoFocus
            onChange={onChange}
            name="content"
            type="text"
            value={input}
          />
          {/* <span className="typed-cursor"></span> */}
        </Typed>
        <div className="New-droppable-item-toolbar">
          <input type="submit" />
        </div>
      </form>
    </li>
  )
}
