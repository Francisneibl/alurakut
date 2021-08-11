import Box from '../../components/Box'

import { OrkutNostalgicIconSet } from '../../lib/AlurakutCommons'
import FormCommunitie from './FormCommunitie'
import FormMessage from './FormMessages'

const WelcomeArea = ({ gitHubUser, setCommunities }) => {
  return (
    <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
      <Box>
        <h1 className="title">Bem vindo(a) {gitHubUser}</h1>
        <OrkutNostalgicIconSet />
      </Box>
      <Box>
        <h1 className="title">Criar Comunidade</h1>
        <FormCommunitie gitHubUser={gitHubUser} />
      </Box>

      <Box>
        <h1 className="title">Enviar Mensagem</h1>
        <FormMessage gitHubUser={gitHubUser} />
      </Box>
    </div>
  )
}

export default WelcomeArea
