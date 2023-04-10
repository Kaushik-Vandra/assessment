import { API_DASHBOARD } from "../constants";

export const getDashboard = () => ({
    type: "API",
    payload: {
      url: API_DASHBOARD,
      method: "POST",
      hideLoader: false,
    //   success: (data) => ({
    //     type: LOGIN_S,
    //     payload: data,
    //   }),
    //   error: (data) => ({
    //     type: LOGIN_F,
    //     payload: {},
    //   }),
    },
  });