import { ReactElement, useState,useEffect } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { UserReducerInitialState } from "../types/reducer-types";
import { useSelector } from "react-redux";
import {  useMyOrderQuery } from "../redux/api/orderAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
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
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
      );
    
      const { isLoading, data, isError, error } = useMyOrderQuery(user?._id!);

  const [rows,setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "text-red-500"
                  : i.status === "Shipped"
                  ? "text-gray-500"
                  : "text-purple-500"
              }
            >
              {i.status}
            </span>
          ),
          action: (
            <Link
              className="bg-blue-300 rounded-md px-2 py-1"
              to={`/admin/transaction/${i._id}`}
            >
              Manage
            </Link>
          ),
        }))
      );
  }, [data]);


  const Table = TableHOC<DataType>(column, rows, "ordersTable", "Orders")();

  return (
    <div className="mt-10 w-[1100px]  h-screen mx-auto">
      <div className="w-full">{isLoading ? <Loader /> : Table}</div>
    </div>
  );
};

export default Orders;
