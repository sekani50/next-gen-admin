import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: 'https://the-next-gen-show-15bi.onrender.com/api',
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();
