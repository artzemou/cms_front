import React, { useState, useEffect } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { UPDATE_P_AGE, GET_ALL_P_AGES } from '../queries/p_ages'
import { useQuery, useMutation } from '@apollo/react-hooks'

import {WebSubTreeNewItem} from './WebSubTreeNewItem.js'
import WebSubTreeEditableItem from './WebSubTreeEditableItem'



const SortableItem = SortableElement(props => {
  return (
    <li className="Droppable-item">
      <WebSubTreeEditableItem {...props}/>
    </li>
  )
})

const SortableList = SortableContainer(({ items }) => {
  return (
    <ul>
      {items.map((value, i) => (
        <SortableItem key={i} index={i} value={value} />
      ))}
    </ul>
  )
})

const SortableComponentSubTree = props => {
  const [items, setItems] = useState([])
  const { data } = useQuery(GET_ALL_P_AGES)
  const [updatePage] = useMutation(UPDATE_P_AGE)

  useEffect(() => {
    if (data.allP_ages)
      setItems(data.allP_ages.filter(item => item.parentId === props.parentId))
  }, [data.allP_ages, props.data, props.parentId])

  useEffect(() => {
    items.forEach((item, i) => {
      updatePage({
        variables: {
          input: {
            id: item.id,
            content: item.content,
            sort: i,
            parentId: item.parentId,
          },
        },
        refetchQueries: [{ query: GET_ALL_P_AGES }],
      }).then(res => {
        console.log({
          success: 'The item was sortabled!',
        })
      })
    })
  }, [items, updatePage])

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(items, oldIndex, newIndex))
  }
  return (
    <>      
      <WebSubTreeNewItem parentId={props.parentId}/>
      <SortableList axis="y" items={items} onSortEnd={onSortEnd} />
    </>
  )
}

export default SortableComponentSubTree
