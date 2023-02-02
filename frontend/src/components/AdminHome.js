import AddUser from "./addUser";
import CourseRequest from "./courseRequest";
import Complaints from "./complaints";
import AddDiscount from "./addDiscount";
import RefundRequest from "./refundRequest";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PercentIcon from '@mui/icons-material/Percent';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import '../stylesheets/admin.css'
import { Toolbar, ToggleButton, ToggleButtonGroup } from '@mui/material';


const drawerWidth = 240;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [MaterialBody, setMaterialBody] = React.useState(<AddUser />)
    const [alignment, setAlignment] = React.useState('web');

    const handleChange = (event, newAlignment) => {
        if (newAlignment !== null)
            setAlignment(newAlignment);
        switch (event.target.value) {
            case 'users':
                setMaterialBody(<AddUser />)
                break;
            case 'reports':
                setMaterialBody(<Complaints />)
                break;
            case 'courseRequests':
                setMaterialBody(<CourseRequest />)
                break;
            case 'discounts':
                setMaterialBody(<AddDiscount />)
                break;

            case 'refunds':
                setMaterialBody(<RefundRequest />)
                break;

            default:
                break;
        }
    };


    const drawer = (
        <div >
            <ToggleButtonGroup
                size="large"
                fullWidth={true}
                orientation='vertical'
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton className="admin-toggle-button" value="users"><PersonIcon /> Users</ToggleButton>
                <ToggleButton className="admin-toggle-button" value="reports"> <ReportGmailerrorredIcon /> Reports</ToggleButton>
                <ToggleButton className="admin-toggle-button" value="courseRequests"> <MenuBookIcon /> Course Requests</ToggleButton>
                <ToggleButton className="admin-toggle-button" value="discounts"><PercentIcon /> Discounts </ToggleButton>
                <ToggleButton className="admin-toggle-button" value="refunds"><AttachMoneyIcon /> Refund Requests </ToggleButton>
            </ToggleButtonGroup>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, marginTop: '70px' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {MaterialBody}
            </Box>
        </Box >
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;

