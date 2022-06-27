import "../css/tailwind.css";
import React from "react";

function SingleCoin(props) {
  //const [view, setView] = useState(false);

  let coin;
  let parsedCoin = props.coin;
  if (props.coin.length > 7) {
    parsedCoin = props.coin.substring(0, 5) + "...";
  }

  if (parsedCoin.length > 5) {
    coin = (
      <h2 class="text-white text-2xl mx-1 my-auto w-1/2 ">{parsedCoin}</h2>
    );
  } else if (parsedCoin.length > 3) {
    coin = (
      <h2 class="text-white text-3xl mx-1 my-auto w-1/2 ">{parsedCoin}</h2>
    );
  } else {
    coin = (
      <h2 class="text-white text-4xl mx-1 my-auto w-1/2 ">{parsedCoin}</h2>
    );
  }

  return (
    <div className="coin-wrapper" class="w-full my-auto">
      <div
        className="singleCoin"
        onClick={() => {
          props.toggleCoin[0](props.coin);
          props.toggleCoin[1]();
        }}
        class="flex flex-row py-2 w-11/12 border-2 border-green-500 mr-3 hover:bg-blue-500 transition-all duration-100 cursor-pointer rounded-lg"
      >
        <div className="crypto-selection" class="flex flex-row pl-3">
          {coin}
        </div>
        <h2 class="text-gray-300 text-2xl my-auto text-right w-3/4 mr-3">
          ${Intl.NumberFormat("en-US").format(props.val)}
        </h2>
      </div>
    </div>
  );
}

export default SingleCoin;
