import styled from 'styled-components'
import Box from 'components/Box'
import { getCommunities } from 'hooks/useCommunities'
import { useState } from 'react'
import { useEffect } from 'react'
import { AlurakutMenu } from 'src/lib/AlurakutCommons'

const CommunitiesPage = () => {
  const [communities, setCommunities] = useState({ data: [], isLoading: true })
  useEffect(() => {
    getCommunities().then((data) => setCommunities(data))
  }, [])
  return (
    <>
      <AlurakutMenu />
      <CommunitiesPage.Style>
        <ul>
          {communities.data.map((item, index) => (
            <a
              key={index}
              href={item.html_url}
              target="_blank"
              rel="noreferrer">
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                }}>
                <div className="Avatar">
                  <img src={item.image_url} alt="avatar image"></img>
                </div>
                <div className="Title">{item.name}</div>
              </Box>
            </a>
          ))}
        </ul>
      </CommunitiesPage.Style>
    </>
  )
}

CommunitiesPage.Style = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  padding-top: 30px;
  ul {
    cursor: pointer;
  }
  .Title {
    color: #c9d1d9;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 5px;
  }
  .Avatar {
    width: 80px;
    border-radius: 50%;
    background: white;
    margin-right: 10px;

    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
    }
  }
`

export default CommunitiesPage
