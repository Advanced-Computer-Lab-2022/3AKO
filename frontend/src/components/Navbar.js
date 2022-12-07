import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Navbar = () => {
    const {user} = useUserContext()
    const {logout} = useLogout()
    const history = useHistory()
    const location = useLocation()
    console.log(location.pathname)
    const handleLogout = async () =>{
      try{
      const success = await logout()
      console.log({success});
      if(success){
        history.push('/login')
      }
      }
      catch(error){
        alert(error)
      }
    }
    const handleEdit = async () =>{
      if(user.type==='instructor'){
        history.push('/instructor/profile')
      }
      else if(user.type==='corporate trainee'||user.type==='individual trainee'){
        history.push('/trainee/profile')
      }
    }
    return (
<nav>
            <div>
            <Link to="/">Home</Link>
            </div>

            { user&&
            <div>
              <button onClick={handleLogout}>Log out</button>
            </div>
            }

            { user&&
            <div>
              <button onClick={handleEdit}>Edit info</button>
            </div>
            }

            { !user && location.pathname !=='/login' && location.pathname !=='/signup' &&
            <div>
              {/* <button onClick={() => window.location.href=`/login`}>Login</button> */}
              <Link to="/login">Login</Link>
              {/* <Link to="/login">Login</Link> */}
            </div>
            }
            {user && (user.type=='corporate trainee' || user.type==='individual trainee') && <div>
              <Link to="/trainee/myCourses">my courses</Link>
            </div>}
            {user && user.type==='instructor' &&
              <div>
                <Link to="/instructor/addCourse">Create course</Link>
              </div>
            }
          </nav>
    )
}
export default Navbar