import GitHubList from 'components/List'
import { useState, useEffect } from 'react'
import { getFollowers } from 'hooks/useGitHub'
import UserAuth from 'hooks/useAuth'
const FlowersPage = ({ githubUser }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const userss = await getFollowers(githubUser)
      const result = userss.data.map((user) => {
        return fetch(`https://api.github.com/users/${user.name}`).then((res) =>
          res.json()
        )
      })
      Promise.all(result).then((res) => setUsers(res))
    }
    getUsers()
  }, [githubUser])
  return <GitHubList users={users} />
}

export async function getServerSideProps(context) {
  return await UserAuth(context)
}

export default FlowersPage
