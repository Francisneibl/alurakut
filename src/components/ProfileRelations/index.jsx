/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { ProfileRelationsBoxWrapper } from './style'
import Skeleton from '../Skeleton'

function ProfileRelationsBox({ data, title, path }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title}({data.data.length})
      </h2>
      <ul>
        {data.isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <li key={index}>
                <Skeleton height="102px" border="8px" />
              </li>
            ))
          : data.data.map((current, index) => {
              if (index < 6) {
                return (
                  <li key={index}>
                    <a href={current.html_url} target="_blank" rel="noreferrer">
                      <img
                        src={current.image_url}
                        alt="avatar-user"
                        layout="fill"
                      />
                      <span>{current.name || current.title}</span>
                    </a>
                  </li>
                )
              }
            })}
      </ul>
      <Link href={path} getServerSideProps={() => ({ test: 'test' })} passHref>
        <h2 className="bottomOption">Ver Todos</h2>
      </Link>
    </ProfileRelationsBoxWrapper>
  )
}

export default ProfileRelationsBox
