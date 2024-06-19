import { axiosInstance, convertToObjectIdArray } from './rooms';
export function getAllApartments() {
    return axiosInstance.get('/api/apartments/getAllApartments')
}
export function getApartmentByID(id) {
    return axiosInstance.get(`/api/apartments/${id}`)
}


export const addApartment = (data) => {
    const formData = new FormData();
  
    formData.append("name", data?.name);

    if (Array.isArray(data?.roomID)) {
      data?.roomID?.forEach((id) => {
        formData.append("roomID[]", id);
      });
    } else {
      formData.append("roomID", data?.roomID);
    }
    
  
    return axiosInstance.post("/api/apartments/addApartment", formData);
  };

  export const deleteApartmentByID = (id) => {
    return axiosInstance.delete(`/api/apartments/${id}`);
  };



  export function editApartment(data, id) {
    const formData = new FormData();
  
    formData.append("name", data?.name);
  
    if (Array.isArray(data?.roomID)) {
      data.roomID.forEach((id) => {
        formData.append("roomID[]", id);
      });
    } else {
      formData.append("roomID", data?.roomID);
    }
  
    return axiosInstance.put(`/api/apartments/${id}`, formData);
  }