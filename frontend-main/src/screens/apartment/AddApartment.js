import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { useFetchData } from "../../hooks/useData";
import { getAllRooms } from "../../services/rooms";
import { useForm, Controller } from "react-hook-form";
import {
  addApartment,
  editApartment,
  getApartmentByID,
} from "../../services/apartments";
import Swal from "sweetalert2";

export default function AddApartment() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: rooms = [] } = useFetchData(getAllRooms);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      roomID: [],
      current_bookings: [],
    },
  });

  console.log(watch('roomID'))

  useEffect(() => {
    if (id) {
      getApartmentByID(id)
        .then((response) => {
          const apartmentData = response.data;
          
          reset({
            name: apartmentData.name,
            roomID: apartmentData.roomID.map(room => room._id),
          });
        })
        .catch((err) => {
          setServerError(err.message);
          console.log(err);
        });
    }
  }, [id, reset]);

  function onSubmit(data) {
    setLoading(true);
    setServerError("");
    if (id) {
      editApartment(data, id)
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
      addApartment(data)
        .then(() => {
          navigate("/apartments");
          Swal.fire("Created!", "Success!");
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
        <h2 className="text-center mt-5">
          {id ? "Edit Apartment" : "Add Apartment"}
        </h2>
        <Form.Group controlId="name">
          <Form.Label className="mt-3">Apartment Name</Form.Label>
          <Form.Control
            type="text"
            {...register("name", { required: true })}
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
          />
          <Form.Control.Feedback type="invalid">
            Apartment Name is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="roomID">
          <Form.Label className="mt-3">Rooms</Form.Label>
          {rooms.map((room) => (
            <Controller
              key={room._id}
              name="roomID"
              control={control}
              render={({ field }) => (
                <Form.Check
                  type="checkbox"
                  id={`room_${room._id}`}
                  label={`Room ${room.room_number}`}
                  value={room._id}
                  checked={field.value.includes(room._id)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...field.value, room._id]
                      : field.value.filter((id) => id !== room._id);
                    field.onChange(newValue);
                  }}
                />
              )}
            />
          ))}
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
