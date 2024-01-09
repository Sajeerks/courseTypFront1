import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormHelperText,
  TextField,
  styled,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  useTheme,
  Button,
  Typography,
  Paper,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import "./EditCourse.css";
import { AppDispatch, RootState } from "../Redux/store";
import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addSingleLectureFrontend,
  deleteSingleLectureFrontend,
  getSingleCourseFrontend,
  resetAllSingleCourseStateReducer,
  udpateEntireCourseFrontend,
  updateProgessForFrontend,

} from "../Redux/singleCourseReducer";
// import { Loading } from '../Loading/Loading'
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import * as yup from "yup";
import { Editor } from "@tinymce/tinymce-react";

import { Editor as TinyMCEEditor } from "tinymce";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CousseModelTypeFrontend } from "../VideoCart/VideoCart";
import Modal from "@mui/material/Modal";
import { LoadingWithPercentage } from "../Loading/LoadingWithPercentage";
import { progressUploadedorExport } from "../../App";

const styleForModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  bgcolor: "background.paper",
  border: "5px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "80vh",
};

function checkforSIzeOfFiels(file: any) {
  let valid = true;
  // console.log("fieks------------", file);
  // if (files) {
  // files.map(file => {
  // console.log("size of the file checkforSIzeOfFiels ", file.size)
  // const size = file.size / 1024 / 1024;
  // if (size > 1) {
  //   valid = false;
  // }

  // })
  // }

  //   const MAX_FILE_SIZE = 102400; //100KB

  // const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

  // function isValidFileType(fileName, fileType) {
  //   return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
  // }

  // Yup.object().shape({
  //   image: Yup
  //       .mixed()
  //       .required("Required")
  //       .test("is-valid-type", "Not a valid image type",
  //         value => isValidFileType(value && value.name.toLowerCase(), "image"))
  //       .test("is-valid-size", "Max allowed size is 100KB",
  //         value => value && value.size <= MAX_FILE_SIZE)
  // });

  // console.log("new Blob([file]).size ===",new Blob([file]).size );

  // if( new Blob([file]).size <= (1024*1027/100000000000)){
  if (new Blob([file]).size >= 100000000) {
    valid = false;
  }
  return valid;
}
function checkIfFilesAreCorrectType(file: any) {
  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
    video: ["mp4", "avi", "wmv", "flv"],
  };
  let valid = true;

  // if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
  //       console.log("valid din check file typeeeeeeeeee");
  //  console.log("file insise the checkfilesareCorrect type " , file);
  //  console.log("file.name " , file.name);

  // if (!["application/pdf", "image/jpeg", "image/png"].includes(file.name)) {
  if (!validFileExtensions["video"].includes(file.name.split(".").pop())) {
    // console.log("valid din check file typeeeeeeeeee");
    valid = false;
  }

  return valid;
}

function checkforSIzeOfFielsForImages(file: any) {
  let valid = true;
  console.log("fieks------------", file);

  console.log("new Blob([file]).size ===", new Blob([file]).size);

  if (new Blob([file]).size >= 1000000 && file !== "") {
    valid = false;
  }
  return valid;
}
function checkIfFilesAreCorrectTypeForImages(file: any) {
  const validFileExtensions = {
    image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
    video: ["mp4", "avi", "wmv", "flv"],
  };
  let valid = true;

  //  console.log({file});
  // if (!["application/pdf", "image/jpeg", "image/png"].includes(file.name)) {
  if (file !== undefined) {
    if (!validFileExtensions["image"].includes(file.name.split(".").pop())) {
      valid = false;
      // console.log("valid din check file typeeeeeeeeee valid--", valid);
    }
  } else {
    valid = true;
  }

  return valid;
}

const validationSchema = yup.object({
  title: yup
    .string()
    .required("please enter a product name")
    .min(4, "title too short")
    .max(20, "title too long"),

  description: yup
    .string()
    .required("please enter a product description")
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
    // yup.array().of(
    // Yup.string().required("must be a type of string of base64 URL")
    yup
      .mixed()
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
      ),
  // ),
});

