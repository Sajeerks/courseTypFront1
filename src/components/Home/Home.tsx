import { Box, Container, Typography } from "@mui/material"
import "./Home.css"
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";

const StyledBox = styled(Box)({

    backgroundColor: 'aliceblue',
    color: 'darkslategray',
    padding: '2rem',
    textAlign:'center',
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignContent:"center",
    width:"100vw",
    height:'85vh'

  
  })

  export const StyledBoxForWholePage = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    display:"flex",
    flexDirection:"column",
    textAlign:'center',

    justifyContent:"center",
    alignContent:"center",
    width:"100vw",
    height:'90vh'
  }));
  

const Home = () => {

  
 

  return (
    <StyledBoxForWholePage >
        <Typography>COURSE BUNDLER</Typography>
    


    </StyledBoxForWholePage>
  )
}

export default Home