// Action Creators
import * as type from "./Types";
import axios from "../../Utils/useAxios";
import toast from "react-hot-toast";

const GetUsersSuccess = (data) => {
  return {
    type: type.FETCH_USER_SUCCESS,
    payload: data,
  };
};

const loginSuccess = (data) => {
  return {
    type: type.LOGIN_SUCCESS,
    payload: data,
  };
};
const logout = () => {
  return {
    type: type.LOGOUT,
  };
};


const getUser = (token) => {
  return axios.get("/profile", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};



const LoginAction = (loginParams, navigate, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    await axios
      .post("/login", loginParams)
      .then(async (res) => {
        console.log(res.data);
        navigate("/dashboard");
        const { token } = res.data;
        dispatch(loginSuccess(token));

        await getUser(token)
          .then((res) => {
            console.log(res.data);
            dispatch(GetUsersSuccess(res.data));
          })
          .catch((err) => {
            console.log(err);
          });
       
        console.log(token);
        //console.log(admin);
        // navigate("/dashboard");
        setLoading(false);
        toast.success("Login successful");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        if (
          error.message === "Network Error" ||
          error.message === "timeout exceeded"
        ) {
          toast.error("Network Error");
        }
        const {error:err} = error.response.data
        if(err) {
          toast.error(err.message)
        }
        const { message } = error.response.data.error;
        if (message) {
          toast.error(message);
        }
        const { message: mm } = error.response.data.response;
        if (mm) {
          toast.error(mm);
        }
      });
  };
};

const registration = (registrationParams, navigate, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    await axios
      .post("/register", registrationParams, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);

        dispatch(GetUsersSuccess(res.data));
        dispatch(loginSuccess(res.data.token));
        toast.success("Registration Successful");
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (
          error.message === "Network Error" ||
          error.message === "timeout exceeded"
        ) {
          toast.error("Network Error");
        }
        console.log(error.response.data);
        const {error:err} = error.response.data
        if(err) {
          toast.error(Object.values(err))
        }
        const { message } = error.response.data.error;
        if (message) {
          toast.error(message);
        }
        const { message: mm } = error.response.data.response;
        if (mm) {
          toast.error(mm);
        }

        //console.log(error.response.data.error.message);
      });
  };
};

export {
  LoginAction,
  registration,
  loginSuccess,
  logout,
  
};
