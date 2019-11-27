import React from 'react'
import useForm from 'react-hook-form'
import { Upload } from './Upload'
import { GET_ALL_ITEMS, UPDATE_ITEM } from '../queries/items'
import { useMutation } from '@apollo/react-hooks'
import useReactRouter from 'use-react-router'

function EditableItem(props) {
  const { location } = useReactRouter()
  const [updateItem] = useMutation(UPDATE_ITEM)
  // const [id, setId] = useState(null)

  const { register, handleSubmit } = useForm()
  const onSubmit = (data, e) => {
    // e.target.reset()
    if (data)
      updateItem({
        variables: {
          input: {
            id: props.data.id,
            sort: props.data.sort,
            content: data.content,
            imgPath: props.data.imgPath || null,
            pageId: location.pathname,
          },
        },
        refetchQueries: [{ query: GET_ALL_ITEMS }],
      }).then(res => {
        console.log({
          success: 'The item was updated!',
        })
      })
  }

  return (
    <div>
      <div className="Editable-item-toolbar">
        <button
          onClick={() =>
            props.isDraggable
              ? props.setIsDraggable(false)
              : props.setIsDraggable(true)
          }
        >
          Drag / Edit
        </button>
        <button onClick={props.onDelete}>Delete</button>
        <button>Sélectionner une image</button>
      </div>
      <div className="Editable-item-index">{props.data.sort + 1}</div>
      <Upload {...props} />
      <div>
        <input
          onChange={handleSubmit(onSubmit)}
          name="content"
          placeholder={props.data.content || 'Type something'}
          ref={register}
        />

        {/* <div>{props.data.id}</div> */}
      </div>
    </div>
  )
}

export default EditableItem
