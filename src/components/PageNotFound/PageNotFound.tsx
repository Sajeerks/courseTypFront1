import { Box, Button, Typography } from "@mui/material"
import { StyledBoxForWholePage } from "../Home/Home"
import { Link } from "react-router-dom"


const PageNotFound = () => {
  return (
    <StyledBoxForWholePage >
        <Box>
        <Typography variant="h1">Page not found 404</Typography>

        </Box>
        <Box>
 <Link to='/'>         <Button sx={{width:"50vw"}} variant="contained"> Go to Home</Button></Link>

        </Box>
    </StyledBoxForWholePage>
  )
}

export default PageNotFound