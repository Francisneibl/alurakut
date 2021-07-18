import { SiteClient } from "datocms-client";

export default async (request, response) => {
  const { TOKEN_DATO } = process.env;
  const client = new SiteClient(TOKEN_DATO);
  switch (request.method) {
    case "POST":
      const createCommunitie = await client.items
        .create({
          itemType: "975759", //ID do model criado do datoCMS
          ...request.body,
        })
        .catch((error) => console.error(error.message));
      response.status(200).json(createCommunitie);
      break;

    case "GET":
      fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          Authorization: "1d2f217f4607eea8b36b3edd76ff47",
          "Content-Type": "application/json",
          Accept: "",
        },
        body: JSON.stringify({
          query: `{
          allCommunities {
            id
            imageUrl
            title
            url
            creatBy
          }
        }
        `,
        }),
      })
        .then((res) => res.json())
        .then((records) => response.json(records.data.allCommunities))
        .catch((error) => console.error(error.message));
      break;

    default:
      response.json({
        message: "PAGE NOT FOUND",
      });
      break;
  }
};
