import axios from "axios";
import { useState } from "react";
import Button from '@mui/material/Button';
import { useHistory, useParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const CheckoutButton = (props) => {
    const { courseId, price, wallet } = props
    const [waiting, setWaiting] = useState(false)
    const [open, setOpen] = useState(false)
    const history = useHistory()
    const handleClose = () => { setOpen(false); setWaiting(false) }
    const handleWalletPayment = async () => {
        await axios({ method: 'post', url: 'http://localhost:5000/individualTrainee/payWithWallet', withCredentials: true, data: { courseId } }).then((resopnse) => {
            history.push(`/payment-success/${courseId}`)
        })
    }
    const handleCheckout = () => {
        setWaiting(true)
        // axios({method : 'post',url: 'http://localhost:5000/individualTrainee/checkout',data:{courseId},withCredentials:true}).then((response)=>{
        //     console.log(response);
        //     if(response.data.url){
        //         setWaiting(false)
        //         console.log(response.data.url);
        //         window.location.href= response.data.url
        //     }
        //     else{
        //         if(response.data.completed){
        //             history.push(`/checkout-success/${courseId}`)
        //         }
        //     }
        // }).catch((error)=>{
        //     console.log(error);
        //     setWaiting(false)
        // })
        console.log(wallet, price);
        if (wallet >= price) {
            setOpen(true)
        }
        else {
            history.push(`/payment/${courseId}`)
            setWaiting(false)
        }

    }
    return (
        <div>
            <Button disabled={waiting} onClick={handleCheckout}>
                {wallet === 0 ? `Pay ${parseFloat(price).toFixed(2)} USD from credit card` : price > wallet ? `pay ${parseFloat(price - wallet).toFixed(2)} USD from credit card ` : `Pay ${parseFloat(price).toFixed(2)} USD from wallet`}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Complete payment from wallet</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleWalletPayment}>Proceed</Button>

                </DialogActions>
            </Dialog>
        </div>
    )

}

export default CheckoutButton;