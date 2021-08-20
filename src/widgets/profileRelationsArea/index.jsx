import ProfileRelationsBox from 'components/ProfileRelations'
import { useMainData } from 'providers/dataMain'
const ProfileRelationsArea = () => {
  const { communities, followers, following } = useMainData()
  return (
    <div
      className="profileRelationsArea"
      styel={{ gridArea: 'profileRelationsArea' }}>
      <ProfileRelationsBox
        title="Comunidades"
        data={communities}
        path="/communities"
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
