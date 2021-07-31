import { SiteClient } from 'datocms-client'
import axios from 'axios'
export default async (request, response) => {
  const { TOKEN_DATO } = process.env
  const client = new SiteClient(TOKEN_DATO)

  const api = axios.create({
    baseURL: 'https://graphql.datocms.com/',
    headers: {
      Authorization: TOKEN_DATO,
      'Content-Type': 'application/json',
      Accept: '',
    },
  })

  switch (request.method) {
    case 'GET':
      const res = await api.post('', {
        query: '{allCommunities{ id, title, imageUrl htmlUrl}}',
      })

      return response.status(200).json(res.data.data.allCommunities)

    case 'POST':
      const createCommunitie = await client.items
        .create({
          itemType: '975759', //ID do model criado do datoCMS
          ...request.body,
        })
        .catch((error) => console.error(error.message))
      return response.status(200).json(createCommunitie)
    default:
      return response.status(400).json({ message: 'Page not Fount' })
  }
}
