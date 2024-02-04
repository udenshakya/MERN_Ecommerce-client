import AdminSideBar from "../../components/admin/AdminSideBar";
import { Column } from "react-table";
import { ReactElement, useState,  useEffect } from "react";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { UserReducerInitialState } from "../../types/reducer-types";
import { useSelector } from "react-redux";
import { useAllOrderQuery } from "../../redux/api/orderAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
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


const Transaction = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, data, isError, error } = useAllOrderQuery(user?._id!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          user: i.user.name,
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

  const Table = 
    TableHOC<DataType>(
      columns,
      rows,
      "px-4 mx-2 rounded-lg mx-auto  h-screen bg-white",
      "Transactions",
      rows.length > 6
    )()
    
  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200">
      <AdminSideBar />
      <main>{isLoading ? <Loader /> : Table}</main>
    </div>
  );
};

export default Transaction;
