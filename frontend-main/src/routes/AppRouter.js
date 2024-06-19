import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import Register from "../screens/Register";
import Login from "../screens/Login";
import ApartmentList from "../screens/ApartmentsList";
import ApBookings from "../screens/APBookings";
import Profile from "../screens/Profile";
import AdminScreen from "../screens/AdminScreen";
import AddUser from "../screens/users/AddUser";
import AddRoom from "../screens/rooms/AddRoom";
import MyFavourites from "../screens/users/MyFavouriteRooms";
import { MyBookings } from "../screens/MyBookings";
import AddApartment from "../screens/apartment/AddApartment";
import NavBar from "../components/NavBar";
import Layout from "../Layout";
function AppRouter() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/apartments" element={<ApartmentList />} />
        <Route
          path="/book/:roomid/:fromDate/:toDate"
          element={<BookingScreen />}
        />
        <Route
          path="/bookAP/:apartmentId/:fromDate/:toDate"
          element={<ApBookings />}
        />

        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/favourites" element={<MyFavourites />} />
        <Route path="/admin" element={<AdminScreen />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/add-room/:id" element={<AddRoom />} />
        <Route path="/add-apartment" element={<AddApartment />} />
        <Route path="/add-apartment/:id" element={<AddApartment />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-user/:id" element={<AddUser />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
