

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { server } from "../../App";
import axios from 'axios'
// import { RootState } from './store';
// import { CousseModelTypeFrontend } from '../VideoCart/VideoCart';



// interface getSingleCourseFrontendType{
//     courseId:string
// }
export const buySubscriptionFrontend = createAsyncThunk(  "payment/buySubscriptionFrontend",  async (_, thunkApi) => {
      try {
       
  
        const { data } = await axios.get(   `${server}/api/v1/subscribe`,{
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



//   export const getRazorpayKeyFrontend = createAsyncThunk(  "payment/getRazorpayKeyFrontend",  async (_, thunkApi) => {
//     try {
     

//       const { data } = await axios.get(   `${server}/api/v1/getRazorPayKey`,{
//           headers:{
//             // 'Access-Control-Allow-Origin': '*', 
//             'Content-type': 'application/json',
            
//         },
//          withCredentials:true,
      
//       });
// //  console.log( "data.user==",data.user)
// // console.log("data",data);
//       return data;
//     } catch (error:any) {
//       // return error as Error
//       console.log(error)

//       return thunkApi.rejectWithValue(error.response.data);
//     }
//   }
// );



 
  






  
 
  interface initalStateForPayment {
    paymentId: string | null;
    loading: boolean;
    error: string | null;
    message:string |null
    // key:string | null
   
 
  }
  const initialState: initalStateForPayment = {
    paymentId: null,
    loading: false,
    error: null,
    message:null,
    // key:null, 
 
  };
  

  
export const paymentReducer = createSlice({
    name: "payment",
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
        .addCase(buySubscriptionFrontend.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null
        })
        .addCase(buySubscriptionFrontend.fulfilled, (state, action:any) => {
          state.loading = false;
          state.paymentId = action.payload.subscriptionId ;
          

          state.message = "subcription added successfull"
        })
        .addCase(buySubscriptionFrontend.rejected, (state, action:any) => {
          console.log("action==",action);
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
          state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        })  
     
        // .addCase(getRazorpayKeyFrontend.pending, (state) => {
        //   state.loading = true;
        //   state.error = null;
        //   state.message = null
        // })
        // .addCase(getRazorpayKeyFrontend.fulfilled, (state, action:any) => {
        //   state.loading = false;
        //   state.key = action.payload.key ;
          

        //   state.message = "razor pay key send  successfully"
        // })
        // .addCase(getRazorpayKeyFrontend.rejected, (state, action:any) => {
        //   console.log("action==",action);
        //   state.loading = false;
        //   state.error = action.error.message || 'Something went wrong';
        //   state.message =   action.payload.error.split(/\r?\n/)[0]   || "login failed" 
        // })  
     
        

        
      
        


        



        
        
      
      },

        



    });

//   export const {resetSingleUserStateReducer, resetSingleUserMessage} = getAllCourses.actions

    
    // export const getLoggedInUser =(state:RootState)=>state.user.user

    export default paymentReducer.reducer;
