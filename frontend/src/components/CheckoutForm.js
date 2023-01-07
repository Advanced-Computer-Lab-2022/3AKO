import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material//Button';
import { useHistory } from 'react-router-dom';

const CheckoutForm = (params) => {
  const stripe = useStripe();
  const elements = useElements();
  const { courseId, paymentIntentId } = params
  console.log(paymentIntentId);
  const history = useHistory()
  const [waiting, setWaiting] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setWaiting(true)
    if (!stripe || !elements) {
      return;
    }

    await axios({
      method: 'post', url: 'http://localhost:5000/individualTrainee/checkBeforeProceed', withCredentials: true, data: {
        courseId, paymentIntentId
      }
    }).then((response) => {
      const execute = async () => {
        const result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "https://localhost:3000",
          }, redirect: 'if_required'
        }).then((response) => {
          const addCourse = async () => {
            await axios({
              method: 'post', url: 'http://localhost:5000/individualTrainee/payWithCard', withCredentials: true, data: {
                courseId, paymentIntentId: response.paymentIntent.id
              }
            }).then((response) => {
              history.push(`/payment-success/${courseId}`)
            }).catch((error) => {
              console.log(error);
            })
          }
          if (response.error) {
            console.log(response.error);
            return
          }
          else {
            if (response.paymentIntent.status === 'succeeded') {
              console.log('payment successful and adding course');
              console.log(response.paymentIntent);
              addCourse()
            }
            else {
              console.log('idk');
              console.log(response);
            }
          }
        }).catch((error) => {
          console.log(error);
        })
      }
      execute()
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
      setWaiting(false)
    })

  };

  return (
    <form onSubmit={handleSubmit} className='paymentElement'>
      <PaymentElement />
      <Button className='paymentFormButton' type='submit' variant='contained' style={{ marginTop: 10 }} disabled={!stripe || waiting}>Complete payment</Button>
    </form>
  )
};

export default CheckoutForm;