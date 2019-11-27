import React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { testQuery } from '../queries/stripe'
import { useMutation } from '@apollo/react-hooks'

function CheckoutForm(props) {
  const [test] = useMutation(testQuery)
  async function submit(e) {
    let { token } = await props.stripe.createToken({ name: 'Name' })
    // console.log(token)
    let response = await test({
      variables: {
        input: {
          id: token.id,
          tokenId: '',
        },
      },
    })

    if (response.ok) console.log('Purchase Complete!')
  }
  // console.log(props.stripe)
  // console.log(props.data)
  return (
    <div className="checkout">
      <p>Would you like to complete the purchase?</p>
      <CardElement />
      <button onClick={submit}>Send</button>
    </div>
  )
}

export default injectStripe(CheckoutForm)
