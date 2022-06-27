import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";
import SignupButton from "./SignupButton";

const HiddenLogoutButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <SignupButton />;
};

export default HiddenLogoutButton;
