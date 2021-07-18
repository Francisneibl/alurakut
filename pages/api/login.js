export default async (req, res) => {
  const { code } = req.query;

  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
  if (req.method === "GET") {
    try {
      const response = await fetch(
        `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
        {
          method: "POST",
          headers: { accept: "application/json" },
        }
      );
      const { access_token } = await response.json();
      return res.status(200).json({ token: access_token });
    } catch {
      return res.status(501).json({ message: "Internal Error" });
    }
  }

  return res.status(400).json({ message: "Page not Found" });
};
