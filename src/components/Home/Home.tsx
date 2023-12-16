import { Box, Container, Typography } from "@mui/material"
import "./Home.css"
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import VideoCart, { CousseModelTypeFrontend } from "../VideoCart/VideoCart";
import { useEffect, useState } from "react";
import { getAllCoursesFrontend } from "../Redux/courseReducer";

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
   const dispatch =useDispatch<AppDispatch>()

   const [allCourseState, setallCourseState] = useState< CousseModelTypeFrontend[]| null>(null)
   
  const {loading, courses, error, message , filteredCoursesCount} = useSelector((state:RootState)=>state.courses)

   useEffect(() => {
  dispatch(getAllCoursesFrontend())
   }, [])
   
   useEffect(() => {
    if(courses){
      setallCourseState(courses)

    }

   }, [loading])
   
  
 
 

  return (
    <StyledBoxForWholePage >
        <Typography variant="h5" sx={{marginTop:"21max"}}>COURSE BUNDLER</Typography>
      <Box>
    {(allCourseState && allCourseState.length>0 )&& allCourseState?.map((course, index)=>{

      return(
        <VideoCart course={course} key={index}/>
      )
    })}
      </Box>


        
    


    </StyledBoxForWholePage>
  )
}

export default Home