import { Typography } from "@mui/material"
import { StyledBoxForWholePage } from "../Home/Home"
import { Box } from "@mui/system"
import { useEffect, useRef, useState } from "react";


const Aboutus = () => {
    const iREF = useRef<HTMLIFrameElement>(null)
    const DefaultLocation = { lat: 10, lng: 106};
    const [defaultLocation, _setDefaultLocation] = useState(DefaultLocation);
    useEffect(()=>{
         const ifameData =document.getElementById("iframeId")  as HTMLIFrameElement
         const lat= defaultLocation.lat || 1.305385 ;
         const lon=  defaultLocation.lng || 30.923029;
         if(ifameData){
           ifameData.src=`https://maps.google.com/maps?q=${lat},${lon}&hl=es;&output=embed`
 
 
         }
         
     },[])
  return (
    <StyledBoxForWholePage>
         < Typography  sx={{mt:4}}  variant="h3">Course bundler</Typography>

         <Typography >we provide the best training</Typography>
         <Typography >conatact: 00966 541 396 257 </Typography>

         <Typography >email: sajeersayed@gmail.com</Typography>
         <Typography >Adderss:Khonaini camp Jubail near toyota show room</Typography>



 <Box sx={{mt:5}}  display={"flex"} flexDirection={"column"} height={"auto"} width={"100vw"}  justifyContent={"center"} alignItems={"center"}>
     <Typography variant="h5">Location</Typography>

    <iframe id="iframeId" height="500px" width="100%" ref={iREF}></iframe> 

     </Box>
         

    </StyledBoxForWholePage>
  )
}

export default Aboutus