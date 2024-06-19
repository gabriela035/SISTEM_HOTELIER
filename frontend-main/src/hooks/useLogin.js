import { login } from "../services/auth";
import { useLocalStorage } from "./useLocalStorage";

const initialAuth = {
  user: null,
};
export function useLogin() {

  const [user , setUser] = useLocalStorage("currentUser", initialAuth);

  async function loginWithHook(credentials) {
    try {
      const userInfo = await login(credentials);
      setUser(userInfo.data);
    } catch (error) {
      throw error.data.message || "Error";
    }
  }

  function logout() {
    setUser(initialAuth);
  }

  return {
    user,
    loginWithHook,
    logout,
  };
}
