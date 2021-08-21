import axios from 'axios'
import { parseCookies } from 'nookies'
const { TOKEN } = parseCookies()
const api = axios.create({
  baseURL: 'https://api.github.com/users',
  headers: {
    Authorization: 'token ' + TOKEN,
  },
})

const formatData = (users) => {
  return {
    data: users.map((user) => ({
      name: user.login,
      image_url: user.avatar_url,
      html_url: user.html_url,
    })),
    isLoading: false,
    status: 200,
  }
}

export const getFollowers = (gitHubUser) => {
  return api
    .get(`${gitHubUser}/followers`)
    .then((res) => formatData(res.data))
    .catch((error) => {
      return error.response
    })
}

export const getFollowing = (gitHubUser) => {
  return api
    .get(`${gitHubUser}/following`)
    .then((res) => formatData(res.data))
    .catch((error) => error.response)
}
