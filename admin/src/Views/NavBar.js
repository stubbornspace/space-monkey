import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, NavLink, Collapse, NavItem,
         Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';



const NavBar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  const logOut = () => {console.log('logout')}

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">FoodFunk</NavbarBrand>
        <NavbarToggler onClick={toggleNav} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/dash">dash</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/edit">new</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={toggleModal} href="#">publish</NavLink>
            </NavItem>
          </Nav>
           <Nav className="ml-auto" navbar>
              <NavLink onClick={logOut} href="#">logout</NavLink>
           </Nav>
        </Collapse>
      </Navbar>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do 
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default NavBar;
