import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SaveIcon from '@mui/icons-material/Save';
import { MdLogin } from 'react-icons/md';
import axios from 'axios';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////component starts here//////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function PersistentDrawerRight({ lesson, openNote, courseId, lessonId, noteText }) {
    const [flag, setFlag] = useState(false)
    useEffect(() => {

        var x = document.getElementsByClassName("css-9mgopn-MuiDivider-root")
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("css-9mgopn-MuiDivider-root")
        }
        setOpen(flag);
        setFlag(true)
    }, [openNote])
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerClose = () => {
        setOpen(false);
        openNote = false;
    };
    const [noteValue, setNoteValue] = useState(noteText)
    const [saveDisable, setSaveDisable] = useState(true)
    const handleNoteChange = (value) => {
        setNoteValue(value)

        setSaveDisable(false)

    }

    const handleSave = () => {
        setSaveDisable(true)
        axios({
            method: "patch",
            url: "http://localhost:5000/trainee/addNote",
            withCredentials: true,
            data: {
                courseId: courseId,
                lessonId: lessonId,
                note: noteValue
            }
        }).then((response) => {
        })
    }
    const [downloading, setDownloading] = useState(false)
    const handleDownload = () => {
        setDownloading(true)
        axios({
            method: "get",
            url: `http://localhost:5000/trainee/downloadNotes/${courseId}`,
            withCredentials: true, responseType: 'arraybuffer'
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]
                , { type: "application/pdf" }))
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'notes.pdf');
            document.body.appendChild(link);
            link.click();
            setDownloading(false)
        }).catch((error) => {
            console.log(error);
            setDownloading(false)
        })
    }

    return (
        <Box sx={{ display: 'flex', overflowX: "hidden" }}>
            <CssBaseline />

            <Main open={open}>
                {lesson}
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <p className='m-0'>TAKE NOTE</p>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider style={{ margin: "0" }} />
                <TextField className='my-4 mx-2' id="outlined-basic" defaultValue={noteValue} placeholder='Note...' label="Note" variant="outlined" multiline minRows='14' maxRows="14" onChange={(e) => handleNoteChange(e.target.value)} />
                <div className='mx-2' style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="contained" disabled={saveDisable} onClick={handleSave} endIcon={<SaveIcon />}>
                        save
                    </Button>
                    <Button disabled={downloading} onClick={handleDownload} variant="contained" endIcon={<FileDownloadIcon />}>
                        Download
                    </Button>

                </div>
            </Drawer>

        </Box>
    );
}