import { Box, Button, TextField, Typography, styled, useTheme } from "@mui/material"
import { chagePasswordFrontend, changeUserDetailsFrontend, userTypeInFrontEnd } from "../Redux/userReducer"
import "./MyAccount.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import moment from "moment"
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { toast } from "react-toastify";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Compressor from 'compressorjs';



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


function checkforSIzeOfFiels(file:any) {
  let valid = true;
  console.log("file in the checkforFile Size----", file);
  // if (files) {
  // files.map(file => {
  // console.log("size of the file checkforSIzeOfFiels ", file.size)
  // const size = file.size / 1024 / 1024;
  // if (size > 1) {
  //   valid = false;
  // }

  // })
  // }
  console.log("new Blob([file]--",new Blob([file]));
  if( new Blob([file]).size >= 1024*1027){
    console.log("new Blob([file]).size====",new Blob([file]).size);

    valid = false
   }
   return valid;
  
}
function checkIfFilesAreCorrectType(file:any) {
  // console.log(file);
  let valid = true;

    // if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {

  if ([ "image/jpeg", "image/png"].includes(file)) {
    console.log("valid din check file size");
    valid = false;
  }

  return valid;
}


const validationSchema = yup.object({
  oldPassword: yup.string()
  .required("please enter a oldPassword ")
   .min(8, "oldPassword too short"),
  newPassword: yup.string()
   .required("please enter a oldPassword ")
    .min(8, "newPassword too short"),



});




const validationSchemaForUserDetails = yup.object({
  name: yup.string()
  // .required("please enter a name ")
  .nullable()
   .min(4, "oldPassword too short"),
  email: yup.string().email()
  //  .required("please enter a email ")
    .min(5, "email too short"),

  file:  yup.mixed()
      // .required("A file is required")
      .nullable()
      .test(
        "fileSize",
        "File too large",

        // value => value && value.size >= 1024 * 1024  // the is FILE_SIZE
        checkforSIzeOfFiels
      )
      .test(
        "is-big-file",
        "VALIDATION_FIELD_FILE_WRONG_TYPE",
        checkIfFilesAreCorrectType
      )




});





function createData(
    name: string,
     value:string 
  ) {
    return { name, value};
  }
  

interface MyAccountProps{
    user :userTypeInFrontEnd  | null 
}

