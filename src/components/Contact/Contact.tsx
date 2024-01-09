import { Box, Button, Fab, TextField, Typography } from "@mui/material"
import { StyledBoxForWholePage } from "../Home/Home"
import { ChangeEvent, Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Redux/store"
import { Loading } from "../Loading/Loading"
import { toast } from "react-toastify"
import { getContactRequsetFrontend, getCourseRequestFrontend } from "../Redux/otherReducer"


const Contact = () => {

   const dispatch = useDispatch<AppDispatch>()
 const {loading, error, message} = useSelector((state:RootState)=>state.otherStats)

  const [courseReweststate, setcourseReweststate] = useState(false)
    const [contactdetails, setcontactdetails] = useState({
        name:"",
        email:'',
        message:"", 
      
    })

    const [courseRequestDetails, setcourseRequestDetails] = useState({
      name:"",
      email:'',
      course:"", 
    
  })
    const contactFormsubmit =(e:React.FormEvent)=>{
        e.preventDefault()

        dispatch(getContactRequsetFrontend(contactdetails))

    }

    const courseRequestSubmit =(e:React.FormEvent)=>{
      e.preventDefault()

      dispatch(getCourseRequestFrontend(courseRequestDetails))
      
  }
    

    const handleChange =(e:ChangeEvent<HTMLInputElement>)=>{
        setcontactdetails({...contactdetails,[e.target.name]:e.target.value})
    }
    const handleChangeForCourse =(e:ChangeEvent<HTMLInputElement>)=>{
      setcourseRequestDetails({...courseRequestDetails,[e.target.name]:e.target.value})
  }

    
  useEffect(() => {
    if(error){
      toast.error(error)
    }
    if(message){
      toast.success(message)
    }
    }, [error, message])

  return (
    <Fragment>
    {loading?(<Loading/>):(

 <Fragment>

    <StyledBoxForWholePage>


<Button sx={{width:"50vw" , mt:10, mx:'auto'}} variant="contained" onClick={()=>setcourseReweststate(!courseReweststate)}> {courseReweststate?"contact form ": "Course request form"} </Button>

{!courseReweststate && 
 <Fragment>

<Typography variant="h4">Contact Form</Typography>

<Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}  component={"form"}
width={"80vw"}
margin={"auto"}
gap={2}
 onSubmit={contactFormsubmit}
> 
<TextField type="text" name="name" required  placeholder="enter your name "  label="name" fullWidth onChange={handleChange}/>
<TextField type="email" name="email" required placeholder="enter your eamil " label="email"  fullWidth onChange={handleChange}/>
<TextField type="text" multiline name="message" required placeholder="enter your message "  label="message" fullWidth onChange={handleChange}/>

<Button  disabled={loading} fullWidth variant="contained" type="submit">Send contact form</Button>
 </Box>

 </Fragment>}



 

 {courseReweststate && 
 <Fragment>       
<Typography variant="h4">Course request</Typography>

<Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}  component={"form"}
width={"80vw"}
margin={"auto"}
gap={2}
 onSubmit={courseRequestSubmit}
> 
<TextField type="text" name="name" required  placeholder="enter your name "  label="name" fullWidth onChange={handleChangeForCourse}/>
<TextField type="email" name="email" required placeholder="enter your eamil " label="email"  fullWidth onChange={handleChangeForCourse}/>
<TextField type="text" multiline name="course" required placeholder="enter your course request "  label="course" fullWidth onChange={handleChangeForCourse}/>

<Button  disabled={loading} fullWidth variant="contained" type="submit">Request Course</Button>
 </Box>
 </Fragment>
}

    </StyledBoxForWholePage>



    </Fragment>

)}



    </Fragment>
  )


}

export default Contact