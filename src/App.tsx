
import {BrowserRouter  , Routes, Route} from 'react-router-dom'
import PrimarySearchAppBar from './components/Header/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './components/Login/Login';
import CourseDescription from './components/CourseDescription/CourseDescription';
import Subscribe from './components/Payments/Subscribe';
import PaymentFail from './components/Payments/PaymentFail';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import { getLoggedInUserDetailsFrontend, loginUser, userTypeInFrontEnd } from './components/Redux/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './components/Redux/store';
import ProtectedRoute from './components/ProtectedRoute.tsx/ProtectedRoute';
import CreateCourse from './components/CreateCourse/CreateCourse';
import MyAccount from './components/MyAccount/MyAccount';
import AllCourseList from './components/AllCourseList/AllCourseList';
import EditCourse from './components/EditCourse/EditCourse';
import UserList from './components/UserList/UserList';
import EditUser from './components/EditUser/EditUser';
import Register from './components/Register/Register';
// import { Loading } from './components/Loading/Loading';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
export const server = "https://coursety1-81e01721fa5b.herokuapp.com"

interface userForPassing{
  user:userTypeInFrontEnd
}
 

export let setProgesserVaiblae:React.Dispatch<React.SetStateAction<number>>
export let progressUploadedorExport :number
const App = () => {
  
  const dispatch = useDispatch<AppDispatch>()
  const {user,loading, error} = useSelector((state:RootState)=>state.user)
  const [darkThemer, setdarkTheme] = useState(false)
  const [logedInUser, setlogedInUser] = useState<userTypeInFrontEnd |  null>(null)
  const [progessuploaded, setprogessuploaded] = useState(0)

  setProgesserVaiblae = setprogessuploaded
  progressUploadedorExport = progessuploaded
//   const getLoggedInUserFunc =async()=>{
//     dispatch (getLoggedInUserDetailsFrontend())
// }


// (async () => {
// await   dispatch (getLoggedInUserDetailsFrontend())
  
// })();

useEffect(() => {
  dispatch (getLoggedInUserDetailsFrontend())
}, [])


   useEffect(() => {
   
      setlogedInUser(user)

    
   }, [loading])

//  console.log("logged in user in state app", logedInUser);
   
  return (
     
    <>
         <ThemeProvider theme={darkThemer?darkTheme:lightTheme}>
        
       <CssBaseline />
          <BrowserRouter>
          <PrimarySearchAppBar darkThemer ={darkThemer} setdarkTheme={setdarkTheme} />   

          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              {/* <Route path='/course/:courseId' element={<CourseDescription/>} /> */}
              <Route path="/course" element={<ProtectedRoute  user = {logedInUser} isAdmin={false}/>} >
              
              <Route path=':courseId' element={<CourseDescription />} />
         </Route>

              
              {/* <Route path='/loading' element={<Loading/>} /> */}

       
              <Route path='/paymentFailed' element={<PaymentFail/>} />
              <Route path='/PaymentSuccess' element={<PaymentSuccess/>} />

              <Route path='/register' element={<Register/>} />

              <Route path="/account" element={<ProtectedRoute  user = {logedInUser} isAdmin={false}/>} >
              
                   <Route index element={<MyAccount user={logedInUser}/>} />
              </Route>

              <Route path="/payment" element={<ProtectedRoute  user = {logedInUser} isAdmin={false}/>} >
              
                   <Route path='subscribe' element={<Subscribe user={logedInUser}/>} />
              </Route>


              <Route path="/course" element={<ProtectedRoute  user = {logedInUser} isAdmin={true}/>} >
              
              <Route path='AllCourseList' element={<AllCourseList/>} />

              <Route path='createcourse' element={<CreateCourse/>} />
              <Route path='edit/:courseId' element={<EditCourse/>} />
              <Route path='userlist' element={<UserList/>} />
              <Route path='user/edit/:id' element={<EditUser/>} />


             

              userlist

         </Route>

              <Route path="*" element={<PageNotFound />} />
          </Routes>



          
          </BrowserRouter>
          <Footer/>

         
          </ThemeProvider>
    </>
  )
}

export default App