const MyAccount = ({user}:MyAccountProps) => {
   const dispatch = useDispatch<AppDispatch>()
   const  {user:fetchedUser, loading, message, error} = useSelector((state:RootState)=>state.user)

  const [changePasswordDiv, setchangePasswordDiv] = useState(false)
  const [changeuserDetailsDiv, setchangeuserDetailsDiv] = useState(false)
  const [imageprev, setimageprev] = useState("")
const [image, setimage] = useState<File | null>(null)

    let rows:any[]= []
 if(user){
     rows = [
        createData('UserName', user?.name,),
        createData('Role', user?.role,),
        createData('email', user?.email,),
        createData('joined At ',moment(user.createdAt).format('DD/MMMM/YYYY HH:mm A')  ),



    
      ];
 }



const themer = useTheme()




 

 const formik = useFormik({
  initialValues: {
    newPassword:"",
    oldPassword:"",

  },
  validationSchema: validationSchema,


validate:(values)=>{
const errors:any ={}
// if(values.description  && values.description.length> 80){
// errors.description = "long description length"
// }



return errors
},

  onSubmit: (values) => {
    console.log("sbmittingumit");
  //  console.log({values});

   const myForm = new FormData();

   myForm.append("oldPassword", values.oldPassword);
   myForm.append("newPassword", values.newPassword);
  

dispatch(chagePasswordFrontend(myForm))
console.log("submitted the course");
  },
});









const formik2 = useFormik({
  initialValues: {
    name:"",
    email:"",
    file:""

  },
  validationSchema: validationSchemaForUserDetails,


validate:(values)=>{
const errors:any ={}
// if(values.description  && values.description.length> 80){
// errors.description = "long description length"
// }



return errors
},

  onSubmit: (values) => {
    console.log("sbmittingumit");
  //  console.log({values});

   const myForm = new FormData();

   myForm.append("name", values.name);
   myForm.append("email", values.email);
   myForm.append("file", values.file);


  

dispatch(changeUserDetailsFrontend(myForm))
console.log("submitted the for change User Updated ");
  },
});





const handleFileUpload =async(event:React.ChangeEvent<HTMLInputElement>)=>{
  if (!event.target.files) return;
  const files  = event.target.files ;
  if(files.length>1){
    toast.error("please select less than one images")
    return
  }

  const file = event.target.files[0];
    // const reader = new FileReader();

    // reader.readAsDataURL(file);

    // reader.onloadend = () => {
    //   setimageprev(reader.result as string);
    //   setimage(file);
    // };

    const readTHeImagFile=()=>{
      return new Promise((resolve) => {
        console.log("readTHeImagFile");
        const reader = new FileReader()
        reader.onloadend = () => resolve(
         [setimage(file as File),
          setimageprev(reader.result as string)
         ]
        )
        
       
        reader.readAsDataURL(file);
     
      })
    }
   await readTHeImagFile()
  // formik2.values.file= image!

  new Compressor(file, {
    quality: 0.1, // 0.6 can also be used, but its not recommended to go below.
    success: (compressedResult) => {
      // compressedResult has the compressed file.
      // Use the compressed file to upload the images to your server.        
      // setCompressedFile(res)
      console.log("compressedResult--",compressedResult);
      formik2.setFieldValue('file', compressedResult)
    },
  });
  // formik2.setFieldValue('file', file)
  // formik2.setFieldValue('file', image)


}




console.log(formik2);




const changePasswordHandler =()=>{
  setchangePasswordDiv(!changePasswordDiv)
}
const changeUserDetailsHandler =()=>{
  setchangeuserDetailsDiv(!changeuserDetailsDiv)
  
}

useEffect(() => {
   if(error){
    toast.error(error)
   }
   if(message){
    toast.success(message)
   }
}, [error, message, dispatch])


   
  return (
    <div className="myAccount_main">
      <Helmet>
        <title>My Account</title>
      </Helmet>
      <div className="myAccount_image" >

        <img src={user?.avatar.url} />

      </div>
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell align="center">User </TableCell>
            <TableCell align="center">Details</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.value}</TableCell>
          
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

<div className="accountbuttons">
  {/* {user?.role==="admin" &&   <Button variant="contained">Change Role</Button>} */}
  <Button onClick={changePasswordHandler}  sx={{mx:1}} variant="contained">Change Passwrord</Button>
  <Button   onClick={changeUserDetailsHandler} variant="contained">Change user Details</Button>
</div> 
 {changePasswordDiv && <div className="changePassword_div">
  <Typography variant="h5">Change password</Typography>
           <Box component={"form"}  width={"90vw"}  onSubmit={formik.handleSubmit}> 
              
           <TextField
     type="text"
     name="oldPassword"
     placeholder="enter oldPassword"
     title="oldPassword"
     fullWidth
     sx={{mt:2}}
     label="course oldPassword"


     value={formik.values.oldPassword}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
     helperText={formik.touched.oldPassword && formik.errors.oldPassword || "enter oldPassword "}
   />

<TextField
     type="text"
     name="newPassword"
     placeholder="enter newPassword"
     title="newPassword"
     fullWidth
     sx={{mt:2}}
     label="course newPassword"


     value={formik.values.newPassword}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
     helperText={formik.touched.newPassword && formik.errors.newPassword || "enter newPassword "}
   />


<Button  disabled={loading}  variant="contained" fullWidth type="submit">CHANGE PASSWORD SUBMIT </Button>

           </Box>
  
  </div>}

  {changeuserDetailsDiv && <div className="changeUserDetails_div">
  <Typography variant="h5">Change User Details</Typography>
        <Box component={"form"}  width={"90vw"}  onSubmit={formik2.handleSubmit}> 
              
           <TextField
     type="text"
     name="name"
     placeholder="enter name"
     title="name"
     fullWidth
     sx={{mt:2}}
     label="user name"


  value={formik2.values.name}
  onChange={formik2.handleChange}
  onBlur={formik2.handleBlur}
  error={formik2.touched.name && Boolean(formik2.errors.name)}
  helperText={formik2.touched.name && formik2.errors.name || "enter name "}
   />

<TextField
     type="text"
     name="email"
     placeholder="enter email"
     title="email"
     fullWidth
     sx={{mt:2}}
     label="course email"


  value={formik2.values.email}
  onChange={formik2.handleChange}
  onBlur={formik2.handleBlur}
  error={formik2.touched.email && Boolean(formik2.errors.email)}
  helperText={formik2.touched.email && formik2.errors.email || "enter email "}
   />




<Button component="label" variant="contained"  startIcon={<CloudUploadIcon />}
  fullWidth
  
  
  >
      Upload file 
      <VisuallyHiddenInput type="file"    multiple  accept='/image*' onChange={handleFileUpload}/>
    </Button>

    {formik2.errors.file && <Typography textAlign={"center"}  color={themer.palette.error.main} variant='h5'>{formik2.errors.file}</Typography>}

{imageprev &&  <img src={imageprev} className="PRev_image_account"/>}



<Button sx={{marginTop:"1vmax"}} disabled={loading}  variant="contained" fullWidth type="submit">CHANGE USER DETAILS SUBMIT </Button>

           </Box>
  
  </div>}








    </div>
  )
}

export default MyAccount