import axios from "./useAxios";

//credentials for verfication

export const createEvent = (token, payload) => {
  return axios.post("/events/", payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const videoUpload = (token, payload) => {
  return axios.post(`/upload-video`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const imageUpload = (token, payload) => {
  return axios.post(`/upload-image`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getStat = (token) => {
  return axios.get('/admin/dashboard-stats', {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

///events/?page=1
export const allEvents = (token, page) => {
  return axios.get(`events/?page=${page}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

//
export const deleteEvent = (token, eventId) => {
  return axios.delete(`/events/${eventId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

///events/:eventId
export const updateEvent = (token, eventId, payload) => {
  return axios.put(`/events/${eventId}`,payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

////user/participants
export const allParticipants =(token) => {
  return axios.get(`/events/participants`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

///events/:eventID/participants?page=1 
export const eventParticipants =(token,eventId, page) => {
  return axios.get(`/events/${eventId}/participants?page=${page}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}

////user/participants/:userId 
export const singleParticipant = (token,eventId, userId) => {
  return axios.get(`/events/${eventId}/participants/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
}