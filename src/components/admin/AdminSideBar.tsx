import { Link, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaPeopleGroup, FaStopwatch20, FaChartLine } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { IoBarChartSharp } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { CiBitcoin } from "react-icons/ci";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

interface Props {
  url: string;
  icon: any;
  text: string;
}

const SidebarItem = ({ url, icon, text }: Props) => {
  const location = useLocation();

  return (
    <div
      className={`flex justify-center items-center px-4 py-0.5 gap-2 ${
        location.pathname.includes(url)
          ? "bg-blue-200   rounded-xl"
          : "bg-white"
      } `}
    >
      {icon}
      <Link to={url}>{text}</Link>
    </div>
  );
};

const AdminSideBar = () => {
  const [toggleNav, setToggleNav] = useState(false);
  return (
    <main>
      {toggleNav ? (
        <div className={`flex flex-col p-6 gap-2 items-start h-screen bg-white fixed left-0  top-0 z-10 w-1/2 md:hidden `}>
          <div className="-ml-4 -mt-2">
            <IoMdClose
              className="text-2xl z-50 ml-3"
              onClick={() => setToggleNav(false)}
            />
          </div>
          <Link to={"/admin/dashboard"}>
            <Link to={"/admin/dashboard"}>ADMIN PANEL</Link>
          </Link>
          <h2 className="mt-5 text-xs">DASHBOARD</h2>
          <SidebarItem
            url={"/admin/dashboard"}
            icon={<MdDashboard />}
            text={"Dashboard"}
          />
          <SidebarItem
            url={"/admin/product"}
            icon={<MdOutlineProductionQuantityLimits />}
            text={"Product"}
          />
          <SidebarItem
            url={"/admin/customer"}
            icon={<FaPeopleGroup />}
            text={"Customer"}
          />
          <SidebarItem
            url={"/admin/transaction"}
            icon={<GrTransaction />}
            text={"Transaction"}
          />
          <h2 className="mt-4 text-xs">CHARTS</h2>
          <SidebarItem
            url={"/admin/chart/bar"}
            icon={<IoBarChartSharp />}
            text={"Bar"}
          />
          <SidebarItem
            url={"/admin/chart/pie"}
            icon={<FaChartPie />}
            text={"Pie"}
          />
          <SidebarItem
            url={"/admin/chart/line"}
            icon={<FaChartLine />}
            text={"Line"}
          />
          <h2 className="mt-4 text-xs">APPS</h2>
          <SidebarItem
            url={"/admin/stopwatch"}
            icon={<FaStopwatch20 />}
            text={"Stopwatch"}
          />
          <SidebarItem
            url={"/admin/coupon"}
            icon={<RiCoupon2Line />}
            text={"Coupon"}
          />
          <SidebarItem url={"/admin/toss"} icon={<CiBitcoin />} text={"Toss"} />
        </div>
      ) : (
        <div className="fixed top-15 left-2 bg-white rounded-full p-2 h-10 w-10 md:hidden z-20">
          <RxHamburgerMenu
            className="text-2xl z-50  "
            onClick={() => setToggleNav(true)}
          />{" "}
        </div>
      )}

      <div className="md:flex flex-col p-6 gap-2 items-start w-full h-screen bg-white hidden">
        <Link to={"/admin/dashboard"}>
          <Link to={"/admin/dashboard"}>ADMIN PANEL</Link>
        </Link>
        <h2 className="mt-5 text-xs">DASHBOARD</h2>
        <SidebarItem
          url={"/admin/dashboard"}
          icon={<MdDashboard />}
          text={"Dashboard"}
        />
        <SidebarItem
          url={"/admin/product"}
          icon={<MdOutlineProductionQuantityLimits />}
          text={"Product"}
        />
        <SidebarItem
          url={"/admin/customer"}
          icon={<FaPeopleGroup />}
          text={"Customer"}
        />
        <SidebarItem
          url={"/admin/transaction"}
          icon={<GrTransaction />}
          text={"Transaction"}
        />
        <h2 className="mt-4 text-xs">CHARTS</h2>
        <SidebarItem
          url={"/admin/chart/bar"}
          icon={<IoBarChartSharp />}
          text={"Bar"}
        />
        <SidebarItem
          url={"/admin/chart/pie"}
          icon={<FaChartPie />}
          text={"Pie"}
        />
        <SidebarItem
          url={"/admin/chart/line"}
          icon={<FaChartLine />}
          text={"Line"}
        />
        <h2 className="mt-4 text-xs">APPS</h2>
        <SidebarItem
          url={"/admin/stopwatch"}
          icon={<FaStopwatch20 />}
          text={"Stopwatch"}
        />
        <SidebarItem
          url={"/admin/coupon"}
          icon={<RiCoupon2Line />}
          text={"Coupon"}
        />
        <SidebarItem url={"/admin/toss"} icon={<CiBitcoin />} text={"Toss"} />
      </div>
    </main>
  );
};

export default AdminSideBar;
