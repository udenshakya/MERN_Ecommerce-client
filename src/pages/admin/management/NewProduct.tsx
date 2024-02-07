import AdminSideBar from "../../../components/admin/AdminSideBar";
import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useNewProductMutation } from "../../../redux/api/productAPI";
import { useNavigate } from "react-router-dom";
import { responseToast } from "../../../utils/features";

const NewProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  // const [photo, setPhoto] = useState<File>();
  const [photoPrev, setPhotoPrev] = useState<string>("");

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          // setPhoto(file);
        }else{
          setPhotoPrev("")
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || !stock || !category || !photoPrev) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price.toString());
    formData.set("stock", stock.toString());
    formData.set("image", photoPrev);
    formData.set("category", category);


    const res = await newProduct({ id: user?._id!, formData });
    console.log(res)

    responseToast(res, navigate, "/admin/product");
  };

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200">
      <AdminSideBar />
      <main className="p-4  rounded-xl m-2 h-screen ">
        <form
          onSubmit={submitHandler}
          className="flex flex-col py-2 bg-white gap-10 justify-center  items-center max-w-2xl mx-auto"
        >
          <h2 className="text-center text-xl mt-5">New Product</h2>
          <div className="flex flex-col min-w-64 pb-4 gap-3 justify-center items-center">
            <div className="mb-2  w-full">
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="p-1  border-2 rounded-lg mt-1 w-full"
              />
            </div>
            <div className="mb-2  w-full">
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="p-1 border-2 rounded-lg mt-1 w-full"
              />
            </div>
            <div className="mb-2  w-full">
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
                className="p-1 border-2 rounded-lg mt-1 w-full"
              />
            </div>
            <div className="mb-2  w-full">
              <label>Category</label>
              <input
                type="text"
                placeholder="eg: Laptop, camera, etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="p-1 border-2 rounded-lg mt-1 w-full"
              />
            </div>
            <div className="mb-2  w-full">
              <label>Photo</label>
              <input
                type="file"
                onChange={changeImageHandler}
                required
                className="p-1 border-2 rounded-lg mt-1 w-full"
              />
            </div>
            {photoPrev && <img src={photoPrev} alt="photo" className="w-20 h-20" />}
            <button
              type="submit"
              className="bg-blue-300 px-3 py-1 rounded-xl w-full"
            >
              Create
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewProduct;
