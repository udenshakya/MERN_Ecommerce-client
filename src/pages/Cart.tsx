import { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import CartItemCard from "../components/CartItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-types";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import {
  addToCart,
  calculatePrice,
  decreaseCart,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import axios from "axios";
import { server } from "../redux/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const [couponCode, setCouponCode] = useState("");
  const [isValidCouponCode, setIsValidCouponCode] = useState(false);
  const dispatch = useDispatch();

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.cartQuantity >= cartItem.stock) return;
    // dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    dispatch(addToCart(cartItem))
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.cartQuantity <= 1) return;

    // dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    dispatch(decreaseCart(cartItem))
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems,dispatch]);

  useEffect(() => {
    const {token:cancelToken,cancel} = axios.CancelToken.source()

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken})
        .then((res) => {
          dispatch(discountApplied(res.data.discount))
          setIsValidCouponCode(true);
          dispatch(calculatePrice());

        })
        .catch(() => {
          dispatch(discountApplied(0))
          setIsValidCouponCode(false);
          dispatch(calculatePrice());

        });
    },1000);

    return()=>{
      clearTimeout(timeOutID)
      cancel()
      setIsValidCouponCode(false)
      
    }
  }, [couponCode]);

  return (
    <div className="md:flex gap-10 mt-10 container mx-auto">
      <div className="flex-[2] flex flex-col gap-5 ">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItemCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={item.productId}
              cartItem={item}
            />
          ))
        ) : (
          <h1>No Items Added</h1>
        )}
      </div>
      <div className="flex-[1] flex flex-col gap-2 mt-10">
        <p>Subtotal:{subtotal} </p>
        <p>Shipping Charges:{shippingCharges} </p>
        <p>Tax:{tax} </p>
        <p>Discount:{discount} </p>
        <p>Total:{total} </p>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
          className="p-2 border mt-2 w-fit"
        />
        <div className="h-4">
          {couponCode &&
            (isValidCouponCode ? (
              <span className="text-green-500 -mt-2 h-4">
                ${discount} off using the <code> {couponCode}</code>
              </span>
            ) : (
              <span className="flex text-red-500 -mt-2 h-4">
                Invalid Coupon <MdErrorOutline />
              </span>
            ))}
        </div>
        {cartItems.length > 0 && (
          <Link
            to={"/shipping"}
            className="mt-6 w-fit px-3 py-2 rounded-md bg-purple-500"
          >
            Check Out
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
