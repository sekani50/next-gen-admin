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
  return axios.get("/admin/dashboard-stats", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

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
  return axios.put(`/events/${eventId}`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

////user/participants
export const allParticipants = (token) => {
  return axios.get(`/events/participants`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

///events/:eventID/participants?page=1
export const eventParticipants = (token, eventId, page) => {
  return axios.get(`/events/${eventId}/participants?page=${page}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

////user/participants/:userId
export const singleParticipant = (token, eventId, userId) => {
  return axios.get(`/events/${eventId}/participants/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

///events/:eventID/shortlist/:participantId
export const shortlist = (token, eventId, userId) => {
  return axios.patch(`/events/${eventId}/shortlist/${userId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

///events/:eventID/participants/shortlisted
export function getShortlist(token, eventId) {
  return axios.get(`/events/${eventId}/participants/shortlisted`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getCountries(token) {
  return axios.get(`/countries`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function createCategory(payload, token) {
  return axios.post(`/categories/`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getEvents(token) {
  return axios.get(`/events`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function getTalents(token) {
  return axios.get(`/talents/`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function createTalent(token, payload) {
  return axios.post(`/talents/`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

///events/:id/toggle-active
export function toggleActiveEvent(token, id) {
  return axios.patch(`/events/${id}/toggle-active`, id, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

///categories/
export function allCategories(token, page) {
  return axios.get(`/categories/?page=${page}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

////categories/:id
export function deleteCategory(token, id) {
  return axios.delete(`/categories/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

///categories/:id
export function categoryDetail(token, id) {
  return axios.get(`/categories/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

///categories/:id
export function updateCategory(token, id, payload) {
  return axios.put(`/categories/${id}`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function allTalent(token, page) {
  return axios.get(`/talents/?page=${page}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function deleteTalent(token, id) {
  return axios.delete(`/talents/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

export function updateTalent(token, id, payload) {
  return axios.put(`/talents/${id}`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
