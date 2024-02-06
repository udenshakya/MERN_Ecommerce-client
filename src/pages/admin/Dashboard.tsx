import AdminSideBar from "../../components/admin/AdminSideBar";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import { BiMaleFemale } from "react-icons/bi";
import DashboardTable from "../../components/admin/DashboardTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useStatsQuery } from "../../redux/api/dashboardAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { getLastMonths } from "../../utils/features";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error, isError } = useStatsQuery(user?._id!);

  const stats = data?.stats!;
  console.log(stats?.chart.revenue)
  console.log(stats?.chart.order)
  console.log(stats?.latestTransaction)

  const {last6Months:months} = getLastMonths()
  

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen w-screen overflow-auto  ">
      <AdminSideBar />
      <main className="bg-gray-200 w-full md:p-3 p-1  overflow-y-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Search user={user} />
            <section className="flex justify-between flex-wrap ">
              <Card
                heading={"Revenue"}
                amount={true}
                color="rgb(0,115,255)"
                value={stats.count.revenue}
                percent={stats.changePercent.revenue}
              />
              <Card
                heading={"Users"}
                amount={false}
                color="rgb(0,198,202)"
                value={stats.count.user}
                percent={stats.changePercent.userPercent}
              />
              <Card
                heading={"Transaction"}
                amount={true}
                color="rgb(0,115,255)"
                value={stats.count.order}
                percent={stats.changePercent.orderPercent}
              />
              <Card
                heading={"Products"}
                amount={true}
                color="rgb(0,115,255)"
                value={stats.count.product}
                percent={stats.changePercent.productPercent}
              />
            </section>

            <section className="md:flex  gap-2 mt-4 p-2  ">
              <div className="text-center w-full bg-white py-4 rounded-xl">
                <h1>REVENUE & TRANSACTION</h1>
                {/* graph */}
                <BarChart
                labels={months}
                  data1={stats.chart.revenue}
                  data2={stats.chart.order}
                  title1="Revenue"
                  title2="Transaction"
                  bgColor1="rgb(0,115,255)"
                  bgColor2="rgba(53,162,235,0.8)"
                />
              </div>
              <div className="flex flex-col w-full mx-auto mt-2 md:mt-0 rounded-xl max-w-60 text-center bg-white py-4">
                <h1>INVENTORY</h1>
                <div>
                  {stats.categoryCount.map((item) => {
                    const [heading, value] = Object.entries(item)[0];

                    return (
                      <CategoryItem
                        key={heading}
                        heading={heading}
                        value={value}
                        color={`hsl(${value * 4}, ${value}%, 50%)`}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="md:flex m-2 gap-3">
              {/* chart */}
              <div className="rounded-lg p-3 bg-white relative ">
                <h1 className="text-center mb-4">GENDER RATIO</h1>
                <div className="">
                  <div className="flex justify-center items-center">
                    <DoughnutChart
                      labels={["Female", "Male"]}
                      data={[stats.userRatio.female,stats.userRatio.male]}
                      backgroundColor={[
                        "hsl(340,82%,56%)",
                        "rgba(53,162,235,0.8)",
                      ]}
                      cutout={90}
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <BiMaleFemale />
                  </div>
                </div>
              </div>
              {/* table */}
              <div className="rounded-lg p-3 mt-3 md:mt-0 bg-white w-full">
                <DashboardTable data={stats.latestTransaction} />
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

// Components

const Search = ({user}:{user:any}) => (
  <section>
    <div className="flex justify-between items-center w- px-4 py-2 ml-10 md:ml-0">
      <div className="flex justify-center items-center gap-2">
        <div className="text-xl">
          <CiSearch />
        </div>
        <input
          className="rounded-2xl px-3 py-2 w-full "
          type="text"
          placeholder="Search for data"
        />
      </div>
      <div className="flex justify-center items-center gap-2">
        <div className="text-xl">
          <CiBellOn />
        </div>
        <img
          className="h-5 w-5 rounded-full"
          src={user?.photo}
          alt="profile "
        />
      </div>
    </div>
  </section>
);

interface CardProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const Card = ({ heading, value, percent, color, amount }: CardProps) => (
  <section className="flex justify-center items-center w-50 p-4 bg-white rounded-lg md:gap-3 m-2">
    <div>
      <p>{heading}</p>
      <h1>{amount ? `$${value}` : value}</h1>
      <p className="">
        {percent > 0 ? (
          <span className="text-green-400 flex text-sm">
            <IoIosTrendingUp />+{percent}%
          </span>
        ) : (
          <span className="text-red-400 flex text-sm">
            <IoIosTrendingDown /> {percent}%
          </span>
        )}
      </p>
    </div>
    <div
      className="relative h-20 w-20 grid place-items-center rounded-full bg-red-400 before:absolute before:h-16 before:w-16 before:rounded-full  before:bg-white "
      style={{
        background: `conic-gradient(${color} ${
          (Math.abs(percent) / 100) * 360
        }deg,rgb(255,255,255) 0  )`,
      }}
    >
      <span className="relative" style={{ color }}>
        {percent >= 0 && `${percent > 10000 ? 9999 : percent}%`}
        {percent < 0 && `${percent < -10000 ? -9999 : percent}%`}
       
      </span>
    </div>
  </section>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="flex justify-between items-center gap-3 px-4 mt-4">
    <h5 className="w-full">{heading} </h5>
    <div className="w-full rounded-xl overflow-hidden bg-gray-300  h-2 m-2">
      <div
        style={{ backgroundColor: color, width: `${value}%` }}
        className="w-full  h-full"
      ></div>
    </div>
    <span className="text-sm w-7">{value}% </span>
  </div>
);

export default Dashboard;
