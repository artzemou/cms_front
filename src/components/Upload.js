import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { filesQuery } from './Files'
import { UPDATE_ITEM, GET_ALL_ITEMS } from '../queries/items'

const uploadFileMutation = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`
export const Upload = props => {
  const { data } = useQuery(filesQuery)

  const [uploadFile, { loading }] = useMutation(uploadFileMutation, {
    refetchQueries: [{ query: filesQuery }],
  })
  const [updateItem] = useMutation(UPDATE_ITEM, {
    refetchQueries: [{ query: GET_ALL_ITEMS }],
  })
  useEffect(() => {
    if (localStorage.getItem('CURRENT_ITEM') === props.data.id)
      updateItem({
        variables: {
          input: {
            id: props.data.id,
            content: props.data.content,
            sort: props.data.sort,
            imgPath: data.fileURL,
            pageId: props.data.pageId,
          },
        },
      })
  }, [
    data,
    data.fileURL,
    props.data.Id,
    props.data.content,
    props.data.id,
    props.data.pageId,
    props.data.sort,
    updateItem,
  ])

  const onDrop = useCallback(
    ([file]) => {
      if (/\.(jpe?g|png|gif|svg)$/i.test(file.name)) {
        localStorage.setItem('CURRENT_ITEM', props.data.id)
        uploadFile({ variables: { file } })
      } else {
        alert('Invalid file extension !')
      }
    },
    [props, uploadFile]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  console.log(loading)
  if(loading) return ( loading )
   else return (
    <div {...getRootProps()} className="Images-upload">
      <button>select file</button>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop an image here ...</p>
      ) : (
        <p>Drag 'n' drop an image here, or click to select file</p>
      )}
      <figure>
        <img src={props.data.imgPath} alt="" />
      </figure>
    </div>
  )
}
