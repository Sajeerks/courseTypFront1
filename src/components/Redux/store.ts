import  {configureStore} from '@reduxjs/toolkit'
import  getUserSlice from './userReducer'
import  getAllCourses from './courseReducer'
import  singleCourse  from './singleCourseReducer'
import paymentReducer from './paymentReducer'




const store = configureStore({
    reducer:{
     user:getUserSlice,
     courses:getAllCourses,
     singleCourse:singleCourse,
     paymentReducer:paymentReducer,
    }
})

export default store


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch