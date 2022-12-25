import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

const stripePromise = loadStripe('pk_test_51MG1OrECQ5A2vBBfyy3MvTxpFh9qyI769jOoxpZ1mBV9nDAy5mgMLj1xeghqfmJneGT3YkfArWnZ37VMol17yHZZ00Ph1848Hn'
);

export default function Payment() {
    const {courseId} = useParams()
    const [options,setOptions] = useState('')
    const [method,setMethod] = useState('')
    const [paymentIntentId,setPaymentIntentId] = useState('')
    const history = useHistory()
    const {user,loading} = useUserContext()
  useEffect(()=>{
    if(loading) return
    else if(!user) history.push('/')
    else if(user.type!=='individual trainee') history.push('/')
    if(!options){
        axios({method:'post',url:'http://localhost:5000/individualTrainee/createPayment',withCredentials:true,data:{
            courseId
        }}).then((response)=>{
            console.log(response.data.client_secret);
            setOptions({clientSecret: response.data.clientSecret})
            setMethod(response.data.method)
            setPaymentIntentId(response.data.paymentIntentId)
            console.log('this should not repeat',response.data);
        }).catch((error)=>{
            console.log(error);
            history.push(`/checkout/${courseId}`)
        })
}
  },[loading])

  return (
    <div>
        {options && stripePromise && paymentIntentId &&
        <Elements stripe={stripePromise} options={options} paymentIntentId = {paymentIntentId}>
        <CheckoutForm courseId={courseId} paymentIntentId = {paymentIntentId} />
        </Elements>}
    </div>
  )
}