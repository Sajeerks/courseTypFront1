
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
import { getLoggedInUserDetailsFrontend, userTypeInFrontEnd } from './components/Redux/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './components/Redux/store';
import ProtectedRoute from './components/ProtectedRoute.tsx/ProtectedRoute';
import CreateCourse from './components/CreateCourse/CreateCourse';
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
 
const App = () => {
  
  const dispatch = useDispatch<AppDispatch>()
  const {user,loading, error} = useSelector((state:RootState)=>state.user)
  const [darkThemer, setdarkTheme] = useState(false)
  const [logedInUser, setlogedInUser] = useState<userTypeInFrontEnd |  null>(null)

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
    if(user){
      setlogedInUser(user)

    }
   }, [loading])
   
  return (
     
    <>
         <ThemeProvider theme={darkThemer?darkTheme:lightTheme}>
        
       <CssBaseline />
          <BrowserRouter>
          <PrimarySearchAppBar darkThemer ={darkThemer} setdarkTheme={setdarkTheme} />   

          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/course/:courseId' element={<CourseDescription/>} />

              
              {/* <Route path='/loading' element={<Loading/>} /> */}

       
              <Route path='/paymentFailed' element={<PaymentFail/>} />
              <Route path='/PaymentSuccess' element={<PaymentSuccess/>} />

              <Route path="/payment" element={<ProtectedRoute  user = {logedInUser} isAdmin={false}/>} >
              
                   <Route path='subscribe' element={<Subscribe user={logedInUser}/>} />
              </Route>


              <Route path="/course" element={<ProtectedRoute  user = {logedInUser} isAdmin={false}/>} >
              
              <Route path='createcourse' element={<CreateCourse/>} />
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