import axios from "axios";
import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from "@mui/material";
import {MenuItem} from "@mui/material";
import { margin } from "@mui/system";
import { useHistory } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const InstructorProfile = () => {
    const [edit,setEdit] = useState(false);
    const [editPassword,setEditPassword] = useState(false)
    const {user,loading} = useUserContext()
    const [instructorInfo,setInstructorInfo] = useState('') 
    const history = useHistory()
    useEffect(() => {
        const getInfo = async () => {
            await axios({method:'get',url:'http://localhost:5000/instructor/getInstructor',withCredentials:true}).then((res)=>{
                setInstructorInfo(res.data)
                console.log(res.data);
            }).catch(()=>{

            })
        }
        if(user){
            if(user.type==='instructor'){
                getInfo()
            }
            else{
                history.push('/')
            }
        }
        else if(!user && !loading){
            history.push('/login')
        }
    },[loading])

    const handleEdit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data.get('name'));
        if(data.get('name') && data.get('email') && data.get('biography') && data.get('gender')){
            const update = {
                email: data.get('email'),
                name: data.get('name'),
                gender: data.get('gender'),
                biography:data.get('biography')
            }
            console.log(update);
            const request = async (update) =>{
                await axios({method:'patch',url:'http://localhost:5000/instructor/editMyInfo',withCredentials:true,data:update}).then(()=>{
                    setEdit(false)
                    setInstructorInfo(update)
                }).catch((error)=>{
                    console.log(error);
                })
            }
            request(update)
            
        }
    }
    const handleEditPassword = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if(data.get('newpassword') && data.get('oldpassword') && data.get('confirmpassword')){
            const update = {
                newPassword: data.get('newpassword') , 
                oldPassword: data.get('oldpassword')
            }
            console.log(update);
            const request = async (update) =>{
                await axios({method:'patch',url:'http://localhost:5000/instructor/editPassword',withCredentials:true,data:update}).then(()=>{
                    setEditPassword(false)
                }).catch((error)=>{
                    console.log(error);
                })
            }
            if(data.get('newpassword') === data.get('confirmpassword')){
                request(update) 
            }
        }
    }
    return (
        <div className="instructorProfile-container">
        
            { instructorInfo &&
            <div className="instructorProfile">
                    
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" component="form" onSubmit={handleEdit}>
                    <TableHead>
                    <TableRow>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        { !edit &&
                    <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">{instructorInfo.name}</TableCell>
                    </TableRow>
                        }
                        { edit &&
                    <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TextField
                    autoComplete="given-name"
                    name="name"
                    type='text'
                    required
                    fullWidth
                    id="name"
                    autoFocus
                    placeholder={instructorInfo.name}
                    defaultValue={instructorInfo.name}
                    />
                    </TableRow>
                        }

                        {!edit &&
                    <TableRow>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">{instructorInfo.email||'-'}</TableCell>
                    </TableRow>
                    }
                        {edit &&
                    <TableRow>
                    <TableCell align="center">Email</TableCell>
                    <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  placeholder={instructorInfo.email}
                  defaultValue ={instructorInfo.email}
                />
                    </TableRow>
                    }
                        {!edit &&
                    <TableRow>
                    <TableCell align="center">Biography</TableCell>
                    <TableCell align="center">{instructorInfo.biography||'-'}</TableCell>
                    </TableRow>
                    }
                        {edit &&
                    <TableRow>
                    <TableCell align="center">Biography</TableCell>
                    <TextField
                    autoComplete="biography"
                    name="biography"
                    type='text'
                    required
                    fullWidth
                    id="biography"
                    autoFocus
                    placeholder={instructorInfo.biography}
                    defaultValue ={instructorInfo.biography}
                    />
                    </TableRow>
                    }
                        {!edit &&
                    <TableRow>
                    <TableCell align="center">Gender</TableCell>
                    <TableCell align="center">{instructorInfo.gender||'-'}</TableCell>
                    </TableRow>
                    }
                        {edit &&
                    <TableRow>
                    <TableCell align="center">Gender</TableCell>
                    <TextField
                  required
                  fullWidth
                  name="gender"
                  select
                  id="gender"
                  defaultValue={instructorInfo.gender}
                >
                <MenuItem value="male">Male</MenuItem>

                <MenuItem value="female">Female</MenuItem>
                </TextField>
                </TableRow>
                    }
                    <TableRow sx={{textAlign:"center" }}>
                    <TableCell align="center">
                    <Button hidden={!edit}
                    onClick={()=>setEdit(false)}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Cancel
                    </Button>
                    </TableCell> 
                    <TableCell align="center">
                    <Button hidden={edit}
                    onClick={(e)=>{if(edit===false)setEdit(true)
                                    else{
                                        handleEdit()
                                    }}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Edit
                    </Button>
                    <Button hidden={!edit}
                    type="submit"

                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Confirm
                    </Button>
                    </TableCell>
                    </TableRow>
                    
                    </TableBody>
                </Table>
                <Table sx={{ minWidth: 650, borderCollapse: 'separate', borderSpacing: '80px 10px',alignItems:'center'}} size="small" aria-label="a dense table" component="form" onSubmit={handleEditPassword}>
                <colgroup>
                    <col width="100%" />
                </colgroup>
                
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {editPassword && (
                <TableRow fullWidth >
                <TextField
                  required
                  fullWidth
                  name="oldpassword"
                  label="old password"
                  type="oldpassword"
                  id="oldpassword"
                  autoComplete="new-password"
                />
                </TableRow>
                )}
                {editPassword && (
                <TableRow sx={{textAlign:"center" }}>
                <TextField
                  required
                  fullWidth
                  name="newpassword"
                  label="new password"
                  type="newpassword"
                  id="newpassword"
                  autoComplete="new-password"
                />
                </TableRow>
                )}
                {editPassword && (
                <TableRow sx={{textAlign:"center" }}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="confirm password"
                  type="confirmpassword"
                  id="confirmpassword"
                  autoComplete="new-password"
                />
                </TableRow>
                )}
                  
                <TableRow sx={{textAlign:"center"}}>
                    <TableCell align="center">
                    <Button hidden={!editPassword}
                    onClick={()=>setEditPassword(false)}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 ,marginRight:5}}
                    >
                    Cancel
                    </Button>

                    <Button hidden={editPassword}
                    onClick={(e)=>{if(editPassword===false)setEditPassword(true)}}
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                    >
                    Edit password
                    </Button>
                    <Button hidden={!editPassword}
                    type="submit"

                    variant="contained"
                    sx={{ mt: 3, mb: 2 ,marginLeft:5}}
                    >
                    Confirm
                    </Button>
                    </TableCell>
                    </TableRow>

                    
                </TableBody>

                </Table>
                </TableContainer>
                
                    
            </div>


            }
        </div>
    );
}
 
export default InstructorProfile;