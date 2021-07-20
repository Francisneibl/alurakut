import { ProfileRelationsBoxWrapper } from "./style";

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
                  <img src={current.image_url} />
                  <span>{current.name}</span>
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

export default ProfileRelationsBox;
