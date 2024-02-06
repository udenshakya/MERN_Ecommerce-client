// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useState, FormEvent } from "react";
// import toast from "react-hot-toast";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { NewOrderRequest } from "../types/api-types";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   CartReducerInitialState,
// } from "../types/reducer-types";
// import { useNewOrderMutation } from "../redux/api/orderAPI";
// import { resetCart } from "../redux/reducer/cartReducer";
// import { responseToast } from "../utils/features";
// import { RootState } from "../redux/store";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

// const CheckOutForm = () => {
//   const [isProcessing, setIsProcessing] = useState(false);

//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const {
//     shippingInfo,
//     cartItems,
//     subtotal,
//     tax,
//     discount,
//     shippingCharges,
//     total,
//   } = useSelector(
//     (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
//   );

//   const [newOrder] = useNewOrderMutation();

//   const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     const location = useLocation();
//     const clientSecret: string | undefined = location.state;
 
//     e.preventDefault();

//     if (!stripe || !elements) return;
//     setIsProcessing(true);

//     const orderData: NewOrderRequest = {
//       shippingInfo,
//       orderItems: cartItems,
//       subtotal,
//       tax,
//       discount,
//       shippingCharges,
//       total,
//       user: user?._id!,
//     };

//     const billingDetails={
//       name:user?.name || "",
//       address:{
//         line1:shippingInfo.address,
//         city:shippingInfo.city,
//         state:shippingInfo.state,
//         postal_code:shippingInfo.pinCode,
//         country:shippingInfo.country,
//       }
//     }

//     try {
//       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(PaymentElement),
//           billing_details: billingDetails,
        
//         },
//         confirmParams: { return_url: window.location.origin },
//         redirect: "if_required",
//       });
  
//       if (error) {
//         setIsProcessing(false);
//         return toast.error(error.message || "Something Went Wrong");
//       }
  
//       if (paymentIntent.status === "succeeded") {
//         const res = await newOrder(orderData);
//         dispatch(resetCart());
//         responseToast(res, navigate, "/orders");
//       }
//     } catch (error) {
//       setIsProcessing(false);
//       toast.error(error.message || "Something Went Wrong");
//     }
//   };

//   return (
//     <div className=" w-[500px] mt-10 mx-auto container">
//       <form onSubmit={submitHandler} className="container flex flex-col">
//         <div className="flex flex-col ">
//           <PaymentElement />
//         </div>
//         <button
//           type="submit"
//           disabled={isProcessing}
//           className="bg-gray-500 p-2 rounded-md mt-4 text-white hover:bg-gray-600 transition-all"
//         >
//           {isProcessing ? "Processing.." : "Pay"}{" "}
//         </button>
//       </form>
//     </div>
//   );
// };

// const CheckOut = () => {
//   const location = useLocation();
//    const clientSecret: string | undefined = location.state;

//   if (!clientSecret) return <Navigate to={"/shipping"} />;

//   return (
//     <Elements
//       stripe={stripePromise}
//       options={{
//         clientSecret,
//       }}
//     >
//       <CheckOutForm />
//     </Elements>
//   );
// };

// export default CheckOut;
