import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-types";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { CartItem } from "../types/types";
import { addToCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch()

  const { data: searchedData, isLoading: productLoading,isError:productIsError,error:productError } =
    useSearchProductsQuery({
      search,
      sort,
      category,
      page,
      price: maxPrice,
    });

    const addToCartHandler = (cartItem:CartItem) => {
      if(cartItem.stock < 1) return toast.error("Out of Stock")
  
      dispatch(addToCart(cartItem))
      toast.success("Added to Cart")
    };

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="grid grid-cols-[1fr,3fr] container mx-auto gap-5 h-full mt-10">
      <div className="flex flex-col gap-2">
        <h1>FILTERS</h1>
        <h2>Sort</h2>
        <select
          name="sort"
          className="border-2 p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">None</option>
          <option value="asc">Price (Low to High) </option>
          <option value="dsc">Price (High to Low) </option>
        </select>
        <h2>Max Price:{maxPrice || ""} </h2>
        <input
          type="range"
          min={100}
          max={1000000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <h2>Category</h2>
        <select
          name="category"
          className="border-2 p-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          {!loadingCategories &&
            categoriesResponse?.categories.map((i) => (
              <option key={i} value={i}>
                {i.toUpperCase()}{" "}
              </option>
            ))}
        </select>
      </div>

      <div>
        <h1 className="text-2xl mb-4">PRODUCTS</h1>
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {productLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 overflow-y-auto w-full h-full gap-x-2 mt-4">
            {searchedData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                image={i.image}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
              />
            ))}
          </div>
        )}

        {searchedData && searchedData.totalPage > 1 && (
          <div className="flex justify-center mx-auto w-full">
            <button
              className="px-1 bg-gray-300 rounded-md hover:bg-gray-400"
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchedData.totalPage}
            </span>
            <button
              className="px-1 bg-gray-300 rounded-md hover:bg-gray-400"
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
