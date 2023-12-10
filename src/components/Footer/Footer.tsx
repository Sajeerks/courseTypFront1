import { Box, Typography } from "@mui/material";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

const Footer = () => {
  return (
    <Box className="mainFooter">
      <Typography fontSize={"3vmax"} textAlign={"center"}>
        Course Bundler
      </Typography>

      <div className="footer_2">
        <div className="footer_2_left">GET OUR APP 
        <a href="https://www.facebook.com/sajeersayed" target="_blank"> 
            {" "}
            <AppleIcon />
          </a>
        
          <a href="https://www.facebook.com/sajeersayed" target="_blank"> 
            {" "}
            <AndroidIcon />
          </a>
        </div>
        <div className="footer_2_right">
          <Typography fontSize={"2vmax"} textAlign={"center"}>
            Follow us on{" "}
          </Typography>
          <a href="https://www.facebook.com/sajeersayed" target="_blank"> 
            {" "}
            <FacebookIcon />
          </a>
          <a href="https://wa.me/00966541396257" target="_blank">
            {" "}
            <WhatsAppIcon />
          </a>
          <a href="https://www.instagram.com/sajeersayedali/" target="_blank">
            {" "}
            <InstagramIcon />
          </a>
          <a href="https://twitter.com/sajeersayed" target="_blank">
            {" "}
            <TwitterIcon />
          </a> 
          <a href="https://t.me/sajeersayedali" target="_blank">
            {" "}
            <TelegramIcon />
          </a>
        </div>
      </div>
      <Typography>All rights reserved &copy; Sajeer Munna</Typography>
    </Box>
  );
};

export default Footer;
