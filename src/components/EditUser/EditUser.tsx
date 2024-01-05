import "./EditUser.css"

import { Fragment, useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Redux/store"
import { LoadingWithPercentage } from "../Loading/LoadingWithPercentage"
import { Loading } from "../Loading/Loading"
import { toast } from "react-toastify"
import { changeUserDetailsFrontend, changeUserDetailsFrontendBYADmin, getUserDetiailsFrontendWithIDAdmin, userTypeInFrontEnd } from "../Redux/userReducer"
import { useParams } from "react-router-dom"
import { Box,Button,FormControl,FormHelperText,InputLabel,MenuItem,Select,TextField,Typography,styled, useTheme } from "@mui/material"
import { Helmet } from "react-helmet-async"
import { useFormik } from 'formik';
import * as yup from 'yup';
import Resizer from "react-image-file-resizer";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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


const resizeFile = (file:File) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

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
    .nullable()
    // .required("please enter a lecture tilte")
    .min(4, "name too short should be more than  4 characters")
    .max(10, "name shall not be more than 10 characters"),
    email: yup.string().email().
    nullable()
    // required("please enter a email description")
    .min(5, "email too short should be more than  10 characters")
  .max(30, "email too long should be less than 80 characters"),
  role:yup.string().nullable(),
  createdAt:yup.date().max(new Date(), "user created date  must be less than today ") 
  .min(new Date(new Date("01-Jan-1995")))
  .nullable(), 
      file:
      //  yup.array().of(
        // Yup.string().required("must be a type of string of base64 URL")
        yup.mixed()
          // .required("A file is required")
          .nullable()
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
  
const roles= [
  "admin", "user"
]
   

const EditUser = () => {

  const {id} = useParams()
         
      const dispatch = useDispatch<AppDispatch>()
      const  {userForEditing, loading, error, message, user} = useSelector((state:RootState)=>state.user)
  const [fetchedUser, setfetchedUser] = useState<userTypeInFrontEnd | null> (null)
  const [createdDateSetter, setcreatedDateSetter] = useState<Dayjs | null>(dayjs('2022-04-17'));

  // const [createdDateSetter, setcreatedDateSetter] = useState<Dayjs | null>(dayjs(userForEditing && userForEditing?.createdAt));

  // const [createdDateSetter, setcreatedDateSetter] = useState<Dayjs | null>(null);

  
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
      role:"",
      createdAt:"",
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
     myForm.append("role", values.role);
     myForm.append("createdAt",values.createdAt!)

     myForm.append("file", values.file);
  
 

    //  changeUserDetailsFrontendBYADmin()
    if(fetchedUser?._id){
      dispatch(changeUserDetailsFrontendBYADmin({id:fetchedUser._id, myForm:myForm}))

    }


console.log("submitted the edit usaer");
    }
  })


 console.log(formik);


useEffect(() => {
  if(userForEditing){
    setcreatedDateSetter(dayjs(userForEditing?.createdAt))

    setTimeout(() => {
      formik.setFieldValue("name", userForEditing.name)
      formik.setFieldValue("email", userForEditing.email)
      formik.setFieldValue("role", userForEditing.role)
      // formik.setFieldValue("createdAt", userForEditing.createdAt)
      

       
     }, 100);

  }
  
}, [loading])



      useEffect(() => {
        if(error){
          toast.error(error)
        }

        if(message){
          toast.success(message)
        }
    
      }, [error, message])
      
      useEffect(() => {
        if(id){
          
          if(user?.role === "admin") {
                                  dispatch(getUserDetiailsFrontendWithIDAdmin(id))
                                }      
        }
   
     
      }, [id])
      useEffect(() => {
        setfetchedUser(userForEditing)
      }, [loading])
      


  return (
    <Fragment>
    {loading?(<LoadingWithPercentage progessuploaded={progressUploadedorExport }/> ):( 
    
     <div className="edit_user_main_div"> 
        <Helmet><title>Edit user </title></Helmet>
    
<Typography sx={{mt:2}} variant="h6"> {fetchedUser && fetchedUser.name}  </Typography>

      <img  width={"100px"} src={fetchedUser?.avatar.url} alt="old user image"/>
       


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

    



<FormControl sx={{ m: 1 , minWidth:"90vw"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // value={formik.values.category}
          // onChange={handleSelectChange}
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.role && Boolean(formik.errors.role)}
          // helperText={formik.touched.category && formik.errors.category || "enter product category"}
          // autoWidth
          fullWidth
          // displayEmpty
          
        //   renderValue={(selected) => {
        //     if (selected.length === 0) {
        //       return <em>sport</em>;
        //     }
        //   }
        // }
        // defaultValue="sports" 
        // defaultValue={courseState?.category}
          label="Role"
          name='role'
        >

          {roles.map((cat)=>(
            <MenuItem key={cat} value={cat}   >
              
              {cat}
            </MenuItem>
          )) }
      

   
        </Select>
       <span  color={themer.palette.error.main} > <FormHelperText error >{formik.errors.role}</FormHelperText></span>
      </FormControl>






      <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}> */}
        <DatePicker defaultValue={dayjs(userForEditing && userForEditing.createdAt)}
          format="DD - MMMM - YYYY"
          label={"user created Date"}
          views={['year', 'month', 'day']}
          value={createdDateSetter}
          // onChange={formik.handleChange}
          onChange={(newValue) => {
            setcreatedDateSetter(newValue)
            console.log({newValue});
          // formik.setFieldValue("createdAt", moment(newValue).format("DD-MM-YYYY"))
          // formik.setFieldValue("createdAt", dayjs(newValue).format("DD-MM-YYYY")  )
          formik.setFieldValue("createdAt",newValue)


          }}
          // value={formik.values.createdAt}
          // onBlur={formik.handleBlur}
          // error={formik.touched.createdAt && Boolean(formik.errors.createdAt)}
        />
   
    </LocalizationProvider>

{formik.errors.createdAt && <Typography color={themer.palette.error.main}> {formik.errors.createdAt}</Typography>}






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
      <VisuallyHiddenInput type="file"    multiple    accept="image/*" onChange={handleImageUploadForEdituser}/>
    </Button>
           
         
    <Button  variant="contained" type="submit" disabled={loading }
     sx={{mt:2}}
     
     fullWidth
     >
      Update  User
     </Button>


       </Box>


     </div>



      )}

    </Fragment>
  )
}

export default EditUser