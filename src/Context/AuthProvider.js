import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();

  React.useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      console.log("user",  user);
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL
        });
        setIsLoading(false);
        return history.push("/");
      }

      setIsLoading(false);
      return history.push("/Login");
    });

    return () => {
      unsubcribe();
    };
  }, [history]);

  return (
    <AuthContext.Provider value={{ user }}> 
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
}
