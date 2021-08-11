import axios from 'axios'
import { SiteClient } from 'datocms-client'

const messageApi = async (request, response) => {
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
        query: `{
            allMessages{
              id,
              messageText,
              sendBy
            }
          }`,
      })
      return response.status(200).json(res.data.data.allMessages)

    case 'POST':
      const sendMessage = await client.items.create({
        itemType: '1064709',
        ...request.body,
      })
      return response.status(200).json(sendMessage)
    default:
      return response.status(400).json({ message: 'Page not found' })
  }
}

export default messageApi
