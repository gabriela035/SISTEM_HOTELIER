import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { useFetchData } from "../../hooks/useData";
import {
  getRoomByID,
  editRoom,
  addRoom,
  getAllInventories,
  getAllFacilities,
  getAllSupplies,
} from "../../services/rooms";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function AddRoom() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: inventories = [] } = useFetchData(getAllInventories);
  const { data: facilities = [] } = useFetchData(getAllFacilities);
  const { data: supplies = [] } = useFetchData(getAllSupplies);

  const { control, register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      room_number: 0,
      number_of_beds: 0,
      image_urls: [],
      current_bookings: [],
      inventoryID: [],
      suppliesID: [],
      facilitiesID: [],
      apartmentID: [],
    },
  });

  useEffect(() => {
    if (id) {
      getRoomByID(id)
        .then((response) => {
          const roomData = response.data;
          reset({
            ...roomData,
            inventoryID: roomData.inventoryID.map((item) => item._id),
            suppliesID: roomData.suppliesID.map((item) => item._id),
            facilitiesID: roomData.facilitiesID.map((item) => item._id),
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
      editRoom(data, id)
        .then(() => {
          Swal.fire("Success", "Room updated successfully!", "success");
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
      addRoom(data)
        .then(() => {
          Swal.fire("Success", "Room added successfully!", "success");
          navigate("/admin");
        })
        .catch((err) => {
          setServerError("Something went wrong");
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
        <h2 className="text-center mt-5">{id ? "Edit Room" : "Add Room"}</h2>
        <Form.Group controlId="room_number">
          <Form.Label>Room Number</Form.Label>
          <Form.Control
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
            type="number"
            {...register("room_number", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            Room Number is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="number_of_beds">
          <Form.Label className="mt-3">Number of Beds</Form.Label>
          <Form.Control
            style={{ borderWidth: 1, borderColor: "#737373a2" }}
            type="number"
            {...register("number_of_beds", { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            Number of Beds is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="image_urls">
          <Form.Label className="mt-3 mb-3">Image URLs</Form.Label><br></br>

          {getValues("image_urls").map((url, index) => (
            <div key={index} className="d-flex">
              <Form.Control
                type="text"
                {...register(`image_urls.${index}`)}
                defaultValue={url}
                className="mt-3 mr-3"
              />
            
              <Button
                variant="danger"
                className="mt-3"
                style={{marginLeft:15}}
                onClick={() => {
                  reset({
                    ...getValues(),
                    image_urls: getValues("image_urls").filter(
                      (_, i) => i !== index
                    ),
                  });
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          ))}

          <Button
            variant="info"
            className="mt-3"
            onClick={() => {
              reset({
                ...getValues(),
                image_urls: [...getValues("image_urls"), ""],
              });
            }}
          >
            + Add Image URL
          </Button>
        </Form.Group>

        <Form.Group controlId="inventoryID">
          <Form.Label className="mt-3">Inventory ID</Form.Label>
          {inventories.map((inventory) => (
            <Controller
              key={inventory._id}
              name="inventoryID"
              control={control}
              render={({ field }) => (
                <Form.Check
                  type="checkbox"
                  id={`inventory_${inventory._id}`}
                  label={inventory.name}
                  value={inventory._id}
                  checked={field.value.includes(inventory._id)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...field.value, inventory._id]
                      : field.value.filter((id) => id !== inventory._id);
                    field.onChange(newValue);
                  }}
                />
              )}
            />
          ))}
        </Form.Group>

        <Form.Group controlId="facilitiesID">
          <Form.Label className="mt-3">Facilities ID</Form.Label>
          {facilities.map((facility) => (
            <Controller
              key={facility._id}
              name="facilitiesID"
              control={control}
              render={({ field }) => (
                <Form.Check
                  type="checkbox"
                  id={`facility_${facility._id}`}
                  label={facility.name}
                  value={facility._id}
                  checked={field.value.includes(facility._id)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...field.value, facility._id]
                      : field.value.filter((id) => id !== facility._id);
                    field.onChange(newValue);
                  }}
                />
              )}
            />
          ))}
        </Form.Group>

        <Form.Group controlId="suppliesID">
          <Form.Label className="mt-3">Supplies ID</Form.Label>
          {supplies.map((supply) => (
            <Controller
              key={supply._id}
              name="suppliesID"
              control={control}
              render={({ field }) => (
                <Form.Check
                  type="checkbox"
                  id={`supply_${supply._id}`}
                  label={supply.name}
                  value={supply._id}
                  checked={field.value.includes(supply._id)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...field.value, supply._id]
                      : field.value.filter((id) => id !== supply._id);
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
