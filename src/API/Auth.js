import baseAPI from "./index.js";

export const authUserSignin = (authData) =>
  baseAPI.post("/user/auth/signin", authData);
export const authUserSignup = (authData) =>
  baseAPI.post("/user/auth/signup", authData);
