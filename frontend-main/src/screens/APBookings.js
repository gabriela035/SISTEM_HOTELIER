import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useData";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import { calculateAmountAP, calculateDaysBetweenDates } from "../utils/utils";
import { getApartmentByID } from "../services/apartments";
import { axiosInstance } from "../services/rooms";
import { Card, Button } from "react-bootstrap";
import { useLoginContext } from "../login-contexts/LoginContext";
import { bookApartment } from "../services/bookings";

const ApBookings = () => {
  const [totalAmount, setTotalAmount] = useState(1);
  const { apartmentId, fromDate, toDate } = useParams();
  const { data: apartment = [] } = useFetchData(
    () => getApartmentByID(apartmentId),
    [apartmentId]
  );
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const { user: currentUser } = useLoginContext();
  //const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //const { data: inventoryByID = [] } = useFetchData(() => getInventoryByID(apartment.roomID?.inventoryID), [apartment]);
  const totalDays = calculateDaysBetweenDates(fromDate, toDate);

  const handleNumberOfPeopleChange = (e) => {
    setNumberOfPeople(parseInt(e.target.value, 10)); // Parsing the selected value to an integer
  };
  //const totalAmount=totalDays*room.rentperday;
  //UPDATE LOGIC HERE
  useEffect(() => {
    const newTotalAmount = calculateAmountAP(totalDays, numberOfPeople);
    setTotalAmount(newTotalAmount);
  }, [totalDays, numberOfPeople]);

 

  async function onToken(token) {
    const bookingDetails = {
      apartment,
      // user: JSON.parse(localStorage.getItem('currentUser'))
      userID: currentUser._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };
    bookApartment(bookingDetails)
      .then(() => {
        Swal.fire(
          "Congratulations",
          "Apartment Booked Successfully",
          "success"
        ).then(() => {
          window.location.href = "/my-bookings";
        });
      })
      .catch((e) => {
        Swal.fire("Ooops..", "Something went Wrong", e);
      });
  }
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
  //console.log(apartment?.roomID[0]?.room_number);
  return (
    <>
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-md-8 border p-4 rounded row bs bg-white">
            <div className="room-details">
              <h2 className="mb-5 text-center ">Apartment: {apartment.name}</h2>
              <div className="row justify-content-center">
                {apartment?.roomID?.map((room) => (
                  <>
                    <div key={room._id} className="col-md-4 mb-4">
                      <Card>
                        <Card.Img variant="top" src={room?.image_urls[0]} />
                        <Card.Body>
                          <Card.Title>
                            Room Number: {room.room_number}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
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
              <strong>Number of People: </strong>
            </p>

            <select
              value={numberOfPeople}
              onChange={handleNumberOfPeopleChange}
              className="form-select mb-3"
            >
              <option value={1}>1 person</option>
              <option value={2}>2 people</option>
              <option value={3}>3 people</option>
              {/* Add more options as needed */}
            </select>
            <p>
              <strong>Total Amount:</strong> {totalAmount} RON
            </p>
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

export default ApBookings;
