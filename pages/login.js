import React from "react";
// Hook do NextJS
import { useRouter } from "next/router";
import Link from "next/link";
import { CircularProgress } from "@material-ui/core";
import { useLogin } from "../src/core/utils/useLogin";

export default function LoginScreen() {
  const { logIn } = useLogin();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const { code } = router.query;

  React.useEffect(() => {
    if (code) {
      setLoading(true);
      fetch(`/api/login?code=${code}`)
        .then((res) => res.json())
        .then(({ token }) => {
          logIn(token);
        });
    }
  }, [code]);
  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

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
                  href="https://github.com/login/oauth/authorize?client_id=fc8d19e7f3dee3a7e2ce"
                  passHref
                >
                  <button type="submit">Login</button>
                </Link>
              </>
            )}
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
