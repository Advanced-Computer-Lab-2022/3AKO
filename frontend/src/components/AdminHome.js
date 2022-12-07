import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function AdminHome() {


  return (
    <div>
          <Drawer
            anchor={'left'}
            open={()=>{}}
            variant={'persistent'}
            containerStyle={{height: '80%', top: 64}}
            >
            <Box
            sx={{ width: 250 }}
            role="presentation"

            >
            <List>
                <ListItem key={"Add User"} disablePadding>
                    <ListItemButton sx={{textAlign:'center'}}>
                    <ListItemText primary={"Add User"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider sx={{ borderBottomWidth: '2px',backgroundColor:"#111"}}/>

            <List>
                <ListItem key={"Complaints"} disablePadding>
                    <ListItemButton sx={{textAlign:'center'}}>
                    <ListItemText primary={"Complaints"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider sx={{ borderBottomWidth: '2px',backgroundColor:"#111"}}/>
            <List>
                <ListItem key={"CourseRequests"} disablePadding>
                    <ListItemButton sx={{textAlign:'center'}}>
                    <ListItemText primary={"Course Requests"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider sx={{ borderBottomWidth: '2px',backgroundColor:"#111"}}/>
            <List>
                <ListItem key={"RefundRequests"} disablePadding>
                    <ListItemButton sx={{textAlign:'center'}}>
                    <ListItemText primary={"Refund Requests"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider sx={{ borderBottomWidth: '2px',backgroundColor:"#111"}}/>
            <List>
                <ListItem key={"AddDiscount"} disablePadding>
                    <ListItemButton sx={{textAlign:'center'}}>
                    <ListItemText primary={"Add Discount"} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider sx={{ borderBottomWidth: '2px',backgroundColor:"#111"}}/>
            </Box>
          </Drawer>
    </div>
  );
}