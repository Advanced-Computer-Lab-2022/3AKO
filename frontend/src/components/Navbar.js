import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../hooks/useUserContext";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CountryModal } from "./CountryModal";
import style from "../stylesheets/navbar.module.css";
import { CgProfile } from 'react-icons/cg';
import { AiOutlineSearch } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from "react";
import { useEffect } from "react";

const StyledNavbar = ({ handleExchangeRate }) => {
  const { user } = useUserContext()
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
        history.push('/login')
      }
    }
    catch (error) {
      alert(error)
    }
  }
  const handleEdit = async () => {
    if (user.type === 'instructor') {
      history.push('/instructor/profile')
    }
    else if (user.type === 'corporate trainee' || user.type === 'individual trainee') {
      history.push('/trainee/profile')
    }
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter')
      search()
  }

  const search = () => {
    history.push('/', { searchValue })
  }


  return (
    <nav className={style.myNav}>
      <ul className={style.left}>
        <li><Nav.Link href="/"><img src={require('../logo.png')} /></Nav.Link></li>
        <li className={style.search}>
          <input type='text' placeholder="What do you want to learn?" onChange={(e) => setSearchValue(e.target.value)} onKeyUp={handleSearch} value={searchValue} />
          <AiOutlineSearch className={style.searchIcon} onClick={search} />
        </li>
      </ul>
      <ul className={style.right}>
        {user && (user.type == 'corporate trainee' || user.type === 'individual trainee') && <li><Nav.Link href="/trainee/myCourses">my courses</Nav.Link></li>}
        {/* <li>{user && user.type == 'instructor' && <Nav.Link to="/instructor/myCourses">my courses</Nav.Link>}</li> */}
        {user && user.type === 'instructor' && <li><Nav.Link href="/instructor/addCourse">Create course</Nav.Link></li>}
        {!user && location.pathname !== '/login' && location.pathname !== '/signup' && <li><Nav.Link href="/login">Login</Nav.Link></li>}

        {user && <li><NavDropdown title={<CgProfile style={{ width: '26px', height: '26px' }} />}>
          <NavDropdown.Item onClick={handleEdit} className={style.dropdownItem}>Edit profile</NavDropdown.Item>
          {user && user.type === 'instructor' && <NavDropdown.Item className={style.dropdownItem}>Earnings</NavDropdown.Item>}
          {user && user.type === 'individual trainee' && <NavDropdown.Item className={style.dropdownItem}>Payments</NavDropdown.Item>}
          {user && user.type === 'corporate trainee' && <NavDropdown.Item className={style.dropdownItem}>course requests</NavDropdown.Item>}
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout} className={style.dropdownItem}>Log out</NavDropdown.Item>
        </NavDropdown> </li>}
        <li><CountryModal handleExchangeRate={handleExchangeRate} /></li>
      </ul>
    </nav>
  )
}
export default StyledNavbar