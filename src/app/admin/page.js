'use client'
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { loadState } from "../../../utils/localstorage";

export default function Home() {
  const { users } = useSelector((state) => state.loginUser);
  const token = loadState('token');

  console.log("users", users)

  // useEffect(() => {
  //   if(token){
  //      window.location.reload();
  //   }
  // }, [token]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Welcome, {users?.name || "Guest"}
    </div>
  );
}
