import axios from "axios";

const fetch = ({ page, gender }) => {
  return axios.get(`https://randomuser.me/api/?page=${page}&gender=${gender}&results=5`);
};

export { fetch };
