import React from 'react'
// Hook do NextJS
import { useRouter } from 'next/router'
import Link from 'next/link'
import { CircularProgress } from '@material-ui/core'
import useAuth from 'hooks/useAuth'
import Image from 'next/image'

export default function LoginScreen() {
  const { logIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const { code } = router.query
  const GIT_HUB_USER_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
  React.useEffect(() => {
    if (code) {
      setLoading(true)

      fetch(`/api/login?code=${code}`)
        .then((response) => response.json())
        .then(({ user, access_token }) => {
          if (user?.id && access_token) {
            logIn(user, access_token)
          }
        })
    }
  }, [code, logIn])
  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <div className="loginScreen">
        <section className="logoArea" width="300px">
          <Image
            src="/images/logo.svg"
            alt="logo github"
            width={6000}
            height={800}
          />
          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form className="box">
            {loading ? (
              <CircularProgress />
            ) : (
              <>
                <p>
                  Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                </p>
                <Link
                  href={`https://github.com/login/oauth/authorize?client_id=${GIT_HUB_USER_ID}`}
                  passHref>
                  <button type="submit">Login</button>
                </Link>
              </>
            )}
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <Link href="/login" passHref>
                <strong>ENTRAR JÁ</strong>
              </Link>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <Link href="/">Sobre o Orkut.br</Link> -{' '}
            <Link href="/">Centro de segurança</Link> -{' '}
            <Link href="/">Privacidade</Link> - <Link href="/">Termos</Link> -{' '}
            <Link href="/">Contato</Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
