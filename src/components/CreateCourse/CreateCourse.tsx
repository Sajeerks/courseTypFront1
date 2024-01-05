import { Box, FormHelperText, TextField, styled, FormControl, FormLabel , MenuItem, Menu

,  Select, InputLabel, useTheme, Button, Typography, Paper
} from "@mui/material"
import "./CreateCourse.css"
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Helmet } from "react-helmet-async";

import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Editor } from '@tinymce/tinymce-react';

import { Editor as TinyMCEEditor } from 'tinymce';
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Redux/store";
import { createNewCourseFrontend } from "../Redux/singleCourseReducer";

function checkforSIzeOfFiels(file:any) {
  let valid = true;

  if( new Blob([file]).size >= 1000000){

    valid = false
   }
   return valid;
  
  
}
function checkIfFilesAreCorrectType(file:any) {
  const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'], 
  video:["mp4", "avi",  "wmv" , "flv" ] };
  let valid = true;

    // if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
//       console.log("valid din check file typeeeeeeeeee");
//  console.log("file insise the checkfilesareCorrect type " , file);
//  console.log("file.name " , file.name);

   
  // if (!["application/pdf", "image/jpeg", "image/png"].includes(file.name)) {
  if (!validFileExtensions["image"].includes(file.name.split('.').pop())) {

    // console.log("valid din check file typeeeeeeeeee");
    valid = false;
  }

  return valid;
}


const validationSchema = yup.object({
  title: yup.string()
  .required("please enter a product name")
  .min(5, "title too short")
  .max(10, "title too long"),
description: yup.string().required("please enter a product description")
.min(10, "description too short")
.max(80, "description too long"),
// price: yup.number()
//   .integer()
//   .test(
//     "Is positive?",
//     "ERROR: The number must be greater than 0!",
//     (value) => value! > 0
//   )
  // .required("please enter a product price")
  // .min(1),
  category: yup.string().required("please enter a product category"),
  // stock: yup.number()
  //   .integer()
  //   .test(
  //     "Is positive?",
  //     "ERROR: The number must be greater than 0!",
  //     (value) => value! > 0
  //   )
  //   .required("please enter a product price")
  //   .min(1),
    // images:yup.string().required("an image is required").test(
    //    "length",
    //    "filetoolarge",
    //    function(file){

    //     let valid = false
    //     console.log("new Blob([file]).size", new Blob([file]).size);
    //     console.log(1024*1024);
    //     if( new Blob([file]).size <= 1024*1024){
    //        valid = true
    //       }
    //       return valid;


    //    }
     
    // )

    file:
    //  yup.array().of(
      // Yup.string().required("must be a type of string of base64 URL")
      yup.mixed()
        .required("A file is required")
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
    // ),


});

export const categories =[
  "sports" ,
'electronics',
"cloths",
"furniture",
"food",
"FMCG",
"hardware",
"contruction Materials",
"other"
]



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


