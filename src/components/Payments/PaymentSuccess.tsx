import { Link, useSearchParams } from "react-router-dom";
import { StyledBoxForWholePage } from "../Home/Home";
import { Button, Typography } from "@mui/material";

const PaymentSuccess = () => {

  const reference = useSearchParams()[0].get('reference');
  console.log({reference});
  return (
    <StyledBoxForWholePage>
        <Typography sx={{mb:3}} variant="h3">PaymentSuccess</Typography>

        <Typography sx={{mb:3}} variant="h3">Reference : {reference}</Typography>

        
        <Link style={{marginTop:2}} to  ="/">    <Button variant="contained"  >go home </Button></Link> 


    </StyledBoxForWholePage>
  )
}

export default PaymentSuccess