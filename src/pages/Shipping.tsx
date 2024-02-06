import { useEffect, useState, FormEvent } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import { RootState, server } from "../redux/store";
import toast from "react-hot-toast";
import { saveShippingInfo } from "../redux/reducer/cartReducer";

const Shipping = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { cartItems, total,subtotal,shippingCharges,tax,discount } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);
  {console.log(cartItems)}
  {console.log(user)}
  console.log(total)

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(saveShippingInfo({ address, city, state, country, pinCode }));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/stripe/create-checkout-session`,
        {
          amount: total,
          cartItems,
          userId:user?._id,subtotal,shippingCharges,tax,discount
        },
        { headers: { "Content-Type": "application/json" } }
      );
        if(data.url){
          window.location.href = data.url
        }
      // navigate("/pay", { state: data.clientSecret });
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div>
      <Link
        to={"/cart"}
        className="flex justify-center items-center rounded-full p-2 mt-4 bg-gray-300 h-10 w-10"
      >
        <IoMdArrowBack />
      </Link>
      <div className="h-screen w-[300px] flex flex-col  items-center mx-auto mt-4">
        <h1 className="text-xl my-4">SHIPPING ADDRESS</h1>
        <form onSubmit={submitHandler} className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Address"
            className="border p-2 mt-3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="City"
            className="border p-2 mt-3"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="State"
            className="border p-2 mt-3"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <select
            name="Country"
            className="border p-2 mt-3 "
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value={""}>Choose Country</option>
            <option value={"nepal"}>Nepal</option>
            <option value={"usa"}>USA</option>
          </select>
          <input
            type="number"
            placeholder="PIN Code"
            className="border p-2 mt-3"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-purple-700 mt-3 rounded-md px-3 py-2 text-white"
          >
            PAY NOW
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