const CreateCourse = () => {
  const editorRef =  useRef<TinyMCEEditor | null>(null);

const themer = useTheme()
const {user} = useSelector((state:RootState)=>state.user)
const [imageArray, setimageArray] = useState<string[]>([])
const dispatch = useDispatch<AppDispatch>()

const [imageprev, setimageprev] = useState("")
const [image, setimage] = useState<File | null>(null)

const {loading, error, message, course} = useSelector((state:RootState)=>state.singleCourse)
  useEffect(() => {
  if(error){
    toast.error(error)
  }
  if(message){
    toast.success(message)
  }
  }, [error, message])


  const formik = useFormik({
    initialValues: {
      title:"",
      description:"",
      createdBy:user?.name,
      category:"",
      // images:[{
      //   public_id:uuidv4(),
      //   url:"https://images.pexels.com/photos/5929944/pexels-photo-5929944.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        
      // }],
      // images:[""],
      file:"",    
        // stock:0,
      // user:"",
    },
    validationSchema: validationSchema,
    // validateOnMount:false,
  //  isInitialValid:false,
  
validate:(values)=>{
const errors:any ={}
if(values.description  && values.description.length> 80){
  errors.description = "long description length"
}
if(!values.file ){
  errors.file = "please select an image"
}
if(!values.title){
  errors.title = "please enter a title"
}

// if(!values.images){
//   errors.images = "not enought images"

 
// }
// if(values.images && values.images?.length ===0){
//   errors.images = "not enought images"
// }


return errors
},
  
    onSubmit: (values) => {
      console.log("sbmittingumit");
    //  console.log({values});

     const myForm = new FormData();

     myForm.append("title", values.title);
    //  myForm.append("description", values.description.toString());
    
     myForm.append("category", values.category);
     myForm.append("description", values.description);
     myForm.append("file", values.file);
     myForm.append("createdBy",values.createdBy!)

 
     // myForm.append("images", product.images);
    //  myForm.append("images", JSON.stringify(imageUrl));
    //  myForm.append("images", JSON.stringify(imageUrl));
    //  myForm.append("images", JSON.stringify(imageUrl));
    //  myForm.append("images",JSON.stringify(values.images!));



dispatch(createNewCourseFrontend(myForm))
// dispatch(createSingleNewProduct(myForm))
console.log("submitted the course");
    },
  });


  // const validatorsss = (values:typeof newProductData) => {
  //   let errors:any = {};
  //   if (!values.images) {
  //     errors.images = "images cannot be null";
  //   }
  
  //   // if (values.images === "") {
  //   //   errors.images = "images cannot be none";
  //   // }
  
  //   // if (values.images && values.images.length <2) {
  //   //   errors.images = "please select at least one iamges to post for products";
  //   // }
  
  //   return errors;
  // };
  

console.log("image--", image);
console.log("imageprev--", imageprev);





  let masterFileArray:any[] = [];
  const handleFileUpload = async(event:React.ChangeEvent<HTMLInputElement>) => {
    // event.persist();
    console.log("handle ile upload clicked");
    
    if (!event.target.files) return;

 
    // const reader = new FileReader();

    // reader.readAsDataURL(event.target.files[0]);

    // reader.onloadend = () => {
     
    // };
   
    // const file  = event.target.files[0]  ;
    const files  = event.target.files ;
    if(files.length>1){
      toast.error("please select less than one images")
      return
    }

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setimageprev(reader.result as string);
      setimage(file);
      formik.setFieldValue("file", file)
    };




    for (let index = 0; index < files.length; index++) {
      // const fileAsDATAURl = await getBase64(file.fileList[index].originFileObj);
      if(files.item(index)?.size! > 500*1000){
        // console.log("files.item(index)?.siz---",files.item(index)?.size);
      const fileAsDATAURl = await resizeFile(files.item(index)!);
      masterFileArray.push(fileAsDATAURl);
    }else{
        
     
      const readTHeImagFile=()=>{
        return new Promise((resolve) => {
          console.log("readTHeImagFile");
          const reader = new FileReader()
          reader.onloadend = () => resolve(masterFileArray.push(reader.result!.toString()))
         
          reader.readAsDataURL(files.item(index)!);
       
        })
      }
     await readTHeImagFile()
     

//     }
      
//     reader.readAsDataURL(files.item(index)!);

     
    }
 
  const imaageEditedSet = new Set(masterFileArray);


  masterFileArray = Array.from(imaageEditedSet);
  setimageArray(masterFileArray)
  
  // setImageArray([...masterFileArray])
  // console.log({masterFileArray});
  // console.log({imageArray});

  
  // formik.values.images= masterFileArray
    // setFile(event.target.files[0])
    // const reader = new FileReader();

    // reader.onloadend = () => {
    //   if(reader.result){
    //     setImageUrl(reader.result.toString());
      
    //   }
 
    
      
    // };

    // reader.readAsDataURL(file);
  // formik.values.file =  masterFileArray[0]
// setTimeout(() => {
//  formik.setFieldTouched("file")
// }, 500);
  

  };

  }


  
