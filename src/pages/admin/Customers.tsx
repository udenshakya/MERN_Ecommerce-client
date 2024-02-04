import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSideBar from "../../components/admin/AdminSideBar";
import TableHOC from "../../components/admin/TableHOC";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const column: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [rows, setRows] = useState<DataType[]>([]);

  const {  data, isError, error } = useAllUsersQuery(user?._id!);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, "");
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.users.map((i) => ({
          avatar: <img src={i.photo} alt="photo" />,
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />{" "}
            </button>
          ),
        }))
      );
  }, [data]);

  const Table = 
    TableHOC<DataType>(
      column,
      rows,
      "px-4 my-2 rounded-lg md:w-[80%] mx-auto h-screen bg-white  ",
      "Customers",
      rows.length > 6
    )
    

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200">
      <AdminSideBar />
      <main>{Table()}</main>
    </div>
  );
};

export default Customers;
