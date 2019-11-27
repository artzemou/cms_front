import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'

export const filesQuery = gql`
  {
    files
    fileURL
  }
`

export const Files = () => {
  const { data, loading } = useQuery(filesQuery)

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {data.files.map((x, i) => (
        <img style={{ width: 200 }} key={i} src={data.fileURL} alt={x} />
      ))}
    </div>
  )
}
