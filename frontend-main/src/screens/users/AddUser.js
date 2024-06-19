import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { editUser, getUserByID } from "../../services/auth";
import { addUser } from "../../services/auth";
import Swal from "sweetalert2";
export default function AddUser() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      CNP: "",
      address: "",
      email: "",
      password: "",
      isAdmin: false,
    },
  });

  useEffect(() => {
    if (id) {
      getUserByID(id)
        .then((response) => {
          const roomData = response.data;
          Object.keys(roomData).forEach((key) => {
            setValue(key, roomData[key]);
          });
        })
        .catch((err) => {
          setServerError(err.message);
          console.log(err);
        });
    }
  }, [id]);

  function onSubmit(data) {
    setLoading(true);
    setServerError("");
    if (id) {
      editUser(data, id)
        .then(() => {
          navigate("/admin");
        })
        .catch((err) => {
          setServerError("Something went wrong");
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      ///(data)
      addUser(data)
        .then(() => {
          Swal.fire("Success!", "User created successfully!");
          navigate("/");
        })
        .catch((err) => {
          setServerError("Something went wrong");
          console.log(data);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <Container style={{ maxWidth: 500 }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-center mt-5">{id ? "Edit User" : "Add User"}</h2>
        <Form.Group controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
            type="text"
            {...register("first_name", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            First Name is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="last_name">
          <Form.Label className="mt-3">Last Name</Form.Label>
          <Form.Control
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
            type="text"
            {...register("last_name", { required: true })}
          />

          <Form.Control.Feedback type="invalid">
            Last Name is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="CNP">
          <Form.Label className="mt-3">CNP</Form.Label>
          <Form.Control
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
            type="text"
            {...register("CNP", { required: true })}
          />

          <Form.Control.Feedback type="invalid">
            CNP is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label className="mt-3">Address</Form.Label>
          <Form.Control
            type="text"
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
            {...register("address", { required: true })}
          />

          <Form.Control.Feedback type="invalid">
            Address is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label className="mt-3">Email</Form.Label>
          <Form.Control
            type="email"
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
            {...register("email", { required: true })}
          />

          <Form.Control.Feedback type="invalid">
            Email is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="mt-3">Password</Form.Label>
          <Form.Control
            type="text"
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
            {...register("password", { required: true })}
          />

          <Form.Control.Feedback type="invalid">
            Password is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="isAdmin">
          <Form.Label className="mt-3">Is Admin</Form.Label>
          <Form.Control
            as="select"
            {...register("isAdmin", { required: true })}
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
          >
            <option value="">Select...</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            Please select an option.
          </Form.Control.Feedback>
        </Form.Group>

        {serverError && <div className="text-danger">{serverError}</div>}
        <div className="d-flex justify-content-center">
        <Button
          className="mt-3"
          size="lg"
          type="submit"
          disabled={loading}
          variant="primary"
        >
          {id ? "Save" : "Add"}
        </Button>
        </div>
      </Form>
    </Container>
  );
}
