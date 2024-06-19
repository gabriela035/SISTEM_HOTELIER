import { axiosInstance } from "./rooms";
// export const getBookingsByUserId = (id) => {
//     return axios.get(`/api/bookings/${id}`);
// };

export const getAllBookings = () => {
  return axiosInstance.get(`/api/bookings/getallbookings`);
};
export const getAllApartmentBookings = () => {
  return axiosInstance.get(`/api/bookingsAP/getAllApartmentBookings`);
};
export const getBookingsByUserId = (id) => {
  return axiosInstance.post(`/api/bookings/getbookingsbyuserid`, {
    userID: id,
  });
};
export const getApartmentBookingsByUserId = (id) => {
  return axiosInstance.post(`/api/bookingsAP/getbookingsbyuserid`, {
    userID: id,
  });
};

export const cancelBooking = (bookingID, roomID) => {
  return axiosInstance.post("/api/bookings/cancelbooking", {
    bookingID,
    roomID,
  });
};
export const cancelBookingApartment = (bookingID, apartmentID) => {
  return axiosInstance.post("/api/bookingsAP/cancelbooking", {
    bookingID,
    apartmentID,
  });
};

export const bookRoom = (bookingDetails) => {
  return axiosInstance.post("/api/bookings/bookroom",  bookingDetails);
};

export const bookApartment = (bookingDetails) => {
  return axiosInstance.post("/api/bookingsAP/bookApartment",  bookingDetails);
};

export const deleteBookingRoom = (id) => {
  return axiosInstance.delete("/api/bookings/"+  id);
};

export const deleteBookingApartment = (id) => {
  return axiosInstance.delete("/api/bookingsAP/"+  id);
};
