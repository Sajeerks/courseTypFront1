import { Box, Container, Typography } from "@mui/material"
import "./Home.css"
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import VideoCart, { CousseModelTypeFrontend } from "../VideoCart/VideoCart";
import { Fragment, useEffect, useState } from "react";
import { getAllCoursesFrontend } from "../Redux/courseReducer";
import ReactPaginate from 'react-paginate';
import { Loading } from "../Loading/Loading";
import { Helmet } from "react-helmet-async";

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
    minHeight:'90vh'
  }));
  

const Home = () => {
   const dispatch =useDispatch<AppDispatch>()

   const [allCourseState, setallCourseState] = useState< CousseModelTypeFrontend[]| null>(null)
   
  const {loading, courses, error, message , filteredCoursesCount} = useSelector((state:RootState)=>state.courses)

  const [pageNumber, setpageNumber] = useState(0)


  const itemperPage = 2 
  const pageCount = Math.ceil(filteredCoursesCount/ itemperPage)
  const handlePageClick = (event:any ) => {
   // console.log("evnt in hadleclick", event);
   // console.log("evenet selected", event.selected);
   setpageNumber(event.selected as number)
   // setItemOffset();
 };


   useEffect(() => {
  dispatch(getAllCoursesFrontend({pageNumber:pageNumber}))
   }, [])
   
   useEffect(() => {
    if(courses){
      setallCourseState(courses)

    }

   }, [loading])
useEffect(() => {
  dispatch(getAllCoursesFrontend({pageNumber:pageNumber+1}))  
}, [pageNumber, pageCount])

// console.log({pageNumber});

 

  return (
 <Fragment>
    {loading ?(<Loading/>):(  
    <StyledBoxForWholePage >
       <Helmet><title> course bundler home</title></Helmet>

        <Typography variant="h5" sx={{marginTop:"21max"}}>COURSE BUNDLER</Typography>
      <Box>
    {(allCourseState && allCourseState.length>0 )&& allCourseState?.map((course, index)=>{

      return(
        <VideoCart course={course} key={index}/>
      )
    })}
      </Box>


      {    filteredCoursesCount &&     <div className='allProducts_Main_div_pagination'>
        <ReactPaginate
        className='AllProductsPagination'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        // pageRangeDisplayed={10}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        forcePage={pageNumber}
      /> 

</div>}



    </StyledBoxForWholePage>
    )}
     </Fragment>
  )
}

export default Home