

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { server } from "../../App";
import axios from 'axios'
import { RootState } from './store';
import { CousseModelTypeFrontend } from '../VideoCart/VideoCart';


interface getAllcourseFrontendProps{
  pageNumber:number
}

export const getAllCoursesFrontend = createAsyncThunk(  "courses/getAllCoursesFrontend",  async ({pageNumber=1}:getAllcourseFrontendProps, thunkApi) => {
      try {
       
  
        const { data } = await axios.get(   `${server}/api/v1/allcourses?page=${pageNumber}`,{
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





  export const getAllCoursesTotal = createAsyncThunk(  "courses/getAllCoursesTotal",  async (_, thunkApi) => {
    try {
     

      const { data } = await axios.get(   `${server}/api/v1/allcoursesTotal`,{
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









  
 
  interface initalStateForAllcourses {
    courses: CousseModelTypeFrontend[] | null;
    loading: boolean;
    error: string | null;
    message:string |null
    filteredCoursesCount:number
    allCourses:CousseModelTypeFrontend[] | null;
 
  }
  const initialState: initalStateForAllcourses = {
    courses: null,
    loading: false,
    error: null,
    message:null,
    filteredCoursesCount:0,
    allCourses:null,
  };
  

  
export const getAllCourses = createSlice({
    name: "courses",
    initialState,
    reducers: {
         resetAllCoursesStateReducer:(_state)=>{
        return {...initialState}
         },
      resetAllCoursesStateMessage:(state)=>{
      return {...state,message:null}
        },
      // resetSingleUserMessageAdmin:(state)=>{
      // return {...state,message:null}
      //   },
  

    },
    extraReducers: (builder) => {
      builder
        .addCase(getAllCoursesFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(getAllCoursesFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.courses = action.payload.allCourses ;
          state.filteredCoursesCount = action.payload.filteredCoursesCount ;

          state.message = null
        })
        .addCase(getAllCoursesFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
     
        
        .addCase(getAllCoursesTotal.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(getAllCoursesTotal.fulfilled, (state, action:any) => {
          state.loading = false;
          state.allCourses = action.payload.allCourses ;
          // state.filteredCoursesCount = action.payload.filteredCoursesCount ;

          state.message = null
        })
        .addCase(getAllCoursesTotal.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
     
        
      
        


        


        



        
        
      
      },

        



    });

//   export const {resetSingleUserStateReducer, resetSingleUserMessage} = getAllCourses.actions

    
    // export const getLoggedInUser =(state:RootState)=>state.user.user

    export default getAllCourses.reducer;
