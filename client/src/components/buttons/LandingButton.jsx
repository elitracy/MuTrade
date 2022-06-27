import React from "react";

import LoginButton from "./LoginButton";
import HomeButton from "./HomeButton";

import { useAuth0 } from "@auth0/auth0-react";

const LandingButton = () => {
  const { isAuthenticated, user } = useAuth0();
  if (isAuthenticated) localStorage.setItem("userSub", user.sub);

  return isAuthenticated ? <HomeButton /> : <LoginButton />;
};

export default LandingButton;
