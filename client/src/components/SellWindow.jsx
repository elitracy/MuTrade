import "../css/tailwind.css";
import { useState } from "react";

console.log(localStorage.getItem("userSub"));

let sub =
  localStorage.getItem("userSub") === null
    ? "fffff"
    : localStorage.getItem("userSub").split("|")[1];

async function updateSell(sub, coin, quantity) {
  const promise = fetch(
    `https://mutrade.herokuapp.com/api/sell?sub=${sub}&coin=${coin}&quantity=${quantity}`,
    {
      method: "PUT",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      return data.message;
    })
    .catch((rejected) => {
      console.error(rejected);
    });

  return promise.then((data) => {
    return data;
  });
}

export default function BuyWindow(props) {
  let [sellVal, setSellVal] = useState("");
  return (
    <div className="content" class="mb-3">
      <h1 class="w-1/4 mx-auto rounded-lg rounded-b-none text-center text-2xl bg-white text-blue-800 tracking-wider font-bold">
        Sell
      </h1>
      <div
        className="input-section"
        class="w-full border-2 border-white rounded-xl flex "
      >
        <input
          type="text"
          class="w-1/4 m-2 pl-2 bg-transparent text-white text-2xl text-left outline-none border-b-2 border-white"
          value={sellVal}
          onInput={(e) => {
            setSellVal(e.target.value);
          }}
        />
        <h1 class="w-2/12 text-center py-5 text-2xl text-gray-300 border-r-2 border-white">
          {props.coin}
        </h1>
        <h1 class="text-center w-1/2 my-auto py-1 h-full pl-4 text-2xl text-gray-300 overflow-scroll">
          Total: <br />
          <span class="text-yellow-300">
            $
            {isNaN(parseFloat(sellVal) * 3)
              ? Intl.NumberFormat("en-US").format(0)
              : Intl.NumberFormat("en-US").format(
                  (parseFloat(sellVal) * props.price).toFixed(3)
                )}
          </span>
        </h1>
      </div>
      <div
        className="purchase"
        class="w-5/12 mx-auto hover:w-1/2 transition-transform"
      >
        <input
          type="submit"
          value="Sell"
          class="w-full border-2 border-transparent  bg-white py-2 px-3 mt-2 rounded-3xl text-xl text-blue-800 
            transition-colors hover:bg-yellow-300 cursor-pointer tracking-wider "
          onClick={() => {
            updateSell(sub, props.coin, sellVal);
            setTimeout((val) => {
              window.location.reload();
            }, 500);
          }}
        />
      </div>
    </div>
  );
}
