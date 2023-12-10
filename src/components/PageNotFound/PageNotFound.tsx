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
        <Button sx={{width:"50vw"}} variant="contained">  <Link to='/'>Go to Home</Link></Button>

        </Box>
    </StyledBoxForWholePage>
  )
}

export default PageNotFound