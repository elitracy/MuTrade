import "../css/tailwind.css";
import React from "react";
import SimulationNav from "./SimulationNav";
import DateSelection from "./DateSelection";
import CoinSelection from "./CoinSelection";
import historicalPrice from "../coinAPI/historicalPrice.js";
import AlgorithmSelection from "./AlgorithmSelection";
import AlgorithmDetails from "./AlgorithmDetails";
import EditAlgorithm from "./EditAlgorithm";
import RunHistory from "./RunHistory";

export default class SimulationHome extends React.Component {
  constructor(props) {
    super(props);
    this.setCurrentSimulateWindow = this.setCurrentSimulateWindow.bind(this);
    this.setStartDate = this.setStartDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.setSelectedCoinLabel = this.setSelectedCoinLabel.bind(this);
    this.setSelectedCoinValue = this.setSelectedCoinValue.bind(this);
    this.setBuyVal = this.setBuyVal.bind(this);
    this.setHistoricalCoinPrice = this.setHistoricalCoinPrice.bind(this);
    this.getHistoricalCoinPrice = this.getHistoricalCoinPrice.bind(this);
    this.setSelectedAlgorithm = this.setSelectedAlgorithm.bind(this);
    this.setMainWindowMode = this.setMainWindowMode.bind(this);
    this.changeAlgorithm = this.changeAlgorithm.bind(this);
    this.setRunHistory = this.setRunHistory.bind(this);
    this.setActiveRun = this.setActiveRun.bind(this);
    this.state = {
      currentSimulateWindow: 1,
      startDate: "mm/dd/yyyy",
      endDate: "mm/dd/yyyy",
      selectedCoinLabel: "",
      selectedCoinValue: "",
      buyVal: "1",
      historicalCoinPrice: "",
      selectedAlgorithm: "",
      mainWindowMode: "",
      algorithms: [
        // should get this from backend potentially
        {
          name: "Bollinger Bands",
          details:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo saepe error sit maiores eos veniam doloremque dignissimos. Totam eaque eos cum quidem earum, esse beatae dicta quam ratione iusto ullam?",
          settings: [
            {
              name: "Moving Standard Deviation (Top Band)",
              value: 20,
              unit: "Standard Deviations",
            },
            { name: "Period", value: 5, unit: "Days" },
            {
              name: "Moving Standard Deviation (Bottom Band)",
              value: 20,
              unit: "Standard Deviations",
            },
          ],
        },
        {
          name: "Pairs Trading",
          details:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo saepe error sit maiores eos veniam doloremque dignissimos. Totam eaque eos cum quidem earum, esse beatae dicta quam ratione iusto ullam?",
          settings: [
            {
              name: "Moving Standard Deviation (Top Band)",
              value: 20,
              unit: "Standard Deviations",
            },
            { name: "Period", value: 5, unit: "Days" },
            {
              name: "Moving Standard Deviation (Bottom Band)",
              value: 20,
              unit: "Standard Deviations",
            },
          ],
        },
      ],
      runHistory: [
        {
          coin: "BTC",
          id: 1,
          startDate: "01/01/2020",
          endDate: "01/31/2021",
          startingAmount: "4",
          startingQuantity: "43103.28",
          algorithmName: "Bollinger Bands",
          graphData: [
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
            { quantity: Math.random() * (2204 - 1000) + 1000 },
          ],
          ATH: "22034",
          ATL: "10234",
          gain: "43",
          tradeVol: "92345",
          totalNetProfit: "132128",
          avgTrade: "19234",
          netGain: "32452",
          Buys: "3422",
          Sells: "34633",
          Trades: "3252",
          netLoss: "23405",
          percProfitable: "83%",
        },
        {
          coin: "ETH",
          id: 2,
          startDate: "01/01/2020",
          endDate: "01/31/2021",
          startingAmount: "6",
          startingQuantity: "43103.28",
          algorithmName: "Bollinger Bands",
          graphData: [
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
          ],
          ATH: "22034",
          ATL: "10234",
          gain: "43",
          tradeVol: "92345",
          totalNetProfit: "132128",
          avgTrade: "19234",
          netGain: "32452",
          Buys: "3422",
          Sells: "34633",
          Trades: "3252",
          netLoss: "23405",
          percProfitable: "83%",
        },
        {
          coin: "DOGE",
          id: 3,
          startDate: "01/01/2020",
          endDate: "01/31/2021",
          startingAmount: "6",
          startingQuantity: "43103.28",
          algorithmName: "Bollinger Bands",
          graphData: [
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
          ],
          ATH: "22034",
          ATL: "10234",
          gain: "43",
          tradeVol: "92345",
          totalNetProfit: "132128",
          avgTrade: "19234",
          netGain: "32452",
          Buys: "3422",
          Sells: "34633",
          Trades: "3252",
          netLoss: "23405",
          percProfitable: "83%",
        },
        {
          coin: "DOT",
          id: 4,
          startDate: "01/01/2020",
          endDate: "01/31/2021",
          startingAmount: "6",
          startingQuantity: "43103.28",
          algorithmName: "Bollinger Bands",
          graphData: [
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
          ],
          ATH: "22034",
          ATL: "10234",
          gain: "43",
          tradeVol: "92345",
          totalNetProfit: "132128",
          avgTrade: "19234",
          netGain: "32452",
          Buys: "3422",
          Sells: "34633",
          Trades: "3252",
          netLoss: "23405",
          percProfitable: "83%",
        },
        {
          coin: "SHIB",
          id: 5,
          startDate: "01/01/2020",
          endDate: "01/31/2021",
          startingAmount: "6",
          startingQuantity: "43103.28",
          algorithmName: "Bollinger Bands",
          graphData: [
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
            { quantity: Math.random() * 22034 },
          ],
          ATH: "22034",
          ATL: "10234",
          gain: "43",
          tradeVol: "92345",
          totalNetProfit: "132128",
          avgTrade: "19234",
          netGain: "32452",
          Buys: "3422",
          Sells: "34633",
          Trades: "3252",
          netLoss: "23405",
          percProfitable: "83%",
        },
      ],
      activeRun: "",
    };
  }

