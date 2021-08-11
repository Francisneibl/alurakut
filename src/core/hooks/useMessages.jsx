import axios from 'axios'

const api = axios.create({ baseURL: 'api/messages' })

const formData = (data) => {
  return {
    data: data.map((message) => ({
      id: message.id,
      message_text: message.messageText,
      sendBy: message.sendBy,
    })),
    isLoading: false,
  }
}

export const getMessages = () => api.get().then((res) => formData(res.data))

export const sendMessage = (data) => api.post('', data).then((res) => res.data)