console.log(formik);

















  return (
    <div className="CreateCourse" >
      <Helmet><title>Create course</title></Helmet>

  
      <Box component={"form"} 
         onSubmit={formik.handleSubmit}  


         display={"flex"}
         justifyContent={"center"}
         alignItems={"center"}
         flexDirection={"column"}
         margin={"5vmax"}
      
      >
      <TextField
     type="text"
     name="title"
     placeholder="enter course stock"
     title="title"
     fullWidth
     sx={{mt:2}}
     label="course title"


     value={formik.values.title}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.title && Boolean(formik.errors.title)}
     helperText={formik.touched.title && formik.errors.title || "enter course title"}
   />
{/* 
<TextField
     type="text"
     name="description"
     placeholder="enter course description"
     title="description"
     fullWidth
     sx={{mt:2}}
     label="course description"


     value={formik.values.description}
     onChange={formik.handleChange}
     onBlur={formik.handleBlur}
     error={formik.touched.description && Boolean(formik.errors.description)}
     helperText={formik.touched.description && formik.errors.description || "enter course description"}
   />
 */}



<Editor
apiKey='0oc6cviwzuenmvc7cenc4jun2n8rjrkqpqyc6yudnkuim9zc'
         onInit={(_evt, editor) => editorRef.current = editor }
         initialValue="<p>Please enter a valid course description not less than 80 characters </p>"
         init={{
           height: 200,
           menubar: false,
          
          //  plugins: [
          //    'advlist autolink lists link image charmap print preview anchor',
          //    'searchreplace visualblocks code fullscreen',
          //    'insertdatetime media table paste code help wordcount'
          //  ],
          //  toolbar: 'undo redo | formatselect | ' +
          //  'bold italic backcolor | alignleft aligncenter ' +
          //  'alignright alignjustify | bullist numlist outdent indent | ' +
          //  'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          
           plugins:
             "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
           toolbar:
             "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
           image_advtab: true
         }}

         onEditorChange={(newValue, editor) => {
         
          // setValue(newValue.replace(/<(.|\n)*?>/g, ''));
    
          

          // setText(editor.getContent({format: 'text'}));
          formik.values.description = newValue
          
           setTimeout(() => {
            formik.setFieldTouched('description')
           }, 500);
        }}
        />


<Box>
{formik.errors.description! && <Typography color={themer.palette.error.main} variant='h5'>{formik.errors.description}</Typography>}
</Box>



<FormControl sx={{ m: 1 , minWidth:"90vw"}}>
        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          // value={formik.values.category}
          // onChange={handleSelectChange}
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.category && Boolean(formik.errors.category)}
          // helperText={formik.touched.category && formik.errors.category || "enter product category"}
          // autoWidth
          fullWidth
            
        
          label="Category"
          name='category'
        >

          {categories.map((cat)=>(
            <MenuItem key={cat} value={cat} >
              {cat}
            </MenuItem>
          )) }
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem> */}


          categories.
        </Select>
       <span  color={themer.palette.error.main} > <FormHelperText error >{formik.errors.category}</FormHelperText></span>
      </FormControl>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}
  
  
  
  >
      Upload file 
      <VisuallyHiddenInput type="file"    multiple  accept="image/*" onChange={handleFileUpload}/>
    </Button>

    {formik.errors.file && <Typography color={themer.palette.error.main} variant='h5'>{formik.errors.file}</Typography>}
  
  
  
  
    <Box maxWidth={"90vw"} maxHeight={"40vh"} overflow={"scroll"} display={"flex"}  flexDirection={"row"} >
  {imageArray?.length!>0 && imageArray?.map((imageUrl, index)=>(


  <Paper sx={{m:1, width:"100%", height:"100%"}} key={index}  >    
  {imageUrl && <img src={imageUrl.toString()}   
  // onClick={(e)=>ImageModler(e)(imageUrl,index)}   
  
  alt='new product image' style={{maxHeight:"40vh", maxWidth:"90vw"}}/>}

  {/* <Button key={index} onClick={(e)=>ImageModler(e)(imageUrl,index)} >preivew</Button> */}


  </Paper>
  ))}

</Box>
  
  
  
  
  
  
  
    <Button  variant="contained" type="submit" disabled={loading }
     sx={{mt:2}}
     
     fullWidth
     >
      Create Course
     </Button>
      </Box>

    </div>
  )
}

export default CreateCourse