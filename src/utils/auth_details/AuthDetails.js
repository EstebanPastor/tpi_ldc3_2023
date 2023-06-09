import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [userExists, setUserExists] = useState(true); 

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setUserExists(true);
      } else {
        setAuthUser(null);
        setUserExists(false);

      }
    });
    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successfully");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {userExists ? (
        <>
          <p>{`Signed in as ${authUser?.email}`}</p>
          <button onClick={userSignOut}>Cerrar sesión</button>
        </>
      ) : (
        <p style={{ color: 'rgb(228, 65, 65)' }}>Sesión no iniciada</p>
      )}
    </div>
  );
};

export default AuthDetails;
