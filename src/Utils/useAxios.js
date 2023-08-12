import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: 'https://amazon-tracker-869bb35ecdc6.herokuapp.com',
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();
