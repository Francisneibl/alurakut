import styled from 'styled-components'

const Box = styled.div`
  background-color: transparent;
  border-radius: 6px;
  border: 2px solid #30363d;
  padding: 16px;

  /* CSS Pré-Pronto */
  margin-bottom: 10px;
  .boxLink {
    font-size: 14px;
    color: #2e7bb4;
    text-decoration: none;
    font-weight: 800;
  }
  .title {
    color: #ffffff;
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .smallTitle {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
  }
  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ecf2fa;
  }
  input,
  textarea {
    width: 100%;
    background-color: #0104096e;
    color: #c9d1d9;
    border: 2px solid #30363d;
    padding: 14px 16px;
    margin-bottom: 14px;
    border-radius: 6px;
    ::placeholder {
      color: #c9d1d9;
      opacity: 1;
    }
  }
  button {
    border: 0;
    padding: 8px 12px;
    color: #ffffff;
    border-radius: 6px;
    background-color: #2ea043;
  }

  .button-group {
    display: flex;
    justify-content: flex-end;
  }
`

export default Box
