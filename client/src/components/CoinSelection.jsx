import "../css/tailwind.css";
import Select from "react-select";

export default function CoinSelection(props) {
  console.log(props.historicalCoinPrice);
  return (
    <div
      className="coin-selection"
      class="mt-28 h-3/5 pb-3 flex flex-col justify-evenly"
    >
      <div className="quanitity-selection" class="w-10/12 mx-auto">
        <h1 class="w-2/4 mx-auto rounded-lg rounded-b-none text-center text-2xl bg-white text-blue-800 tracking-wider font-bold">
          Start Quantity
        </h1>
        <div
          className="input-section"
          class="w-full border-2 border-white rounded-xl flex "
        >
          <input
            type="text"
            class="w-1/4 m-2 pl-3 bg-transparent text-white text-2xl outline-none border-b-2 border-white text-center"
            value={props.buyVal}
            onInput={(e) => {
              props.setBuyVal(e.target.value);
            }}
          />
          <h1 class="w-2/12 text-center py-5 text-2xl text-gray-300 border-r-2 border-white">
            {props.selectedCoinLabel === "" ? "None" : props.selectedCoinLabel}
          </h1>
          <h1 class="text-center w-1/2 my-auto py-1 h-full pl-4 text-2xl text-gray-300 overflow-scroll">
            Total: <br />
            <span class="text-yellow-300">
              {isNaN(parseFloat(props.buyVal) * props.historicalCoinPrice)
                ? 0
                : "$" +
                  (
                    parseFloat(props.buyVal) * props.historicalCoinPrice
                  ).toFixed(3)}
            </span>
          </h1>
        </div>
      </div>
      <div
        className="select-styles"
        class="w-8/12 mx-auto text-3xl text-center tracking-wider"
      >
        <Select
          placeholder="Crypto Select"
          value={props.coinList.find(
            (obj) => obj.label === props.selectedCoinLabel
          )}
          onChange={(e) => {
            props.setSelectedCoinLabel(e.label);
            props.setSelectedCoinValue(e.value);
            props.getHistoricalCoinPrice(e.label);
          }}
          options={props.coinList}
        />
      </div>
      <div
        className="displayAmount"
        class="mx-auto w-3/4 h-12 flex flex-col justify-evenly"
      >
        {isNaN(parseFloat(props.selectedCoinValue)) ? null : (
          <h2 class="w-2/5 mx-auto text-center text-white text-2xl tracking-wider border-2 rounded-xl rounded-b-none border-green-500 bg-green-500">
            Trading at
          </h2>
        )}
        <h1
          class={
            "w-full text-white mx-auto text-5xl text-center py-auto border-4 border-green-500 py-1 rounded-xl transition-all hover:bg-blue-600" +
            (isNaN(parseFloat(props.historicalCoinPrice))
              ? " opacity-0"
              : " opacity-1")
          }
        >
          {isNaN(parseFloat(props.historicalCoinPrice))
            ? "$"
            : "$" + parseFloat(props.historicalCoinPrice).toFixed(5)}
        </h1>
      </div>
    </div>
  );
}
