import nookies from 'nookies'

const validateUser = (context) => {
  const { 'alurakut.token': token } = nookies.get(context)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
export default validateUser
