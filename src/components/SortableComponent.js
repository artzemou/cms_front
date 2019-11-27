import React, { useState, useEffect } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import SortableComponentSubTree from '../components/SortableComponentSubTree'
import { UPDATE_PAGE, GET_ALL_PAGES, DELETE_PAGE} from '../queries/pages'
import { useQuery, useMutation } from '@apollo/react-hooks'

import WebTreeEditableItem from './WebTreeEditableItem'
import { WebTreeNewItem } from './WebTreeNewItem'


const SortableItem = SortableElement(props => {
  const [deletePage] = useMutation(DELETE_PAGE)
  
  const onDelete = () => {
    console.log(props)
    deletePage({
      variables: {
        input: {
          id: props.data.id,
        },
      },
      refetchQueries: [{ query: GET_ALL_PAGES }],
    })
      .then(res => {
        console.log({
          success: 'The page was deleted!',
        })
      })
      .catch(error => {})
  }
  return (
    <>
      <ul className="Droppable-item">
      <button onClick={onDelete}>delete</button>
        <WebTreeEditableItem {...props} />
        {/* id : {props.data.id}
        <br />
        content: {props.data.content} */}
        <SortableComponentSubTree parentId={props.data.id} />
      </ul>
    </>
  )
})

const SortableList = SortableContainer(({ items }) => {
  
  return (
    <ul className="Droppable-list">
      <WebTreeNewItem />
      {items.map((data, i) => (
        <SortableItem key={i} index={i} data={data} />
      ))}
    </ul>
  )
})

const SortableComponent = props => {
  const [items, setItems] = useState([])
  const { data } = useQuery(GET_ALL_PAGES)
  const [updatePage] = useMutation(UPDATE_PAGE)

  useEffect(() => {
    if (data.allPages) setItems(data.allPages)
  }, [data.allPages, props.data])

  useEffect(() => {
    items.forEach((item, i) => {
      updatePage({
        variables: {
          input: {
            id: item.id,
            content: item.content,
            sort: i,
          },
        },
        refetchQueries: [{ query: GET_ALL_PAGES }],
      }).then(res => {
        console.log({
          success: 'The item was sortabled!',
        })
      })
    })
  }, [items, updatePage])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex))
    document.body.style.cursor = 'default'
  }
  return (
    <>
      <SortableList
        transitionDuration={300}
        items={items}
        onSortEnd={onSortEnd}
        onSortStart={() => (document.body.style.cursor = 'grabbing')}
        axis="xy"
      />
    </>
  )
}

export default SortableComponent
