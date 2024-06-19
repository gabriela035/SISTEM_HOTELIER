import React, { useState } from "react";

import { Table, Modal, Button } from "react-bootstrap";
import { useFetchData } from "../../hooks/useData";
import { deleteRoomByID, getAllRooms } from "../../services/rooms";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export function RoomsAdminTable() {
  const { data: rooms = [], refetchData } = useFetchData(
    () => getAllRooms(),
    []
  );

  const [idToDelete, setIdToDelete] = useState("");
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteRoomByID(idToDelete)
      .then(() => {
        handleClose();
        Swal.fire("Success!", "Deleted");
        refetchData();
      })
      .catch((error) => {
        console.log("Error deleting :", error);
        handleClose();
      });
  };
  const navigate = useNavigate();

  return (
    <div className="row d-flex justify-content-center mx-5 my-5 mb-5">
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Number of Beds</th>
            <th>Inventory</th>
            <th>Facilities</th>
            <th>Supplies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room.room_number}</td>
              <td>{room.number_of_beds}</td>

              <td>
                <ul>
                  {room.inventoryID.map((inventoryItem, index) => (
                    <li key={index}>
                      <b>Name:</b> {inventoryItem.name}, <b>Quantity:</b>{" "}
                      {inventoryItem.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {room.facilitiesID.map((i, index) => (
                    <li key={index}>
                      <b>Name:</b> {i.name}, <b>Quantity:</b> {i.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {room.suppliesID.map((i, index) => (
                    <li key={index}>
                      <b>Name:</b> {i.name}, <b>Quantity:</b> {i.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div className="d-flex justify-content-center">
                  <Button
                    className=" mx-3"
                    variant="danger"
                    onClick={() => {
                      // deleteRoomByID(room._id);
                      // refetchData();
                      setIdToDelete(room._id);
                      setOpen(true);
                    }}
                  >
                    Remove
                  </Button>

                  <Button
                    className=" mx-3"
                    variant="info"
                    onClick={() => {
                      navigate("/add-room/" + room._id);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
