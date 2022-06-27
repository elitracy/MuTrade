import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()} className="buttons" class="">
      {/* <h3 id="signup-button">Sign Up</h3> */}
      <h3
        id="login-button"
        class="text-4xl text-white border-2 rounded-xl px-3 py-2 hover:px-10 transition-spacing cursor-pointer"
      >
        Login
      </h3>
    </button>
  );
};

export default LoginButton;
