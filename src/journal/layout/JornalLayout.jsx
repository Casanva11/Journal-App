import { Box } from "@mui/material"
import { Navbar, SideBar } from "../components";

const drawerWidth = 240;

export const JornalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>

        <Navbar drawerWidth = { drawerWidth }/>

        <SideBar drawerWidth = { drawerWidth }/>

        <Box 
            component='main'
            sx={{ flexGrow:1, p:2, mt: { xs: 7, sm: 8 }}}
             // Ajusta el margen superior según el tamaño del Navbar
        >
            {children}
            
        </Box>       

    </Box>
  )
}
