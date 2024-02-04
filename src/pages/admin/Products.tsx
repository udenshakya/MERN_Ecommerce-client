import { ReactElement, useState, useEffect } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { Column } from "react-table";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { server } from "../../redux/store";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import Loader from "../../components/Loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const column: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { data, isLoading, error, isError } = useAllProductsQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.products.map((i) => ({
          photo: <img src={`${server}/${i.photo}`} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link className="bg-blue-300 rounded-md px-2 py-1" to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  const Table = 
    TableHOC<DataType>(
      column,
      rows,
      "overflow-y-auto px-4 my-2 rounded-lg md:w-[80%] mx-auto h-screen bg-white ",
      "Products",
      rows.length > 6
    )()
    
  

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200 ">
      <AdminSideBar />
      <main className="">{isLoading ? <Loader /> : Table} </main>
      <Link
        to={"/admin/product/new"}
        className="fixed top-11 right-8 rounded-full bg-red-500 text-white p-2"
      >
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
