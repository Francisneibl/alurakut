import Form from 'components/Form'
import Input from 'components/Input/BaseInput'
import { useForm } from 'react-hook-form'
import { CircularProgress } from '@material-ui/core'
import { addCommunities } from 'hooks/useCommunities'
import { useState } from 'react'
import { useMainData } from 'providers/dataMain'

const FormCommunitie = ({ gitHubUser }) => {
  const { register, handleSubmit, reset } = useForm()
  const [sending, setSending] = useState(false)
  const { setCommunities } = useMainData()
  function createCommunitie(data) {
    const communitie = { ...data, create_by: gitHubUser }
    setSending(true)
    addCommunities(communitie).then((_) => {
      //setCommunities(communitie)
      setSending(false)
      reset()
    })
    reset()
  }
  return (
    <Form handleSubmit={handleSubmit(createCommunitie)}>
      <Input
        register={register('title', { required: true })}
        placeholder="Título da Comunidade"
        autoComplete="off"
      />
      <Input
        register={register('html_url', { required: true })}
        placeholder="Link da Comunidade"
        autoComplete="off"
      />
      <Input
        register={register('image_url', { required: true })}
        placeholder="Link para image de capa"
        autoComplete="off"
      />
      <div className="button-group">
        {sending ? <CircularProgress /> : <button type="submit">Enviar</button>}
      </div>
    </Form>
  )
}

export default FormCommunitie
