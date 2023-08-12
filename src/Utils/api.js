import axios from "./useAxios";

//credentials for verfication
export const credentials = (token, payload) => {
  return axios.post("/associate/setup", payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

//
export const updateProfile = (token, payload) => {
  return axios.put(`/profile`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

// /password/change
export const changePassword = (token, payload) => {
  return axios.put(`/password/change`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

// /password/forgot
export const sendMail = (token, payload) => {
  return axios.post(`/password/forgot`, payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

