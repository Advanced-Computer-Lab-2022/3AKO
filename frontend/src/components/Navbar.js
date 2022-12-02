import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
const Navbar = () => {
    const user = useUserContext()
    const {logout} = useLogout()
    const handleLogout = async () =>{
      await logout()
    }
    return (
<nav>
            { user.user&&
            <div>
              <button onClick={handleLogout}>Log out</button>
            </div>
            }
            { !user.user && window.location.href !=='http://localhost:3000/login' &&
            <div>
              <button onClick={() => window.location.href=`/login`}>Login</button>
              {/* <Link to="/login">Login</Link> */}
            </div>
            }
          </nav>
    )
}
export default Navbar