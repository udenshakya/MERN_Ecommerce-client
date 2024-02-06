import { IoMdHappy } from "react-icons/io";
import { RootState } from "../redux/store";
import { CartReducerInitialState } from "../types/reducer-types";
import { useDispatch, useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { NewOrderRequest } from "../types/api-types";
import { resetCart } from "../redux/reducer/cartReducer";
import { useEffect } from "react";

const CheckOutSuccess = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const {
    cartItems,
    total,
    subtotal,
    shippingCharges,
    tax,
    discount,
    shippingInfo,
  } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );


  const dispatch = useDispatch();

  const [newOrder] = useNewOrderMutation();

  const orderData: NewOrderRequest = {
    shippingInfo,
    orderItems: cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
    user: user?._id!,
  };

  // Check if there is a success message in the URL (coming from Stripe redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successStatus = urlParams.get("status");
    const sessionId = urlParams.get("sessionId");

    console.log(successStatus);
    console.log(sessionId);

    if (successStatus === "success" && sessionId) {
      // If payment is successful, dispatch newOrder
      const dispatchNewOrder = async () => {
        try {
          // Fetch additional order data if needed
          // ...

          // Dispatch newOrder action
          const res= await newOrder(orderData);
          console.log(orderData);
          console.log(res)
          dispatch(resetCart());
          // responseToast(res, navigate, "/orders");

        } catch (error) {
          console.error("Error dispatching newOrder:", error);
        }
      };
      dispatchNewOrder();
    }
  }, [dispatch]);

  return (
    <div className="h-screen w-full flex justify-center items-center pb-5">
      <div className="flex flex-col">
        <div className="flex justify-center text-6xl mb-5 text-green-500">
          <IoMdHappy />
        </div>

        <p className="text-2xl">Order Has Been Placed Successfully!</p>
      </div>
    </div>
  );
};

export default CheckOutSuccess;
