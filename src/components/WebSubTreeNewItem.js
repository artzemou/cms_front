import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import { GET_ALL_P_AGES, CREATE_P_AGE } from '../queries/p_ages'
import T from 'i18n-react'
import Typed from 'react-typed'

export const WebSubTreeNewItem = props => {
  const [createP_age] = useMutation(CREATE_P_AGE)
  const [input, setInput] = useState('')

  const onChange = e => {
    console.log(e.target.value)
    setInput(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    if (input)/*  */
      createP_age({
        variables: {
          input: {
            parentId: props.parentId,
            content: input,
            sort: null,
            // sort: data.allP_ages.length++,
          },
        },
        refetchQueries: [{ query: GET_ALL_P_AGES }],
      }).then(res => {
        console.log({
          success: 'The p_age was created!',
        })
      })
    else {
      alert('il faut saisir un titre')
    }
  }
  return (
    <form autoComplete="off" onSubmit={onSubmit} className="New-droppable-item">
      {/* <h3>Créer un sous repertoire</h3> */}
      <Typed
        strings={[T.translate('newItem')]}
        typeSpeed={40}
        attr="placeholder"
      >
        <input onChange={onChange} name="content" type="text" />
      </Typed>
      <input type="submit" />
    </form>
  )
}
