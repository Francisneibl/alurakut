import { AlurakutMenu } from '../../lib/AlurakutCommons'
import FlowersPageStyle from './styles'

import Image from 'next/image'

const GitHubList = ({ users }) => {
  return (
    <>
      <AlurakutMenu />
      <FlowersPageStyle>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <a href={user.html_url} target="_blank" rel="noreferrer">
                <div className="container">
                  <div className="avatar">
                    <Image
                      className="image"
                      src={user.avatar_url}
                      alt="avatar_user"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div className="content">
                    <div className="name">
                      {user.name} <br />@{user.login}
                    </div>
                    <div className="bio">{user.bio}</div>
                    <div className="adress">{user.location}</div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </FlowersPageStyle>
    </>
  )
}

export default GitHubList
