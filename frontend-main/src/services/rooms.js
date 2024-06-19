import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://hotel-szz.onrender.com",
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
export function getAllRooms() {
  return axiosInstance.get("/api/rooms/getAllRooms");
}

export const addRoom = (data) => {
  const formData = new FormData();

  formData.append("room_number", data?.room_number);
  formData.append("number_of_beds", data?.number_of_beds);

  // Check if image_urls is an array
  if (Array.isArray(data?.image_urls)) {
    // If it's an array, append each URL separately
    data.image_urls.forEach((url, index) => {
      formData.append(`image_urls[${index}]`, url);
    });
  } else {
    // If it's not an array, handle it accordingly
    formData.append("image_urls", data?.image_urls);
  }

  // Append inventory IDs
  if (Array.isArray(data?.inventoryID)) {
    data.inventoryID.forEach((id) => {
      formData.append("inventoryID[]", id);
    });
  } else {
    formData.append("inventoryID", data?.inventoryID);
  }

  // Append facilities IDs
  if (Array.isArray(data?.facilitiesID)) {
    data.facilitiesID.forEach((id) => {
      formData.append("facilitiesID[]", id);
    });
  } else {
    formData.append("facilitiesID", data?.facilitiesID);
  }

  // Append supplies IDs
  if (Array.isArray(data?.suppliesID)) {
    data.suppliesID.forEach((id) => {
      formData.append("suppliesID[]", id);
    });
  } else {
    formData.append("suppliesID", data?.suppliesID);
  }

  return axiosInstance.post("/api/rooms/addRoom", formData);
};
export function editRoom(data, id) {
    const formData = new FormData();
  
    formData.append("room_number", data?.room_number);
    formData.append("number_of_beds", data?.number_of_beds);
  
    if (Array.isArray(data?.image_urls)) {
      data.image_urls.forEach((url, index) => {
        formData.append(`image_urls[${index}]`, url);
      });
    } else {
      formData.append("image_urls", data?.image_urls);
    }
  
    // Append inventory IDs
  if (Array.isArray(data?.inventoryID)) {
    data.inventoryID.forEach((id) => {
      formData.append("inventoryID[]", id);
    });
  } else {
    formData.append("inventoryID", data?.inventoryID);
  }

  // Append facilities IDs
  if (Array.isArray(data?.facilitiesID)) {
    data.facilitiesID.forEach((id) => {
      formData.append("facilitiesID[]", id);
    });
  } else {
    formData.append("facilitiesID", data?.facilitiesID);
  }

  // Append supplies IDs
  if (Array.isArray(data?.suppliesID)) {
    data.suppliesID.forEach((id) => {
      formData.append("suppliesID[]", id);
    });
  } else {
    formData.append("suppliesID", data?.suppliesID);
  }
  
    // Append other fields as needed
  
    return axiosInstance.put(`/api/rooms/${id}`, formData);
  }
  
  // Helper function to convert value or array of values to an array of ObjectIds
export  function convertToObjectIdArray(value) {
    if (!value) {
      return [];
    }
  
    if (Array.isArray(value)) {
      return value.map((item) => item?._id);
    }
  
    return [value?._id];
  }

export const getRoomByID = (id) => {
  return axiosInstance.get(`/api/rooms/${id}`);
};

export const deleteRoomByID = (id) => {
  return axiosInstance.delete(`/api/rooms/${id}`);
};

export const getInventoryByID = (id) => {
  return axiosInstance.post("/api/rooms/getInventoryById", { inventoryID: id });
};
export const getFacilitiesById = (id) => {
  return axiosInstance.post("/api/rooms/getFacilitiesById", {
    facilitiesID: id,
  });
};

export const getAllInventories = () => {
  return axiosInstance.get("/api/rooms/inventories/getAllInventories");
};
export const getAllFacilities = () => {
  return axiosInstance.get("/api/rooms/facilities/getAllFacilities");
};
export const getAllSupplies = () => {
  return axiosInstance.get("/api/rooms/supplies/getAllSupplies");
};
