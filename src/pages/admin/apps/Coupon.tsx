import AdminSideBar from "../../../components/admin/AdminSideBar";
import { useState, FormEvent, useEffect } from "react";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState(8);
  const [prefix, setPrefix] = useState("");
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [includeSybmols, setIncludeSymbols] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [coupon, setCoupon] = useState("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true)
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!includeCharacters && !includeNumber && !includeSybmols)
      return alert("Please Select At least One ");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;
    for (let i = 0; i < loopLength; i++) {
      let entireString = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumber) entireString += allNumbers;
      if (includeSybmols) entireString += allSymbols;

      const randomNum = Math.floor(Math.random() * entireString.length);
      result += entireString[randomNum];
    }
    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false)
  }, [coupon]);

  return (
    <div className="md:grid grid-cols-[1fr,4fr] h-screen bg-gray-200">
      <AdminSideBar />
      <main className="m-3 p-3 overflow-y-auto bg-white h-screen flex flex-col gap-10 justify-center items-center">
        <h1 className="text-xl font-bold">Coupon</h1>
        <form
          onSubmit={submitHandler}
          className=" md:w-1/2 mx-auto flex flex-col gap-4"
        >
          <div className="md:flex gap-3 w-full">
            <input
              type="text"
              placeholder="Text to include"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={size}
              className="border-2 p-2 mb-2 md:mb-0 w-full"
            />
            <input
              type="number"
              placeholder="Coupon length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
              className="border-2 p-2 w-full"
            />
          </div>
          <div className="relative border-2 px-4 py-6 flex justify-center items-center gap-5 w-full">
            <span className="absolute z-10 left-3 -top-4 p-1 bg-white ">
              Include
            </span>
            <label>
              <input
                type="checkbox"
                checked={includeNumber}
                onChange={() => setIncludeNumber((prev) => !prev)}
                className="mx-1"
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
                className="mx-1"
              />
              Characters
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeSybmols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
                className="mx-1"
              />
              Symbols
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 w-full rounded-lg"
          >
            Generate
          </button>
        </form>
        <div className="relative group">
          {coupon && (
            <code>
              {coupon}
              <span
                className="absolute -bottom-5 w-full bg-blue-200 rounded-lg text-center hidden group-hover:block cursor-pointer"
                onClick={() => copyText(coupon)}
              >
                {isCopied ? "Copied" : "Copy"}
              </span>
            </code>
          )}
        </div>
      </main>
    </div>
  );
};

export default Coupon;
