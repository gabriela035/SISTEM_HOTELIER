import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { Table, Button, Modal } from "react-bootstrap";
import {
  getBookingsForMonth,
  getMonthNumberByName,
  months,
} from "../../utils/utils";
import { useFetchData } from "../../hooks/useData";
import { deleteBookingRoom, getAllBookings } from "../../services/bookings";
import Swal from "sweetalert2";

export function BookingsRoomsTable() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);

  const { data: bookings = [], refetchData } = useFetchData(() =>
    getAllBookings()
  );

  const [selectedDate, setSelectedDate] = useState("");

  const [idToDelete, setIdToDelete] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteBookingRoom(idToDelete)
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

  const handleMonthSelect = (selected) => {
    setSelectedMonth(selected);
    const monthNumber = getMonthNumberByName(selected);
    const filtered = getBookingsForMonth(bookings, monthNumber);
    setFilteredBookings(filtered);
  };

  const handleDateSelect = (selected) => {
    setSelectedDate(selected);

    const filtered = bookings.filter(
      (booking) => booking.fromDate === selected || booking.toDate === selected
    );
    setFilteredBookings(filtered);
  };

  return (
    <>
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
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 mt-5">
          {/* <h2 className="text-center mb-5">Bookings</h2> */}
          {bookings.length && (
            <h1 className=" mb-3">Total: {bookings.length} bookings</h1>
          )}

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>User ID</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.room}</td>
                    <td>{booking.userID}</td>

                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.totalAmount}</td>
                    <td
                      style={{
                        color: booking.status === "booked" ? "green" : "red",
                      }}
                    >
                      {booking.status}
                    </td>
                    <td>
                      <Button
                        className=" mx-3"
                        variant="danger"
                        style={
                          booking.status === "booked"
                            ? { backgroundColor: "#dda5a8", borderWidth: 0 }
                            : {}
                        }
                        disabled={booking.status === "booked"}
                        onClick={() => {
                          console.log("mui");
                          // deleteRoomByID(room._id);
                          // refetchData();
                          setIdToDelete(booking._id);
                          setOpen(true);
                        }}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="container" style={{ maxWidth: "83%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 30,
              marginTop: 30,
            }}
          >
            <h1 style={{ marginRight: "10px" }}>Show bookings for</h1>
            <Dropdown>
              <Dropdown.Toggle variant="info" id="dropdown-month">
                {selectedMonth ? selectedMonth : "Select Month"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {Array.from({ length: 12 }, (_, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleMonthSelect(months[index])}
                  >
                    {months[index]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>User ID</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings?.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.room}</td>
                    <td>{booking.userID}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.totalAmount}</td>
                    <td> {booking.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          }
        </div>
      </div>

      <div className="container mb-5" style={{ maxWidth: "83%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 30,
            marginTop: 30,
          }}
        >
          <h1 style={{ marginRight: "10px" }}>Show bookings for</h1>
          <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-date">
              {selectedDate ? selectedDate : "Select Date"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {bookings.map((b, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleDateSelect(b.fromDate)}
                >
                  {b.fromDate}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Room</th>
              <th>User ID</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.room}</td>
                <td>{booking.userID}</td>
                <td>{booking.fromDate}</td>
                <td>{booking.toDate}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
