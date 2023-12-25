import { useParams } from "react-router-dom"
import "./CourseDescription.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Redux/store"
import { useEffect, useState } from "react"
import { CousseModelTypeFrontend } from "../VideoCart/VideoCart"
import { OnlyLectureType, getSingleCourseFrontend } from "../Redux/singleCourseReducer"
import { toast } from "react-toastify"
import { Typography } from "@mui/material"




const CourseDescription = () => {

    const {courseId} = useParams()
     const dispatch  = useDispatch<AppDispatch>()
     const {loading, error, message, lectures} = useSelector((state:RootState)=>state.singleCourse)
    // console.log(courseId);
   
    const [lecturesState, setlecturesState] = useState<OnlyLectureType[] | null>(null)
    useEffect(() => {

        if(courseId){
            dispatch(getSingleCourseFrontend({courseId}))

        }
    }, [courseId])
    
  useEffect(() => {
    if(!error){
        toast.success(message)

    }
  }, [message])
  
    
  useEffect(() => {
    if(error){
      toast.error(error)
      
    }

    if(message){
      toast.warning(message)
    }

 

    
      }, [error, message])


    useEffect(() => {
        if(lectures){
            setlecturesState(lectures)
        }
        console.log("lectures--", lectures);
    }, [loading])
//     console.log({course});
// console.log({lecturesState});
// useEffect(() => {

// }, [message, error])


  return (
    <div className="CourseDescription_main">

        <h3>Letures for the course -{courseId}</h3>

        {( lecturesState && lecturesState?.length>=1 ) ? lecturesState.map((singleLecture, index)=>{
            return (
                  <div key={singleLecture._id} className="lectureCard">
                    
                    <Typography> {singleLecture.title}</Typography>  
                    <Typography> {singleLecture.description}</Typography>  
                  
                     <video
                     className="video_in_course_description"
                      src={singleLecture.video?.url}
                     controls
                    
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
                     />
                   
                       
                     </div>
            )
        }  ):(<Typography>no lectures to view</Typography>)}
         


    </div>
  )
}

export default CourseDescription