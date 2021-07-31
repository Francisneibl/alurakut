import { useEffect } from 'react'
import { useState, UseEffect } from 'react'
import { getFollowing } from '../src/core/hooks/useGitHub'
import GitHubList from '../src/components/GitHubList'

const FlowingPage = (props) => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const userResult = await getFollowing(props.githubUser)
    const result = userResult.data.map((user) => {
      return fetch(`https://api.github.com/users/${user.name}`).then((res) =>
        res.json()
      )
    })

    Promise.all(result).then((res) => setUsers(res))
  }, [])
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
