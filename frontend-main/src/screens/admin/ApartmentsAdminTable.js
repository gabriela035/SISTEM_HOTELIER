import React, { useState } from "react";
import { Table, Button, Modal} from "react-bootstrap";
import { useFetchData } from "../../hooks/useData";
import { getAllApartments } from "../../services/apartments";
import { formatDateToDDMMYYYY } from "../../utils/utils";
import { deleteApartmentByID } from "../../services/apartments"; 
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export function ApartmentsAdminTable() {
  const { data: apartments = [], refetchData } = useFetchData(() => getAllApartments());
  const navigate = useNavigate();
  const [idToDelete, setIdToDelete] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id) => {
    setIdToDelete(id);
    console.log(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    deleteApartmentByID(idToDelete)
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
            <th>Apartment Name</th>
            <th>Rooms</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment, index) => (
            <tr key={index}>
              <td>{apartment.name}</td>
              
              <td>
                {apartment.roomID.map((r, index) => (
                  <div key={index}>
                    Room:<strong> {r.room_number}</strong>
                  </div>
                ))}
              </td>
              <td>{formatDateToDDMMYYYY(new Date(apartment.createdAt))}</td>
              <td>{formatDateToDDMMYYYY(new Date(apartment.updatedAt))}</td>
              <td>
            
                <div className="d-flex justify-content-center flex-wrap">
                  <Button
                    className=" mx-3"
                    variant="danger"
                    onClick={() => {
                      // deleteApartmentByID(apartment._id);
                     // refetchData();
                      setIdToDelete(apartment._id);
                      setOpen(true);
                    }}
                  >
                    Remove
                  </Button>

                  <Button
                    className=" mx-3"
                    variant="info"
                    onClick={() => {
                      navigate("/add-apartment/" + apartment._id);
                    }}
                  >
                    Edit
                  </Button>
                </div>
              </td>
              {/* <td>
                  <ul>
                    {apartment.roomID.inventoryID.map((inventoryItem, index) => (
                      <li key={index}>
                        <b>Name:</b> {inventoryItem.name}, <b>Quantity:</b> {inventoryItem.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {apartment.roomID.facilitiesID.map((i, index) => (
                      <li key={index}>
                        <b>Name:</b> {i.name}, <b>Quantity:</b> {i.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {apartment.roomID.suppliesID.map((i, index) => (
                      <li key={index}>
                        <b>Name:</b> {i.name}, <b>Quantity:</b> {i.quantity}
                      </li>
                    ))}
                  </ul>
                </td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
