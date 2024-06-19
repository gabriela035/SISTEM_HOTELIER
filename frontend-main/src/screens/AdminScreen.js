import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useFetchData } from "../hooks/useData";
import { getAllBookings } from "../services/bookings";
import { Button, Table, Modal } from "react-bootstrap";
import { deleteUser, getAllUsers } from "../services/auth";
import {
  calculateTotalAmountPerMonth,
  calculateTotalCostPerMonth,
  months,
} from "../utils/utils";
import AddRoom from "./rooms/AddRoom";
import Swal from "sweetalert2";
import AddApartment from "./apartment/AddApartment";
import AddUser from "./users/AddUser";
import { useLoginContext } from "../login-contexts/LoginContext";
import { BookingsRoomsTable } from "./admin/BookingsRoomsTable";
import { BookingsApartmentsTable } from "./admin/BookingsApartmentsTable";
import { RoomsAdminTable } from "./admin/RoomsAdminTable";
import { ApartmentsAdminTable } from "./admin/ApartmentsAdminTable";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
function AdminScreen() {
  const { user } = useLoginContext();
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    if (!user.isAdmin) window.location.href = "/";
    const savedTab = localStorage.getItem("adminActiveTab");
    if (savedTab) {
      setActiveKey(savedTab);
    }
  }, []);

  const handleTabChange = (key) => {
    setActiveKey(key);
    localStorage.setItem("adminActiveTab", key);
  };

  const items = [
    {
      key: "1",
      label: "Room Bookings",
      children: <BookingsRoomsTable />,
    },
    {
      key: "2",
      label: "Apartment Bookings",
      children: <BookingsApartmentsTable />,
    },
    {
      key: "3",
      label: "Rooms",
      children: <RoomsAdminTable />,
    },
    {
      key: "19",
      label: "Apartments",
      children: <ApartmentsAdminTable />,
    },

    {
      key: "4",
      label: "Users",
      children: <UsersTable />,
    },
    {
      key: "5",
      label: "Finances",
      children: <Finance />,
    },
    {
      key: "6",
      label: "Add New Room",
      children: <AddRoom />,
    },
    {
      key: "7",
      label: "Add New Apartment",
      children: <AddApartment />,
    },
    {
      key: "8",
      label: "Add New User",
      children: <AddUser />,
    },
  ];
  return (
    <div className="mt-3 mx-5  ">
      <Tabs
        defaultActiveKey="1"
        activeKey={activeKey}
        items={items}
        onChange={handleTabChange}
      ></Tabs>{" "}
      <Footer />
    </div>
  );
}

function UsersTable() {
  const { data: users = [], refetchData } = useFetchData(() => getAllUsers());
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
    deleteUser(idToDelete)
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
            <th>Full Name</th>
            <th>CNP</th>
            <th>Address</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.CNP}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? "Yes" : "No"}</td>
              <td>
                <Button
                  className="mt-3 mx-3"
                  variant="danger"
                  onClick={() => {
                    setOpen(true);
                    setIdToDelete(user._id);
                  }}
                >
                  Delete Account
                </Button>
                <Button
                  className="mt-3"
                  variant="info"
                  onClick={() => {
                    console.log(user._id);
                    navigate("/add-user/" + user._id);
                  }}
                >
                  {/* make admin or client */}
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const Finance = () => {
  const {
    loading,
    error,
    data: bookings = [],
  } = useFetchData(() => getAllBookings());

  const monthlyTotal = [];
  const monthlyTotalCost = [];

  for (let i = 0; i < months.length; i++) {
    const totalAmount = calculateTotalAmountPerMonth(bookings, i + 1);
    monthlyTotal.push({ month: months[i], totalAmount });
  }

  for (let i = 0; i < months.length; i++) {
    const totalAmount = calculateTotalCostPerMonth(bookings, i + 1);
    monthlyTotalCost.push({ month: months[i], totalAmount });
  }
  if (loading || !bookings) {
    return <div>Loading data....</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="row d-flex justify-content-center mx-5 my-5 mb-5">
      <h3>Total Profit per Month</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {monthlyTotal.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Total Cost per Month</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {monthlyTotalCost.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default AdminScreen;
