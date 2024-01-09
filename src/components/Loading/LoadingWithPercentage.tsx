
// import { Box } from '@mui/material';
import { StyledBoxForWholePage } from '../Home/Home'
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { useEffect, useState } from 'react';
// 

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}


interface LoadingWithPercentageType{

  progessuploaded :number

}
export const LoadingWithPercentage = ({progessuploaded}:LoadingWithPercentageType) => {
  //  console.log("percentCompleted in loading with percentage ==",progessuploaded);
  // const [progress, setProgress] = useState(0);
  // setProgress(progessuploaded)

  // useEffect(() => {
  //   // const timer = setInterval(() => {
  //   //   // setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
  //   //   setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));

  //   // }, 800);
  //   // return () => {
  //   //   clearInterval(timer);
  //   // };
  //   setProgress(progessuploaded)
  // }, []);
  return (
   <StyledBoxForWholePage  display={'flex'} justifyContent={"center"} alignItems={"center"}>
     {/* <Box sx={{ display: 'flex' }}> */}
      <CircularProgressWithLabel value={progessuploaded} />
      
    {/* </Box> */}
        
   </StyledBoxForWholePage>
  )
}
