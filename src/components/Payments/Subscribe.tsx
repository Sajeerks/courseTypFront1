import { Box, Button, Typography } from "@mui/material"
import { StyledBoxForWholePage } from "../Home/Home"
import { Helmet } from "react-helmet-async"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Redux/store"
import { buySubscriptionFrontend } from "../Redux/paymentReducer"
import axios from "axios"
import { server } from "../../App"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { userTypeInFrontEnd } from "../Redux/userReducer"
import logo from  "/src/tiger-29.png"


const Subscribe = ( {user}:any) => {
  const dispatch = useDispatch<AppDispatch>()
const [keyState, setkeyState] = useState("")
  const {error, loading, paymentId} = useSelector((state:RootState)=>state.paymentReducer)
  

// (async () => {
// await  axios.get(`${server}/api/v1/getRazorPayKey`)
  
// })();
// const getRazorPayKeyHandler =async ()=>{

// }
// console.log({keyState});

  const subscriptionHandler=async()=>{
    const { data :{key}} = await axios.get(   `${server}/api/v1/getRazorPayKey`)
    setkeyState(key)
       dispatch(buySubscriptionFrontend())
     
  }
  // console.log({keyState});
useEffect(() => {
 if(error){
  toast.error(error)
  
 }



const openPopup =()=>{
  const options = {
   key:  keyState,
    name: 'Sajeer CourseBundler',
    description: 'Get access to all premium content munnna',
    image: logo,
    subscription_id: paymentId,
    callback_url: `${server}/api/v1/paymentVerificatin`,
    prefill: {
      name: user?.name,
      email: user?.email,
      contact: '+966541396257',
    },
    notes: {
      address: '6 pack programmer at youtube',
    },
    theme: {
      color: '#FFC800',
    },

}
const razor = new (window as any).Razorpay(options)
razor.open()

}
if(keyState){
  openPopup()
}


}, [error,keyState,dispatch,paymentId ])


  return (
    <StyledBoxForWholePage>
      <Helmet>
        <title>subscribe page</title>
      </Helmet>
              <Typography>Subscription Page</Typography>
             <Box>
             <Button sx={{width:"50vw"}} variant="contained" onClick={subscriptionHandler}>Please Subsribe</Button>
             {/* <Button sx={{width:"50vw"}} variant="contained" onClick={getRazorPayKeyHandler}>get raxor pay key</Button> */}


             </Box>
    </StyledBoxForWholePage>
  )
}

export default Subscribe