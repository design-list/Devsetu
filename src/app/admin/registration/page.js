"use client";
import { useState } from "react";
import Link from "next/link";
import { fetchWithWait } from "../../../../helper/method";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { validateFields } from "../../../../helper/validateFields";
import { userRegistrationAction } from "@/redux/actions/userLoginActions";

const Registration = () => {


  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [errors, setErrors] = useState({}); 

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {

  e.preventDefault();

  const { isValid, errors: validationErrors } = validateFields([form], [
      "name",
      "email",
      "password",
      "phone",
    ]);

    setErrors(validationErrors[0]);
    if (!isValid) return;

     fetchWithWait({ dispatch, action: userRegistrationAction(form) }).then((res) => {
      if (res.status === 200) {
        alert(res.message)
        router.push('/admin/login')
      } else {
        console.log("Error:", res.error);
        alert(res.error)
      }
    }).catch((e) => {
      console.log(`error`, e)
    })
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        <div>
          <input 
          type="text" 
          name="name" 
          onChange={handleChange} 
          placeholder="Full Name" 
          className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
            errors.name ? "border-red-500" : "focus:ring-red-500"
          }`}
        />
          {errors.name && (
              <p className="text-red-600 text-sm mt-1">Name is required</p>
            )}
        </div>
        <div>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            placeholder="Email" 
            className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
            errors.email ? "border-red-500" : "focus:ring-red-500"
          }`}
          />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">Email is required</p>
            )}
        </div>
        <div>
        <input 
          type="password" 
          name="password" 
          onChange={handleChange} 
          placeholder="Password" 
          className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
            errors.password ? "border-red-500" : "focus:ring-red-500"
          }`}
          />
          {errors.password && (
              <p className="text-red-600 text-sm mt-1">Password is required</p>
            )}
        </div>   
        <div>
          <input 
            type="text" 
            name="phone" 
            onChange={handleChange} 
            placeholder="Phone" 
            className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
            errors.phone ? "border-red-500" : "focus:ring-red-500"
          }`}
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">Phone is required</p>
            )}
        </div>     
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Register</button>
        <span>Already have an account? <Link href={'/admin/login'} >Login</Link></span>
      </form>
    </div>
  );
}

export default Registration;