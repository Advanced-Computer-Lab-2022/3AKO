import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CountryModal } from "./CountryModal";
import style from "../stylesheets/navbar.module.css";
import { CgProfile } from 'react-icons/cg';
import { AiOutlineSearch } from 'react-icons/ai';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";
import { useEffect } from "react";

const StyledNavbar = ({ handleExchangeRate }) => {
  const { user, loading } = useUserContext()
  const { logout } = useLogout()
  const history = useHistory()
  const location = useLocation()
  const [searchValue, setSearchValue] = useState('')
  console.log(location.pathname)

  const handleLogout = async () => {
    try {
      const success = await logout()
      console.log({ success });
      if (success) {
        navigate('/login')
      }
    }
    catch (error) {
      alert(error)
    }
  }
  const handleEdit = async () => {
    if (user.type === 'instructor') {
      navigate('/instructor/profile')
    }
    else if (user.type === 'corporate trainee' || user.type === 'individual trainee') {
      navigate('/trainee/profile')
    }
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter')
      search()
  }

  const search = () => {
    history.push('/search', { searchValue })
  }

  useEffect(() => {
    if (location.pathname !== '/search')
      setSearchValue('')
  }, [location])

  useEffect(()=>{

    if(location.pathname.indexOf('/signup') === 0){
      if(user){
        history.push('/')
      }
    }
    if(location.pathname.indexOf("/login") === 0){
      if(user){
        history.push('/')
      }
    }
    if(location.pathname.indexOf("/forgotPassword") === 0){
      if(user){
        history.push('/')
      }
    }
    if(location.pathname.indexOf("/resetpassword") === 0){
      if(user){
        history.push('/')
      }
    }
    if(location.pathname.indexOf('/instructor/incompleteCourse') === 0){
      if(!loading){
        if(!user || user.type!=='instructor'){
          history.push('/')
        }
      }
    }
    if(location.pathname.indexOf('/instructor/myCourses') === 0){
      if(!loading){
        if(!user || user.type!=='instructor'){
          history.push('/')
        }
      }
    }
    if(location.pathname.indexOf("/instructor/addCourse") === 0){
      if(!loading){
        if(!user || user.type!=='instructor'){
          history.push('/')
        }
      }
    }
    if(location.pathname.indexOf("/admin/addInstructor") === 0){
      if(!loading){
        if(!user || user.type!=='admin'){
          history.push('/')
        }
      }
    }
    if(location.pathname.indexOf("/admin/addAdmin") === 0){
      if(!loading){
        if(!user || user.type!=='admin'){
          history.push('/')
        }
      }
    }
    if(location.pathname.indexOf("/admin/addCorporateTrainee") === 0){
      if(!loading){
        if(!user || user.type!=='admin'){
          history.push('/')
        }
      }
    }
    if(location.pathname.indexOf("/trainee/myCourses") === 0){
      if(!loading){
        if(!user || !(user.type == 'corporate trainee' || user.type === 'individual trainee')){
          history.push('/')
        }
      }
    }
    if(location.pathname.indexOf("/trainee/CourseSubtitles") === 0){
      if(!loading){
        if(!user || !(user.type == 'corporate trainee' || user.type === 'individual trainee')){
          history.push('/')
        }
      }
    }
    if(location.pathname.indexOf("/trainee/rateCourse") === 0){
      if(!loading){
        if(!user || !(user.type == 'corporate trainee' || user.type === 'individual trainee')){
          history.push('/')
        }
      }
    }


  },[location,loading,user])

  const navigate = (url) => {
    history.push(url)
  }

  return (
    <nav className={style.myNav}>
      <ul className={style.left}>
        <li><Nav.Link onClick={() => navigate('/')}><img src={require('../images/logo.png')} /></Nav.Link></li>
        <li className={style.search}>
          <input type='text' placeholder="What do you want to learn?" onChange={(e) => setSearchValue(e.target.value)} onKeyUp={handleSearch} value={searchValue} />
          <AiOutlineSearch className={style.searchIcon} onClick={search} />
        </li>
      </ul>
      <ul className={style.right}>
        {user && (user.type == 'corporate trainee' || user.type === 'individual trainee') && <li className={style.borderHover}><Nav.Link onClick={() => navigate('/trainee/myCourses')}>my courses</Nav.Link></li>}
        {user && user.type == 'instructor' && <li className={style.borderHover}><Nav.Link onClick={() => navigate('/instructor/myCourses')}>my courses</Nav.Link></li>}
        {!user && <li className={style.borderHover}><Nav.Link onClick={() => navigate('/login')} >Login</Nav.Link></li>}
        {!user && <li><Nav.Link onClick={() => navigate('/signUp')} ><button className="style3">Join Now</button></Nav.Link></li>}
        {user && <li><NavDropdown title={<CgProfile style={{ width: '26px', height: '26px' }} />}>
          <NavDropdown.Item onClick={handleEdit} className={style.dropdownItem}>Edit profile</NavDropdown.Item>
          {user && user.type === 'instructor' && <NavDropdown.Item className={style.dropdownItem} onClick={() => navigate('/instructor/addCourse')} >Create course</NavDropdown.Item>}
          {user && user.type === 'instructor' && <NavDropdown.Item className={style.dropdownItem}>Earnings</NavDropdown.Item>}
          {user && user.type === 'individual trainee' && <NavDropdown.Item className={style.dropdownItem}>Payments</NavDropdown.Item>}
          {user && user.type === 'corporate trainee' && <NavDropdown.Item className={style.dropdownItem}>course requests</NavDropdown.Item>}
          <NavDropdown.Item className={style.dropdownItem} onClick={() => navigate('/reports/')} >Reports</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout} className={style.dropdownItem}>Log out</NavDropdown.Item>
        </NavDropdown> </li>}
        <li><CountryModal handleExchangeRate={handleExchangeRate} /></li>
      </ul>
    </nav>
  )
}
export default StyledNavbar