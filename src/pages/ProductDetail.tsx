import { useParams } from "react-router-dom";
import { useProductsDetailsQuery } from "../redux/api/productAPI";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { data } = useProductsDetailsQuery(params.id!);

  const photo = data?.product.image.url!;
  const name = data?.product.name!;
  const price = data?.product.price!;
  const stock = data?.product.stock!;
  const category = data?.product.category!;
  const productId = data?.product._id!;

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  return (
    <div>
      <main className="sm:grid h-[80vh] place-items-center p-3 bg-gray-100 container mx-auto grid-cols-2 gap-6  mt-10">
        <div className="h-[300px] w-[400px]">
          <img src={photo} className="rounded-lg w-full h-full object-contain" />
        </div>

        <div className="flex flex-col gap-6 justify-center">
          <h1 className="text-4xl font-bold text-center">{name} </h1>
          <h1>Instock:{stock} </h1>
          <h1 className="text-sm">productid:{productId} </h1>
          <h1 className="text-lg">Category:{category} </h1>
          <h1 className="text-2xl font-bold text-center">Price:${price} </h1>
          <button
            onClick={() =>
              addToCartHandler({
                productId,
                photo,
                price,
                name,
                stock,
                quantity: 1,
                cartQuantity:1
              })
            }
            className="  w-[60%] h-10 p-2 mx-auto bg-red-400 rounded-md hover:bg-red-500  transition-all"
          >
            Add to Cart
          </button>{" "}
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
