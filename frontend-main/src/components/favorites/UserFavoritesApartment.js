import React from "react";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { removeFromFavouritesApartment } from "../../services/auth";
import { useLoginContext } from "../../login-contexts/LoginContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { getRoomByID } from "../../services/rooms";
import { useFetchData } from "../../hooks/useData";

export function FavouriteApartment({ roomSetted }) {
  const { user } = useLoginContext();

  const { data: roomOfApartments = [] } = useFetchData(
    () => getRoomByID(roomSetted?.roomID[0]),
    []
  );

  console.log(roomOfApartments);

  const hasImages =
    roomOfApartments &&
    roomOfApartments.image_urls &&
    roomOfApartments.image_urls.length > 0;

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {"Remove From Favourites"}
    </Tooltip>
  );

  return (
    <div className="row bs" style={{ backgroundColor: "white" }}>
      <div className="col-md-4">
        {hasImages ? (
          <img
            src={roomOfApartments.image_urls[0]}
            alt="room"
            className="smallimg"
          />
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className="col-md-7">
        {roomSetted && (
          <>
            <h1 className="mb-3"> Apartment name: {roomSetted?.name}</h1>
            <b>
              <p>With {roomSetted.roomID.length} rooms</p>
            </b>
            <div style={{ float: "right", marginTop: 60 }}>
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Button
                  variant="danger"
                  onClick={() => {
                    removeFromFavouritesApartment(user._id, roomSetted._id)
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
      </div>
    </div>
  );
}
