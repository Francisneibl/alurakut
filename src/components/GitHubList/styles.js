import styled from 'styled-components'

const FlowersPageStyle = styled.div`
  padding: 30px;
  a {
    text-decoration: none;
  }
  .container {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding: 5px;
    cursor: pointer;
    border: 2px solid #30363d;
    border-radius: 6px;
    max-width: 700px;
    position: relative;
  }

  .content {
    color: #fff;
    padding-left: 30px;
    max-width: 70%;

    .name {
      color: #c9d1d9;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 5px;
    }

    .adress,
    .bio {
      color: #8b949e;
      font-size: 12px;
    }
  }

  .avatar {
    position: relative;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background-color: #fff;
    background-color: transparent;
  }

  .image {
    border-radius: 8px;
  }

  .view {
    right: 10px;
    position: absolute;
  }
`
export default FlowersPageStyle
