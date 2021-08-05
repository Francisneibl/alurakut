import { useEffect } from 'react'
import { useState, UseEffect } from 'react'
import { getFollowing } from '../src/core/hooks/useGitHub'
import GitHubList from '../src/components/GitHubList'

const FlowingPage = ({ githubUser }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      const userResult = await getFollowing(githubUser)
      const result = userResult.data.map((user) => {
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
export default FlowingPage
