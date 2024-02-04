import AdminSideBar from "../../../components/admin/AdminSideBar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { categoriess } from "../../../assets/data.json";
import { CustomError } from "../../../types/api-types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { usePieQuery } from "../../../redux/api/dashboardAPI";
import Loader from "../../../components/Loader";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = usePieQuery(user?._id!);

  const order = data?.charts.orderFullfillment!;
  const categories = data?.charts.productCategories!;
  const stock = data?.charts.stockAvailablity!;
  const revenue = data?.charts.revenueDistribution!;
  const ageGroup = data?.charts.usersAgeGroup!;
  const adminCustomer = data?.charts.adminCustomer!;

  // console.log(order,categories,stock,revenue,ageGroup,adminCustomer);

  console.log(data?.charts!.usersAgeGroup! || 0)

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
            <h1 className="text-center mx-3 text-xl">Pie & Doughnut Charts</h1>
            <section>
              <div className="h-[30%] w-[30%] mx-auto mt-4">
                <PieChart
                  labels={["Processing", "Shipped", "Delivered"]}
                  data={[order?.processing || 0, order?.shipped || 0, order?.delivered || 0]}
                  backgroundColor={[
                    `hsl(110,80%,80%)`,
                    `hsl(110,80%,50%)`,
                    `hsl(110,40%,80%)`,
                  ]}
                  offset={[0, 0, 30]}
                />
                <h2 className="text-center text-xl">Order Fulfillment Ratio</h2>
              </div>
              <div>
                <div className="h-[30%] w-[30%] mx-auto mt-4">
                  <DoughnutChart
                    labels={categories?.map((item) => Object.keys(item)[0])}
                    data={categories?.map((item) => Object.values(item)[0])}
                    backgroundColor={categoriess.map(
                      (item) => `hsl(${item.value * 4},${item.value}%,50%)`
                    )}
                    offset={[0, 0, 0, 30]}
                    legends={false}
                  />
                </div>
                <h2 className="text-center text-xl">Product Category Ratio</h2>
              </div>
              <div>
                <div className="h-[30%] w-[30%] mx-auto mt-4">
                  <DoughnutChart
                    labels={["In Stock", "Out of Stock"]}
                    data={[stock?.inStock || 0, stock?.outOfStock || 0]}
                    backgroundColor={[`hsl(269,80%,40%)`, `rgb(53,162,255) `]}
                    offset={[0, 30]}
                    legends={false}
                    cutout={"70%"}
                  />
                </div>
                <h2 className="text-center text-xl">Stock Availablity</h2>
              </div>
              <div className="h-[30%] w-[30%] mx-auto mt-4">
                <DoughnutChart
                  labels={[
                    "Marketing Cost",
                    "Discount",
                    "Burnt",
                    "Production Cost",
                    "Net Margin",
                  ]}
                  data={[
                    revenue?.marketingCost || 0,
                    revenue?.discount || 0,
                    revenue?.burnt || 0,
                    revenue?.productionCost || 0,
                    revenue?.netMargin || 0,
                  ]}
                  backgroundColor={[
                    "hsl(110,80%,40%)",
                    "hsl(19,80%,40%)",
                    "hsl(69,80%,40%)",
                    "hsl(300,80%,40%)",
                    "rgb(53, 162, 255)",
                  ]}
                  legends={false}
                  offset={[20, 30, 20, 30, 80]}
                />
                <h2 className="text-center text-xl">Revenue Distribution</h2>
              </div>
              <section>
                <div className="h-[30%] w-[30%] mx-auto mt-4">
                  <PieChart
                    labels={[
                      "Teenager(Below 20)",
                      "Adult (20-40)",
                      "Older (above 40)",
                    ]}
                    data={[ageGroup?.teen || 0, ageGroup?.adult || 0, ageGroup?.old || 0]}
                    backgroundColor={[
                      `hsl(10, ${80}%, 80%)`,
                      `hsl(10, ${80}%, 50%)`,
                      `hsl(10, ${40}%, 50%)`,
                    ]}
                    offset={[0, 0, 50]}
                  />
                </div>
                <h2 className="text-center text-xl">Users Age Group</h2>
              </section>

              <section>
                <div className="h-[30%] w-[30%] mx-auto mt-4">
                  <DoughnutChart
                    labels={["Admin", "Customers"]}
                    data={[adminCustomer?.admin || 0, adminCustomer?.customer || 0]}
                    backgroundColor={[
                      `hsl(335, 100%, 38%)`,
                      "hsl(44, 98%, 50%)",
                    ]}
                    offset={[0, 80]}
                  />
                </div>
              </section>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default PieCharts;
