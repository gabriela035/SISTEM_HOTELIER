import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useLoginContext } from "../login-contexts/LoginContext";
import profileImage from "../assets/man.png";
import Footer from "../components/Footer";
import { editUser, getUserByID } from "../services/auth";

const Profile = () => {
  const { user } = useLoginContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    getUserByID(user._id)
      .then((response) => {
        setEditedUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    editUser(editedUser, user._id) 
      .then((response) => {
        setEditedUser(response.data);
        setIsEditing(false); 
        window.location.reload();
      })
      .catch((error) => { 
        console.error("Error editing user:", error);     
      });
  };

  return (
    <>
      <Container style={{ marginTop: 100 }}>
        <Row className="mt-5">
          <Col md={4}>
            <Image src={profileImage} roundedCircle fluid />
          </Col>
          <Col md={8}>
            <h2>
              {editedUser.first_name.toUpperCase()}{" "}
              {editedUser.last_name.toUpperCase()}
            </h2>
            <p className="mx-1">
              {editedUser.isAdmin === false ? "Client" : "Admin"}
            </p>
            <Card>
              <Card.Body>
                {isEditing ? (
                  <>
                    <Card.Text style={{ fontSize: 17 }}>
                      <b> Name: </b>
                      <Form.Control
                        type="text"
                        name="first_name"
                        value={editedUser.first_name}
                        onChange={handleInputChange}
                        style={{
                          display: "inline",
                          width: "auto",
                          marginLeft: "5px",
                        }}
                      />{" "}
                      <Form.Control
                        type="text"
                        name="last_name"
                        value={editedUser.last_name}
                        onChange={handleInputChange}
                        style={{
                          display: "inline",
                          width: "auto",
                          marginLeft: "5px",
                        }}
                      />
                    </Card.Text>

                    <Card.Text style={{ fontSize: 17 }}>
                      <b> Address: </b>
                      <Form.Control
                        type="text"
                        name="address"
                        value={editedUser.address}
                        onChange={handleInputChange}
                        style={{
                          display: "inline",
                          width: "auto",
                          marginLeft: "5px",
                        }}
                      />
                    </Card.Text>
                    <Card.Text style={{ fontSize: 17 }}>
                      <b> Email:</b>
                      <Form.Control
                        type="email"
                        name="email"
                        value={editedUser.email}
                        onChange={handleInputChange}
                        style={{
                          display: "inline",
                          width: "auto",
                          marginLeft: "5px",
                        }}
                      />
                    </Card.Text>
                  </>
                ) : (
                  <>
                    <Card.Text style={{ fontSize: 17 }}>
                      <b> Name: </b> {editedUser.first_name}{" "}
                      {editedUser.last_name}
                    </Card.Text>
                    <Card.Text style={{ fontSize: 17 }}>
                      <b> CNP: </b> {editedUser.CNP}
                    </Card.Text>
                    <Card.Text style={{ fontSize: 17 }}>
                      <b> Address: </b> {editedUser.address}
                    </Card.Text>
                    <Card.Text style={{ fontSize: 17 }}>
                      <b> Email:</b> {editedUser.email}
                    </Card.Text>
                    <Card.Text style={{ fontSize: 17 }}>
                      {editedUser.isAdmin && (
                        <>
                          <b> Admin access: </b>
                          <Tag color="green">YES</Tag>
                        </>
                      )}
                    </Card.Text>
                  </>
                )}
              </Card.Body>
            </Card>

            <Button
              variant="primary"
              className="mt-5"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
            {isEditing && (
              <Button variant="info" className="mt-5 mx-3" onClick={handleSave}>
                Save
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
