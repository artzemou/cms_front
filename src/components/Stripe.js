import React, { Component } from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

class App extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default App
