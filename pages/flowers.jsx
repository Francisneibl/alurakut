import GitHubList from '../src/components/GitHubList'
import { useState, useEffect } from 'react'
import { getFollowers } from '../src/core/hooks/useGitHub'
const FlowersPage = (props) => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    return await getFollowers(props.githubUser)
  }

  useEffect(async () => {
    const userss = await getUsers()
    const result = userss.data.map((user) => {
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

export default FlowersPage
