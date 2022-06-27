import "../css/tailwind.css";

export default function DateSelection(props) {
  return (
    <div
      className="date-selection"
      class="my-auto py-48 text-white text-xl text-center"
    >
      <div
        className="startDate"
        class="w-full flex mx-auto px-3 pr-8 my-4 mb-12"
      >
        <h1 class="text-5xl mx-auto text-center w-1/3">Start Date</h1>
        <input
          type="text"
          name="start-date"
          id=""
          class="text-white text-3xl w-2/3 text-center bg-blue-800 border-4 border-white 
                rounded-xl p-3 py-4 cursor-pointer hover:bg-blue-600 transition-colors outline-none"
          value={
            props.startDate.length < 10
              ? props.startDate
              : props.startDate.substring(0, 10)
          }
          onInput={(e) => {
            props.setStartDate(e.target.value);
          }}
        />
      </div>
      <div className="endDate" class="w-full flex mx-auto px-3 pr-8 my-4 mb-12">
        <h1 class="text-5xl mx-auto text-center w-1/3">End Date</h1>
        <input
          type="text"
          name="end-date"
          id=""
          class="text-white text-3xl w-2/3 text-center bg-blue-800 border-4 border-white 
                rounded-xl p-3 py-4 cursor-pointer hover:bg-blue-600 transition-colors outline-none"
          value={
            props.endDate.length < 10
              ? props.endDate
              : props.endDate.substring(0, 10)
          }
          onInput={(e) => {
            props.setEndDate(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
