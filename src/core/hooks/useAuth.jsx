import { authContext } from 'providers/authProvider'

import { useContext } from 'react'

const useAuth = () => {
  return useContext(authContext)
}

export default useAuth
