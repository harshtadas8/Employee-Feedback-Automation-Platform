import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children?: React.ReactNode;
  toggleTheme?:()=>void;
}

const Layout: React.FC<LayoutProps> = ({ children ,toggleTheme}) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh',width:"100vw",overflowX:"hidden"}}>
      <Sidebar/>
      <Box sx={{ width:'100%',maxWidth:'none', flexGrow: 1,m:0, overflowY:"auto"}}>
        {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }>*/}
        <Header toggleTheme={toggleTheme}/>
        <Box component="main" sx={{ p: 3 }}>
          {children || <Outlet />}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 