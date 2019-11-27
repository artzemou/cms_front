import React, { useState, useEffect } from 'react'
import T from 'i18n-react'
import { Helmet } from 'react-helmet-async'
import { GET_ALL_ITEMS, UPDATE_ITEM } from '../queries/items'
import { useQuery } from '@apollo/react-hooks'
import useReactRouter from 'use-react-router'

function Page(props) {
  const { location } = useReactRouter()
  const { data, loading } = useQuery(GET_ALL_ITEMS)
  const [items, setItems] = useState([])

  console.log(data)
  useEffect(() => {
    if (data.allItems) {
      setItems(data.allItems)
    }
  }, [data, data.allItems])
  return (
    <>
      <Helmet>
        <title>{props.page.id}</title>
      </Helmet>
      <ul className="Droppable-list">
        {items.map((item, i) => {
          if (item.pageId === location.pathname)
            return (
              <li key={i} className="Droppable-item">
                {item.content}
                <img src={item.imgPath} alt="" />
              </li>
            )
        })}
      </ul>
    </>
  )
}

export default Page
