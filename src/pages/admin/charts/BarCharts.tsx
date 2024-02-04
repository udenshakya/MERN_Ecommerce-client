import AdminSideBar from "../../../components/admin/AdminSideBar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader";
import { getLastMonths } from "../../../utils/features";




const BarCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  
  const {last12Months,last6Months} = getLastMonths()
  
  const { isLoading, data, error, isError } = useBarQuery(user?._id!);

  const products = data?.charts.products || [];
  const orders = data?.charts.orders || [];
  const users = data?.charts.users || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200">
      <AdminSideBar />
      <main className="m-3 p-3 overflow-y-auto bg-white">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-center mx-3 text-xl">Bar Charts</h1>
            <section>
              <BarChart
                data1={products}
                data2={users}
                labels={last6Months}
                title1="Products"
                title2="Users"
                bgColor1={`hsl(260,50%,30%)`}
                bgColor2={`hsl(360,90%,90%)`}
              />
            </section>
            <section className="mt-7 ">
              <h2 className="text-center text-xl">
                Top Selling Products & Top Customers
              </h2>
              <BarChart
                horizontal={true}
                data1={orders}
                data2={[]}
                title1="Products"
                title2=""
                bgColor1={`hsl(260,50%,30%)`}
                bgColor2={""}
                labels={last12Months}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default BarCharts;
