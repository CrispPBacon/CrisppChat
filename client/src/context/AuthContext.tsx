import { createContext, useContext, useState } from "react";
import {
  authProps,
  InitialContext,
  initialUser,
  signupProps,
  userType,
} from "../interfaces";
import { handleAPIRequest, handleSignUpError } from "./ContextFunctions";
import { red } from "../messageLogger";

const AuthContext = createContext<authProps>(InitialContext);

function AuthProvider({ children }: any) {
  const [user, setUser] = useState<userType>(initialUser);
  const [isAuth, setAuth] = useState(false);

  const signup = async (data: signupProps) => {
    const error = handleSignUpError(data);
    if (error) {
      throw new Error(error);
    }
    await handleAPIRequest("/api/auth", { signup: data })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      });
  };

  const login = async (uid: string, pwd: string) => {
    if (!(uid && pwd)) {
      throw new Error("Please enter your username and password!");
    }
    await handleAPIRequest("/api/auth", { login: { uid: uid, pwd: pwd } })
      .then((res) => {
        setUser(res);
        setAuth(true);
        localStorage.setItem("userdata", JSON.stringify(res));
      })
      .catch((error) => {
        throw error;
      });
  };

  const logout = async () => {
    setUser(null);
    setAuth(false);
    localStorage.clear();
    await handleAPIRequest("/api/auth", { logout: {} }).catch((error) => {
      console.log(`%c${error.message}`, red);
    });
  };

  const checkSession = async () => {
    const storedData = localStorage.getItem("userdata");
    if (storedData && JSON.parse(storedData)) {
      const userdata = JSON.parse(storedData);
      await handleAPIRequest("/api/auth", {
        checkSession: { _id: userdata._id },
      })
        .then((res) => {
          setUser(res);
          setAuth(true);
          localStorage.setItem("userdata", JSON.stringify(res));
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  const authValue = {
    user,
    isAuth,
    signup,
    login,
    logout,
    checkSession,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
