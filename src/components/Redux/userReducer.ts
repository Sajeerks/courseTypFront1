

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
  // console.log("data",data);
        return data;
      } catch (error:any) {
        // return error as Error
        console.log(error)
  
        return thunkApi.rejectWithValue(error.response.data);
      }
    }
  );



  export const getLoggedInUserDetailsFrontend = createAsyncThunk(  "user/getLoggedInUserDetailsFrontend",  async (_, thunkApi) => {
    try {
     

      const { data } = await axios.get(   `${server}/api/v1/me`,{
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






  export const logoutUser = createAsyncThunk(  "user/logoutUser",  async (_, thunkApi) => {
    try {
     
  
      const { data } = await axios.get(   `${server}/api/v1/logout`,{
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







// interface ChangePassworType{
//   newPassword:string,
//   oldPassword:string
// }
// {email:loginDetails.email,password:loginDetails.password}
export const chagePasswordFrontend = createAsyncThunk(  "user/chagePasswordFrontend",  async (myForm:FormData, thunkApi) => {
    try {
     
  // console.log({loginDetails})
      const { data } = await axios.put(   `${server}/api/v1/changepassword`,myForm,{
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




export const changeUserDetailsFrontend = createAsyncThunk(  "user/changeUserDetailsFrontend",  async (myForm:FormData, thunkApi) => {
  try {
    for (var pair of myForm.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }

    const { data } = await axios.put(   `${server}/api/v1/updateprofile`,myForm,{
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







  
  export interface userTypeInFrontEnd {
    _id?: string;
    name: string;
    email: string;
    password: string;
    category: string;
    role:string;
    avatar: {
      public_id: string;
      url: string;
    }
    createdAt?:string 
    
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
        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(logoutUser.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = null ;
          state.message = "logout successfull"
        })
        .addCase(logoutUser.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "logout failed" 
        })  
        .addCase(getLoggedInUserDetailsFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(getLoggedInUserDetailsFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = null
        })
        .addCase(getLoggedInUserDetailsFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
       
        .addCase(changeUserDetailsFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(changeUserDetailsFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = "userdetails changed successfully"
        })
        .addCase(changeUserDetailsFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
       
        

        
      
        


        .addCase(chagePasswordFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(chagePasswordFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.user = action.payload.user ;
          state.message = "password changed successfully"
        })
        .addCase(chagePasswordFrontend.rejected, (state, action:any) => {
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
