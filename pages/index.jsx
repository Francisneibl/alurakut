import { useState, useEffect } from 'react'
import Image from 'next/image'
import { getFollowers, getFollowing } from '../src/core/hooks/useGitHub'
import { getCommunities } from '../src/core/hooks/useCommunities'
import UserAuth from 'hooks/useAuth'
import MainGrid from 'components/MainGrid'
import Box from 'components/Box'
import ProfileRelationsArea from '../src/widgets/profileRelationsArea'
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
} from '../src/lib/AlurakutCommons'
import WelcomeArea from '../src/widgets/WelcomeArea'

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <Image
        src={`https://github.com/${props.gitHubUser}.png`}
        alt="avatar user"
        className="images"
        layout="responsive"
        width={200}
        height={200}
      />

      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${props.gitHubUser}`}
          target="_blank"
          rel="noreferrer">
          @{props.gitHubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home(props) {
  const [communities, setCommunities] = useState({ data: [], isLoading: true })
  const [followers, setFollowers] = useState({ data: [], isLoading: true })
  const [following, setFollowing] = useState({ data: [], isLoading: true })
  const gitHubUser = props.githubUser

  useEffect(() => {
    getFollowers(gitHubUser).then((data) => setFollowers(data))

    getFollowing(gitHubUser).then((data) => setFollowing(data))

    getCommunities().then((data) => setCommunities(data))
  }, [gitHubUser])

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

        <ProfileRelationsArea
          communities={communities}
          followers={followers}
          following={following}
        />
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  return await UserAuth(context)
}
