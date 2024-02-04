import { useEffect, useState } from "react";
import AdminSideBar from "../../../components/admin/AdminSideBar";


const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const formatTime = (timeInSeconds: number) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
  
    const hoursInString = hours.toString().padStart(2, "0");
    const minutesInString = minutes.toString().padStart(2, "0");
    const secondsInString = seconds.toString().padStart(2, "0");
  
    return `${hoursInString}:${minutesInString}:${secondsInString}`;
  };
  
  const resetHandler =()=>{
    setTime(0)
    setIsRunning(false)
  
  }
  

  useEffect(() => {
    let intervalID: any;
    if (isRunning)
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
 
    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200">
      <AdminSideBar />
      <main className="m-3 p-3 overflow-y-auto bg-white h-screen flex flex-col gap-16 justify-center items-center">
        <h1 className="text-center text-xl font-bold">Stopwatch</h1>
        <div className="mx-auto w-1/2  flex flex-col justify-center items-center">
          <h2 className="text-xl">{formatTime(time)}</h2>
          <div className="flex gap-2 mt-4">
            <button onClick={()=>setIsRunning((prev)=>!prev)} className="rounded-lg px-4 py-2 text-white bg-blue-500">
              {isRunning?'Stop':'Start'}
            </button>
            <button onClick={resetHandler} className="rounded-lg px-4 py-2 text-white bg-red-500">
              Reset
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stopwatch;
