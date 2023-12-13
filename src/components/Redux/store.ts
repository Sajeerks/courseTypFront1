import  {configureStore} from '@reduxjs/toolkit'
import  getUserSlice from './userReducer'




const store = configureStore({
    reducer:{
     user:getUserSlice
    }
})

export default store


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch