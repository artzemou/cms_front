import React from 'react'
import EditableItem from './EditableItem'
import useReactRouter from 'use-react-router'
import { GET_ALL_ITEMS, DELETE_ITEM } from '../queries/items'
import { useMutation } from '@apollo/react-hooks'

function DroppableItem(props) {
  const { location } = useReactRouter()
  const [deleteItem] = useMutation(DELETE_ITEM)
  const onDelete = id => {
    deleteItem({
      variables: {
        input: {
          id: props.data.id,
        },
      },
      refetchQueries: [{ query: GET_ALL_ITEMS }],
    })
      .then(res => {
        console.log({
          success: 'The item was deleted!',
        })
      })
      .catch(error => {})
  }
  if (props.isDraggable && props.data.pageId === location.pathname) {
    return (
      <li
        className="Droppable-item"
        data-id={props.dataId}
        draggable={`${props.isDraggable}`}
        onDragEnd={e => props.onDragEnd(e)}
        onDragStart={e => props.onDragStart(e)}
        onDragOver={e => props.onDragOver(e)}
      >
        <div className="Droppable-item-toolbar">
          <button
            onClick={() =>
              props.isDraggable
                ? props.setIsDraggable(false)
                : props.setIsDraggable(true)
            }
          >
            Drag / Edit
          </button>
          <button onClick={onDelete}>Delete</button>
        </div>
        <div className="Editable-item-index">{props.data.sort + 1}</div>
        <figure>
          <img src={props.data.imgPath} alt="" />
        </figure>
        <div>{props.data.content}</div>
        <div>{props.data.id}</div>
      </li>
    )
  } else if (props.data.pageId === location.pathname) {
    return (
      <li
        className={
          !props.draggable
            ? 'Editable-item'
            : 'Editable-item Editable-item--disable'
        }
      >
        <EditableItem {...props} onDelete={onDelete} />
      </li>
    )
  } else {
    return null
  }
}

export default DroppableItem
