import React from 'react'
import useForm from 'react-hook-form'
import { GET_ALL_PAGES, UPDATE_PAGE } from '../queries/pages'
import { useMutation } from '@apollo/react-hooks'

function WebTreeEditableItem(props) {
  const [updatePage] = useMutation(UPDATE_PAGE)
  // const [id, setId] = useState(null)

  const { register, handleSubmit } = useForm()
  const onSubmit = (input, e) => {
    // e.target.reset()

    if (input)
      updatePage({
        variables: {
          input: {
            id: props.data.id,
            sort: props.data.sort,
            content: input.content,
          },
        },
        refetchQueries: [{ query: GET_ALL_PAGES }],
      }).then(res => {
        console.log({
          success: 'The item was updated!',
        })
      })
  }
  return (
    <>
      <li className="Droppable-item-index">{props.data.sort + 1}</li>
      <li className="Droppable-item-content">
        <form autoComplete="off">
          <input
            onChange={handleSubmit(onSubmit)}
            name="content"
            placeholder={props.data.content || 'Type something'}
            ref={register}
          />
        </form>
      </li>
    </>
  )
}

export default WebTreeEditableItem
