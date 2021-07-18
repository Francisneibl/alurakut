import { useState, useEffect } from "react";
import nookies from "nookies";
import { getFollowers, getFollowing } from "../src/core/utils/useGitHub";
import {
  getCommunities,
  addCommunities,
} from "../src/core/utils/useCommunities";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${props.gitHubUser}.png`}
        style={{ borderRadius: "8px" }}
      />

      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${props.gitHubUser}`}
          target="_blank"
        >
          @{props.gitHubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title}({props.data.length})
      </h2>
      <ul>
        {props.data.map((current, index) => {
          if (index < 6) {
            return (
              <li key={index}>
                <a href={current.html_url} target="_blank">
                  <img src={current.avatar_url} />
                  <span>{current.login}</span>
                </a>
              </li>
            );
          }
          return false;
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const [communities, setCommunities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const gitHubUser = props.githubUser;

  useEffect(() => {
    getFollowers(gitHubUser).then((data) => setFollowers(data));
    getFollowing(gitHubUser).then((data) => setFollowing(data));
    getCommunities().then((data) => setCommunities(data));
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={gitHubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar gitHubUser={gitHubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a) {gitHubUser}</h1>

            <OrkutNostalgicIconSet confiavel={3} sexy={2} legal={2} />
          </Box>
          <Box>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const communitie = {
                  title: formData.get("title"),
                  url: formData.get("link"),
                  image_url: formData.get("image"),
                  creat_by: gitHubUser,
                };

                addCommunities(communitie).then((res) => {
                  alert(`Comunidade Cadastratdo com sucesso `);
                  setCommunities((prev) => [...prev, res]);
                  e.target.reset();
                });
              }}
            >
              <div>
                <input
                  placeholder="Digite um titulo para a comunidade"
                  aria-label="Digite um titulo para a comunidade"
                  name="title"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  placeholder="Link da comunidade"
                  aria-label="Link da comunidade"
                  name="link"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div>
                <input
                  placeholder="Link para a imagem"
                  aria-label="Link para a imagem "
                  name="image"
                  type="text"
                  autoComplete="off"
                />
              </div>
              <div className="button-group">
                <button type="submit">Cadastrar</button>
              </div>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades({communities.length})</h2>

            <ul>
              {communities.map((currentItem, index) => {
                if (index < 6) {
                  return (
                    <li key={currentItem.id}>
                      <a href={currentItem.url} target="_blank">
                        <img src={currentItem.imageUrl} />
                        <span>{currentItem.title}</span>
                      </a>
                    </li>
                  );
                }
                return false;
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Seguindo" data={following} />
          <ProfileRelationsBox title="Seguidores" data={followers} />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { login } = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${token}`,
    },
  }).then(async (res) => await res.json());

  if (!login) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      githubUser: login,
    },
  };
}
