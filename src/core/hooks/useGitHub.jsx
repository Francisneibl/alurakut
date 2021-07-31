import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.github.com/users' })

const formatData = (users) => {
  return {
    data: users.map((user) => ({
      name: user.login,
      image_url: user.avatar_url,
      html_url: user.html_url,
    })),
    isLoading: false,
  }
}

export const getFollowers = (gitHubUser) => {
  return api.get(`${gitHubUser}/followers`).then((res) => formatData(res.data))
}

export const getFollowing = (gitHubUser) => {
  return api.get(`${gitHubUser}/following`).then((res) => formatData(res.data))
}
