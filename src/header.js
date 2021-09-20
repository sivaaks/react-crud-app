import {Navbar,Nav,Container,Card, NavItem} from 'react-bootstrap';
import { BrowserRouter,Route,Switch,Link } from 'react-router-dom';


function Header(){
   return(
      <>
      {/* <BrowserRouter> */}
         <Navbar bg="light" variant = "light">
            <Container>
            <Navbar.Brand className="app-name">Posts App</Navbar.Brand>
               <Nav className="justify-content-end ">
                  {/* <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/posts">Posts</Nav.Link>
                  <Nav.Link href="/about">About</Nav.Link> */}
                  <Container className="nav-container">
                  <NavItem className="nav-item">
                     <Link to="/">Home</Link>
                     </NavItem>
                  <NavItem className="nav-item">
                        <Link to="/posts">Posts</Link>
                     </NavItem>
                     <NavItem className="nav-item">
                        <Link to ="/about">About</Link>
                     </NavItem>
                  </Container>
               </Nav>
            </Container>
         </Navbar>
         {/* </BrowserRouter> */}
      </>
   );
}

export default Header;


// return (
//     <>
//     <BrowserRouter>
//     <div>  
//     <Link to="/posts" Posts/>
//     <Link to="/comments/:id" Comments/>
//     <Link to="/" Home/>
//     </div>
//     </BrowserRouter>
//     <Card>
//         <Card.Body>
//             <Card.Title><h1>REACT POSTS APP</h1></Card.Title>
//         </Card.Body>
//     </Card>
//     </>
// )
