//src/app/admin/login/page.js

"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchWithWait } from "../../../../helper/method";
import { adminLoginAction } from "@/redux/actions/userLoginActions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const LoginForm = () => {


  const [form, setForm] = useState({ email: "", password: "" });
  const [reserr, setReserr] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchWithWait({ dispatch, action: adminLoginAction(form) }).then((res) => {

      if (res.status === 200) {
        // window.location.reload();
        router.push('/admin/puja/list')
      } else {
        alert(res.message)
        setReserr(res.message)
      } 
    }).catch((e) => {
      console.log(`error`, e)
    })
  };


  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form className="space-y-4">
        <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded-md" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded-md" required />
         {reserr && (
            <p className="text-red-600 text-sm mt-1">{reserr}</p>
          )}
        <button type="button" onClick={(e) => handleSubmit(e)} className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700">Login</button>
        {/* <span>Have not an account? <Link href={'/admin/registration'} >Registration</Link></span> */}
      </form>
    </div>
  );
}

export default LoginForm;