import { useMutation, useQuery } from '@apollo/react-hooks'
import React from 'react'
import useForm from 'react-hook-form'
import { GET_ALL_ITEMS, CREATE_ITEM } from '../queries/items'
import useReactRouter from 'use-react-router'
import Ripple from '../components/Ripple'

export const DroppableNewItem = () => {
  const { location } = useReactRouter()
  const { data } = useQuery(GET_ALL_ITEMS)
  const [createItem] = useMutation(CREATE_ITEM)
  const { register, handleSubmit } = useForm()

  const onSubmit = (input, e) => {
    e.target.reset()

    if (input)
      createItem({
        variables: {
          input: {
            content: input.content,
            sort: null,
            pageId: location.pathname,
          },
        },
        refetchQueries: [{ query: GET_ALL_ITEMS }],
      }).then(res => {
        console.log({
          success: 'The item was created!',
        })
      })
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="New-droppable-item"
    >
      <Ripple
        content={
          <input name="content" placeholder="Type something" ref={register} />
        }
      />
      <Ripple content={<input type="submit" />} />
    </form>
  )
}
