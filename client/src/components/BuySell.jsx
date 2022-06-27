import "../css/tailwind.css";

function BuySell(props) {
  return (
    <div className="buy-sell" class="flex w-auto h-14">
      <div className="buysection" class="flex flex-col w-1/2">
        <h3
          class="text-white text-3xl border-2 border-white rounded-lg px-4 py-2  hover:bg-green-500 hover:border-transparent transition-colors cursor-pointer"
          onClick={() => {
            props.toggleBuy();
            props.setBuyCoin(props.coin);
          }}
        >
          Buy
        </h3>
      </div>

      <div className="sellsection">
        <h3
          class="text-white text-3xl border-2 border-white rounded-lg ml-2 px-4 py-2 hover:bg-yellow-400 hover:border-transparent transition-colors cursor-pointer"
          onClick={() => {
            props.toggleSell();
            props.setSellCoin(props.coin);
          }}
        >
          Sell
        </h3>{" "}
      </div>
    </div>
  );
}

export default BuySell;
