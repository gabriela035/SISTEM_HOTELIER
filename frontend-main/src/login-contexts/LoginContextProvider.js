import { useLogin } from "../hooks/useLogin";
import { LoginContext } from "./LoginContext";
export function LoginContextProvider({ children }) {
  const logged = useLogin();
  return (
    <LoginContext.Provider value={logged}>{children}</LoginContext.Provider>
  );
}
