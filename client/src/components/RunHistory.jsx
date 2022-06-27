import "../css/tailwind.css";
import SimulationGraph from "./SimulationGraph";
import React from "react";

export default class RunHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algoMenu: 0,
      currentAlgo: -1,
    };
  }

  setAlgoMenu(page) {
    this.setState({ algoMenu: page });
  }
  setCurrentAlgo(num) {
    this.setState({ currentAlgo: num });
  }

  render() {
    return (
      <div className="history" class="flex flex-col h-screen">
        <h1 class="my-3.5 h-2/12 w-full text-5xl border-b-2 text-center text-white pb-4">
          Simluation History
        </h1>
        <div
          className="run-history"
          class="w-12/12 h-full overflow-scroll flex flex-wrap mx-auto items-center"
        >
          {this.props.runHistory.map((run) => {
            return (
              <div className="run-preview" class="w-full px-2 flex z-0">
                <div
                  className="run-info"
                  class="flex justify-between z-0 w-2/5 bg-green-700 rounded-xl rounded-r-none my-auto p-2 transform translate-x-48 
                        hover:translate-x-2 transition-all duration-500 ease-in-out"
                >
                  {this.state.algoMenu === 1 &&
                  run.id === this.state.currentAlgo ? (
                    <div className="runinfo" class="w-full h-full ">
                      <h1 class="text-gray-300 text-left text-2xl w-full border-b-2 p-1">
                        Start Date:{" "}
                        <span class="text-right text-white float-right">
                          {run.startDate}
                        </span>
                      </h1>
                      <h1 class="text-gray-300 text-left text-2xl w-full border-b-2 p-1 ">
                        End Date:{" "}
                        <span class="text-right text-white float-right">
                          {run.endDate}
                        </span>
                      </h1>
                      <h1 class="text-gray-300 text-left text-2xl w-full border-b-2 p-1 ">
                        Algorithm:{" "}
                        <span class="text-right text-white float-right">
                          {run.algorithmName}
                        </span>
                      </h1>
                      <h1 class="text-gray-300 text-left text-2xl w-full border-b-2 p-1 ">
                        Starting Amount:{" "}
                        <span class="text-right text-white float-right">
                          {run.startingAmount}
                        </span>
                      </h1>
                      <h1 class="text-gray-300 text-left text-2xl w-full p-1 ">
                        Total Quantity:{" "}
                        <span class="text-right text-white float-right">
                          {run.startingQuantity}
                        </span>
                      </h1>
                    </div>
                  ) : (
                    <div className="runAnalysis" class="w-full h-full">
                      <h1 class="text-gray-300 text-left text-2xl w-full border-b-2 p-1">
                        ATH <span class="text-left text-white">{run.ATH}</span>
                        <div className="right" class="float-right text-xl">
                          Net Gain{" "}
                          <span class="text-right text-white text-2xl">
                            {run.netGain}
                          </span>
                        </div>
                      </h1>
                      <h1 class="text-gray-300 text-left text-2xl w-full border-b-2 p-1">
                        ATL{" "}
                        <span class="text-left text-white text-2xl">
                          {run.ATL}
                        </span>
                        <div className="right" class="float-right text-xl">
                          Percent Gain{" "}
                          <span class="text-right text-white text-2xl">
                            {run.gain}%
                          </span>
                        </div>
                      </h1>
                      <h1 class="text-gray-300 text-left text-2xl w-full border-b-2 p-1">
                        Buys{" "}
                        <span class="text-left text-white text-2xl">
                          {run.Buys}
                        </span>
                        <div className="right" class="float-right">
                          Avg Trade{" "}
                          <span class="text-right text-white text-2xl">
                            {run.avgTrade}
                          </span>
                        </div>
                      </h1>

                      <h1 class="text-gray-300 text-left text-2xl w-full p-1">
                        Sells{" "}
                        <span class="text-left text-white">{run.Sells}</span>
                        <div className="right" class="float-right text-xl">
                          Net Profit{" "}
                          <span class="text-right text-white">
                            {run.totalNetProfit}
                          </span>
                        </div>
                      </h1>
                    </div>
                  )}

                  <div
                    className="bottom-nav"
                    class="flex flex-col px-3 h-1/2 my-auto"
                  >
                    <div
                      className="top-dot"
                      onClick={() => {
                        this.setAlgoMenu(0);
                        this.setCurrentAlgo(run.id);
                      }}
                      class={
                        "w-5 h-5 cursor-pointer rounded-xl mb-2 " +
                        (this.state.algoMenu === 0 ? "bg-gray-700" : "bg-white")
                      }
                    ></div>
                    <div
                      className="bottom-dot"
                      onClick={() => {
                        this.setAlgoMenu(1);
                        this.setCurrentAlgo(run.id);
                      }}
                      class={
                        "w-5 h-5 cursor-pointer rounded-xl mt-2 " +
                        (this.state.algoMenu === 1 ? "bg-gray-700" : "bg-white")
                      }
                    ></div>
                  </div>
                </div>
                <div
                  className="display-module"
                  class="overflow-hidden h-auto w-3/5 my-5 mx-auto bg-white border-2 border-white rounded-xl z-10"
                >
                  <div className="visual" class="z-3 h-full w-full ">
                    <h1 class="text-gray-700 z-3 bg-white text-3xl text-center py-3 border-b-2">
                      {run.coin}
                    </h1>
                    <div className="graph-styles" class="w-full h-full -ml-16">
                      <SimulationGraph
                        graphData={run.graphData}
                        title={run.coin}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
