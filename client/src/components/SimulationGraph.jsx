import "../css/tailwind.css";
import "@progress/kendo-theme-default/dist/all.css";
import {
  Chart,
  ChartArea,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartValueAxis,
  ChartValueAxisItem,
} from "@progress/kendo-react-charts";

export default function SimulationGraph(props) {
  const graphData = props.graphData.map((obj) => {
    return Object.keys(obj)
      .sort()
      .map(function (key) {
        return obj[key];
      });
  });

  return (
    <Chart
      style={{
        width: 640,
        height: 250,
      }}
      transitions={false}
    >
      <ChartArea background="#374151" />
      <ChartValueAxis>
        <ChartValueAxisItem
          crosshair={{
            visible: true,
            tooltip: {
              visible: true,
              format: "#.##",
            },
          }}
          background="#374151"
          majorGridLines="false"
          min={Math.ceil(Math.min.apply(null, graphData))}
          max={
            Math.max.apply(null, graphData) +
            Math.max.apply(null, graphData) * 0.1
          }
        />
      </ChartValueAxis>
      <ChartSeries>
        <ChartSeriesItem
          transitions="false"
          type="line"
          data={graphData}
          color={
            props.graphData[0].quantity <
            props.graphData[props.graphData.length - 1].quantity
              ? "#6EE7B7"
              : "#EC4899"
          }
        />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem
            baseUnit="Years"
            maxDivisions={props.graphData.length}
            labels={{
              format: "Y",
            }}
          />
        </ChartCategoryAxis>
      </ChartSeries>
    </Chart>
  );
}
