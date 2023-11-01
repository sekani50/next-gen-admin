import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: "https://the-next-gen-show-x0p9.onrender.com/api",
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();
