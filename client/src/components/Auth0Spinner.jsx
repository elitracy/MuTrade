import "../css/tailwind.css";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./loading.jsx";

function Auth0Spinner() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
}

export default Auth0Spinner;
