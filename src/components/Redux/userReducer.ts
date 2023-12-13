

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { server } from "../../App";
import axios from 'axios'
import { RootState } from './store';



interface LoginDetailsType{
    email:string,
    password:string
}
// {email:loginDetails.email,password:loginDetails.password}
export const loginUser = createAsyncThunk(  "user/loginUser",  async (loginDetails:LoginDetailsType, thunkApi) => {
      try {
       
    console.log({loginDetails})
        const { data } = await axios.post(   `${server}/api/v1/login`,loginDetails,{
            headers:{
              // 'Access-Control-Allow-Origin': '*', 
              'Content-type': 'application/json',
              
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


  
  export interface userTypeInFrontEnd {
    _id: string;
    name: string;
    email: string;
    password: string;
    category: string;
    role:string;
    avatar: {
      public_id: string;
      url: string;
    }
    
  }
  
  interface intitStateForUser {
    user: userTypeInFrontEnd | null;
    loading: boolean;
    error: string | null;
    message:string |null
  }
  const initialState: intitStateForUser = {
    user: null,
    loading: false,
    error: null,
    message:null
  };
  

  
export const getUserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
         resetSingleUserStateReducer:(_state)=>{
        return {...initialState}
         },
      resetSingleUserMessage:(state)=>{
      return {...state,message:null}
        },
      // resetSingleUserMessageAdmin:(state)=>{
      // return {...state,message:null}
      //   },
  

    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(loginUser.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = null
        })
        .addCase(loginUser.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
       
      
        

        
      
        

        
        

        



        
        
      
      },

        



    });

//   export const {resetSingleUserStateReducer, resetSingleUserMessage} = getUserSlice.actions

    
    // export const getLoggedInUser =(state:RootState)=>state.user.user

    export default getUserSlice.reducer;
