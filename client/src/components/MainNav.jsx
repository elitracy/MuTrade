import "../css/tailwind.css";

function MainNav(props) {
  const toggleClass = " transform translate-x-full";
  return (
    <div className="mainnav z- ">
      <div className="titles flex absolute w-1/3 z-100 bg-blue-800">
        {/* <h2 className="h-20 mx-auto w-full text-center text-4xl pt-5 border-b-2 text-white z-10 pointer-events-none">
          Simluate
        </h2> */}
        <h2 className="h-20 mx-auto w-full text-center text-4xl pt-5 border-b-2 text-white z-10 pointer-events-none  border-r-2">
          Wallet
        </h2>
      </div>

      <div
        className="bgbox h-20 flex items-center bg-blue-800  mb-2 absolute top-0 w-1/3"
        // onClick={() => {
        //   console.log(props);
        //   props.toggleNavMode();
        // }}
      >
        <div
          className={
            "bg-green-500 h-full w-full shadow-m transition-all transform"
            // toggleClass
          }
        ></div>
      </div>
    </div>
  );
}

export default MainNav;
