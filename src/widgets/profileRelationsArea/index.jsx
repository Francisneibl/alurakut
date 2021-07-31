import ProfileRelationsBox from '../../components/ProfileRelations'

const ProfileRelationsArea = ({ communities, followers, following }) => {
  return (
    <div
      className="profileRelationsArea"
      styel={{ gridArea: 'profileRelationsArea' }}>
      <ProfileRelationsBox
        title="Comunidades"
        data={communities}
        path="/comunities"
      />
      <ProfileRelationsBox title="Seguindo" data={following} path="/flowing" />
      <ProfileRelationsBox
        title="Seguidores"
        data={followers}
        path="/flowers"
      />
    </div>
  )
}

export default ProfileRelationsArea
