import ProfileRelationsBox from "../../components/ProfileRelations";

const ProfileRelationsArea = ({ communities, followers, following }) => {
  return (
    <div
      className="profileRelationsArea"
      styel={{ gridArea: "profileRelationsArea" }}
    >
      <ProfileRelationsBox title="Comunidades" data={communities} />
      <ProfileRelationsBox title="Seguindo" data={following} />
      <ProfileRelationsBox title="Seguidores" data={followers} />
    </div>
  );
};

export default ProfileRelationsArea;
