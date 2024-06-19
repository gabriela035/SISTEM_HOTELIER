import React, { useState } from "react";
import { Modal, Button, Carousel, Tooltip, OverlayTrigger } from "react-bootstrap";
import { removeFromFavourites } from "../../services/auth";
import { useLoginContext } from "../../login-contexts/LoginContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
export function FavouriteRoom({ roomSetted }) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { user } = useLoginContext();

  const hasImages =
    roomSetted && roomSetted.image_urls && roomSetted.image_urls.length > 0;

    const renderTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        {"Remove From Favourites"}
      </Tooltip>
    );

  return (
    <div className="row bs" style={{ backgroundColor: "white" }}>
      <div className="col-md-4">
        {hasImages ? (
          <img src={roomSetted.image_urls[0]} alt="room" className="smallimg" />
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className="col-md-7">
        {roomSetted && (
          <>
            <h1 className="mb-3"> Room number: {roomSetted?.room_number}</h1>
            <b>
              <p>Number of beds: {roomSetted.number_of_beds}</p>
            </b>
            <div style={{ float: "right", marginTop: 60 }}>
              <button className="btn btn-primary mx-3" onClick={handleShow}>
                Preview
              </button>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button
                  variant="danger"
                  onClick={() => {
                    removeFromFavourites(user._id, roomSetted._id)
                      .then(() => {
                        console.log("remov");
                        window.location.reload();
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  <FontAwesomeIcon icon={faHeartBroken} />
                </Button>
              </OverlayTrigger>
            </div>
          </>
        )}

        <Modal show={show} onHide={handleClose} size="lg">
          {roomSetted && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Room: {roomSetted.room_number}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Carousel prevLabel="" nextLabel="">
                  {hasImages &&
                    roomSetted.image_urls.map((url, index) => (
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
