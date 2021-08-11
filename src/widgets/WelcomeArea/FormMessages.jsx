import Form from 'components/Form'
import TextArea from 'components/Input/BaseTextArea'
import { useForm } from 'react-hook-form'
import { CircularProgress } from '@material-ui/core'
import { useState } from 'react'
import { sendMessage } from 'hooks/useMessages'

const FormMessage = ({ gitHubUser }) => {
  const { register, handleSubmit, reset } = useForm()
  const [sending, setSending] = useState(false)

  function createCommunitie(data) {
    const message = { ...data, sendBy: gitHubUser }
    console.log(message)
    setSending(true)
    sendMessage(message).then((_) => {
      setSending(false)
      reset()
    })
  }
  return (
    <Form handleSubmit={handleSubmit(createCommunitie)}>
      <TextArea
        register={register('messageText', { required: true })}
        placeholder="Mensagem"
        autoComplete="off"
      />
      <div className="button-group">
        {sending ? <CircularProgress /> : <button type="submit">Enviar</button>}
      </div>
    </Form>
  )
}

export default FormMessage
