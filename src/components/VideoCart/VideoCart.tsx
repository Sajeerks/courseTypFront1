// import { Box, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
import "./VideoCart.css";
import { Link } from "react-router-dom";

export interface CousseModelTypeFrontend {
  _id?: string;
  title: string;
  description: string;
  lectures: {
    _id?: string;
    title: string;
    description: string;
    video?: {
      public_id: string;
      url: string;
    };
  }[];

  poster?:
    | {
        public_id: string;
        url: string;
      }
    | null
    | undefined;
  views: number;
  numOfVideos: number;
  category: string;
  createdBy: string;
  createdAt: Date;
}

interface PropTypeVideoCard {
  course: CousseModelTypeFrontend;
}

const VideoCart = ({ course }: PropTypeVideoCard) => {
  // const [videoUrl, setvideoUrl] = useState<string |  null>(null)

  // useEffect(() => {
  //   if(course.lectures[0].video?.url){

  //     setvideoUrl(course.lectures[0].video?.url)
  //   }
  // }, [course.lectures[0].video?.url])

  // console.log(videoUrl);
  // console.log(course);
  return (

    <Link  to={`course/${course._id}`}>   
    <div className="videoCart">
      <img
        src={course?.poster?.url}
        width={"100px"}
        alt={course?.poster?.public_id}
      />

      <div className="videoCart_details">
        <h2 className="course_title">{course.title}</h2>

        <div dangerouslySetInnerHTML={{__html:course.description}} className="video_description"></div>

        <p>No of videos {course.numOfVideos}</p>
      </div>

      {/* 
   <video 
    autoPlay
    controls
    controlsList="nodownload nofullscreen noremoteplayback"
    disablePictureInPicture
    disableRemotePlayback
   src={"https://res.cloudinary.com/dkljkuqr5/video/upload/v1679895925/okihkvccvwphcx5o3hnd.mp4"} />
{  videoUrl &&  <video src={ videoUrl} />} */}
    </div>
    </Link>
  );
};

export default VideoCart;
