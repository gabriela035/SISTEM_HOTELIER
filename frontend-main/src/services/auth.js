import { axiosInstance } from "./rooms";

export function getAllUsers() {
  return axiosInstance.get("/api/users/getAllUsers");
}

export function getUserByID(id) {
  return axiosInstance.get(`/api/users/${id}`);
}

export function getFavouritesByUserID(id) {
  return axiosInstance.get(`/api/users/getAllFavorites/${id}`);
}

export function getFavouritesApartmentByUserID(id) {
  return axiosInstance.get(`/api/users/getAllFavorites-apartments/${id}`);
}

export function register(user) {
  return axiosInstance.post("/api/users/register", user);
}

export function addToFavourites(userId, roomId) {
  return axiosInstance.post(`/api/users/${userId}/favorites/${roomId}`);
}

export function removeFromFavourites(userId, roomId) {
  return axiosInstance.post(`/api/users/${userId}/favorites-remove/${roomId}`);
}

export function addToFavouritesApartment(userId, apartmentId) {
  return axiosInstance.post(
    `/api/users/${userId}/favorites-apartments/${apartmentId}`
  );
}

export function removeFromFavouritesApartment(userId, apartmentId) {
  return axiosInstance.post(
    `/api/users/${userId}/favorites-apartments-remove/${apartmentId}`
  );
}

export function login(user) {
  return axiosInstance.post("/api/users/login", user);
}

export function deleteUser(id) {
  return axiosInstance.delete("/api/users/" + id);
}

export function addUser(data) {
  const formData = new FormData();

  formData.append("first_name", data?.first_name);
  formData.append("last_name", data?.last_name);
  formData.append("CNP", data?.CNP);
  formData.append("address", data?.address);
  formData.append("email", data?.email);
  formData.append("password", data?.password);
  formData.append("isAdmin", data?.isAdmin);

  return axiosInstance.post("/api/users/addUser", formData);
}

export function editUser(data, id) {
  const formData = new FormData();

  formData.append("first_name", data?.first_name);
  formData.append("last_name", data?.last_name);
  formData.append("CNP", data?.CNP);
  formData.append("address", data?.address);
  formData.append("email", data?.email);
  formData.append("password", data?.password);
  formData.append("isAdmin", data?.isAdmin);

  return axiosInstance.put("/api/users/" + id, formData);
}
