import { Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";
import {
  useDeleteProductMutation,
  useProductsDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productAPI";
import { server } from "../../../redux/store";
import { responseToast } from "../../../utils/features";
import { FaTrash } from "react-icons/fa";


const ProductManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();

  const { data ,isError} = useProductsDetailsQuery(params.id!);

  const { photo, category, name, stock, price } = data?.product || {
    photo: "",
    category: "",
    name: "",
    stock: 0,
    price: 0,
  };

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      formData,
      userId: user?._id!,
      productId: data?.product._id!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id!,
      productId: data?.product._id!,
    });
    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
    }
  }, [data]);

  if(isError) return <Navigate to={"/404"} />


  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen w-full bg-gray-200">
      <AdminSideBar />
      <main className="md:flex flex-col mx-auto md:flex-row  gap-2 justify-center items-center px-4 m-2">
        <div className="flex flex-col gap-2 p-3 w-64 h-[546px] bg-white justify-center shadow-lg mx-auto mb-10 md:mb-0">
          {stock > 0 ? (
            <span className="text-red-400 text-end">{stock} Available</span>
          ) : (
            <span className="text-red-400 text-end">Not Available</span>
          )}
          <p className="text-sm">ID : {data?.product._id} </p>
          <div className="h-64 w-52 mx-auto mt-5">
            <img
              src={`${server}/${photo}`}
              alt="product"
              className="w-full h-full object-cover rounded-lg "
            />
          </div>
          <p className="text-center">{name} </p>
          <span className="text-center text-2xl font-bold">${price} </span>
        </div>
        <div className="flex flex-col relative  min-w-60  bg-white p-3 shadow-lg">
          <button
            onClick={deleteHandler}
            className="absolute top-3 right-3 bg-gray-200 p-2 rounded-full"
          >
            <FaTrash />
          </button>
          <h1 className="text-center text-xl">MANAGE</h1>
          <form
            onSubmit={submitHandler}
            className="flex flex-col py-2 bg-white gap-10 justify-center  items-center max-w-2xl mx-auto"
          >
            <div className="flex flex-col min-w-64 pb-4 gap-3 justify-center items-center">
              <div className="mb-2  w-full">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={nameUpdate}
                  onChange={(e) => setNameUpdate(e.target.value)}
                  
                  className="p-1  border-2 rounded-lg mt-1 w-full"
                />
              </div>
              <div className="mb-2  w-full">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  value={priceUpdate}
                  onChange={(e) => setPriceUpdate(Number(e.target.value))}
                  
                  className="p-1 border-2 rounded-lg mt-1 w-full"
                />
              </div>
              <div className="mb-2  w-full">
                <label>Stock</label>
                <input
                  type="number"
                  placeholder="Stock"
                  value={stockUpdate}
                  onChange={(e) => setStockUpdate(Number(e.target.value))}
                  
                  className="p-1 border-2 rounded-lg mt-1 w-full"
                />
              </div>
              <div className="mb-2  w-full">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="Stock"
                  value={categoryUpdate}
                  onChange={(e) => setCategoryUpdate(e.target.value)}
                  
                  className="p-1 border-2 rounded-lg mt-1 w-full"
                />
              </div>
              <div className="mb-2  w-full">
                <label>Photo</label>
                <input
                  type="file"
                  onChange={changeImageHandler}
                  
                  className="p-1 border-2 rounded-lg mt-1 w-full"
                />
              </div>
              {photoUpdate && (
                <img src={photoUpdate} alt="photo" className="w-20 h-20" />
              )}
              <button
                type="submit"
                className="bg-blue-300 px-3 py-1 rounded-xl w-full"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProductManagement;
