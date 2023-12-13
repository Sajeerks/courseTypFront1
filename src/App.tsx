
import {BrowserRouter  , Routes, Route} from 'react-router-dom'
import PrimarySearchAppBar from './components/Header/Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Login from './components/Login/Login';


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
 
const App = () => {
  const [darkThemer, setdarkTheme] = useState(false)
   
  return (
     
    <>
         <ThemeProvider theme={darkThemer?darkTheme:lightTheme}>
        
       <CssBaseline />
          <BrowserRouter>
          <PrimarySearchAppBar darkThemer ={darkThemer} setdarkTheme={setdarkTheme} />   

          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<Login/>} />



              <Route path="*" element={<PageNotFound />} />
          </Routes>
          
          </BrowserRouter>
          <Footer/>

         
          </ThemeProvider>
    </>
  )
}

export default App