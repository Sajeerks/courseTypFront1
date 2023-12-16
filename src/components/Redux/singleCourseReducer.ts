

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { server } from "../../App";
import axios from 'axios'
import { RootState } from './store';
import { CousseModelTypeFrontend } from '../VideoCart/VideoCart';



interface getSingleCourseFrontendType{
    courseId:string
}
export const getSingleCourseFrontend = createAsyncThunk(  "singleCourse/getSingleCourseFrontend",  async ({courseId}:getSingleCourseFrontendType, thunkApi) => {
      try {
       
  
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
   
 
  }
  const initialState: initalStateForAllcourses = {
    course: null,
    loading: false,
    error: null,
    message:null,
    lectures:null,
 
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
          state.lectures = action.payload.lectures ;
          

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
     
        
      
        


        



        
        
      
      },

        



    });

//   export const {resetSingleUserStateReducer, resetSingleUserMessage} = getAllCourses.actions

    
    // export const getLoggedInUser =(state:RootState)=>state.user.user

    export default singleCourse.reducer;
