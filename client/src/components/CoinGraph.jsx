import "../css/tailwind.css";
import "@progress/kendo-theme-default/dist/all.css";
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxisItem,
  ChartValueAxis,
} from "@progress/kendo-react-charts";

function CoinGraph(props) {
  return (
    <Chart transitions={props.newload ? true : false}>
      <ChartSeries>
        {/* {props.data.map(function (coin) { */}
        <ChartValueAxis>
          <ChartValueAxisItem
            crosshair={{
              visible: true,
              tooltip: {
                visible: true,
                format: "#.##",
              },
            }}
            majorGridLines={false}
          />
        </ChartValueAxis>

        <ChartSeriesItem
          type="line"
          data={props.data.history}
          markers={false}
          color={
            props.data.history[0] <
            props.data.history[props.data.history.length - 1]
              ? "#6EE7B7"
              : "#EC4899"
          }
        />

        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            baseUnit="Years"
            maxDivisions={props.data.length}
            labels={{
              format: "Y",
            }}
          />
        </ChartCategoryAxis>
      </ChartSeries>
    </Chart>
  );
}

export default CoinGraph;
