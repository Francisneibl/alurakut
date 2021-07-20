import axios from "axios";

const api = axios.create({ baseURL: "https://api.github.com/users" });

const formatData = (data) => {
  return data.map((user) => ({
    name: user.login,
    image_url: user.avatar_url,
    html_url: user.html_url,
  }));
};

export const getFollowers = (gitHubUser) => {
  return api.get(`${gitHubUser}/followers`).then((res) => formatData(res.data));
};

export const getFollowing = (gitHubUser) => {
  return api.get(`${gitHubUser}/following`).then((res) => formatData(res.data));
};
