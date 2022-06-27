import "../css/tailwind.css";
import Algorithm from "./Algorithm";

export default function AlgorithmSelection(props) {
  return (
    <div className="algorithms" class="overflow-hidden mt-20 mx-auto w-11/12">
      {props.algorithms.map((algo) => {
        return (
          <Algorithm
            name={algo.name}
            setSelectedAlgorithm={props.setSelectedAlgorithm}
            selectedAlgorithm={props.selectedAlgorithm}
            setMainWindowMode={props.setMainWindowMode}
            changeAlgorithm={props.changeAlgorithm}
            algorithms={props.algorithms}
          />
        );
      })}
    </div>
  );
}
