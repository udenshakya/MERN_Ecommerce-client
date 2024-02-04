import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: ProductProps) => {
  return (
    <div>
        <div className="md:w-56 w-48 h-72 hover:bg-gray-500/20 duration-75 transition-all p-2 rounded-lg group ">
      <Link to={`/product/${productId}`}>
          <img
            src={`${server}/${photo}`}
            alt="img"
            className="w-full h-[70%] rounded-md object-contain"
          />
          <p className="text-center">{name} </p>
          <p className="text-center">${price}</p>
            </Link>
          <div className="group-hover:flex hidden justify-center items-center transition-all ">
            <button
              onClick={() =>
                handler({ productId, photo, price, name, stock, quantity: 1 })
              }
              className="  w-[60%] h-10 p-2 bg-red-400 rounded-md hover:bg-red-500  transition-all"
            >
              Add to Cart
            </button>
          </div>
        </div>
    </div>
  );
};

export default ProductCard;
