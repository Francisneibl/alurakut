import { useState, useEffect } from 'react'
import UserAuth from 'hooks/useAuth'
import GitHubList from 'components/List'
import { AlurakutMenu } from 'lib/AlurakutCommons'
import { useMainData } from 'providers/dataMain'

const FlowingPage = ({ gitHubUser }) => {
  const [users, setUsers] = useState([])
  const { following } = useMainData()
  useEffect(() => {
    const getUsers = async () => {
      if (following.data.length) {
        const result = following.data.map((user) => {
          return fetch(`https://api.github.com/users/${user.name}`).then(
            (res) => res.json()
          )
        })

        Promise.all(result).then((res) => setUsers(res))
      }
    }
    getUsers()
  }, [following])

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
export default FlowingPage
