import React from 'react'
import useForm from 'react-hook-form'
import { GET_ALL_P_AGES, UPDATE_P_AGE } from '../queries/p_ages'
import { useMutation } from '@apollo/react-hooks'

function WebSubTreeEditableItem(props) {
  const [updatePage] = useMutation(UPDATE_P_AGE)
  // const [id, setId] = useState(null)

  const { register, handleSubmit } = useForm()
  const onSubmit = (input, e) => {
    // e.target.reset()

    if (input)
      updatePage({
        variables: {
          input: {
            id: props.value.id,
            sort: props.value.sort,
            content: input.content,
            parentId: props.value.parentId,
          },
        },
        refetchQueries: [{ query: GET_ALL_P_AGES }],
      }).then(res => {
        console.log({
          success: 'The item was updated!',
        })
      })
  }
  return (
    <>
      <ul>
        <li className="Droppable-item-index">{props.value.sort + 1}</li>
        <li className="Droppable-item-content">
          <form autoComplete="off">
            <input
              onChange={handleSubmit(onSubmit)}
              name="content"
              placeholder={props.value.content || 'Type something'}
              ref={register}
            />
          </form>
        </li>
      </ul>
    </>
  )
}

export default WebSubTreeEditableItem
