import { Link, Navigate, useNavigate, useParams,  } from "react-router-dom";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { server } from "../../../redux/store";
import { Order, OrderItem } from "../../../types/types";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useSelector } from "react-redux";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/orderAPI";
import { FaTrash } from "react-icons/fa";
import { responseToast } from "../../../utils/features";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};



const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams()
  const navigate = useNavigate()

  const { data, isError } = useOrderDetailsQuery(params.id! );

  const [updateOrder] = useUpdateOrderMutation()
  const [deleteOrder] = useDeleteOrderMutation()


  if(isError) return <Navigate to={"/404"} />

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;


 

const updateHandler = async()=>{
  const res = await updateOrder({
    userId:user?._id!,
    orderId:data?.order._id!
  })
  responseToast(res,navigate,"/admin/transaction")
}

const deleteHandler = async()=>{
  const res = await deleteOrder({
    userId:user?._id!,
    orderId:data?.order._id!
  })
  responseToast(res,navigate,"/admin/transaction")

}

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200">
      <AdminSideBar />
      <main className="md:flex gap-4 justify-center items-center px-4 m-2 overflow-y-auto h-full">
        <div className=" gap-2 p-3 w-[400px] h-[500px] mb-10 md:md-0 mx-auto bg-white justify-center shadow-lg ">
          <h1 className="text-center text-xl mb-3">ORDER ITEMS</h1>
          {orderItems.map((item) => (
            <ProductCard
            key={item._id}
              name={item.name}
              photo={`${server}/${item.photo}`}
              price={item.price}
              quantity={item.quantity}
              _id={item._id}
              productId={item.productId}
            />
          ))}
        </div>
        <div className="flex flex-col w-[400px] h-[500px] relative gap-1 mx-auto bg-white p-4 shadow-lg">
        <button onClick={deleteHandler}
            className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full"
          >
            <FaTrash />
          </button>
          <h1 className="text-center text-xl">ORDER INFO</h1>
          <h2 className="mt-2 font-bold">User Info</h2>
          <p>Name:{name} </p>
          <p>
            Address:{address},{city},{state},{country},{pinCode}{" "}
          </p>
          <h2 className="mt-2 font-bold">Amount Info</h2>
          <p>Subtotal:{subtotal} </p>
          <p>Shipping Charges:{shippingCharges} </p>
          <p>Tax:{tax} </p>
          <p>Discount:{discount} </p>
          <p>Total:{total} </p>
          <h2 className="mt-2 font-bold">Status Info</h2>
          <span
            className={
              status === "Delivered"
                ? "text-purple-500"
                : status === "Shipped"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            Status:{status}{" "}
          </span>
          <button
            type="submit"
            onClick={updateHandler}
            className="bg-blue-300 px-3 py-1 rounded-xl w-full mt-2"
          >
            Process Status
          </button>
        </div>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, productId }: OrderItem) => (
  <Link
    to={`/product/${productId} `}
    className="flex gap-2 px-2 bg-gray-100 p-2 rounded-lg"
  >
    <div className="w-24 h-42 ">
      <img src={photo} alt="image" className="w-full h-full" />
    </div>
    <p>{name} </p>
    <p>
      ${price}X{quantity}=${price * quantity}{" "}
    </p>
  </Link>
);

export default TransactionManagement;
