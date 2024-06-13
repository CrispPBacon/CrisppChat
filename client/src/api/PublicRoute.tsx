// @ts-nocheck
import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface PublicProp {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicProp) {
  const { isAuth, checkSession } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession()
      .then((res) => {
        if (isAuth) {
          // console.log("%cSession continued", "color: greenyellow;");
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error?.message) {
          // console.log(`%c[Session Error] ${error.message}`, "color: red;");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
  return <>{!isAuth ? children : <Navigate to={"/"} />}</>;
}
