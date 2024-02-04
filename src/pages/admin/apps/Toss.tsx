import AdminSideBar from "../../../components/admin/AdminSideBar";
import { useState } from "react";

const Toss = () => {
  const [angle, setAngle] = useState<number>(0);

  const flipCoin = () => {
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
  };

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200">
      <AdminSideBar />
      <main className="m-3 p-3 bg-white h-screen flex flex-col justify-center items-center ">
        <h1 className="text-2xl font-bold">Toss</h1>
        <section>
          <article
            className="tosscoin"
            onClick={flipCoin}
            style={{transform:`rotateY(${angle}deg)` }}
          >
            <div></div>
            <div></div>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Toss;
