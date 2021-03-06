const loginApi = async (req, res) => {
  const { code } = req.query

  const { NEXT_PUBLIC_GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

  if (req.method === 'GET') {
    try {
      const { access_token } = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${NEXT_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
        {
          method: 'POST',
          headers: { accept: 'application/json' },
        }
      ).then(async (response) => await response.json())

      const user = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `token ${access_token}`,
        },
      }).then(async (res) => await res.json())

      return res.status(200).json({ user, access_token })
    } catch {
      return res.status(501).json({ message: 'Internal Error' })
    }
  }

  return res.status(400).json({ message: 'Page not Found' })
}

export default loginApi
