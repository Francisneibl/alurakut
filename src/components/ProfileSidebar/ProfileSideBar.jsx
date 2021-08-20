import { AlurakutProfileSidebarMenuDefault } from 'lib/AlurakutCommons'
import Image from 'next/image'
import Box from 'components/Box'

export const ProfileSideBar = (props) => {
  return (
    <Box as="aside">
      <Image
        src={`https://github.com/${props.gitHubUser}.png`}
        alt="avatar user"
        className="images"
        layout="responsive"
        width={200}
        height={200}
      />

      <hr />
      <p>
        <a
          className="boxLink"
          href={`https://github.com/${props.gitHubUser}`}
          target="_blank"
          rel="noreferrer">
          @{props.gitHubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}
