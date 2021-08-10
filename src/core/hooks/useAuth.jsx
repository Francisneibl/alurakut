import nookies from 'nookies'

const UserAuth = async (context) => {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN
  const { login } = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then(async (res) => await res.json())

  if (!login) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {
      githubUser: login,
    },
  }
}

export default UserAuth
