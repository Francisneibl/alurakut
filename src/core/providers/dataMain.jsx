import React, { useState, useEffect } from 'react'
import { getFollowers, getFollowing } from 'hooks/useGitHub'
import { getCommunities } from 'hooks/useCommunities'
import useAuth from 'hooks/useAuth'
const MainDataContext = React.createContext({})

export const MainDataProvider = (props) => {
  const [communities, setCommunities] = useState({ data: [], isLoading: true })
  const [followers, setFollowers] = useState({ data: [], isLoading: true })
  const [following, setFollowing] = useState({ data: [], isLoading: true })

  const { user, isAuthenticated } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      getFollowers(user).then((data) => {
        if (data.status === 200) {
          setFollowers(data)
        }
      })

      getFollowing(user).then((data) => {
        if (data.status === 200) {
          setFollowing(data)
        }
      })

      getCommunities().then((data) => setCommunities(data))
    }
  }, [user, isAuthenticated])
  return (
    <MainDataContext.Provider
      value={{ communities, followers, following, setCommunities }}>
      {props.children}
    </MainDataContext.Provider>
  )
}

export const useMainData = () => React.useContext(MainDataContext)
