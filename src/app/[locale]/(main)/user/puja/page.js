"use client";

import { useEffect, useState } from "react";
import { loadState } from "../../../../../../utils/localstorage";
import Api from "../../../../../../services/fetchApi";

const api = new Api();

export default function ProfilePage() {
  const [allCarts, setAllCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
     const phone = loadState("phone");
     const token = loadState("token");
 
     if (phone && token) {
       triggerUserApi(phone);
     } 
   }, []);
 
   const triggerUserApi = async (phone) => {
    setLoading(false)
     try {
       const res = await api.CartByPhone({ phone });
       if(res.status === 200){
         setAllCart(res.data)
         setLoading(true)
       }
     } catch (err) {
        setLoading(true)
       console.error("❌ API Error:", err);
     }
   };

   console.log("useruser", allCarts)

//   if (loading) return <div className="p-6 text-gray-600">Loading profile...</div>;
//   if (!user) return <div className="p-6 text-red-500">No user data found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Cart data</h1>
    </div>
  );
}

