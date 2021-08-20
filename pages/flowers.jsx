import GitHubList from 'components/List'
import { AlurakutMenu } from 'lib/AlurakutCommons'
import { useState, useEffect } from 'react'
import { useMainData } from 'providers/dataMain'
import UserAuth from 'hooks/useAuth'
const FlowersPage = ({ gitHubUser }) => {
  const [users, setUsers] = useState([])
  const { followers } = useMainData()
  useEffect(() => {
    const getUsers = async () => {
      if (followers.data.length) {
        const result = followers.data.map((user) => {
          return fetch(`https://api.github.com/users/${user.name}`).then(
            (res) => res.json()
          )
        })
        Promise.all(result).then((res) => setUsers(res))
      }
    }
    getUsers()
  }, [followers])
  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <GitHubList users={users} />
    </>
  )
}

export async function getServerSideProps(context) {
  return await UserAuth(context)
}

export default FlowersPage
