import { useAuth0 } from "@auth0/auth0-react";

const LogoutButtonHome = () => {
  const { logout } = useAuth0();
  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="buttons"
      class=""
    >
      {/* <h3 id="signup-button">Sign Up</h3> */}
      <h3
        id="logout-button"
        class="text-2xl text-white bg-blue-800 rounded-xl px-3 py-2 transform hover:scale-110 transition-spacing cursor-pointer"
      >
        Logout
      </h3>
    </button>
  );
};

export default LogoutButtonHome;
