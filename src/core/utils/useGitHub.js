import axios from "axios";

const api = axios.create({ baseURL: "https://api.github.com/users" });

export const getFollowers = (gitHubUser) => {
  return api.get(`${gitHubUser}/followers`).then((res) => res.data);
};

export const getFollowing = (gitHubUser) => {
  return api.get(`${gitHubUser}/following`).then((res) => res.data);
};
