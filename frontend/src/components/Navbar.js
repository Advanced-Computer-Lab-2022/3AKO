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

  useEffect(() => {

    if (location.pathname.toLowerCase().indexOf('/signup'.toLowerCase()) === 0) {
      if (user) {
        history.push('/')
      }
    }
    if (location.pathname.toLowerCase().indexOf("/login".toLowerCase()) === 0) {
      if (user) {
        history.push('/')
      }
    }
    if (location.pathname.toLowerCase().indexOf("/forgotPassword".toLowerCase()) === 0) {
      if (user) {
        history.push('/')
      }
    }
    if (location.pathname.toLowerCase().indexOf("/resetpassword".toLowerCase()) === 0) {
      if (user) {
        history.push('/')
      }
    }
    if (location.pathname.toLowerCase().indexOf('/instructor/incompletecourse'.toLowerCase()) === 0) {
      if (!loading) {
        if (!user || user.type !== 'instructor') {
          history.push('/')
        }
      }
    }
    if (location.pathname.toLowerCase().indexOf('/instructor/myCourses'.toLowerCase()) === 0) {
      if (!loading) {
        if (!user || user.type !== 'instructor') {
          history.push('/')
        }
      }
    }
    if (location.pathname.toLowerCase().indexOf("/instructor/addCourse".toLowerCase()) === 0) {
      if (!loading) {
        if (!user || user.type !== 'instructor') {
          history.push('/')
        }
      }
    }
    console.log(location.pathname);
    if (location.pathname.toLowerCase().indexOf("/admin/addInstructor".toLowerCase()) === 0) {
      if (!loading) {
        if (!user || user.type !== 'admin') {
          history.push('/')
        }
      }
    }
    if (location.pathname.toLowerCase().indexOf("/admin/addAdmin".toLowerCase()) === 0) {
      if (!loading) {
        if (!user || user.type !== 'admin') {
          history.push('/')
        }
      }
    }
    if (location.pathname.toLowerCase().indexOf("/admin/addCorporateTrainee".toLowerCase()) === 0) {
      if (!loading) {
        if (!user || user.type !== 'admin') {
          history.push('/')
        }
      }
    }
    if (location.pathname.toLowerCase().indexOf("/trainee/myCourses".toLowerCase()) === 0) {
      if (!loading) {
        if (!user || !(user.type == 'corporate trainee' || user.type === 'individual trainee')) {
          history.push('/')
        }
      }
    }
    if (location.pathname.toLowerCase().indexOf("/trainee/CourseSubtitles".toLowerCase()) === 0) {
      if (!loading) {
        if (!user || !(user.type == 'corporate trainee' || user.type === 'individual trainee')) {
          history.push('/')
        }
      }
    }
    if (location.pathname.toLowerCase().indexOf("/trainee/rateCourse".toLowerCase()) === 0) {
      if (!loading) {
        if (!user || !(user.type == 'corporate trainee' || user.type === 'individual trainee')) {
          history.push('/')
        }
      }
    }


  }, [location, loading, user])

  const navigate = (url) => {
    history.push(url)
  }

  const ViewEarnings = () => {
    history.push('/instructor/earnings')
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
        {user && (user.type == 'corporate trainee' || user.type === 'individual trainee') && <li className={style.borderHover}><Nav.Link onClick={() => navigate('/trainee/myCourses')}>My Courses</Nav.Link></li>}
        {user && user.type == 'instructor' && <li className={style.borderHover}><Nav.Link onClick={() => navigate('/instructor/myCourses')}>My Courses</Nav.Link></li>}
        {!user && <li className={style.borderHover}><Nav.Link onClick={() => navigate('/login')} >Login</Nav.Link></li>}
        {!user && <li><Nav.Link onClick={() => navigate('/signUp')} ><button className="style3">Join Now</button></Nav.Link></li>}
        {user && user.type === 'admin' && <li><Nav.Link onClick={handleLogout} ><button className="style3">Log out</button></Nav.Link></li>}
        {user && user.type !== 'admin' && <li><NavDropdown title={<CgProfile style={{ width: '26px', height: '26px' }} />}>
          <NavDropdown.Item onClick={handleEdit} className={style.dropdownItem}>My Profile</NavDropdown.Item>
          {user && user.type === 'instructor' && <NavDropdown.Item className={style.dropdownItem} onClick={() => navigate('/instructor/addCourse')} >Create course</NavDropdown.Item>}
          {user && user.type === 'instructor' && <NavDropdown.Item className={style.dropdownItem} onClick={ViewEarnings}>Earnings</NavDropdown.Item>}
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