import { Column } from "react-table";
import TableHOC from "./TableHOC";

interface DataTypes {
  id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<DataTypes>[] = [
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const DashboardTable = ({data}:{data:any}) => {
  return TableHOC<DataTypes>(
    columns,
    data,
    
    "transactionBox",
    "Top Transaction"
  )();
};

export default DashboardTable;
