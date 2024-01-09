
import "./Register.css"




import { Fragment, useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Redux/store"
import { LoadingWithPercentage } from "../Loading/LoadingWithPercentage"
// import { Loading } from "../Loading/Loading"
import { toast } from "react-toastify"

import { Box,Button,TextField,Typography,styled, useTheme } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { useFormik } from 'formik';
import * as yup from 'yup';
// import Resizer from "react-image-file-resizer";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs, { Dayjs } from 'dayjs';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from "react-router-dom"
import { registeruserFrontEnd } from "../Redux/userReducer"
import { progressUploadedorExport } from "../../App"



const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


// const resizeFile = (file:File) =>
//   new Promise((resolve) => {
//     Resizer.imageFileResizer(
//       file,
//       300,
//       300,
//       "JPEG",
//       100,
//       0,
//       (uri) => {
//         resolve(uri);
//       },
//       "base64"
//     );
//   });

  function checkforSIzeOfFielsForImages(file:any) {
    let valid = true;
    console.log("fieks------------", file);
  
  
  console.log("new Blob([file]).size ===",new Blob([file]).size );
  
  
    if( new Blob([file]).size >= 1000000  && file!==""){
  
      valid = false
     }
     return valid;
    
  }
  function checkIfFilesAreCorrectTypeForImages(file:any) {
  
    const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'], 
    video:["mp4", "avi",  "wmv" , "flv" ] };
    let valid = true;
  
  
    //  console.log({file});
    // if (!["application/pdf", "image/jpeg", "image/png"].includes(file.name)) {
      if(file!== undefined) {
     
        if (!validFileExtensions["image"].includes(file.name.split('.').pop())  ) {
  
          valid = false;
          // console.log("valid din check file typeeeeeeeeee valid--", valid);
      
        }
      }else{
        valid = true
      }
   
  
    return valid;
  }
  

  const validationSchema2 = yup.object({
    name: yup.string()
    // .nullable()
    .required("please enter a user name")
    .min(4, "name too short should be more than  4 characters")
    .max(10, "name shall not be more than 10 characters"),
    email: yup.string().email().
    // nullable()
    required("please enter a email description")
    .min(5, "email too short should be more than  10 characters")
  .max(30, "email too long should be less than 80 characters"),
  password: yup.string()
  // .nullable()
  .required("please enter a password ")
  .min(8, "password too short should be more than  4 characters")
  .max(20, "password shall not be more than 20 characters"),
  
      file:
      //  yup.array().of(
        // Yup.string().required("must be a type of string of base64 URL")
        yup.mixed()
          .required("A file is required")
        //   .nullable()
          .test(
            "fileSize",
            "File too large",
  
            // value => value && value.size >= 1024 * 1024  // the is FILE_SIZE
            checkforSIzeOfFielsForImages
          )
          .test(
            "is-big-file",
            "VALIDATION_FIELD_FILE_WRONG_TYPE",
            checkIfFilesAreCorrectTypeForImages
          )
      // ),
  
  
  });
  
   

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const  { loading, error, message, user} = useSelector((state:RootState)=>state.user)
    const navigate = useNavigate()


const [imageprev, setimageprev] = useState("")

const handleImageUploadForEdituser =(event:React.ChangeEvent<HTMLInputElement> )=>{
         
  if (!event.target.files) return;


  const files  = event.target.files ;
  if(files.length>1){
    toast.error("please select less than one images")
    return
  }

  const file = event.target.files[0];
  const reader = new FileReader();
  formik.setFieldValue("file", file)
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    setimageprev(reader.result as string);
    // setimage(file);

  };
}



const themer = useTheme()


const formik = useFormik({
  enableReinitialize:true,
  initialValues: {
    name:"",
    email:"",
    password:'',
    file:"",    

  },
  validationSchema: validationSchema2,
  // validateOnMount:true,
//  isInitialValid:false,

validate:(values)=>{
const errors:any ={}
if(values.name  && values.name.length> 10){
errors.description = "long name length should be less than 10 characters"
}
// if(!values.file ){
//   errors.file = null
// }
if(!values.email){
errors.title = "please enter a email"
}


return errors
},

  onSubmit: (values) => {
    // console.log("sbmitting the formil i ");


   const myForm = new FormData();

   myForm.append("name", values.name);

  
   myForm.append("email", values.email);
   myForm.append("password", values.password);
   
   myForm.append("file", values.file);




   dispatch(registeruserFrontEnd(myForm))

console.log("submitted the edit usaer");
  }
})


console.log(formik);


useEffect(() => {
  if(user){
    navigate('/')
  }

}, [loading, user])



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
  {loading?(<LoadingWithPercentage progessuploaded={progressUploadedorExport }/> ):(      
      <div className="Register_main_div">
        
    


  
    

        <Helmet><title>register user </title></Helmet>
    

       <Box component={"form"} onSubmit={formik.handleSubmit}
         display={"flex"}
         justifyContent={"center"}
         alignItems={"center"}
         flexDirection={"column"}
         margin={"5vmax"}
         width={"90vw"}
      
       
       >  

       <TextField
     type="text"
     name="name"
     placeholder="enter user name"
     title="name"
     fullWidth
     sx={{mt:2}}
     label="user name"
    
     value={formik.values.name}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.name && Boolean(formik.errors.name)}
     helperText={formik.touched.name && formik.errors.name || "enter user name"}
   />

<TextField
     type="text"
     name="email"
     placeholder="enter user email"
     title="email"
     fullWidth
     sx={{mt:2}}
     label="user email"
    
     value={formik.values.email}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.email && Boolean(formik.errors.email)}
     helperText={formik.touched.email && formik.errors.email || "enter user email"}
   />


<TextField
     type="password"
     name="password"
     placeholder="enter user password"
     title="password"
     fullWidth
     sx={{mt:2}}
     label="user password"
    
     value={formik.values.password}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.password && Boolean(formik.errors.password)}
     helperText={formik.touched.password && formik.errors.password || "enter user password"}
   
    
     />












{imageprev && <Box 
display={"flex"}
justifyContent={"center"}
alignItems={"center"}
width={"100vw"}
flexDirection={"column"}
>
  
   <img  width={"60%"} src={imageprev} alt="new user image by admin"/> 
  
  <Button variant="contained" 
  onClick={()=>{
    setimageprev("")
    formik.setFieldValue("file", "")
  }}>
    Delete This sample picture
  </Button>

</Box>}


{formik.errors.file && <Typography color={themer.palette.error.main} variant='h5'>{formik.errors.file}</Typography>}
  

<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
  
  
  sx={{my:1}}
  >
      Upload  User Image
      <VisuallyHiddenInput type="file"    multiple   accept="image/*" onChange={handleImageUploadForEdituser}/>
    </Button>
           
         
    <Button  variant="contained" type="submit" disabled={loading }
     sx={{mt:2}}
     
     fullWidth
     >
      Register User
     </Button>


       </Box>


      </div>
  )}



      </Fragment>

  )
}

export default Register