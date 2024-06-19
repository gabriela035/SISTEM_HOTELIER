import React, { useEffect, useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { isValidDateFormat } from "../utils/utils";
import Swal from "sweetalert2";
import {
  addToFavourites,
  getFavouritesByUserID,
  removeFromFavourites,
} from "../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { useLoginContext } from "../login-contexts/LoginContext";
import Spinner from "react-bootstrap/Spinner";
import { Tag } from "antd";

function Room({ room, fromDate, toDate }) {
  const { user } = useLoginContext();
  // const [userFavorites, setUserFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (user) {
      getFavouritesByUserID(user?._id)
        .then((response) => {
          // setUserFavorites(response.data.favorites);
          setIsFavorite(
            response.data.favorites.some((fav) => fav._id === room?._id)
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user favorites:", error);
          Swal.fire("Error", "Failed to fetch user favorites", "error");
        });
    }
  }, [user, room]);

  const isRoomTaken = () => {
    if (!room || !room.current_bookings || !fromDate || !toDate) {
      return false;
    }

    const checkFromDate = new Date(fromDate.split("-").reverse().join("-")); // Reformat fromDate to YYYY-MM-DD
    const checkToDate = new Date(toDate.split("-").reverse().join("-")); // Reformat toDate to YYYY-MM-DD

    for (const booking of room.current_bookings) {
      const bookingFromDate = new Date(
        booking.fromDate.split("-").reverse().join("-")
      ); // Reformat booking.fromDate to YYYY-MM-DD
      const bookingToDate = new Date(
        booking.toDate.split("-").reverse().join("-")
      ); // Reformat booking.toDate to YYYY-MM-DD

      if (
        (checkFromDate <= bookingToDate && checkFromDate >= bookingFromDate) ||
        (checkToDate >= bookingFromDate && checkToDate <= bookingToDate) ||
        (checkFromDate <= bookingFromDate && checkToDate >= bookingToDate)
      ) {
        return true; // Room is taken during the provided date range
      }
    }

    return false; // Room is available for the provided date range
  };

  const hasImages = room && room.image_urls && room.image_urls.length > 0;
  const roomAvailable = !isRoomTaken(); // Check if the room is available
  const isUserLoggedIn = !!user;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {isFavorite ? "Remove From Favourites" : "Add To Favourites"}
    </Tooltip>
  );

  // if(loading){
  //   return  <Spinner animation="border" />;
  // }

  return (
    <div className="row bs" style={{backgroundColor:'white'}}>
      <div className="col-md-4">
        {hasImages ? (
          <img src={room.image_urls[0]} alt="room" className="smallimg" />
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className="col-md-7">
        {room && (
          <>
            <h1>Room number: {room.room_number}</h1>
            <div className="mt-3">
              <b>
                <p>Number of beds: {room.number_of_beds}</p>
                {!isRoomTaken() && <Tag color="green">{"Available!"}</Tag>}
              </b>
            </div>
            <div style={{ float: "right" }}>
              {isValidDateFormat(fromDate) && isValidDateFormat(toDate) ? (
                isUserLoggedIn ? (
                  roomAvailable ? (
                    <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                      <button className="btn btn-primary">Book now</button>
                    </Link>
                  ) : (
                    <button className="btn btn-primary" disabled>
                      Room taken
                    </button>
                  )
                ) : (
                  <Link to={`/login`}>
                    <button className="btn btn-primary">Login to book</button>
                  </Link>
                )
              ) : (
                <Link to={`/`}>
                  <button className="btn btn-danger" disabled>
                    Select date first!
                  </button>
                </Link>
              )}

              <button className="btn btn-primary mx-3" onClick={handleShow}>
                Preview
              </button>

              {loading ? (
                <Spinner animation="grow" variant="danger" />
              ) : (
                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Button
                    variant={isFavorite ? "danger" : "outline-danger"}
                    onClick={() => {
                      if (isFavorite) {
                        removeFromFavourites(user._id, room._id)
                          .then(() => {
                            setIsFavorite(false);
                            //Swal.fire("ok", "ok");
                          })
                          .catch((err) => console.log(err));
                      } else {
                        addToFavourites(user._id, room._id)
                          .then(() => {
                            setIsFavorite(true);
                            // Swal.fire("Added to", "ok");
                          })
                          .catch((err) => console.log(err));
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={isFavorite ? faHeart : faHeartCirclePlus}
                    />
                  </Button>
                </OverlayTrigger>
              )}
            </div>
          </>
        )}

        <Modal show={show} onHide={handleClose} size="lg">
          {room && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Room: {room.room_number}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Carousel prevLabel="" nextLabel="">
                  {hasImages &&
                    room.image_urls.map((url, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100 bigimg"
                          src={url}
                          alt="brokenimage"
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Room;
