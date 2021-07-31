import { useState, useEffect } from 'react'
import nookies from 'nookies'
import { getFollowers, getFollowing } from '../src/core/hooks/useGitHub'
import { getCommunities } from '../src/core/hooks/useCommunities'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import ProfileRelationsArea from '../src/widgets/profileRelationsArea'
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
} from '../src/lib/AlurakutCommons'
import WelcomeArea from '../src/widgets/WelcomeArea'

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.gitHubUser}.png`}
        style={{ borderRadius: '8px' }}
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
  }, [])

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
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { login } = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then(async (res) => await res.json())

  if (!login) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      githubUser: login,
    },
  }
}
