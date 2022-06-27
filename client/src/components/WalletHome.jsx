import "../css/tailwind.css";
import SingleCoin from "./SingleCoin.jsx";
import BuySell from "./BuySell";
import Select from "react-select";
import CoinGraph from "./CoinGraph.jsx";
import OrderHistory from "./OrderHistory.jsx";
import React from "react";
import deleteIcon from "../images/icons/delete.png";
import BuyWindow from "./BuyWindow";
import SellWindow from "./SellWindow";
import GraphData from "../coinAPI/graphData";
import LogoutButtonHome from "./buttons/LogoutButtonHome";

console.log(localStorage.getItem("userSub"));

let sub =
  localStorage.getItem("userSub") === null
    ? "fffff"
    : localStorage.getItem("userSub").split("|")[1];

async function updateOwned() {
  fetch("https://mutrade.herokuapp.com/api/init?sub=" + sub, { method: "PUT" })
    .then((res) => {
      // console.log(res);
      console.log("/API/INIT SUCCESS");
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((res) => {
      console.log("/API/INIT FAIL");
    });

  await fetch("https://mutrade.herokuapp.com/api", { method: "GET" })
    .then((res) => {
      console.log("/API SUCCESS");
    })
    .catch((err) => {
      console.log("/API FAIL");
    });

  const promise = fetch("https://mutrade.herokuapp.com/api/owned?sub=" + sub)
    .then((res) => res.json())
    .then((data) => {
      console.log("/API/OWNED SUCCESS");
      console.log(data);
      return data.message;
    })
    .catch((rejected) => {
      console.log("/API/OWNED FAIL");
      console.error(rejected);
    });

  return promise.then((data) => {
    console.log(data);
    return data;
  });
}

async function updateHistory() {
  const promise = fetch("https://mutrade.herokuapp.com/api/history?sub=" + sub)
    .then((res) => res.json())
    .then((data) => {
      console.log("/API/HISTORY SUCCESS");
      return data.message;
    })
    .catch((rejected) => {
      console.log("/API/HISTORY FAIL");
      console.error(rejected);
    });

  return promise.then((data) => {
    return data;
  });
}

async function updateBalance() {
  const promise = fetch("https://mutrade.herokuapp.com/api/balance?sub=" + sub)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((rejected) => {
      console.error(rejected);
    });

  return promise.then((data) => {
    return data;
  });
}

export default class WalletHome extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentCoin = this.setCurrentCoin.bind(this);
    this.setCurrentCoinToggle = this.setCurrentCoinToggle.bind(this);
    this.setToggleBuy = this.setToggleBuy.bind(this);
    this.setToggleSell = this.setToggleSell.bind(this);
    this.setCurrentBuy = this.setCurrentBuy.bind(this);
    this.setCurrentSell = this.setCurrentSell.bind(this);
    this.setSelectedCoinValue = this.setSelectedCoinValue.bind(this);
    this.setOwnedCoins = this.setOwnedCoins.bind(this);
    this.setBalance = this.setBalance.bind(this);
    this.state = {
      ownedCoins: [],
      selectedCoinLabel: "",
      selectedCoinValue: "",
      edit: false,
      currentCoin: "",
      currentCoinToggle: false,
      newLoad: true,
      toggleBuy: false,
      toggleSell: false,
      currentBuy: "",
      currentSell: "",
      coinList: [],
      tableData: [],
      graphData: [],
      balance: 0,
    };

    updateOwned().then((data) => {
      console.log(data);
      let currentHistory = [];
      let currentLabel = "";
      let currentCoinData = {};
      this.setState({ ownedCoins: data });
      data.map((coin) => {
        GraphData(coin.label).then((data) => {
          currentLabel = coin.label;
          currentHistory = [];
          data.map((data) => {
            currentHistory.push(data.open);
          });
          currentCoinData = { label: currentLabel, history: currentHistory };
          this.state.graphData.push(currentCoinData);
          this.setState({ graphData: this.state.graphData });
        });
      });
    });

    updateHistory().then((data) => {
      this.setState({ tableData: data });
    });

    updateBalance().then((data) => {
      this.setBalance(data);
    });
  }

  setBalance(value) {
    this.setState({ balance: value });
  }

  setCurrentBuy = (label, value = "") => {
    this.setState({ currentBuy: label });
  };
  setCurrentSell = (label, value = "") => {
    this.setState({ currentSell: label });
  };

  setToggleBuy = () => {
    this.setState({ toggleBuy: !this.state.toggleBuy, newLoad: false });
  };

  setToggleSell = () => {
    this.setState({ toggleSell: !this.state.toggleSell, newLoad: false });
  };

  setCurrentCoin = (label, value) => {
    this.setState({
      currentCoin: label,
      newLoad: false,
    });
    // console.log(this.state.currentCoin);
  };

  setCurrentCoinToggle = () => {
    this.setState({
      currentCoinToggle: !this.state.currentCoinToggle,
      newLoad: true,
    });
  };

  removeCoin = (label = "", idx) => {
    // needs to remove from backend AND check if there is none owned (all needs to be sold before removal)
    // this could also be achieved by not including a remove button if you still own some
    this.state.ownedCoins.splice(idx, 1);
    this.setState({
      ownedCoins: this.state.ownedCoins,
    });
  };

  setOwnedCoins = (label, value) => {
    if (
      this.state.ownedCoins.find((coin) => coin.label === label) ===
        undefined &&
      label !== ""
    ) {
      this.state.ownedCoins.push({
        label: label,
        value: value,
        owned: "0",
      });
      this.setState({
        ownedCoins: this.state.ownedCoins,
      });
    }
  };

  setSelectedCoinValue = (value) => {
    this.setState({ selectedCoinValue: value, newLoad: false });
  };

  setSelectedCoinLabel = (label) => {
    this.setState({ selectedCoinLabel: label, newLoad: false });
  };

  // update ownedCoins with state - will need to link to backend
  // could also easily store this in a local cache to boost performance
  render() {
    return (
      <div className="w-screen h-screen flex">
        <div
          className="left-panel"
          class={
            "h-screen bg-blue-800 overflow-scroll transition-all" +
            (this.state.edit ? " w-2/5" : " w-1/3")
          }
        >
          <div className="ownedCoins" class="mx-auto w-11/12 mt-24">
            <div className="add-coin flex flex-row pb-4 mb-4 border-b-2 z-1">
              <div className="select-styles" class="w-full my-auto">
                <Select
                  placeholder="Crypto Select"
                  value={this.state.ownedCoins.find(
                    (obj) => obj.label === this.state.selectedCoinLabel
                  )}
                  onChange={(e) => {
                    this.setSelectedCoinLabel(e.label);
                    this.setSelectedCoinValue(e.value);
                  }}
                  options={this.state.ownedCoins}
                  class="z-0"
                />
              </div>
              {/* on click needs to add to the user's owned coins */}
              <p
                class="p-2 px-4 bg-white text-blue-800 text-2xl rounded-lg hover:bg-yellow-300 transition-colors ml-3 cursor-pointer"
                onClick={() => {
                  this.setState({ edit: !this.state.edit, newLoad: false });
                }}
              >
                {!this.state.edit ? "Edit" : "Done"}
              </p>
              <p
                class="p-2 px-4 bg-white text-blue-800 text-2xl rounded-lg hover:bg-green-300 hover:text-white transition-colors cursor-pointer ml-2"
                onClick={() => {
                  this.setOwnedCoins(
                    this.state.selectedCoinLabel,
                    this.state.selectedCoinValue
                  );
                }}
              >
                Add
              </p>
            </div>
            <div className="balance" class="w-9/12 mx-auto mb-4">
              <h1 class="text-white text-4xl border-2 border-green-500 text-center rounded-xl p-4 px-6 hover:bg-green-500 hover:text-white transition-all">
                <span class="text-gray-200 text-2xl">Balance</span>
                {" $"}
                {Intl.NumberFormat("en-US").format(this.state.balance)}
              </h1>
            </div>
            {this.state.ownedCoins.map((coin, idx) => {
              return (
                <div className="coin-wrapper" class="flex">
                  {this.state.edit ? (
                    <div
                      className="delete-icon"
                      class="w-12 h-full mt-2 filter invert cursor-pointer transition-transform mr-3 mx-auto "
                      onClick={() => {
                        this.removeCoin("", idx);
                      }}
                    >
                      <img src={deleteIcon} class="p-1" alt="" />
                    </div>
                  ) : null}

                  <div
                    className="coinSelectionWrapper"
                    class="w-full flex flex-col"
                  >
                    <div
                      className="BuySellSingleCoinButtons"
                      class="w-full flex flex-row mb-2"
                    >
                      <SingleCoin
                        coin={coin.label}
                        val={coin.value}
                        toggleCoin={[
                          this.setCurrentCoin,
                          this.setCurrentCoinToggle,
                        ]}
                        currentCoin={this.state.currentCoin}
                        class="w-full h-full bg-green-500"
                      />
                      <BuySell
                        toggleBuy={this.setToggleBuy}
                        toggleSell={this.setToggleSell}
                        setBuyCoin={this.setCurrentBuy}
                        setSellCoin={this.setCurrentSell}
                        coin={coin.label}
                      />
                    </div>

                    <h1
                      class={
                        "border-2 border-white bg-green-500 mb-2 my-auto rounded-lg mx-auto text-center text-xl py-3 transition-all duration-300" +
                        (this.state.currentCoinToggle &&
                        this.state.currentCoin === coin.label
                          ? " opacity-1 w-full h-14  text-white "
                          : " opacity-0 w-0 h-0 text-transparent")
                      }
                    >
                      {parseFloat(coin.owned).toFixed(2)} {coin.label} @{" $"}
                      {Intl.NumberFormat("en-US").format(
                        (
                          parseFloat(coin.value) * parseFloat(coin.owned)
                        ).toFixed(2)
                      )}
                    </h1>

                    <div
                      className="buywindow-section"
                      class={
                        "transition-all duration-300 mx-auto my-auto" +
                        (this.state.toggleBuy &&
                        coin.label === this.state.currentBuy
                          ? " h-full w-full visible"
                          : " h-0 w-0 invisible ")
                      }
                    >
                      <BuyWindow
                        coin={coin.label}
                        price={coin.value}
                        setAmount={this.setOwnedCoins}
                        owned={coin.owned}
                      />
                    </div>

                    <div
                      className="sellwindow-section"
                      class={
                        "transition-all duration-300 mx-auto my-auto" +
                        (this.state.toggleSell &&
                        coin.label === this.state.currentSell
                          ? " h-full w-full visible"
                          : " h-0 w-0 invisible translate-y-52")
                      }
                    >
                      <SellWindow coin={coin.label} price={coin.value} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="information"
          class="w-2/3 h-screen bg-white float-right"
        >
          <div className="logoutHome" class="float-right m-3">
            <LogoutButtonHome />
          </div>
          <div
            className="graph"
            class="bg-white w-11/12 h-3/5 mt-1 pt-2 rounded-2xl mx-auto"
          >
            {/* this is for all owned coins layered */}
            <h1 class="mx-auto w-full text-center text-3xl">
              {this.state.currentCoin}
            </h1>

            {this.state.currentCoin !== "" ? (
              <CoinGraph
                data={this.state.graphData.find(
                  (coin) => coin.label === this.state.currentCoin
                )}
                newload={this.state.newLoad}
              />
            ) : (
              <h1 class="mx-auto bg-green-500 text-center text-white text-3xl py-40 mt-3 rounded-xl">
                Please Select a Coin
              </h1>
            )}

            {/* could easily create portfolio summary by adding all history values to see performance over time */}
          </div>
          <div className="order-history">
            <OrderHistory
              coin="BTC"
              data={
                this.state.currentCoin !== ""
                  ? this.state.tableData.find(
                      (coin) => coin.label === this.state.currentCoin
                    ).orders
                  : [{ date: "N/A", type: "N/A", marketPrice: 0, quantity: 0 }]
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
