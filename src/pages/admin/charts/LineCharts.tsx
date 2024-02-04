import toast from "react-hot-toast";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import { LineChart } from "../../../components/admin/Charts";
import { CustomError } from "../../../types/api-types";
import { getLastMonths } from "../../../utils/features";
import { useSelector } from "react-redux";
import { useLineQuery } from "../../../redux/api/dashboardAPI";
import { RootState } from "../../../redux/store";
import Loader from "../../../components/Loader";

const { last12Months: months } = getLastMonths();

const LineCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = useLineQuery(user?._id!);

  const products = data?.charts.products || [];
  const users = data?.charts.users || [];
  const revenue = data?.charts.revenue || [];
  const discount = data?.charts.discount || [];

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
            <h1 className="text-center mx-3 text-xl">Line Charts</h1>
            <section>
              <LineChart
                data={users}
                label="Users"
                borderColor="rgb(53,162,255)"
                backgroundColor="rgb(53,162,255,0.5)"
                labels={months}
              />
              <h2 className="text-center text-xl">Active Users</h2>
            </section>
            <section>
              <LineChart
                data={products}
                backgroundColor={"hsla(269,80%,40%,0.4)"}
                borderColor={"hsl(269,80%,40%)"}
                label="Products"
                labels={months}
              />
              <h2 className="text-center text-xl">Total Products (SKU)</h2>
            </section>
            <section>
              <LineChart
                data={revenue}
                backgroundColor={"hsla(129,80%,40%,0.4)"}
                borderColor={"hsl(129,80%,40%)"}
                label="Revenue"
                labels={months}
              />
              <h2 className="text-center text-xl">Total Revenue</h2>
            </section>
            <section>
              <LineChart
                data={discount}
                backgroundColor={"hsla(29,80%,40%,0.4)"}
                borderColor={"hsl(29,80%,40%)"}
                label="Discount"
                labels={months}
              />
              <h2 className="text-center text-xl">Discount Allotted</h2>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default LineCharts;
