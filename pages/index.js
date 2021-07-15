import { useState, useEffect } from "react";

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

export default function Home() {
  const [communities, setCommunities] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const gitHubUser = "Francisneibl";
  const favoritePeople = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "felipefialho",
    "peleteiro",
  ];

  useEffect(() => {
    fetch(`https://api.github.com/users/${gitHubUser}/followers`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFollowers(data);
      })
      .catch((error) => console.error(error.message));

    /*fetch(`https://api.github.com/users/${gitHubUser}/following`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setFollowing(data))
      .catch((error) => console.error(error.message));*/
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
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet confiavel={3} sexy={2} legal={2} />
          </Box>
          <Box>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                const comunidade = {
                  id: new Date().toISOString(),
                  title: formData.get("name"),
                  link: formData.get("link"),
                  image: formData.get("image"),
                };
                console.log(comunidade);
                setCommunities([...communities, comunidade]);
                e.target.reset();
                formData.set("image", "test");
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
                />
              </div>
              <div>
                <input
                  placeholder="Link para a imagem"
                  aria-label="Link para a imagem "
                  name="image"
                  type="text"
                />
              </div>
              <button type="submit">Cadastrar</button>
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
                      <a href="#">
                        <img src={currentItem.image} />
                        <span>{currentItem.title}</span>
                      </a>
                    </li>
                  );
                }
                return false;
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguindo({following.length})</h2>
            <ul>
              {favoritePeople.map((current, index) => {
                if (index < 6) {
                  return (
                    <li key={index}>
                      <a href={current.html_ur}>
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Seguidores ({followers.length})</h2>

            <ul>
              {followers.map((current, index) => (
                <li key={index}>
                  <a href={current.html_url} target="_blank">
                    <img src={current.avatar_url} />
                    <span>{current.login}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
