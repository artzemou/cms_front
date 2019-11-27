import { useQuery, useMutation } from '@apollo/react-hooks'
import React, { useState, useEffect } from 'react'
import { GET_ALL_ITEMS, UPDATE_ITEM } from '../queries/items'
import DroppableItem from './DroppableItem'
import { DroppableNewItem } from './DroppableNewItem'
import useReactRouter from 'use-react-router'

if (typeof window !== 'undefined') {
  var placeholder = document.createElement('ul')
  placeholder.className = 'Droppable-item Droppable-item--placeholder'
}

export const DroppableItemsList = props => {
  const { location } = useReactRouter()
  const [updateItem] = useMutation(UPDATE_ITEM)
  const { data } = useQuery(GET_ALL_ITEMS)
  const [dragged, setDraged] = useState(null)
  const [over, setOver] = useState(null)
  const [draggableItems, setDraggableItems] = useState([])
  const [isDraggable, setIsDraggable] = useState(true)

  useEffect(() => {
    if (data.allItems) {
      setDraggableItems(data.allItems)
    }
  }, [data, data.allItems])

  const onDragStart = e => {
    setDraged(e.currentTarget)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', dragged)
  }

  const onDragEnd = e => {
    dragged.style.display = 'block'
    if (document.querySelector('.Droppable-item--placeholder'))
      document.querySelector('.Droppable-item--placeholder').remove()
    if(dragged && over){
        var from = Number(dragged.dataset.id)
        var to
        dragged.dataset.id < over.dataset.id
          ? (to = Number(over.dataset.id) + 1)
          : (to = Number(over.dataset.id))
        if (from < to) to--
        draggableItems.splice(to, 0, draggableItems.splice(from, 1)[0])
        setDraggableItems([...draggableItems])
        updateSortIndexes()
    }
  }

  const onDragOver = e => {
    e.preventDefault()
    if (e.target.className === 'Droppable-item--placeholder') return
    if (e.target.className !== 'Droppable-item') return
    setOver(e.target)
    if (over)
      dragged.dataset.id < over.dataset.id
        ? e.target.parentNode.insertBefore(placeholder, e.target.nextSibling)
        : e.target.parentNode.insertBefore(placeholder, e.target)
  }

  const updateSortIndexes = () => {
    draggableItems.reverse().forEach((item, i) => {
      console.log(item.pageId)
      if (item.pageId === location.pathname) {
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
      }
    })
  }

  if (!data) {
    return <div>loading...</div>
  }
  return (
    <>
      <DroppableNewItem />
      <ul className="Droppable-list">
        {draggableItems.map((item, i) => (
          <DroppableItem
            className={
              isDraggable
                ? `Droppable-item`
                : `Droppable-item Droppable-item--disable`
            }
            dataId={i}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            data={item}
            key={item.id}
            setIsDraggable={setIsDraggable}
            isDraggable={isDraggable}
          />
        ))}
      </ul>
    </>
  )
}
