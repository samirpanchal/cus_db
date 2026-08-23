import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp 
        phoneNumber="919825006521" 
        accountName="Anchorstone Global LLP" 
        avatar="/logo.png"
        statusMessage="Typically replies within 1 hour"
        chatMessage="Hello! How can we help you with our premium scrap materials?"
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </>
  );
};

export default MainLayout;
