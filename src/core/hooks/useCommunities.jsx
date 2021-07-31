import axios from 'axios'

const api = axios.create({ baseURL: '/api/communities' })

const formatData = (data) => {
  return {
    data: data.map((communitie) => ({
      id: communitie.id,
      name: communitie.title,
      html_url: communitie.htmlUrl,
      image_url: communitie.imageUrl,
    })),
    isLoading: false,
  }
}

export const getCommunities = () =>
  api.get().then((res) => formatData(res.data))

export const addCommunities = (data) =>
  api.post('', data).then((res) => res.data)
