import React from "react";
import { Image, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLoginContext } from "../login-contexts/LoginContext";
import logo from "../assets/hotel_logo.png";
import { getUserByID } from "../services/auth";
import { useFetchData } from "../hooks/useData";
function NavBar() {
  const { user } = useLoginContext();

  const { data: editedUser = user } = useFetchData(
    () => getUserByID(user._id),
    []
  );
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }
  const isAdminFn = user && user.isAdmin;

  return (
    <Navbar
      expand="sm"
      className="bg-primary"
      style={{ paddingTop: 20, paddingBottom: 15 }}
    >
      <Container fluid>
        <Image src={logo} alt="Image" width={75} height={75} className="ms-5" />
        <Navbar.Brand href="/" className="text-white ml-3"></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto me-5 text-white">
            <Nav.Item>
              <Nav.Link href="/" className="text-white">
                Rooms
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/apartments" className=" text-white">
                Apartments
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/favourites" className="text-white">
                Favorites
              </Nav.Link>
            </Nav.Item>

            <Nav className="ms-auto me-6 text-white">
              {user ? (
                <NavDropdown
                  title={
                    <>
                      <FontAwesomeIcon
                        icon={faUser}
                        className="me-2 text-white mx-3"
                      />
                      <span style={{ color: "white" }}>
                        {editedUser.first_name} {editedUser.last_name}
                      </span>
                    </>
                  }
                  id="basic-nav-dropdown"
                  style={{ fontWeight: "bold", color: "white" }}
                >
                  <Nav.Item>
                    <Nav.Link href="/profile" className=" ml-3">
                      Profile
                    </Nav.Link>{" "}
                    {/* Added ml-3 class for left margin */}
                  </Nav.Item>
                  <NavDropdown.Divider />
                  <Nav.Item>
                    <Nav.Link href="/my-bookings" className=" ml-3">
                      My Bookings
                    </Nav.Link>{" "}
                    {/* Added ml-3 class for left margin */}
                  </Nav.Item>

                  {isAdminFn ? (
                    <>
                      <NavDropdown.Divider />
                      <Nav.Item>
                        <Nav.Link href="/admin" className=" ml-3">
                          Admin
                        </Nav.Link>{" "}
                        {/* Added ml-3 class for left margin */}
                      </Nav.Item>
                    </>
                  ) : (
                    <></>
                  )}

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    style={{ color: "red", fontWeight: "bold" }}
                    onClick={logout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Item>
                    <Nav.Link href="/register" className="text-white ml-3">
                      Register
                    </Nav.Link>{" "}
                    {/* Added ml-3 class for left margin */}
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/login" className="text-white ml-3">
                      Login
                    </Nav.Link>{" "}
                    {/* Added ml-3 class for left margin */}
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
