import styled from 'styled-components'

const Skeleton = styled.div`
  background: #a0aec0;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.border};

  animation: load 2.5s infinite;

  @keyframes load {
    50% {
      background: #a0aec02f;
    }
    100% {
      background: #a0aec0;
    }
  }
`

export default Skeleton
