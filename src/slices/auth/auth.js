import { createSlice } from "@reduxjs/toolkit";
import * as API from "../../API/Auth.js";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import * as usertAPI from "../../API/userAPI";

const initialState = {
  loading: false,
  hasError: false,
  data: [],
  stripAPIKey: "",
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    authUser: (state) => {
      state.loading = true;
    },
    authUserSuccess: (state, { payload }) => {
      console.log(" Authentication succesfully. ", payload);
      localStorage.setItem("profile", JSON.stringify({ ...payload }));
      state.loading = false;
      state.hasError = false;
      state.data = payload;
    },
    authUserFailure: (state, { payload }) => {
      console.log(" Authentication failure. ", payload);
      state.loading = false;
      state.hasError = true;
      toast.error(payload, {
        position: "bottom-center",
      });
    },
    logout: (state) => {
      state.data = [];
      state.loading = false;
      state.hasError = false;
      localStorage.removeItem("profile");
      Cookies.remove("token");
    },
    setStripAPIKeyFun: (state, { payload }) => {
      state.stripAPIKey = payload;
    },
  },
});

export const authUserSignin = (data, navigate) => {
  return async (dispatch) => {
    dispatch(authUser());

    var response = null;
    try {
      response = await API.authUserSignin(data);
      console.log("response from try: ", response);

      if (response.status !== 200) {
        throw Error(response?.data?.message);
      }

      if (!response.data.token) {
        throw Error;
      }
      dispatch(authUserSuccess(response.data));
      const stripeKey = await usertAPI.getStripAPIKey();
      console.log(
        "Stripe key : printng in the client, data got from the backedn API",
        stripeKey,
      );
      dispatch(setStripAPIKeyFun(stripeKey.data.stripeApiKey));
      navigate("/");
    } catch (error) {
      dispatch(authUserFailure(error?.response?.data?.message));
    }
  };
};

export const authUserSignup = (data, navigate) => {
  return async (dispatch) => {
    dispatch(authUser());

    try {
      const response = await API.authUserSignup(data);
      console.log("response from try : ", response);

      if (response.status !== 200) {
        throw Error(response?.data?.message);
      }

      if (!response.data.token) {
        throw Error;
      }
      dispatch(authUserSuccess(response.data));
      const stripeKey = await usertAPI.getStripAPIKey();
      dispatch(setStripAPIKeyFun(stripeKey.data.stripeApiKey));
      navigate("/");
    } catch (error) {
      dispatch(authUserFailure(error?.response?.data?.message));
    }
  };
};

export const authLogout = () => {
  return async (dispatch) => {
    dispatch(authUser());

    try {
      dispatch(logout());
    } catch (error) {
      dispatch(authUserFailure());
    }
  };
};

export const {
  authUser,
  authUserSuccess,
  authUserFailure,
  logout,
  setStripAPIKeyFun,
} = AuthSlice.actions;

export const authUserSelector = (state) => state.authUser;

export default AuthSlice.reducer;
