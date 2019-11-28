import React, { useState, useEffect } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { UPDATE_ITEM, GET_ALL_ITEMS, DELETE_ITEM} from '../queries/items'
import { useQuery, useMutation } from '@apollo/react-hooks'
import useReactRouter from 'use-react-router'

import DroppableItem from './DroppableItem'


const SortableItem = SortableElement( props => {
  const [deleterItem] = useMutation(DELETE_ITEM)
  const [isDraggable, setIsDraggable] = useState(true)

  const onDelete = () => {
    deleterItem({
      variables: {
        input: {
          id: props.data.id,
        },
      },
      refetchQueries: [{ query: GET_ALL_ITEMS }],
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
      <DroppableItem
            dataId={props.index}
            data={props.data}
            key={props.data.id}
            setIsDraggable={setIsDraggable}
            isDraggable={isDraggable}
          />
      </ul>
    </>
  )
})

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul className="Droppable-list">
      {items.map((data, i) => (
        <SortableItem key={i} index={i} data={data} />
      ))}
    </ul>
  )
})

const SortableComponentPageItem = props => {
  const [items, setItems] = useState([])
  const { data } = useQuery(GET_ALL_ITEMS)
  const { location } = useReactRouter()

  const [updateItem] = useMutation(UPDATE_ITEM)

  useEffect(() => {
      if(data.allItems)
        setItems(data.allItems.filter(item => item.pageId === location.pathname).sort((a, b) => (a.sort > b.sort) ? 1 : -1))
    }, [data, data.allItems, location.pathname, props.data])
  
  useEffect(() => {
      console.log(items)
    items.forEach((item, i) => {
        console.log(item.sort)
      updateItem({
        variables: {
          input: {
            id: item.id,
            content: item.content,
            sort: i,
            imgPath: item.imgPath,
            pageId: location.pathname,
          },
        },
        refetchQueries: [{ query: GET_ALL_ITEMS }],
      }).then(res => {
        console.log({
          success: 'The item was sortabled!',
        })
      })
    })
  }, [items, location.pathname, updateItem])

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

export default SortableComponentPageItem
