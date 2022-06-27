import "../css/tailwind.css";

export default function AlgorithmDetails(props) {
  console.log(props.name);
  return (
    <div
      className="algo-description"
      class="w-4/5 h-2/5 my-48 overflow-hidden flex flex-col justify-evenly bg-white rounded-xl mx-auto"
    >
      <h1 class="w-2/3 mx-auto text-black text-6xl border-b-2 border-gray-700 text-center pb-4">
        {props.name}
      </h1>
      <p class="w-3/4 mx-auto text-black text-center text-xl border-green-100">
        {props.details}
      </p>
    </div>
  );
}
