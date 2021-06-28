import axios from "axios";

export default axios.create({
  baseURL: `https://limitless-dusk-57570.herokuapp.com/`,
  // timeout: 1000,
  //   headers: { application: "application/json" },
  //   params: { api_token: "abcd" },
});
