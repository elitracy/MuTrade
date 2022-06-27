import "../css/tailwind.css";
import navArrow from "../images/icons/nav-arrow.png";

function SimulationNav(props) {
  return (
    <div
      className="wallet-nav"
      class="w-full py-12 mx-auto flex flex-row justify-evenly border-t-2 border-r-2 transition-all bg-blue-800"
    >
      <div
        className="arrow"
        class="w-1/6 filter invert transform rotate-180 my-auto cursor-pointer hover:opacity-50 transition-opacity "
        onClick={() => {
          if (props.windowMode > 1) {
            props.changeWindow(props.windowMode - 1);
          }
        }}
      >
        <img src={navArrow} alt="" class="w-full h-auto" />
      </div>
      <div
        className="circle"
        class={
          "w-1/5 h-8 my-auto rounded-l-xl -mr-2.5 " +
          (props.windowMode < 1 ? "bg-white" : "bg-green-500")
        }
      ></div>
      <div
        className="circle"
        class={
          "w-1/5 h-8 my-auto " +
          (props.windowMode < 2 ? "bg-white" : "bg-green-500")
        }
      ></div>
      <div
        className="circle"
        class={
          "w-1/5 h-8 my-auto rounded-r-xl -ml-2.5 " +
          (props.windowMode < 3 ? "bg-white" : "bg-green-500")
        }
      ></div>
      <div
        className="arrow"
        class="w-1/6 filter invert my-auto cursor-pointer hover:opacity-50 transition-opacity"
        onClick={() => {
          if (props.windowMode < 3) {
            props.changeWindow(props.windowMode + 1);
          }
        }}
      >
        <img src={navArrow} alt="" class="w-full h-auto" />
      </div>
    </div>
  );
}

export default SimulationNav;
