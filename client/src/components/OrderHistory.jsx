import "../css/tailwind.css";
import MaterialTable from "material-table";

export default function OrderHistory(props) {
  const columns = [
    {
      title: "Type",
      field: "type",
    },
    {
      title: "Date",
      field: "date",
      type: "date",
      dateSetting: {
        format: "mm/dd/yyyy",
      },
    },
    {
      title: "Market Price",
      field: "marketprice",
      type: "currency",
    },
    {
      title: "Quanity",
      field: "quantity",
    },
  ];

  return (
    <div class="w-11/12 h-full mx-auto p-1">
      <MaterialTable
        columns={columns}
        data={props.data}
        title="Demo Title"
        options={{
          pageSize: 4,
          search: false,
          showTitle: false,
          toolbar: false,
          paging: false,
          sorting: true,
          thirdSortClick: false,
          headerStyle: {
            position: "sticky",
            top: "0",
            backgroundColor: "#1E40AF",
            color: "white",
          },
          maxBodyHeight: "275px",
          // rowStyle: { borderRadius: "20px" },
        }}
      />
    </div>
  );
}
