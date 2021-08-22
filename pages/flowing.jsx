import { useState, useEffect } from 'react'
import GitHubList from 'components/List'
import { AlurakutMenu } from 'lib/AlurakutCommons'
import { useMainData } from 'providers/dataMain'
import validateUser from 'utils/validateUser'

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
  return validateUser(context)
}
export default FlowingPage
