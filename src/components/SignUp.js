/* eslint-disable */
import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { SIGN_UP } from '../queries/users'
import useForm from 'react-hook-form'
// import { useHistory } from 'react-router-dom'
import T from 'i18n-react'

export const SignUp = props => {
  // const history = useHistory()
  const [signUp] = useMutation(SIGN_UP)
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data, e) => {
    // e.target.reset()
    if (data.password !== data.passwordConfirm) {
      alert(T.translate('signUp.errorNotEqual'))
      return
    }
    if (data)
      signUp({
        variables: {
          input: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
          },
        },
      })
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          if (error.message.includes('E11000 duplicate key'))
            alert(T.translate('signUp.errorAllreadyExists'))
        })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <h3>{T.translate('signUp.title')}</h3>
      <div>
        <label htmlFor="email">{T.translate('signUp.email')}</label>
        <input
          id="email"
          name="email"
          placeholder={T.translate('signUp.email')}
          ref={register({
            required: T.translate('signUp.required'),
            pattern: {
              value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: T.translate('signUp.errorEmail'),
            },
          })}
        />
        <div>{errors.email && errors.email.message}</div>
      </div>
      <div>
        <label htmlFor="firstName">{T.translate('signUp.firstName')}</label>
        <input
          id="firstName"
          name="firstName"
          placeholder={T.translate('signUp.firstName')}
          ref={register({
            required: T.translate('signUp.required'),
            minLength: {
              value: 2,
              message: T.translate('signUp.please'),
            },
          })}
        />
        <div>{errors.firstName && errors.firstName.message}</div>
      </div>
      <div>
        <label htmlFor="lastName">{T.translate('signUp.lastName')}</label>
        <input
          id="lastName"
          name="lastName"
          placeholder={T.translate('signUp.lastName')}
          ref={register({
            required: T.translate('signUp.required'),
            minLength: {
              value: 2,
              message: T.translate('signUp.please'),
            },
          })}
        />
        <div>{errors.lastName && errors.lastName.message}</div>
      </div>

      <div>
        <label htmlFor="password">{T.translate('signUp.pwd')}</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder={T.translate('signUp.pwd')}
          ref={register({
            required: T.translate('signUp.required'),

            // RegEx	Description
            // ^	The password string will start this way
            // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
            // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
            // (?=.*[0-9])	The string must contain at least 1 numeric character
            // (?=.[!@#\$%\^&])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
            // (?=.{8,})	The string must be eight characters or longer
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              message: T.translate('signUp.errorPwd'),
            },
          })}
        />
        <div>{errors.password && errors.password.message}</div>
      </div>
      <div>
        <label htmlFor="password-confirm">
          {T.translate('signUp.confirm')}
        </label>
        <input
          id="password-confirm"
          name="passwordConfirm"
          type="password"
          placeholder={T.translate('signUp.confirm')}
          ref={register}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