  setCurrentSimulateWindow(windowNum) {
    this.setState({ currentSimulateWindow: windowNum });
  }

  setStartDate(date) {
    this.setState({ startDate: date });
  }
  setEndDate(date) {
    this.setState({ endDate: date });
  }

  setSelectedCoinValue = (value) => {
    this.setState({ selectedCoinValue: value });
  };

  setSelectedCoinLabel = (label) => {
    this.setState({ selectedCoinLabel: label });
  };

  setBuyVal(value) {
    this.setState({ buyVal: value });
  }

  setHistoricalCoinPrice(price) {
    this.setState({ historicalCoinPrice: price });
  }

  async getHistoricalCoinPrice(label) {
    const month = this.state.startDate.split("/")[0];
    const day = this.state.startDate.split("/")[1];
    const year = this.state.startDate.split("/")[2];

    if (label !== "") {
      historicalPrice(label, month, day, year).then((response) => {
        this.setState({
          historicalCoinPrice: response,
        });
      });
    } else {
      console.log("Invalid Date");
    }
  }

  setSelectedAlgorithm(algoName) {
    this.setState({ selectedAlgorithm: algoName });
  }

  setMainWindowMode(windowMode) {
    this.setState({ mainWindowMode: windowMode });
  }

  changeAlgorithm(name, settingName, value) {
    let algoIndex = this.state.algorithms.findIndex(
      (algo) => algo.name === name
    );
    let tempAlgos = this.state.algorithms;
    let settingsIndex = this.state.algorithms[algoIndex].settings.findIndex(
      (setting) => settingName === setting.name
    );

    tempAlgos[algoIndex].settings[settingsIndex].value = value;
    console.log(tempAlgos[algoIndex].settings[settingsIndex]);
    this.setState({ algorithms: tempAlgos });
  }

