import GitHubList from '../src/components/GitHubList'
import { useState, useEffect } from 'react'
import { getFollowers } from '../src/core/hooks/useGitHub'
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
  return {
    props: {
      githubUser: 'Francisneibl',
    },
  }
}

export default FlowersPage
