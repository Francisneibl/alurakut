import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/lib/AlurakutCommons'

const GlobalStyle = createGlobalStyle`
  /*Reset CSS*/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #040D21;
    //background-image: url('/images/hero-glow.svg');
    //background-repeat: no-repeat;
    //background-size: 200%;
    //background-position: center center ;
    //background-attachment: fixed;
  }

  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img{
    max-width: 100%;
    height: auto;
    display: block;
  }

  .btn-primary {
    border: 0;
    padding: 8px 12px;
    color: #ffffff;
    border-radius: 6px;
    background-color: #2ea043;
  }

  ul {
    list-style-type: none;
  }

  a {
    text-decoration: none;
  }

  .images{
    border-radius: 8px;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
