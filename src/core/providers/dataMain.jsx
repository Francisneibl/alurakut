import React, { useState, useEffect } from 'react'
import { getFollowers, getFollowing } from 'hooks/useGitHub'
import { getCommunities } from 'hooks/useCommunities'

const MainDataContext = React.createContext({})
import { parseCookies } from 'nookies'

export const MainDataProvider = (props) => {
  const { USER } = parseCookies()

  const { login: GitHubUser } = JSON.parse(USER || '{}')
  const [communities, setCommunities] = useState({ data: [], isLoading: true })
  const [followers, setFollowers] = useState({ data: [], isLoading: true })
  const [following, setFollowing] = useState({ data: [], isLoading: true })

  useEffect(() => {
    if (GitHubUser) {
      getFollowers(GitHubUser).then((data) => {
        if (data.status === 200) {
          setFollowers(data)
        }
      })

      getFollowing(GitHubUser).then((data) => {
        if (data.status === 200) {
          setFollowing(data)
        }
      })

      getCommunities().then((data) => setCommunities(data))
    }
  }, [GitHubUser])
  return (
    <MainDataContext.Provider
      value={{ communities, followers, following, setCommunities, GitHubUser }}>
      {props.children}
    </MainDataContext.Provider>
  )
}

export const useMainData = () => React.useContext(MainDataContext)
