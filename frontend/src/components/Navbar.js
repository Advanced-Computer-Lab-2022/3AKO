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

const StyledNavbar = ({ handleExchangeRate }) => {
  const { user } = useUserContext()
  const { logout } = useLogout()
  const history = useHistory()
  const location = useLocation()
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

  return (

    // <Navbar bg="light" expand="lg">
    //   <Container fluid>
    //     <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbarScroll" />
    //     <Navbar.Collapse id="navbarScroll">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: '100px' }}
    //         navbarScroll
    //       >
    //         <Nav.Link href="#action1">Home</Nav.Link>
    //         <Nav.Link href="#action2">Link</Nav.Link>
    //         <Nav.Link href="#" disabled>
    //           Link
    //         </Nav.Link>
    //       </Nav>
    //       <Form className="d-flex">
    //         <Form.Control
    //           type="search"
    //           placeholder="Search"
    //           className="me-2"
    //           aria-label="Search"
    //         />
    //         <Button variant="outline-success">Search</Button>
    //       </Form>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    <nav>
      <ul className={style.left}>
        <li><Nav.Link href="/"><img src={require('../logo.png')} /></Nav.Link></li>
        <li className={style.search}><input type='text' placeholder="search" /><AiOutlineSearch className={style.searchIcon} /></li>
      </ul>
      <ul className={style.right}>
        {user && (user.type == 'corporate trainee' || user.type === 'individual trainee') && <li><Nav.Link href="/trainee/myCourses">my courses</Nav.Link></li>}
        {/* <li>{user && user.type == 'instructor' && <Nav.Link to="/instructor/myCourses">my courses</Nav.Link>}</li> */}
        {user && user.type === 'instructor' && <li><Nav.Link href="/instructor/addCourse">Create course</Nav.Link></li>}
        {!user && location.pathname !== '/login' && location.pathname !== '/signup' && <li><Nav.Link href="/login">Login</Nav.Link></li>}

        {user && <li><NavDropdown title={<CgProfile style={{ width: '26px', height: '26px' }} />}>
          <NavDropdown.Item onClick={handleEdit}>Edit profile</NavDropdown.Item>
          {user && user.type === 'instructor' && <NavDropdown.Item>Earnings</NavDropdown.Item>}
          {user && user.type === 'individual trainee' && <NavDropdown.Item>Payments</NavDropdown.Item>}
          {user && user.type === 'corporate trainee' && <NavDropdown.Item>course requests</NavDropdown.Item>}
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
        </NavDropdown> </li>}
        <li><CountryModal handleExchangeRate={handleExchangeRate} /></li>
      </ul>
    </nav>
  )
}
export default StyledNavbar