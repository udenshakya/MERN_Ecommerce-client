import { Link } from "react-router-dom";
import { FaMinus, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";


type CartItemProps = {
  cartItem: CartItem;
  incrementHandler:(cartItem:CartItem)=>void
  decrementHandler:(cartItem:CartItem)=>void
  removeHandler:(id:string)=>void
};


const CartItem = ({ cartItem,incrementHandler,decrementHandler,removeHandler }: CartItemProps) => {
    const {photo,productId,name,price,quantity}=cartItem

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <img
            className="h-20 w-20 rounded-md"
            src={`${server}/${photo}`}
            
            alt="img"
          />
          <div className="flex flex-col">
            <Link to={`/product/${productId} `}>{name}</Link>
            <p>${price} </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 px-1">
        
          
          <button onClick={()=>decrementHandler(cartItem)} className="p-2 bg-gray-200 rounded-md text-xs hover:bg-gray-300 duration-150"><FaMinus/> </button>
          <span>{quantity} </span>
          <button onClick={()=>incrementHandler(cartItem)} className="p-2 bg-gray-200 rounded-md text-xs hover:bg-gray-300 duration-150"><FaPlus />
 </button>
          <button onClick={()=>removeHandler(productId)} className="p-2 bg-gray-200 rounded-md text-xs hover:bg-gray-300 duration-150"><FaRegTrashAlt /> </button>


        </div>
      </div>
    </div>
  );
};

export default CartItem;
