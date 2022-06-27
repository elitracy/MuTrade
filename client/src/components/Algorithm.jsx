import "../css/tailwind.css";

export default function Algorithm(props) {
  return (
    <div className="algorithm" class="my-10">
      <h1 class="w-3/5 mx-auto text-center bg-green-500 text-white rounded-b-none rounded-xl text-2xl py-1 ">
        {props.name}
      </h1>
      <div
        className="options"
        class="w-9/12 py-4 border-4 border-green-500 mx-auto rounded-2xl"
      >
        <h1
          class="w-9/12 mx-auto text-center text-white border-2 rounded-2xl mb-3 text-3xl p-2 transform hover:scale-110 hover:bg-red-400 hover:border-red-400 transition-all cursor-pointer"
          onClick={() => {
            props.setSelectedAlgorithm(props.name);
            props.setMainWindowMode("run");
          }}
        >
          Execute
        </h1>
        <div
          className="algo-info"
          class="flex flex-row w-9/12 mx-auto justify-evenly"
        >
          <h1
            class="w-1/2 text-center text-white border-2 border-white rounded-2xl mr-1 text-3xl p-2 hover:bg-white hover:text-blue-800 hover:border-white transition-all cursor-pointer"
            onClick={() => {
              props.setSelectedAlgorithm(props.name);
              props.setMainWindowMode("edit");
            }}
          >
            Edit
          </h1>
          <h1
            class="w-1/2 text-center text-white border-2 border-white rounded-2xl ml-1 text-3xl p-2 hover:bg-white hover:text-blue-800 hover:border-white transition-all cursor-pointer"
            onClick={() => {
              props.setSelectedAlgorithm(props.name);
              props.setMainWindowMode("details");
            }}
          >
            Details
          </h1>
        </div>
      </div>
    </div>
  );
}
