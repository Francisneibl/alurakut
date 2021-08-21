import UserAuth from 'hooks/useAuth'
import MainGrid from 'components/MainGrid'
import { AlurakutMenu } from '../src/lib/AlurakutCommons'
import WelcomeArea from '../src/widgets/WelcomeArea'
import ProfileSideBar from 'components/ProfileSidebar'
import ProfileRelationsArea from 'src/widgets/profileRelationsArea'

export default function Home(props) {
  const gitHubUser = props.gitHubUser

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
  return UserAuth(context)
}
