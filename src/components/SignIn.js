import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { LOG_IN } from '../queries/users'
import useForm from 'react-hook-form'
import T from 'i18n-react'

// import { useHistory } from 'react-router-dom'

export const SignIn = props => {
  // const history = useHistory()
  const [login] = useMutation(LOG_IN)
  const { register, handleSubmit } = useForm()
  console.log(props)
  const onSubmit = (data, e) => {
    // e.target.reset()
    if (data)
      login({
        variables: {
          input: {
            email: data.email,
            password: data.password,
          },
        },
      })
        .then(res => {
          console.log(res.data)
          if (res.data.logIn) {
            sessionStorage.setItem('AUTH_TOKEN', res.data.logIn)
            props.updateAuthToken({ ...props.state, authToken: res.data.logIn })
            // if (isLogged) history.push(`/aaa`)
          } else {
            alert('Mot de passe ou login incorrect')
            e.target.reset()
          }
        })
        .catch(error => {
          console.log(error)
        })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <h3>{T.translate('signIn.title')}</h3>
      <div>
        <label htmlFor="email">{T.translate('signIn.email')}</label>
        <input
          id="email"
          name="email"
          placeholder={T.translate('signIn.email')}
          ref={register}
        />
      </div>
      <div>
        <label htmlFor="password">{T.translate('signIn.pwd')}</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={T.translate('signIn.pwd')}
          ref={register}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
