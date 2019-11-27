import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ALL_USERS } from '../queries/users'
// import T from 'i18n-react'
import useOnlineStatus from '@rehooks/online-status'

function UsersList(props) {
  const onlineStatus = useOnlineStatus()
  const [allUsers, setAllUsers] = useState([])
  const { data } = useQuery(GET_ALL_USERS)
  useEffect(() => {
    if (data.allUsers) {
      setAllUsers(data.allUsers)
      console.log(allUsers)
    }
  }, [allUsers, data, props])
  return (
    <>
      <div>
        <h1>You are {onlineStatus ? 'Online' : 'Offline'}</h1>
      </div>
      <ul>
        {allUsers.map(user => (
          <li key={user.id}>
            <ul>
              <li>{user.firstName}</li>
              <li>{user.lastName}</li>
              <li>{user.email}</li>
              <li>{user.roles}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UsersList
