import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoremIpsum from 'react-lorem-ipsum';
import "../stylesheets/courseSubtitles.css"
// import CourseMaterials from '../CourseSubtitles'

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window, materialBody, drawer, currentLesson } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
                style={{ top: "70px" }}
            >
                <Toolbar className='topbar' >
                    <Typography variant="h6" noWrap component="div">
                        {currentLesson}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                <Drawer
                    style={{ position: "fixed" }}
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <div style={{ height: "70px" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum, architecto? Ex non earum temporibus in? Odio maxime, beatae veritatis inventore et explicabo molestias doloremque doloribus sed dolor omnis iusto nulla?</div>
                    {drawer}
                </Drawer>
            </Box >
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                style={{ backgroundColor: "white", marginTop: "50px" }}
            >

                {materialBody}
            </Box>
        </Box >
    );
}


export default ResponsiveDrawer;