
// import { Box } from '@mui/material';
import { StyledBoxForWholePage } from '../Home/Home'
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
   <StyledBoxForWholePage  display={'flex'} justifyContent={"center"} alignItems={"center"}>
     {/* <Box sx={{ display: 'flex' }}> */}
      <CircularProgress />
      
    {/* </Box> */}
        
   </StyledBoxForWholePage>
  )
}
