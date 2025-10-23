'use client'
import { loadState } from "../../../utils/localstorage";

export default function Home() {
  const token = loadState('token');
  const users = loadState('user');

  // console.log("users", users)

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      Welcome, {users?.name || "Guest"}
    </div>
  );
}
