import React, { useEffect, useState } from "react";
import { FavouriteRoom } from "../../components/favorites/UsersFavouritesCard";
import {
  getFavouritesApartmentByUserID,
  getFavouritesByUserID,
} from "../../services/auth";
import Swal from "sweetalert2";
import { useLoginContext } from "../../login-contexts/LoginContext";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FavouriteApartment } from "../../components/favorites/UserFavoritesApartment";

function MyFavourites() {
  const [favourites, setFavorites] = useState([]);
  const [favouritesApartments, setFavoritesApartments] = useState([]);
  const { user } = useLoginContext();

  useEffect(() => {
    if (user) {
      getFavouritesByUserID(user?._id)
        .then((response) => {
          console.log(response.data.favorites);
          setFavorites(response.data.favorites);
        })
        .catch((error) => {
          console.error("Error fetching user favorites:", error);
          Swal.fire("Error", "Failed to fetch user favorites", "error");
        });

      getFavouritesApartmentByUserID(user?._id)
        .then((response) => {
          console.log(response.data.favouritesApartments);
          setFavoritesApartments(response.data.favouritesApartments);
        })
        .catch((error) => {
          console.error("Error fetching user favorites:", error);
          Swal.fire("Error", "Failed to fetch user favorites", "error");
        });
    }
  }, []);

  return (
    <>
      <div className="container mb-5">
        <div className="row justify-content-center mt-5">
          {favourites?.map((r) => (
            <>
              <div key={r._id} className="col-md-9 mt-2">
                <FavouriteRoom roomSetted={r} />
              </div>
            </>
          ))}
          {favouritesApartments?.map((r) => (
            <>
              <div key={r._id} className="col-md-9 mt-2">
                <FavouriteApartment roomSetted={r} />
              </div>
            </>
          ))}
        </div>
        {favourites.length === 0 && favouritesApartments.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <FontAwesomeIcon
              icon={faHeartBroken}
              style={{
                fontSize: "100px",
                marginBottom: "20px",
                color: "#bc4b51",
              }}
            />
            <h2 style={{ textAlign: "center" }}>No favorites yet</h2>
            <h1 style={{ fontSize: "50px", textAlign: "center" }}>
              You can add a room or an apartment to your favorites by clicking
              the heart icon
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
export default MyFavourites;
