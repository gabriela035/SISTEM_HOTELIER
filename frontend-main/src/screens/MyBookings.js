import React, { useState } from "react";
import { Tag, Modal } from "antd"; // Import Modal component
import { useFetchData } from "../hooks/useData";
import {
  cancelBooking,
  cancelBookingApartment,
  getApartmentBookingsByUserId,
  getBookingsByUserId,
} from "../services/bookings";
import { Card } from "react-bootstrap";
import { useLoginContext } from "../login-contexts/LoginContext";
import BoxWrapper from "../components/BoxWrapper";
import Swal from "sweetalert2";

export function MyBookings() {
  const { user } = useLoginContext();

  const { data: bookings = [] } = useFetchData(
    () => getBookingsByUserId(user._id),
    [user._id]
  );
  const { data: bookingsAP = [] } = useFetchData(
    () => getApartmentBookingsByUserId(user._id),
    [user._id]
  );

  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  const showCancelModal = (bookingId) => {
    setCancelBookingId(bookingId);
    setIsCancelModalVisible(true);
  };

  const handleCancel = () => {
    if (cancelBookingId) {
      // Determine whether to call cancelBooking or cancelBookingApartment based on booking type
      const bookingToCancel = bookings?.find(
        (booking) => booking?._id === cancelBookingId
      );

      if (bookingToCancel) {
        cancelBooking(bookingToCancel?._id, bookingToCancel?.roomID)
          .then(() => {
            Swal.fire(
              "Congrats",
              "Your  bookings has been cancelled",
              "success"
            );
            window.location.reload();
          })
          .catch((e) => {
            Swal.fire("Oops", "Something went wrong", "error");
            console.log(e);
          });
      } else {
        const apartmentBookingToCancel = bookingsAP?.find(
          (booking) => booking?._id === cancelBookingId
        );
        cancelBookingApartment(
          apartmentBookingToCancel?._id,
          apartmentBookingToCancel?.apartmentID
        )
          .then(() => {
            Swal.fire(
              "Congrats",
              "Your  bookings has been cancelled",
              "success"
            );
            window.location.reload();
          })
          .catch((e) => {
            Swal.fire("Oops", "Something went wrong", "error");
            console.log(e);
          });
      }
    }
    setIsCancelModalVisible(false);
  };

  const handleCancelModalCancel = () => {
    setIsCancelModalVisible(false);
  };

  return (
    <div style={{ marginInline: 150, }}>
       <div className="d-flex justify-content-center mt-5 flex-wrap" style={{ paddingBottom:10}}>
        <h1>Showing all Bookings</h1>
      </div>
      <BoxWrapper>
        {bookings &&
          bookings.map((booking) => (
            <div key={booking._id}>
              <Card className="lg mx-3 mt-3 mb-5">
                <Card.Header>
                  <b>Room:{booking.room}</b>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <b>Booking ID</b>: {booking._id}
                  </Card.Text>
                  <Card.Text>
                    <b>CheckIn</b>: {booking.fromDate}
                  </Card.Text>
                  <Card.Text>
                    <b>CheckOut</b>: {booking.toDate}
                  </Card.Text>
                  <Card.Text>
                    <b>Amount</b>: {booking.totalAmount} RON
                  </Card.Text>
                  <Card.Text>
                    <b> Status </b>:{" "}
                    {booking.status === "cancelled" ? (
                      <Tag color="error">CANCELLED</Tag>
                    ) : (
                      <Tag color="green">CONFIRMED</Tag>
                    )}
                  </Card.Text>
                  <Card.Text>
                    {booking.status !== "cancelled" && (
                      <button
                        className="btn btn-danger"
                        onClick={() => showCancelModal(booking._id)}
                      >
                        CANCEL BOOKING
                      </button>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        {bookingsAP &&
          bookingsAP.map((booking) => (
            <div key={booking._id}>
              <Card className="lg mx-3 mt-3 mb-5">
                <Card.Header>
                  <b>Apartment: {booking.apartment}</b>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <b>Booking ID</b>: {booking._id}
                  </Card.Text>
                  <Card.Text>
                    <b>CheckIn</b>: {booking.fromDate}
                  </Card.Text>
                  <Card.Text>
                    <b>CheckOut</b>: {booking.toDate}
                  </Card.Text>
                  <Card.Text>
                    <b>Amount</b>: {booking.totalAmount} RON
                  </Card.Text>
                  <Card.Text>
                    <b> Status </b>:{" "}
                    {booking.status === "cancelled" ? (
                      <Tag color="error">CANCELLED</Tag>
                    ) : (
                      <Tag color="green">CONFIRMED</Tag>
                    )}
                  </Card.Text>
                  <Card.Text>
                    {booking.status !== "cancelled" && (
                      <button
                        className="btn btn-danger"
                        onClick={() => showCancelModal(booking._id)}
                      >
                        CANCEL BOOKING
                      </button>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
      </BoxWrapper>
      <Modal
        title="Confirm Cancellation"
        visible={isCancelModalVisible}
        onOk={handleCancel}
        onCancel={handleCancelModalCancel}
      >
        <p>Are you sure you want to cancel this booking?</p>
      </Modal>
    </div>
  );
}
