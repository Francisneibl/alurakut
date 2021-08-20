import { useRouter } from 'next/router'
import nookies from 'nookies'
export const useLogin = () => {
  const router = useRouter()
  const logIn = (user, token) => {
    nookies.set(null, 'USER', JSON.stringify(user), {
      path: '/',
      maxAge: 86400 * 1,
    })
    nookies.set(null, 'TOKEN', token, {
      path: '/',
      maxAge: 86400 * 1,
    })
    router.push('/')
  }

  const logOut = () => {
    nookies.destroy(null, 'USER')
    router.push('/login')
  }

  return {
    logIn,
    logOut,
  }
}
