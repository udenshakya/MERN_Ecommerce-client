import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of Stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to Cart");
  };

  if (isError) toast.error("Cannot fetch the products");

  //caraousel
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "gray",
          borderRadius: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <main className="container mx-auto">
      <section className="w-full h-[500px] my-5 p-5">
        <Slider {...settings} className="w-full h-full">
          <div className="w-[500px] h-[500px]">
            <img
              src="https://s.yimg.com/os/creatr-uploaded-images/2020-01/8ed8ded0-30db-11ea-9ffa-63728c0e08f8"
              alt="hero"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-[500px] h-[500px]">
            <img
              src="https://www.sammobile.com/wp-content/uploads/2022/03/Samsung-Galaxy-A53-83.jpg"
              alt="hero"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="w-[500px] h-[500px]">
            <img
              src="https://th.bing.com/th/id/R.ae2d23ee3394a2289e234b6e98e1c0a6?rik=XJXf10flfinghQ&riu=http%3a%2f%2fecx.images-amazon.com%2fimages%2fI%2f815iZYNaLNL._SL1500_.jpg&ehk=XAEuqC8w98TexXigAX3993PtlW%2bUxjs4ne%2bjUCdwYvE%3d&risl=&pid=ImgRaw&r=0"
              alt="hero"
              className="w-full h-full object-contain"
            />
          </div>
        </Slider>
      </section>

      <section className="my-10 ">
        <div className="flex justify-between">
          <h1 className="my-5 text-2xl">LATEST PRODUCTS</h1>
          <Link
            className="text-xl bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300 transition-all h-full "
            to={"/search"}
          >
            More
          </Link>
        </div>
        {/* card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-20">
          {isLoading ? (
            <Loader />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                image={i?.image}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
