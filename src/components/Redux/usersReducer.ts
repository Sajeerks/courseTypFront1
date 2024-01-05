

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { server, setProgesserVaiblae } from "../../App";
import axios from 'axios'
import { userTypeInFrontEnd } from './userReducer';






export const getAllUsersFrontEnd = createAsyncThunk(  "users/getAllUsersFrontEnd",  async (_, thunkApi) => {
    try {
     
  
      const { data } = await axios.get(   `${server}/api/v1/admin/getAllUsers`,{
          headers:{
            // 'Access-Control-Allow-Origin': '*', 
            'Content-type': 'application/json',
            
        },
        onUploadProgress:function(progressEvent) {
            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total! );
            // console.log({percentCompleted});
            setProgesserVaiblae(percentCompleted)
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






  
// export interface userTypeInFrontEnd {
//     _id?: string;
//     name: string;
//     email: string;
//     password: string;
//     category: string;
//     role:string;
//     avatar: {
//       public_id: string;
//       url: string;
//     }
//     createdAt?:string 
    
//   }
  
  interface intitStateForUser {
    users: userTypeInFrontEnd[] | null;
    loading: boolean;
    error: string | null;
    message:string |null
  }
  const initialState: intitStateForUser = {
    users: null,
    loading: false,
    error: null,
    message:null
  };
  

  
export const   getAllUsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
         resetAllUsersReducer:(_state)=>{
        return {...initialState}
         },
         resetAllUsersReducerMessage:(state)=>{
      return {...state,message:null}
        },
      // resetSingleUserMessageAdmin:(state)=>{
      // return {...state,message:null}
      //   },
  

    },
    extraReducers: (builder) => {
      builder
  
  
        .addCase(getAllUsersFrontEnd.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(getAllUsersFrontEnd.fulfilled, (state, action:any) => {
          state.loading = false;
          state.users = action.payload.users ;
          state.message = action.payload.message || "all user fetched in frontend"
        })
        .addCase(getAllUsersFrontEnd.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
       
     
        
      
        


        
        
                

        



        
        
      
      },

        



    });

//   export const {resetSingleUserStateReducer, resetSingleUserMessage} = getUserSlice.actions

    
    // export const getLoggedInUser =(state:RootState)=>state.user.user

    export default getAllUsersSlice.reducer;
