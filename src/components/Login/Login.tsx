import { Box, Button, TextField } from "@mui/material"
import { StyledBoxForWholePage } from "../Home/Home"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Redux/store"
import { useTheme } from '@mui/material/styles';


import useMediaQuery from '@mui/material/useMediaQuery';
import { loginUser } from "../Redux/userReducer"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const Login = () => {
  const theme = useTheme()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const{loading, error,message, user} = useSelector((state:RootState)=>state.user)
 
  const [loginDetails, setloginDetails] = useState({
    email:"sajeersayed@gmail.com",
    password:"qqqqqqqq"
  })

const changehandlerFuncionInLogin =(e:React.ChangeEvent<HTMLInputElement>)=>{
  setloginDetails({...loginDetails,[e.target.name]:e.target.value})
}

let isValied = true
if(loginDetails.email ==="" ||  loginDetails.password ===""){
    isValied = true
}else{
    isValied =false
}
// const matches = useMediaQuery('(min-width:600px)');
const matches = useMediaQuery(theme.breakpoints.up('sm'));
// console.log(matches);

const loginSubmitHandler =(e:React.FormEvent)=>{
  e.preventDefault()
  dispatch(loginUser(loginDetails))
}

useEffect(() => {
  
 if(user?.name){
  // setTimeout(() => {
  //   navigate("/")
  // }, 2000);
  navigate("/")
 }



}, [user?.name])

useEffect(() => {
  if(user?.name){
    console.log("inside the toast");
    toast.success(`you have logged in as ${user?.name}`)
   }
}, [user?.name])
// useEffect(() => {
//  toast.success("dddddddddddddd")
// }, [])


  return (
    <StyledBoxForWholePage >

    <Box component={"form"}     
     display={"flex"}
     justifyContent={"center"}
     alignItems={"center"}
     flexDirection={"column"}
     margin={"auto"}
  width={matches?"50vw":"90vw"}
  // sx={{background:"blue"}}

  onSubmit={loginSubmitHandler}

     >
      
         <TextField 
          onChange={changehandlerFuncionInLogin}
           type="email"
           name="email"
           placeholder="enter ur email"
           title="email"
           helperText="enter valid email"
           value ={loginDetails.email}
           fullWidth
         />
          <TextField
          onChange={changehandlerFuncionInLogin}
     
           type="password"
           name="password"
           placeholder="enter ur password"
           title="password"
           helperText="enter valid password"
           value ={loginDetails.password}
           fullWidth
           
              
         />


    <Button  fullWidth variant="contained" type="submit" disabled={isValied }> Login</Button>
    </Box>


    </StyledBoxForWholePage>
  )
}

export default Login