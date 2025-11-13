"use client";
import { useEffect, useState } from "react";
import { loadState } from "../../../../../../utils/localstorage";
import Api from "../../../../../../services/fetchApi";

const api = new Api();

export default function ProfilePage() {
  const [user, setUser] = useState(null);
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
       const res = await api.Userdetail({ phone });
       if(res.status === 200){
         setUser(res.data)
         setLoading(true)
       }
     } catch (err) {
        setLoading(true)
       console.error("❌ API Error:", err);
     }
   };

   console.log("useruser", user)

//   if (loading) return <div className="p-6 text-gray-600">Loading profile...</div>;
//   if (!user) return <div className="p-6 text-red-500">No user data found.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Profile</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg shadow">
        <ProfileField label="Name" value={user?.name || "—"} />
        <ProfileField label="WhatsApp" value={user?.whatsapp || "—"} />
        <ProfileField label="Address" value={user?.address || "—"} />
        <ProfileField label="City" value={user?.city || "—"} />
        <ProfileField label="State" value={user?.state || "—"} />
        <ProfileField label="Postal Code" value={user?.postalCode || "—"} />
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
