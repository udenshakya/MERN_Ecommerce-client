import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "../types/api-types";

const Login =  () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      console.log({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
      }
    } catch (error) {
      toast.error("Sign In Fail");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-[400px] mx-auto ">
      <div className="flex flex-col w-full border-2 p-5 shadow-md ">
        <h1 className="text-center text-2xl mb-8">LOGIN</h1>
        <label className="mt-3">Gender </label>
        <select
          name="gender"
          className="p-2 border mt-3"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value={""}>Select Gender</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </select>
        <label className="mt-3">Date of Birth</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border mt-3"
        />
        <p className="text-center mt-3">Already Signed in?</p>
        <button
          onClick={loginHandler}
          className="flex justify-center items-center gap-2 bg-purple-400 px-4 py-2 rounded-md mt-4 mx-auto "
        >
          <FaGoogle /> Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
