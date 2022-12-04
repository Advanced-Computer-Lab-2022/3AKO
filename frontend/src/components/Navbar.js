import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
const Navbar = () => {
    const user = useUserContext()
    const {logout} = useLogout()
    const handleLogout = async () =>{
      try{
      const success = await logout()
      console.log({success});
      if(success){
        window.location.href ='http://localhost:3000/login'
      }
      }
      catch(error){
        alert(error)
      }
    }
    const handleEdit = async () =>{
      if(user.user.type==='instructor'){
        window.location.href ='http://localhost:3000/instructor/profile'
      }
      else if(user.user.type==='corporate trainee'||user.user.type==='individual trainee'){
        window.location.href ='http://localhost:3000/trainee/profile'
      }
    }
    return (
<nav>
            <div>
              <button onClick={()=>{window.location.href ='http://localhost:3000/'}}>Home</button>
            </div>

            { user.user&&
            <div>
              <button onClick={handleLogout}>Log out</button>
            </div>
            }
            
            { user.user&&
            <div>
              <button onClick={handleEdit}>Edit info</button>
            </div>
            }
            { !user.user && window.location.href !=='http://localhost:3000/login' && window.location.href !=='http://localhost:3000/signup' &&
            <div>
              <button onClick={() => window.location.href=`/login`}>Login</button>
              {/* <Link to="/login">Login</Link> */}
            </div>
            }
          </nav>
    )
}
export default Navbar