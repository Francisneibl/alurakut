import axios from "axios";

const api = axios.create({ baseURL: "/api/communities" });

export const getCommunities = () => api.get().then((res) => res.data);

export const addCommunities = (data) =>
  api.post("", data).then((res) => res.data);
