import { FaSearch, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import {  useState } from "react";
import { User } from "../types/types";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out Success");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign out failed");
    }
  };

  // const { cartTotalQuantity } = useSelector((state:RootState) => state.cartReducer);



  return (
    <nav className="flex justify-between items-center p-2 container mx-auto">
      <div className="flex justify-center items-center">
        <Link
          to={"/"}
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold"
        >
          <img
            src="https://th.bing.com/th/id/OIP.k-pxiyeD3pspj6TElI6sWAHaHa?rs=1&pid=ImgDetMain"
            className="h-12 w-40 object-cover"
          />
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search"
          className="max-w-full border-2 p-2 rounded-md mr-3"
        />
        <Link to={"/search"}>
          {" "}
          <FaSearch />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-3">
        <Link
          to={"/cart"}
          onClick={() => setIsOpen(false)}
          className="flex justify-center items-center gap-1 bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300 transition-all relative"
        >
          <FaShoppingCart />
          <p>Cart</p>
          {/* <div className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full h-5 w-5 text-xs flex justify-center items-center">
            {cartTotalQuantity}
          </div> */}
        </Link>
        <div>
          {user?._id ? (
            <div className="relative">
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <FaRegUser />
              </button>
              <dialog open={isOpen}>
                <div className="absolute right-0 top-1 p-2 rounded-md gap-2 flex flex-col bg-white z-10 ">
                  {user.role === "admin" && (
                    <Link
                      onClick={() => setIsOpen(false)}
                      to={"/admin/dashboard"}
                    >
                      Admin
                    </Link>
                  )}
                  <Link onClick={() => setIsOpen(false)} to={"/orders"}>
                    Orders
                  </Link>
                  <button onClick={logoutHandler}>
                    <FaSignOutAlt />{" "}
                  </button>
                </div>
              </dialog>
            </div>
          ) : (
            <Link to={"/login"}>
              <FaSignInAlt />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
