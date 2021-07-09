import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51JA2ZLEFpjvAR0sxSS5ct9jpLUdUMi5SdoYpQuwv474W6JGrPdJdRGFKkFMcvwM2vtk2fYJXZg3EonIeDQawjw6p00Lb8XTjQg';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment successful!');
    }).catch(error => {
      console.log('Payment error: ', error);
      alert(
        'There was an issue with your payment. Please make sure you use the provided credit card.'
      );
    })
  }

  
  return (
    <StripeCheckout 
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/en/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;