const validationSchema2 = yup.object({
  title: yup
    .string()
    .required("please enter a lecture tilte")
    .min(2, "title too short should be more than  2 characters")
    .max(10, "title shall not be more than 10 characters"),
  description: yup
    .string()
    .required("please enter a lecture description")
    .min(2, "description too short should be more than  10 characters")
    .max(80, "description too long should be less than 80 characters"),

  file:
    //  yup.array().of(
    // Yup.string().required("must be a type of string of base64 URL")
    yup
      .mixed()
      .required("A file is required")
      // .nullable()
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
      ),
  // ),
});

export const categories = [
  "sports",
  "electronics",
  "cloths",
  "furniture",
  "food",
  "FMCG",
  "hardware",
  "contruction Materials",
  "other",
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const resizeFile = (file: File) =>
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

const EditCourse = () => {
  const { courseId } = useParams();

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const themer = useTheme();
  const { user } = useSelector((state: RootState) => state.user);
  const [imageArray, setimageArray] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  // const [imageprev, setimageprev] = useState("")
  // const [image, setimage] = useState<File | null>(null)

  const {
    loading,
    error,
    message,
    course,
    percentCompleted,
    pendingUploadpercentage,
  } = useSelector((state: RootState) => state.singleCourse);
  const [courseState, setcourseState] =
    useState<CousseModelTypeFrontend | null>(null);

  const [addnewLecture, setaddnewLecture] = useState(false);
  ////FOR MOADAL

  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setaddnewLecture(true);
  const handleClose = () => setaddnewLecture(false);
  const [videoPrev, setvideoPrev] = useState("");
  const [videoFileFrominput, setvideoFileFrominput] = useState<File | null>(
    null
  );
  //  const [progessuploaded, setprogessuploaded] = useState(0)

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAllSingleCourseStateReducer());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAllSingleCourseStateReducer());
    }

    if (courseId) {
      dispatch(getSingleCourseFrontend({ courseId }));
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    if (courseId) {
      dispatch(getSingleCourseFrontend({ courseId }));
    }
  }, [dispatch, courseId]);

  useEffect(() => {
    setcourseState(course);
  }, [loading]);
  useEffect(() => {
    dispatch(updateProgessForFrontend());
    console.log({ pendingUploadpercentage });
  }, [pendingUploadpercentage]);

  useEffect(() => {
    setTimeout(() => {
      formik.setFieldValue("description", courseState?.description);
      formik.setFieldValue("title", courseState?.title);
      formik.setFieldValue("category", courseState?.category);

      formik.setFieldValue("file", "");
      // formik.setFieldValue("file",  new Blob ([courseState?.poster?.url!]))

      setTimeout(() => {
        formik.setFieldTouched("description");
        formik.setFieldValue("file", "", false);
      }, 500);
    }, 1000);
  }, [courseState?._id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      //   title:courseState?.title as string,
      //   description:courseState?.description as string,
      //   createdBy:user?.name,
      //   category:courseState?.category as string,

      //   file:new Blob([courseState?.poster?.url!]),
      title: "",
      description: "",
      createdBy: user?.name,
      category: "",

      file: "",
    },
    validationSchema: validationSchema,
    // validateOnMount:true,
    //  isInitialValid:false,

    validate: (values) => {
      const errors: any = {};
      if (values.description && values.description.length > 80) {
        errors.description =
          "long description length should be less than 80 characters";
      }
      // if(!values.file ){
      //   errors.file = null
      // }
      if (!values.title) {
        errors.title = "please enter a title";
      }

      return errors;
    },

    onSubmit: (values) => {
      // console.log("sbmitting the formil i ");

      const myForm = new FormData();

      myForm.append("title", values.title);

      myForm.append("category", values.category);
      myForm.append("description", values.description);
      myForm.append("createdBy", values.createdBy!);
      //  myForm.append("file", image!);
      myForm.append("file", values.file);

      //  if(image){
      //   myForm.append("file", image!);
      //  }else{
      //   myForm.append("file", "");
      //  }

      dispatch(udpateEntireCourseFrontend({ id: courseId!, myForm: myForm }));

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

  // console.log("image--", image);
  // console.log("imageprev--", imageprev);

  let masterFileArray: any[] = [];
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // event.persist();
    console.log("handle ile upload clicked");

    if (!event.target.files) return;

    // const reader = new FileReader();

    // reader.readAsDataURL(event.target.files[0]);

    // reader.onloadend = () => {

    // };

    // const file  = event.target.files[0]  ;
    const files = event.target.files;
    if (files.length > 1) {
      toast.error("please select less than one images");
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    formik.setFieldValue("file", file);
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      // setimageprev(reader.result as string);
      // setimage(file);
    };

    for (let index = 0; index < files.length; index++) {
      // const fileAsDATAURl = await getBase64(file.fileList[index].originFileObj);
      if (files.item(index)?.size! > 500 * 1000) {
        // console.log("files.item(index)?.siz---",files.item(index)?.size);
        const fileAsDATAURl = await resizeFile(files.item(index)!);
        masterFileArray.push(fileAsDATAURl);
      } else {
        const readTHeImagFile = () => {
          return new Promise((resolve) => {
            // console.log("readTHeImagFile");
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve(masterFileArray.push(reader.result!.toString()));

            reader.readAsDataURL(files.item(index)!);
          });
        };
        await readTHeImagFile();

        //     }

        //     reader.readAsDataURL(files.item(index)!);
      }

      const imaageEditedSet = new Set(masterFileArray);

      masterFileArray = Array.from(imaageEditedSet);
      setimageArray(masterFileArray);

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
    }
  };

  console.log("formik", formik);

  ///////////////////////////////////////////////////////////////////////////for signle lecture form

  const handleFileUploadForVideo = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // event.persist();
    console.log("handle ile upload clicked");

    if (!event.target.files) return;

    // const reader = new FileReader();

    // reader.readAsDataURL(event.target.files[0]);

    // reader.onloadend = () => {

    // };

    // const file  = event.target.files[0]  ;
    const files = event.target.files;
    if (files.length > 1) {
      toast.error("please select less than one video file");
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();

    formik2.setFieldValue("file", file);

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setvideoPrev(reader.result as string);

      // formik2.setFieldValue("file"    ,reader.result as string )
      // formik2.values.file =  reader.result as string

      setvideoFileFrominput(file);
    };

    //   for (let index = 0; index < files.length; index++) {
    //     // const fileAsDATAURl = await getBase64(file.fileList[index].originFileObj);
    //     if(files.item(index)?.size! > 500*1000){
    //       // console.log("files.item(index)?.siz---",files.item(index)?.size);
    //     const fileAsDATAURl = await resizeFile(files.item(index)!);
    //     masterFileArray.push(fileAsDATAURl);
    //   }else{

    //     const readTHeImagFile=()=>{
    //       return new Promise((resolve) => {
    //         console.log("readTHeImagFile");
    //         const reader = new FileReader()
    //         reader.onloadend = () => resolve(masterFileArray.push(reader.result!.toString()))

    //         reader.readAsDataURL(files.item(index)!);

    //       })
    //     }
    //    await readTHeImagFile()

    // //     }

    // //     reader.readAsDataURL(files.item(index)!);

    //   }

    // const imaageEditedSet = new Set(masterFileArray);

    // masterFileArray = Array.from(imaageEditedSet);
    // setimageArray(masterFileArray)

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

    setTimeout(() => {
      formik2.setFieldTouched("file");
      console.log("setfield touchef fiel shoud run validatrs");
    }, 500);
  };

  const formik2 = useFormik({
    // enableReinitialize:true,
    initialValues: {
      title: "please enter the lecture title",
      description: "please enter the lecture description",

      file: "",
    },
    validationSchema: validationSchema2,
    // validateOnMount:true,
    //  isInitialValid:false,

    validate: (values) => {
      const errors: any = {};
      if (values.description && values.description.length > 80) {
        errors.description =
          "long description length shall less than  80 characters";
      }
      // if(!values.file ){
      //   errors.file = "please select a video"
      // }
      if (values.title && values.title.length > 10) {
        errors.title = "long  title must be less than 10 characters";
      }

      return errors;
    },

    onSubmit: (values) => {
      console.log("sbmittingumit for adding lecture ");
      const myForm = new FormData();

      myForm.append("title", values.title);

      myForm.append("description", values.description);
      myForm.append("file", videoFileFrominput!);

      const id = courseState?._id;
      if (id) {
        dispatch(addSingleLectureFrontend({ id, myForm }));
        //  dispatch(resetAllSingleCourseStateReducer())
      }

      // if(courseId){
      //   dispatch(getSingleCourseFrontend({courseId}))
      //  }

      console.log("submitted the adding lecture");
    },
  });
  // console.log("formik2--", formik2);

  // console.log({videoFileFrominput});

  return (
    <Fragment>
      {/* {loading?(<Loading/>):( */}
      {loading ? (
        <LoadingWithPercentage progessuploaded={progressUploadedorExport} />
      ) : (
        <div className="editCourse_main_div">
          <Helmet>
            <title>Edit course</title>
          </Helmet>

          <Typography textAlign={"center"} sx={{ mt: 1 }}>
            CouseID : {course?._id}
          </Typography>
          <Box
            component={"form"}
            onSubmit={formik.handleSubmit}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            margin={"5vmax"}
            width={"90vw"}
          >
            <TextField
              type="text"
              name="title"
              placeholder="enter course stock"
              title="title"
              fullWidth
              sx={{ mt: 2 }}
              label="course title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={
                (formik.touched.title && formik.errors.title) ||
                "enter course title"
              }
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

            <Box width={"90vw"}>
              <Editor
                apiKey="0oc6cviwzuenmvc7cenc4jun2n8rjrkqpqyc6yudnkuim9zc"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue={courseState?.description}
                //  initialValue={formik.initialValues.description}

                init={{
                  height: 200,
                  //  width:450
                  //  selector: 'textarea',
                  //  resize: 'both'

                  menubar: true,

                  //  plugins: [
                  //    'advlist autolink lists link image charmap print preview anchor',
                  //    'searchreplace visualblocks code fullscreen',
                  //    'insertdatetime media table paste code help wordcount'
                  //  ],
                  //  toolbar: 'undo redo | formatselect | ' +
                  //  'bold italic backcolor | alignleft aligncenter ' +
                  //  'alignright alignjustify | bullist numlist outdent indent | ' +
                  //  'removeformat | help',
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

                  plugins:
                    "print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern",
                  toolbar:
                    "formatselect | bold italic underline strikethrough | forecolor backcolor blockquote | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                  image_advtab: true,
                }}
                onEditorChange={(newValue, _editor) => {
                  // setValue(newValue.replace(/<(.|\n)*?>/g, ''));

                  // setText(editor.getContent({format: 'text'}));
                  formik.values.description = newValue;

                  setTimeout(() => {
                    formik.setFieldTouched("description");
                  }, 500);
                }}
              />
            </Box>
            <Box>
              {formik.errors.description! && (
                <Typography color={themer.palette.error.main} variant="h5">
                  {formik.errors.description}
                </Typography>
              )}
            </Box>

            <FormControl sx={{ m: 1, minWidth: "90vw" }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                // value={formik.values.category}
                // onChange={handleSelectChange}
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
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
                label="Category"
                name="category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              <span color={themer.palette.error.main}>
                {" "}
                <FormHelperText error>{formik.errors.category}</FormHelperText>
              </span>
            </FormControl>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
              />
            </Button>

            {formik.errors.file && (
              <Typography color={themer.palette.error.main} variant="h5">
                {formik.errors.file}
              </Typography>
            )}

            <Typography>New Image </Typography>
            <Box
              maxWidth={"90vw"}
              maxHeight={"40vh"}
              overflow={"scroll"}
              display={"flex"}
              flexDirection={"row"}
            >
              {imageArray?.length! > 0 &&
                imageArray?.map((imageUrl, index) => (
                  <Paper
                    sx={{
                      m: 1,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    key={index}
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl.toString()}
                        // onClick={(e)=>ImageModler(e)(imageUrl,index)}
                        loading="lazy"
                        alt="new course image"
                        style={{ maxHeight: "40vh", maxWidth: "90vw" }}
                      />
                    )}
                    {imageArray?.length! >= 1 && (
                      <Button
                        key={index}
                        variant="contained"
                        onClick={() => {
                          imageArray.length = 0;
                          formik.setFieldValue("file", "");
                          // setimage(null)
                          // setimageprev("")
                        }}
                      >
                        Deselect this picture
                      </Button>
                    )}
                  </Paper>
                ))}
            </Box>
            <Divider>
              <Chip label="Old Image" />
            </Divider>

            <Box
              maxWidth={"90vw"}
              maxHeight={"40vh"}
              overflow={"scroll"}
              display={"flex"}
              flexDirection={"row"}
            >
              <Paper sx={{ m: 1, width: "100%", height: "100%" }}>
                {courseState?.poster?.url && (
                  <img
                    src={courseState?.poster?.url.toString()}
                    // onClick={(e)=>ImageModler(e)(imageUrl,index)}

                    alt="old course image"
                    style={{ maxHeight: "40vh", maxWidth: "90vw" }}
                  />
                )}

                {/* <Button key={index} onClick={(e)=>ImageModler(e)(imageUrl,index)} >preivew</Button> */}
              </Paper>
            </Box>

            <Box>
              {courseState && courseState.lectures.length >= 1 ? (
                courseState.lectures.map((singleLecture, _index) => {
                  return (
                    <div
                      key={singleLecture._id}
                      className="lectureCard_in_edit_course"
                    >
                      <Typography> {singleLecture.title}</Typography>
                      <Typography> {singleLecture.description}</Typography>

                      <video
                        className="video_in_course_description_edit_course"
                        src={singleLecture.video?.url}
                        controls
                        controlsList="nodownload noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                      />

                      <Stack direction={"row"} width={"100%"}>
                        <Button
                          variant="contained"
                          sx={{ background: "red", width: "50%" }}
                          onClick={() => {
                            dispatch(
                              deleteSingleLectureFrontend({
                                courseId: courseState._id!,
                                lectureId: singleLecture._id!,
                              })
                            );
                            // if(courseId){
                            //   dispatch(getSingleCourseFrontend({courseId}))
                            //   console.log("callled after deleted");
                            //  }
                          }}
                        >
                          Delete This Lecture
                        </Button>
                        <Button variant="contained" sx={{ width: "50%" }}>
                          Edit This Lecture
                        </Button>
                      </Stack>

                      <Button
                        fullWidth
                        variant="contained"
                        sx={{ background: "green" }}
                        onClick={() => setaddnewLecture(!addnewLecture)}
                      >
                        Add new lecture
                      </Button>
                    </div>
                  );
                })
              ) : (
                <Box>
                  <Typography>no lectures to view</Typography>
                  <Button
                    variant="contained"
                    onClick={() => setaddnewLecture(!addnewLecture)}
                  >
                    Add new lecture
                  </Button>
                </Box>
              )}
            </Box>

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              sx={{ mt: 2 }}
              fullWidth
            >
              Update Course
            </Button>
          </Box>

          {addnewLecture && (
            <Modal
              open={addnewLecture}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={styleForModal}
                component={"form"}
                onSubmit={formik2.handleSubmit}
              >
                <Typography>Enter new Lecture</Typography>

                <TextField
                  type="text"
                  name="title"
                  placeholder="enter lecture title"
                  title="title"
                  fullWidth
                  sx={{ mt: 2 }}
                  label="lecture title"
                  value={formik2.values.title}
                  onChange={formik2.handleChange}
                  onBlur={formik2.handleBlur}
                  error={formik2.touched.title && Boolean(formik2.errors.title)}
                  helperText={
                    (formik2.touched.title && formik2.errors.title) ||
                    "enter lecture title"
                  }
                />

                <TextField
                  type="text"
                  name="description"
                  placeholder="enter lecture description"
                  title="description"
                  fullWidth
                  sx={{ mt: 2 }}
                  label="lecture description"
                  value={formik2.values.description}
                  onChange={formik2.handleChange}
                  onBlur={formik2.handleBlur}
                  error={
                    formik2.touched.description &&
                    Boolean(formik2.errors.description)
                  }
                  helperText={
                    (formik2.touched.description &&
                      formik2.errors.description) ||
                    "enter lecture description"
                  }
                />

                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ my: 1 }}
                >
                  Upload lecture video
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleFileUploadForVideo}
                  />
                </Button>

                {videoPrev && (
                  <video
                    className="video_Preveiw_in_modal"
                    src={videoPrev}
                    controls
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                )}
                {formik2.errors.file && (
                  <Typography color={themer.palette.error.main} variant="h5">
                    {formik2.errors.file}
                  </Typography>
                )}

                {!!percentCompleted && (
                  <Typography>
                    {" "}
                    Upload Percentage completed {percentCompleted}%{" "}
                  </Typography>
                )}

                <Button
                  sx={{ mt: 1 }}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  Submit Lecture
                </Button>
              </Box>
            </Modal>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default EditCourse;
