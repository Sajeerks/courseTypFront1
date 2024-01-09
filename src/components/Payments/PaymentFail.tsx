import { Box, Button, Typography } from "@mui/material"
import { StyledBoxForWholePage } from "../Home/Home"
import { Link } from "react-router-dom"


const PaymentFail = () => {
  return (
    
    <StyledBoxForWholePage 
   
    >
 <Typography variant="h3">Payment failed</Typography>
   <Link style={{marginTop:2}} to  ="/payment/subscribe">    <Button variant="contained"  >go back to payment </Button></Link> 
    </StyledBoxForWholePage>
  )
}

export default PaymentFail