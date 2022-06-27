import "../css/tailwind.css";
import background from "../images/backgrounds/landingPageBackground.png";
import HiddenLogoutButton from "./buttons/HiddenLogoutButton";
import LandingButton from "./buttons/LandingButton";

function App() {
  return (
    <div
      className="App"
      class="flex items-center justify-center h-screen overflow-hidden"
    >
      <h1 class="App-header absolute top-45  text-white text-9xl font-mono famil font-bold tracking-wider z-10">
        MuTrade
      </h1>
      <img
        src={background}
        alt="background"
        id="landingPageBackground"
        class="w-screen h-screen absolute -z-1"
      />

      <div
        className="buttons"
        class="z-10 mt-56 w-1/4 flex h-1/4 justify-evenly"
      >
        <LandingButton class="" />
        <HiddenLogoutButton class="" />
      </div>
    </div>
  );
}

export default App;
