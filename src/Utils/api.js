import axios from "./useAxios";

//credentials for verfication
export const credentials = (token, payload) => {
  return axios.post("/associate/setup", payload, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const createEvent = (payload) => {
  return axios.post('/events/', payload, {
    headers: {
      Authorization: "Bearer " + token,
    }
  })
}
