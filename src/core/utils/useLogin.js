import nookies from "nookies";
import { useRouter } from "next/router";

export const useLogin = () => {
  const router = useRouter();
  const logIn = (token) => {
    nookies.set(null, "USER_TOKEN", token, {
      path: "/",
      maxAge: 86400 * 7,
    });

    router.push("/");
  };

  const logOut = () => {
    nookies.destroy(null, "USER_TOKEN");
    router.push("/login");
  };

  return {
    logIn,
    logOut,
  };
};
