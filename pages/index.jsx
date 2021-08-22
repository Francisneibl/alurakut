import nookies from 'nookies'
import MainGrid from 'components/MainGrid'
import { AlurakutMenu } from 'lib/AlurakutCommons'
import WelcomeArea from '../src/widgets/WelcomeArea'
import ProfileSideBar from 'components/ProfileSidebar'
import ProfileRelationsArea from 'src/widgets/profileRelationsArea'
import useAuth from 'hooks/useAuth'
import validateUser from 'utils/validateUser'

export default function Home(props) {
  const { user: gitHubUser } = useAuth()
  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitHubUser={gitHubUser} />
        </div>

        <WelcomeArea
          gitHubUser={gitHubUser}
          setCommunities={(data) =>
            setCommunities((prev) => ({
              data: [data, ...prev.data],
              isLoading: false,
            }))
          }
        />

        <ProfileRelationsArea />
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  return validateUser(context)
}
