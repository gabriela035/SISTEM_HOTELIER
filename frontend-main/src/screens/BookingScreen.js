import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useData";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { axiosInstance, getRoomByID } from "../services/rooms";
import { calculateAmount, calculateDaysBetweenDates } from "../utils/utils";
import { bookRoom } from "../services/bookings";

const BookingScreen = () => {
  const { roomid, fromDate, toDate } = useParams();
  const {
    error,
    loading,
    data: room = [],
  } = useFetchData(() => getRoomByID(roomid), [roomid]);

  const [totalAmount, setTotalAmount] = useState(1);
  const [numberOfPeople, setNumberOfPeople] = useState(1); // State to store the number of people for booking
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  function stringifyInventoryDetails(room) {
    let inventoryDetails = "";

    if (room?.inventoryID?.length > 0) {
      inventoryDetails = room?.inventoryID
        ?.map((item) => `${item?.name}: ${item?.quantity}`)
        .join(", ");
    }

    return inventoryDetails;
  }
  function stringifyFacilitiesDetails(room) {
    let inventoryDetails = "";

    if (room?.facilitiesID?.length > 0) {
      inventoryDetails = room?.facilitiesID
        ?.map((item) => `${item?.name}: ${item?.quantity}`)
        .join(", ");
    }

    return inventoryDetails;
  }

  // Function to handle changes in the number of people select
  const handleNumberOfPeopleChange = (e) => {
    setNumberOfPeople(parseInt(e.target.value, 10)); // Parsing the selected value to an integer
  };
  const totalDays = calculateDaysBetweenDates(fromDate, toDate);

  //const totalAmount=totalDays*room.rentperday;
  //UPDATE LOGIC HERE
  //    const totalAmount =calculateAmount(totalDays,numberOfPeople)

  useEffect(() => {
    const newTotalAmount = calculateAmount(totalDays, numberOfPeople);
    setTotalAmount(newTotalAmount);
  }, [totalDays, numberOfPeople]);

  if (loading || !room) {
    return <div>Loading data....</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  async function onToken(token) {
    const bookingDetails = {
      room,
      userID: currentUser._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };
    
    bookRoom(bookingDetails)
      .then(() => {
        Swal.fire(
          "Congratulations",
          "Room Booked Successfully",
          "success"
        ).then(() => {
          window.location.href = "/my-bookings";
        });
      })
      .catch((e) => {
        Swal.fire("Ooops..", "Something went Wrong", e);
      });
  }

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 border p-4 rounded row bs bg-white">
            <div className="room-details">
              <h2 className="mb-5 text-center ">
                Room Number: {room.room_number}
              </h2>

              <p className="mb-3">
                <strong>Inventory Details: </strong>{" "}
                {stringifyInventoryDetails(room)}
              </p>

              <p className="mb-5">
                <strong>Facilities: </strong> {stringifyFacilitiesDetails(room)}
              </p>
              <img src={room.image_urls[0]} alt="Room" className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4 ">
          <div className="col-md-8 border p-4 rounded row bs bg-white">
            <h2 className="text-center mb-5">Booking Details</h2>
            <p>
              <strong>Booked by: </strong> {currentUser.first_name}{" "}
              {currentUser.last_name}
            </p>
            <p>
              <strong>From: </strong> {fromDate}
            </p>
            <p>
              <strong>To: </strong> {toDate}
            </p>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <div className="col-md-8 border p-4 rounded row bs bg-white">
            <h2 className="text-center">Amount</h2>

            <p>
              <strong>Total Days:</strong> {totalDays} days{" "}
            </p>

            <p>
              <strong>Total Amount:</strong> {totalAmount} RON
              {totalDays >= 10 && (
                <p className="text-success">
                  <strong> 5% discount! </strong>
                </p>
              )}
            </p>

            <p>
              <strong>Number of People: </strong>
            </p>

            <select
              value={numberOfPeople}
              onChange={handleNumberOfPeopleChange}
              className="form-select mb-3"
              style={{ borderWidth: 1, borderColor: "#737373a2" }}
            >
              <option value={1}>1 person</option>
              <option value={2}>2 people</option>
              <option value={3}>3 people</option>
              {/* Add more options as needed */}
            </select>
            <div className="mt-5">
              <StripeCheckout
                amount={totalAmount * 100}
                token={onToken}
                currency="RON"
                stripeKey="pk_test_51ODvUNGOWeco0QiyCAegwEImVhO0fIGtBCz0NMMCoeB3Du9QvnBxpAqlRIG201NyYjatKGNuiz0Xd8n5OXmANpqm009DuRlQPC"
              >
                <button
                  className="btn btn-primary"
                  //onClick={bookRoom}
                >
                  Pay Now
                </button>
              </StripeCheckout>

              <StripeCheckout
                amount={totalAmount * 10}
                token={onToken}
                currency="RON"
                stripeKey="pk_test_51ODvUNGOWeco0QiyCAegwEImVhO0fIGtBCz0NMMCoeB3Du9QvnBxpAqlRIG201NyYjatKGNuiz0Xd8n5OXmANpqm009DuRlQPC"
              >
                <button
                  className="btn btn-primary mx-3"
                  //onClick={bookRoom}
                >
                  Advance only
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingScreen;
