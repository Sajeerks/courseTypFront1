

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { server ,setProgesserVaiblae} from "../../App";
import axios from 'axios'
import { RootState } from './store';
import { CousseModelTypeFrontend } from '../VideoCart/VideoCart';



interface getSingleCourseFrontendType{
    courseId:string
}
export const getSingleCourseFrontend = createAsyncThunk(  "singleCourse/getSingleCourseFrontend",  async ({courseId}:getSingleCourseFrontendType, thunkApi) => {
      try {
       
  console.log({courseId});
  console.log("inside the getSingleCourseFrontend");
        const { data } = await axios.get(   `${server}/api/v1/course/${courseId}`,{
            headers:{
              // 'Access-Control-Allow-Origin': '*', 
              'Content-type': 'application/json',
              
          },
           withCredentials:true,
        
        });
  //  console.log( "data.user==",data.user)
  // console.log("data",data);
        return data;
      } catch (error:any) {
        // return error as Error
        console.log(error)
  
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
  );



  export const createNewCourseFrontend = createAsyncThunk(  "singleCourse/createNewCourseFrontend",  async (myForm:FormData, thunkApi) => {
    try {
     
      for (var pair of myForm.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
      const { data } = await axios.post(   `${server}/api/v1/createcourse`,myForm, {
          headers:{
            // 'Access-Control-Allow-Origin': '*', 
            // 'Content-type': 'application/json',
            'Content-type': "multipart/form-data",
            
        },
         withCredentials:true,
      
      });
//  console.log( "data.user==",data.user)
// console.log("data",data);
      return data;
    } catch (error:any) {
      // return error as Error
      console.log(error)

      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);


interface addSingleLectureFrontendType{
  id:String,
  myForm:FormData
}


export let uploadPercentagePendingTransfer:number =0 
export const addSingleLectureFrontend = createAsyncThunk(  "singleCourse/addSingleLectureFrontend",  async ( {id  , myForm}:addSingleLectureFrontendType, thunkApi) => {
  let  uploadPercentage:number= 0
  try {
    
    for (var pair of myForm.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    const { data } = await axios.post(   `${server}/api/v1/course/${id}`,myForm, {
        headers:{
          // 'Access-Control-Allow-Origin': '*', 
          // 'Content-type': 'application/json',
          'Content-type': "multipart/form-data",
          
      },
      onUploadProgress:function(progressEvent) {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total! );
        console.log({percentCompleted});
        setProgesserVaiblae(percentCompleted)
        // uploadPercentage =percentCompleted
        // uploadPercentagePendingTransfer = percentCompleted
      },
       withCredentials:true,
    
    });
//  console.log( "data.user==",data.user)
// console.log("data",data);
// console.log({uploadPercentage});
    return {data ,uploadPercentage,};
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);


interface deleteSingleLectureFrontendType{
  courseId:string, 
  lectureId:string

}


export const deleteSingleLectureFrontend = createAsyncThunk(  "singleCourse/deleteSingleLectureFrontend",  async ( {courseId,lectureId}:deleteSingleLectureFrontendType, thunkApi) => {
  try {
   
 console.log({courseId});
 console.log({lectureId});
 

    // const { data } = await axios.delete(   `${server}/api/v1/deletesinglelecture?courseId=${courseId}&lectureId=${lectureId}` ,{
      const { data } = await axios.put(   `${server}/api/v1/deletesinglelecture` ,{courseId,lectureId}, {


        headers:{
          // 'Access-Control-Allow-Origin': '*', 
          'Content-type': 'application/json',
          // 'Content-type': "multipart/form-data",
          
      },
       withCredentials:true,
    
    });
//  console.log( "data.user==",data.user)
// console.log("data",data);
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);



interface addSingleLectureFrontend{
  id:String,
  myForm:FormData
}



export const udpateEntireCourseFrontend = createAsyncThunk(  "singleCourse/udpateEntireCourseFrontend",  async ({id ,myForm }:addSingleLectureFrontendType, thunkApi) => {
  try {
   
    for (var pair of myForm.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }
    const { data } = await axios.put(   `${server}/api/v1/course/${id}`,myForm, {
        headers:{
          // 'Access-Control-Allow-Origin': '*', 
          // 'Content-type': 'application/json',
          'Content-type': "multipart/form-data",
          
      },
      onUploadProgress:function(progressEvent) {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total! );
        console.log({percentCompleted});
        setProgesserVaiblae(percentCompleted)
      },
       withCredentials:true,
    
    });
//  console.log( "data.user==",data.user)
console.log("data",data);
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);







export const deleteEntireCourseFrontend = createAsyncThunk(  "singleCourse/deleteEntireCourseFrontend",  async (id:string, thunkApi) => {
  try {
   

    const { data } = await axios.delete(   `${server}/api/v1/course/${id}`, {
        headers:{
          // 'Access-Control-Allow-Origin': '*', 
          'Content-type': 'application/json',
          // 'Content-type': "multipart/form-data",
          
      },
      onUploadProgress:function(progressEvent) {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total! );
        // console.log({percentCompleted});
        setProgesserVaiblae(percentCompleted)
      },
       withCredentials:true,
    
    });
//  console.log( "data.user==",data.user)
console.log("data",data);
    return data;
  } catch (error:any) {
    // return error as Error
    console.log(error)

    return thunkApi.rejectWithValue(error.response.data);
  }
}
);







// export const getAllCoursesFrontend = createAsyncThunk(  "singleCourse/getAllCoursesFrontend",  async (_, thunkApi) => {
//   try {
   

//     const { data } = await axios.get(   `${server}/api/v1/allcourses`,{
//         headers:{
//           // 'Access-Control-Allow-Origin': '*', 
//           'Content-type': 'application/json',
          
//       },
//        withCredentials:true,
    
//     });
// //  console.log( "data.user==",data.user)
// // console.log("data",data);
//     return data;
//   } catch (error:any) {
//     // return error as Error
//     console.log(error)

//     return thunkApi.rejectWithValue(error.response.data);
//   }
// }
// );





// var config = {
//   onUploadProgress: function(progressEvent:any) {
//     var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
//   }
// }




  export interface OnlyLectureType {
    _id?: string;
    title: string;
    description: string;
    video?: {
      public_id: string;
      url: string;
    };
  }



  
 
  interface initalStateForAllcourses {
    course: CousseModelTypeFrontend | null;
    loading: boolean;
    error: string | null;
    message:string |null
    lectures: OnlyLectureType[] | null
    // allcourses:CousseModelTypeFrontend[]| null 
    // filteredCoursesCount:number
    percentCompleted:number
    pendingUploadpercentage:number
  }
  const initialState: initalStateForAllcourses = {
    course: null,
    loading: false,
    error: null,
    message:null,
    lectures:null,
    // allcourses:null,
    // filteredCoursesCount:0
    percentCompleted:0,
    pendingUploadpercentage:0
  };
  

  
export const singleCourse = createSlice({
    name: "singleCourse",
    initialState,
    reducers: {
         resetAllSingleCourseStateReducer:(_state)=>{
        return {...initialState}
         },
      resetAllSingleCourseStateMessage:(state)=>{
      return {...state,message:null}
        },
      // resetSingleUserMessageAdmin:(state)=>{
      // return {...state,message:null}
      //   },
    updateProgessForFrontend:(state)=>{
      return{...state,pendingUploadpercentage:uploadPercentagePendingTransfer}
    },

  

    },
    extraReducers: (builder) => {
      builder
        .addCase(getSingleCourseFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(getSingleCourseFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.lectures = action.payload. lectures;
          state.course = action.payload.course;
          state.message = null
        })
        .addCase(getSingleCourseFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
     
        .addCase(createNewCourseFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(createNewCourseFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.course = action.payload.newCourse ;
          state.message = "new course created successully"
        })
        .addCase(createNewCourseFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  




        .addCase(addSingleLectureFrontend.pending, (state ) => {
          state.loading = true;
          state.error = null;
          state.message = null
          // state.percentCompleted=action.payload.uploadPercentage
          state.percentCompleted=0
          state.pendingUploadpercentage = uploadPercentagePendingTransfer



          
        })
        .addCase(addSingleLectureFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
           state.percentCompleted= action.payload.uploadPercentage
          state.message = action.payload.data.message
          state.pendingUploadpercentage = uploadPercentagePendingTransfer
        })
        .addCase(addSingleLectureFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
          state.percentCompleted=0
        })  
     


        .addCase(deleteSingleLectureFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(deleteSingleLectureFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
      
          state.message = action.payload.message
        })
        .addCase(deleteSingleLectureFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
     
        
        
     
        


        .addCase(udpateEntireCourseFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(udpateEntireCourseFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.course = action.payload.updatedCourse ;
          state.message = action.payload.message || " course updated  successully"
        })
        .addCase(udpateEntireCourseFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  




        

        .addCase(deleteEntireCourseFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(deleteEntireCourseFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.course = null ;
          state.message = action.payload.message || " course deleted  successully"
        })
        .addCase(deleteEntireCourseFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  





               










       
        // .addCase(getAllCoursesFrontend.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        //   state.message = null
        // })
        // .addCase(getAllCoursesFrontend.fulfilled, (state, action:any) => {
        //   state.loading = false;
        //   state.allcourses = action.payload.allCourses ;
        //   state.filteredCoursesCount = action.payload.filteredCoursesCount ;
        //   state.message = "all course fetdched successully"
        // })
        // .addCase(getAllCoursesFrontend.rejected, (state, action:any) => {
        //   console.log("action==",action);
        //   state.loading = false;
        //   state.error = action.error.message || 'Something went wrong';
        //   state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        // })  
     
        


        


        



        
        
      
      },

        



    });

//   export const {resetSingleUserStateReducer, resetSingleUserMessage} = getAllCourses.actions
  export const {updateProgessForFrontend,resetAllSingleCourseStateReducer} = singleCourse.actions




    
    // export const getLoggedInUser =(state:RootState)=>state.user.user

    export default singleCourse.reducer;


    // export const setProgessData = ({ data }) => async (dispatch:) => {
    //   try {
    //     dispatch(setDataSuccess({ data }));
    //   } catch (e) {
    //     return console.error(e.message);
    //   }
    // };