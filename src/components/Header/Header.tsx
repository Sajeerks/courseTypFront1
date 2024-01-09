import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CallIcon from '@mui/icons-material/Call';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';
import MoreIcon from '@mui/icons-material/MoreVert';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import TemporaryDrawer from './Drawer';
import {  useNavigate } from 'react-router-dom';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/store';
import { logoutUser } from '../Redux/userReducer';
import { toast } from 'react-toastify';
import { Avatar } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface  PrimarySearchAppBarTypes{
    setdarkTheme : React.Dispatch<React.SetStateAction<boolean>>
    darkThemer:Boolean
}

export default function PrimarySearchAppBar({setdarkTheme, darkThemer}:PrimarySearchAppBarTypes) {
   const [openDrawer, setopenDrawer] =React.useState(false)


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMyaccountClicked = () => {
    navigate("/account")
    setAnchorEl(null);
    handleMobileMenuClose();
  };



  const handleLoginClick = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/login")
  };

  const handelLogout =()=>{
    setAnchorEl(null);
    handleMobileMenuClose();
    dispatch(logoutUser())
    navigate("/login")
    
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

//   console.log({anchorEl});
//////////////////////////////////
const navigate = useNavigate()
const dispatch = useDispatch<AppDispatch>()
const {user, message:userMessage} = useSelector((state:RootState)=>state.user)

React.useEffect(() => {
  toast.success(userMessage)
}, [userMessage])


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
    {user?.name?<MenuItem onClick={handelLogout}>Logout </MenuItem>:<MenuItem onClick={handleLoginClick}>Login </MenuItem>}  
{user?.name? <MenuItem onClick={handleMyaccountClicked}>My account</MenuItem>:<MenuItem onClick={()=>{navigate("/register")}}>Register</MenuItem> }     
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem  onClick={()=>navigate('/aboutus')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit"
         
        >
          <Badge color="error">
            <InfoIcon />
          </Badge>
        </IconButton>
        <p>AboutUs</p>
      </MenuItem>
      <MenuItem    onClick={()=>navigate('/contact')}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        
        >
          <Badge color="error">
            <PhoneIcon />
          </Badge>
        </IconButton>
        <p>contact</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          
          {user?.name? <Avatar src={user.avatar.url}/>:<AccountCircle />}
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={()=>setopenDrawer(!openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
             <Link  to="/"><HomeWorkIcon/></Link>
          </Typography> */}

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            // sx={{ mr: 2 }}
            onClick={()=>navigate("/")}
            sx={{ display: { xs: 'flex', sm: 'block' } }}
          >
            <HomeWorkIcon/>
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={()=>setdarkTheme(!darkThemer)}>
              
              {darkThemer?<WbSunnyIcon/>:<DarkModeIcon/>}
         </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit"
            
            onClick={()=>navigate('/aboutus')}
            >
              <Badge  color="error">
                <InfoIcon />
              </Badge>
            </IconButton> 
             <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={()=>navigate("/contact")}
            >
              <Badge  color="error">
                <PhoneIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
          {user?.name? <Avatar src={user.avatar.url}/>:<AccountCircle />}

            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
  
      {openDrawer && <TemporaryDrawer openDrawer={openDrawer}  setopenDrawer= {setopenDrawer} />}
    </Box>
  );
}