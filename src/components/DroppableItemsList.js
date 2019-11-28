import { useQuery, useMutation } from '@apollo/react-hooks'
import React, { useState, useEffect } from 'react'
import { GET_ALL_ITEMS, UPDATE_ITEM } from '../queries/items'
import DroppableItem from './DroppableItem'
import { DroppableNewItem } from './DroppableNewItem'
import useReactRouter from 'use-react-router'
import SortableComponentPageItem from './SortableComponentPageItem'

if (typeof window !== 'undefined') {
  var placeholder = document.createElement('ul')
  placeholder.className = 'Droppable-item Droppable-item--placeholder'
}

export const DroppableItemsList = props => {
  const { data } = useQuery(GET_ALL_ITEMS)
  const [, setDraggableItems] = useState([])

  useEffect(() => {
    if (data.allItems) {
      setDraggableItems(data.allItems)
    }
  }, [data, data.allItems])

  if (!data) {
    return <div>loading...</div>
  }
  return (
    <>
      <DroppableNewItem />
      <SortableComponentPageItem/>
    </>
  )
}
