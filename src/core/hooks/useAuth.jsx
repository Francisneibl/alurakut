import nookies from 'nookies'
const UserAuth = (context) => {
  const cookies = nookies.get(context)
  const user = cookies?.USER ? JSON.parse(cookies.USER) : false

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      gitHubUser: user.login,
    },
  }
}

export default UserAuth
