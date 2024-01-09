import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { server } from "../../App";
import axios from "axios";


export const getStatsFrontend = createAsyncThunk(
  "other/getStatsFrontend",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(`${server}/api/v1/admin/stats`, {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      //  console.log( "data.user==",data.user)
      // console.log("data",data);
      return data;
    } catch (error: any) {
      // return error as Error
      console.log(error);

      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);



interface getCourseRequestFrontendType{

    name: string;
    email: string;
    course: string;


}

export const getCourseRequestFrontend = createAsyncThunk(
  "other/getCourseRequestFrontend",
  async (courseRequestDetails:getCourseRequestFrontendType, thunkApi) => {
    try {
      console.log(courseRequestDetails);
      const { data } = await axios.post(`${server}/api/v1/courseRequest`,courseRequestDetails, {
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      //  console.log( "data.user==",data.user)
      // console.log("data",data);
      return data;
    } catch (error: any) {
      // return error as Error
      console.log(error);

      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);


interface getContactRequsetFrontendType{

    name: string;
    email: string;
    message: string;

  
}

export const getContactRequsetFrontend = createAsyncThunk(
  "other/getContactRequsetFrontend",
  async (contactdetails:getContactRequsetFrontendType, thunkApi) => {
    try {

      console.log(contactdetails);
      const { data } = await axios.post(`${server}/api/v1/contact`,contactdetails ,{
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      //  console.log( "data.user==",data.user)
      // console.log("data",data);
      return data;
    } catch (error: any) {
      // return error as Error
      console.log(error);

      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);





// interface PaymentType {
//   razorpay_signature: String;

//   razorpay_payment_id: String;

//   razorpay_subscription_id: String;

//   createdAt: Date;
// }

export interface StatsModelTypeFronend {
  users: number;
  subscription: number;
  views: number;
  createdAt?: Date;
}

interface initalStateotherState {
  
  loading: boolean;
  error: string | null;
  message: string | null;
  // key:string | null
  allData: {
    stats: StatsModelTypeFronend[];
    usersCount: number;
    viewsCount:number;
    subscriptionsCount:number;
    userPercentage:number;
    viewsPercentage:number;
    subscriptionsPercentage:number;
    userProfit:number;
    viewsProfit:number;
    subscriptionsProfit:number;
    success:boolean
  }| null
}
const initialState: initalStateotherState = {

  loading: false,
  error: null,
  message: null,
  allData:null
  // key:null,
};

export const otherReducer = createSlice({
  name: "other",
  initialState,
  reducers: {
    resetOtherStateReducer: (_state) => {
      return { ...initialState };
    },
    resetOtherStateMessage: (state) => {
      return { ...state, message: null };
    },
    // resetSingleUserMessageAdmin:(state)=>{
    // return {...state,message:null}
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatsFrontend.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.allData =  null
      })
      .addCase(getStatsFrontend.fulfilled, (state, action: any) => {
     
        state.loading = false;
        state.allData = action.payload

        state.message = "statics  fetch successfull";
      })
      .addCase(getStatsFrontend.rejected, (state, action: any) => {
        console.log("action==", action);
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        state.message =action.payload.error.split(/\r?\n/)[0] || "login failed";
        state.allData =  null

      })




      .addCase(getCourseRequestFrontend.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
   
      })
      .addCase(getCourseRequestFrontend.fulfilled, (state, action: any) => {
        state.loading = false;
        state.message =  action.payload.message  || "course  requested   successfull";
      })
      .addCase(getCourseRequestFrontend.rejected, (state, action: any) => {
        console.log("action==", action);
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        state.message =action.payload.error.split(/\r?\n/)[0] || "login failed";
      })



      .addCase(getContactRequsetFrontend.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
   
      })
      .addCase(getContactRequsetFrontend.fulfilled, (state, action: any) => {
        state.loading = false;
        state.message =  action.payload.message  || " contact from request successfull";
      })
      .addCase(getContactRequsetFrontend.rejected, (state, action: any) => {
        console.log("action==", action);
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
        state.message =action.payload.error.split(/\r?\n/)[0] || "login failed";
      });





      



      


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

export default otherReducer.reducer;
