import { useState } from 'react'
//Import de Componentes
import Input from '../../components/Input'
import Form from '../../components/Form'
import Box from '../../components/Box'
import { CircularProgress } from '@material-ui/core'

import { OrkutNostalgicIconSet } from '../../lib/AlurakutCommons'
import { useForm } from 'react-hook-form'
import { addCommunities } from '../../core/hooks/useCommunities'
const WelcomeArea = ({ gitHubUser, setCommunities }) => {
  const { register, handleSubmit, reset } = useForm()
  const [sending, setSending] = useState(false)

  function onSubmit(data) {
    const communitie = { ...data, create_by: gitHubUser }
    console.log(communitie)
    setSending(true)
    addCommunities(communitie).then((_) => {
      setCommunities(communitie)
      setSending(false)
      reset()
    })
  }

  return (
    <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
      <Box>
        <h1 className="title">Bem vindo(a) {gitHubUser}</h1>
        <OrkutNostalgicIconSet />
      </Box>
      <Box>
        <Form handleSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            label="title"
            placeholder="Título da Comunidade"
            autoComplete="off"
            required
          />
          <Input
            register={register}
            label="html_url"
            placeholder="Link da Comunidade"
            autoComplete="off"
            required
          />
          <Input
            register={register}
            label="image_url"
            placeholder="Link para image de capa"
            autoComplete="off"
            required
          />
          <div className="button-group">
            {sending ? (
              <CircularProgress />
            ) : (
              <button type="submit">Enviar</button>
            )}
          </div>
        </Form>
      </Box>
    </div>
  )
}

export default WelcomeArea