  setRunHistory(history) {
    this.setState({ runHistory: history }); // history is your list of objects where each object is a simulation
  }

  setActiveRun(runIdx) {
    this.setState({ activeRun: runIdx });
  }

  render() {
    return (
      <div
        className="SimulationHome"
        class="w-screen h-screen flex bg-gray-700 overflow-scroll"
      >
        <div
          className="left-panel"
          class="h-screen bg-blue-800 overflow-scroll transition-all w-1/3 border-r-2"
        >
          <h1
            class="p-2 text-gray-7  00 bg-white text-2xl text-right 
                   rounded-2xl border-2 absolute left-96 top-3 z-0 transform 
                   ml-2 translate-x-32 cursor-pointer hover:scale-110 transition-all "
            onClick={() => {
              this.setMainWindowMode("runHistory");
            }}
          >
            Algorithm History
          </h1>
          {
            {
              1: (
                <DateSelection
                  setStartDate={this.setStartDate}
                  setEndDate={this.setEndDate}
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                />
              ),
              2: (
                <CoinSelection
                  coinList={this.props.coinList}
                  setSelectedCoinLabel={this.setSelectedCoinLabel}
                  setSelectedCoinValue={this.setSelectedCoinValue}
                  selectedCoinLabel={this.state.selectedCoinLabel}
                  selectedCoinValue={this.state.selectedCoinValue}
                  buyVal={this.state.buyVal}
                  setBuyVal={this.setBuyVal}
                  startDate={this.state.startDate}
                  getHistoricalCoinPrice={this.getHistoricalCoinPrice}
                  historicalCoinPrice={this.state.historicalCoinPrice}
                />
              ),
              3: (
                <AlgorithmSelection
                  setSelectedAlgorithm={this.setSelectedAlgorithm}
                  selectedAlgorithm={this.state.selectedAlgorithm}
                  setMainWindowMode={this.setMainWindowMode}
                  changeAlgorithm={this.changeAlgorithm}
                  algorithms={this.state.algorithms}
                />
              ),
            }[this.state.currentSimulateWindow]
          }

          {/*Bottom Navigation*/}
          <div className="simulation-nav" class="absolute bottom-0 w-1/3">
            <SimulationNav
              changeWindow={this.setCurrentSimulateWindow}
              windowMode={this.state.currentSimulateWindow}
            />
          </div>
        </div>

        {/* Main information area - right */}
        <div className="main-window" class="w-2/3 h-screen overflow-hidden">
          {this.state.selectedAlgorithm === "" ||
          this.state.mainWindowMode === "runHistory" ? (
            <RunHistory
              runHistory={this.state.runHistory}
              activeRun=""
              setActiveRun={this.setActiveRun}
            />
          ) : (
            {
              run: (
                <h1 class="w-2/3 mx-auto text-white text-6xl text-center mt-52">
                  Run {this.state.selectedAlgorithm}
                </h1>
              ),
              details: (
                <AlgorithmDetails
                  name={this.state.selectedAlgorithm}
                  details={
                    this.state.algorithms.find(
                      (algo) => algo.name === this.state.selectedAlgorithm
                    ).details
                  }
                  class="w-full h-full bg-blue-200 border-2 border-black"
                />
              ),
              edit: (
                <EditAlgorithm
                  settings={
                    this.state.algorithms.find(
                      (algo) => algo.name === this.state.selectedAlgorithm
                    ).settings
                  }
                  name={this.state.selectedAlgorithm}
                  algorithms={this.state.algorithms}
                  changeAlgorithm={this.changeAlgorithm}
                />
              ),
            }[this.state.mainWindowMode]
          )}
        </div>
      </div>
    );
  }
}
