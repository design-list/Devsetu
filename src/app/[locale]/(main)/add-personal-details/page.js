"use client";

import { addNewUserDetailsAction } from "@/redux/actions/userDetailsActions";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithWait } from "../../../../../helper/method";
import { validateFields } from "../../../../../helper/validateFields";
import { addNewCartAction } from "@/redux/actions/cartActions";
import { paymentVerifyAction, requestPaymentOrderAction } from "@/redux/actions/paymentActions";

export default function CheckoutPage() {
  const [members, setMembers] = useState([""]);
  const [form, setForm] = useState({
    whatsapp: "",
    name: "",
    address: "",
    postalCode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState({}); // field errors

  const [storeId, setStoreId] = useState("");

  const dispatch = useDispatch();

  const { allCarts } = useSelector((state) => state.cart);


  // generate once when component mounts
    useEffect(() => {
        setStoreId(uuidv4());
    }, []);

  const handleAddMember = () => setMembers([...members, ""]);

  const handleRemoveMember = (index) =>
    setMembers(members.filter((_, i) => i !== index));

  const handleMemberChange = (index, value) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Step 1: Validate form
    const { isValid, errors: validationErrors } = validateFields([form], [
      "whatsapp",
      "name",
      "address",
      "postalCode",
      "city",
      "state",
    ]);

    const fieldErrorObj = validationErrors[0];
    setErrors(fieldErrorObj);

    if (!isValid) {
      return; 
    }

    const userDetails = { ...form, members };
    const payload = {
        ...allCarts,
        store_id: storeId,
        userDetails
    }

    console.log("payload", payload)

      fetchWithWait({ dispatch, action: addNewCartAction(payload) })
          .then((res) => {

            const {data, status} = res

              if (status === 200) {
                const orderPayload = {
                    amount: data.grand_total,
                    currency: "INR",
                    receipt: `cart_${data.cart_id}`,
                    cart_id: data.cart_id,
                }
                fetchWithWait({ dispatch, action: requestPaymentOrderAction(orderPayload) })
                    .then((res) => {
                        if (res.status === 200) {

                           // Step 5: Open Razorpay Checkout
                        const options = {
                            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                            amount: orderRes.order.amount,
                            currency: "INR",
                            name: allCarts?.['package']?.packageType,
                            description: "Checkout Payment",
                            order_id: orderRes.order.id,
                            handler: async (response) => {
                                try {
                                const verifyPayload = {
                                    ...response,
                                    cart_id: cartRes.cart_id,
                                };

                                const verifyRes = await fetchWithWait({
                                    dispatch,
                                    action: paymentVerifyAction(verifyPayload),
                                });

                                if (verifyRes.status === 200) {
                                    alert("✅ Payment Successful!");
                                    // Optionally: redirect to success page
                                    // router.push(`/payment-success/${cartRes.cart_id}`);
                                } else {
                                    alert(verifyRes.message || "Payment verification failed.");
                                }
                                } catch (err) {
                                console.error("Verification error:", err);
                                alert("Error verifying payment.");
                                }
                            },
                            theme: { color: "#D32F2F" },
                            };

                            
                            const rzp = new window.Razorpay(options);
                            rzp.open();

                            rzp.on("payment.failed", (response) => {
                            alert("❌ Payment Failed. Please try again.");
                            console.error("Payment Failed:", response.error);
                            });

                        } else {
                            alert(res.message || "Something went wrong.verify");
                        }
                    })
                    .catch((e) => {
                        console.error("Error:", e);
                        alert("Error while saving user details.");
                    });
            } else {
                alert(res.message || "Something went wrong.order");
            }
        }) .catch((e) => {
            console.error("Error:", e);
            alert("Error while saving user details.");
        });
  };


//    setMembers([""]);
//           setForm({
//             whatsapp: "",
//             name: "",
//             address: "",
//             postalCode: "",
//             city: "",
//             state: "",
//           });
//           setErrors({});


  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-bold mb-6">Cart Review</h1>

        {/* Cart Details */}
        <div className="border rounded-xl p-4 mb-6 bg-gray-100">
          <h2 className="font-semibold text-lg mb-2 text-red-800">
            Your Cart Details
          </h2>
          {allCarts?.["add_ons"].length > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-gray-700">
                <span>{allCarts?.["package"]?.packageType}</span>
                <span>₹{allCarts?.["package"]?.packagePrice}</span>
              </div>
              <div className="space-y-2 text-sm">
                {allCarts?.["add_ons"].map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-700"
                  >
                    <span>{item.title.split(" ")[0]}</span>
                    <span>₹{`${item.price}* ${item.quantity}`}</span>
                  </div>
                ))}
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Amount</span>
                  <span>₹{allCarts?.["grand_total"]}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* WhatsApp Number */}
          <div>
            <label className="block font-medium mb-1">
              Enter WhatsApp Number
            </label>
            <div className="flex gap-2">
              <select className="border rounded-lg px-3 py-2">
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="tel"
                placeholder="Enter mobile number"
                className={`flex-1 border rounded-lg px-3 py-2 focus:ring-1 ${
                  errors.whatsapp ? "border-red-500" : "focus:ring-red-500"
                }`}
                value={form.whatsapp}
                onChange={(e) =>
                  setForm({ ...form, whatsapp: e.target.value })
                }
              />
            </div>
            {errors.whatsapp && (
              <p className="text-red-600 text-sm mt-1">
                WhatsApp number is required
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Enter Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
                errors.name ? "border-red-500" : "focus:ring-red-500"
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Family Members */}
          <div>
            <label className="block font-medium mb-1">
              Enter Family Member Names
            </label>
            {members.map((member, i) => (
              <div key={i} className="flex flex-col gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter family member name"
                    value={member}
                    onChange={(e) => handleMemberChange(i, e.target.value)}
                    className={`flex-1 border rounded-lg px-3 py-2 focus:ring-1 `}
                  />
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(i)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="text-sm text-red-700 hover:underline font-medium"
            >
              + Add member
            </button>
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              placeholder="Street Address"
              className={`w-full border rounded-lg px-3 py-2 mb-2 focus:ring-1 ${
                errors.address ? "border-red-500" : "focus:ring-red-500"
              }`}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            {errors.address && (
              <p className="text-red-600 text-sm mt-1">
                Address is required
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <div>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
                    errors.postalCode
                      ? "border-red-500"
                      : "focus:ring-red-500"
                  }`}
                  value={form.postalCode}
                  onChange={(e) =>
                    setForm({ ...form, postalCode: e.target.value })
                  }
                />
                {errors.postalCode && (
                  <p className="text-red-600 text-sm mt-1">
                    Postal code required
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Town/City"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
                    errors.city ? "border-red-500" : "focus:ring-red-500"
                  }`}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">
                    City is required
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State/Region"
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
                    errors.state ? "border-red-500" : "focus:ring-red-500"
                  }`}
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />
                {errors.state && (
                  <p className="text-red-600 text-sm mt-1">
                    State is required
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Total and Pay Button */}
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-lg font-semibold">{`Total: ₹${allCarts?.["grand_total"]}/-`}</p>
            <button
              type="button"
              className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg font-medium"
              onClick={(e) => handleSubmit(e)}
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}





// "use client";

// import { addNewUserDetailsAction } from "@/redux/actions/userDetailsActions";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchWithWait } from "../../../../../helper/method";


// export default function CheckoutPage() {
//   const [members, setMembers] = useState([""]);
//   const [form, setForm] = useState({
//     whatsapp: "",
//     name: "",
//     address: "",
//     postalCode: "",
//     city: "",
//     state: "",
//   });

//   const [errors, setErrors] = useState({}); // field errors
//   const [memberErrors, setMemberErrors] = useState([]); // members errors
//   const dispatch = useDispatch();
//   const { allCarts } = useSelector((state) => state.cart);

//   const handleAddMember = () => setMembers([...members, ""]);
//   const handleRemoveMember = (index) =>
//     setMembers(members.filter((_, i) => i !== index));
//   const handleMemberChange = (index, value) => {
//     const updated = [...members];
//     updated[index] = value;
//     setMembers(updated);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Step 1: Validate form
//     const { isValid, errors: validationErrors } = validateFields([form], [
//       "whatsapp",
//       "name",
//       "address",
//       "postalCode",
//       "city",
//       "state",
//     ]);

//     // Step 2: Validate members
//     const memberErrorList = members.map((m) => !m || m.trim() === "");

//     // Step 3: Prepare combined error state
//     const fieldErrorObj = validationErrors[0];
//     setErrors(fieldErrorObj);
//     setMemberErrors(memberErrorList);

//     if (!isValid || memberErrorList.includes(true)) {
//       return; // Don’t proceed
//     }

//     // Step 4: Prepare payload
//     const payload = { ...form, members };

//     // Step 5: API Call
//     fetchWithWait({ dispatch, action: addNewUserDetailsAction(payload) })
//       .then((res) => {
//         if (res.status === 200) {
//           alert("Details saved successfully!");
//           setMembers([""]);
//           setForm({
//             whatsapp: "",
//             name: "",
//             address: "",
//             postalCode: "",
//             city: "",
//             state: "",
//           });
//           setErrors({});
//           setMemberErrors([]);
//         } else {
//           alert(res.message || "Something went wrong.");
//         }
//       })
//       .catch((e) => {
//         console.error("Error:", e);
//         alert("Error while saving user details.");
//       });
//   };

//   return (
//     <section className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
//       <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 md:p-8">
//         <h1 className="text-2xl font-bold mb-6">Cart Review</h1>

//         {/* Cart Details */}
//         <div className="border rounded-xl p-4 mb-6 bg-gray-100">
//           <h2 className="font-semibold text-lg mb-2 text-red-800">
//             Your Cart Details
//           </h2>
//           {allCarts?.["add_ons"].length > 0 && (
//             <div className="border-t pt-4 mt-4">
//               <div className="flex justify-between text-gray-700">
//                 <span>{allCarts?.["package"]?.packageType}</span>
//                 <span>₹{allCarts?.["package"]?.packagePrice}</span>
//               </div>
//               <div className="space-y-2 text-sm">
//                 {allCarts?.["add_ons"].map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex justify-between text-gray-700"
//                   >
//                     <span>{item.title.split(" ")[0]}</span>
//                     <span>₹{`${item.price}* ${item.quantity}`}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between font-semibold border-t pt-2">
//                   <span>Total Amount</span>
//                   <span>₹{allCarts?.["grand_total"]}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* WhatsApp Number */}
//           <div>
//             <label className="block font-medium mb-1">
//               Enter WhatsApp Number
//             </label>
//             <div className="flex gap-2">
//               <select className="border rounded-lg px-3 py-2">
//                 <option value="+91">🇮🇳 +91</option>
//               </select>
//               <input
//                 type="tel"
//                 placeholder="Enter mobile number"
//                 className={`flex-1 border rounded-lg px-3 py-2 focus:ring-1 ${
//                   errors.whatsapp ? "border-red-500" : "focus:ring-red-500"
//                 }`}
//                 value={form.whatsapp}
//                 onChange={(e) =>
//                   setForm({ ...form, whatsapp: e.target.value })
//                 }
//               />
//             </div>
//             {errors.whatsapp && (
//               <p className="text-red-600 text-sm mt-1">
//                 WhatsApp number is required
//               </p>
//             )}
//           </div>

//           {/* Name */}
//           <div>
//             <label className="block font-medium mb-1">Enter Your Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
//                 errors.name ? "border-red-500" : "focus:ring-red-500"
//               }`}
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//             {errors.name && (
//               <p className="text-red-600 text-sm mt-1">Name is required</p>
//             )}
//           </div>

//           {/* Family Members */}
//           <div>
//             <label className="block font-medium mb-1">
//               Enter Family Member Names
//             </label>
//             {members.map((member, i) => (
//               <div key={i} className="flex flex-col gap-1 mb-2">
//                 <div className="flex items-center gap-2">
//                   <input
//                     type="text"
//                     placeholder="Enter family member name"
//                     value={member}
//                     onChange={(e) => handleMemberChange(i, e.target.value)}
//                     className={`flex-1 border rounded-lg px-3 py-2 focus:ring-1 ${
//                       memberErrors[i] ? "border-red-500" : "focus:ring-red-500"
//                     }`}
//                   />
//                   {members.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveMember(i)}
//                       className="text-red-600 text-sm hover:underline"
//                     >
//                       ✕
//                     </button>
//                   )}
//                 </div>
//                 {memberErrors[i] && (
//                   <p className="text-red-600 text-sm ml-1">
//                     Member name is required
//                   </p>
//                 )}
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddMember}
//               className="text-sm text-red-700 hover:underline font-medium"
//             >
//               + Add member
//             </button>
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block font-medium mb-1">Address</label>
//             <input
//               type="text"
//               placeholder="Street Address"
//               className={`w-full border rounded-lg px-3 py-2 mb-2 focus:ring-1 ${
//                 errors.address ? "border-red-500" : "focus:ring-red-500"
//               }`}
//               value={form.address}
//               onChange={(e) => setForm({ ...form, address: e.target.value })}
//             />
//             {errors.address && (
//               <p className="text-red-600 text-sm mt-1">
//                 Address is required
//               </p>
//             )}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Postal Code"
//                   className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
//                     errors.postalCode
//                       ? "border-red-500"
//                       : "focus:ring-red-500"
//                   }`}
//                   value={form.postalCode}
//                   onChange={(e) =>
//                     setForm({ ...form, postalCode: e.target.value })
//                   }
//                 />
//                 {errors.postalCode && (
//                   <p className="text-red-600 text-sm mt-1">
//                     Postal code required
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="Town/City"
//                   className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
//                     errors.city ? "border-red-500" : "focus:ring-red-500"
//                   }`}
//                   value={form.city}
//                   onChange={(e) => setForm({ ...form, city: e.target.value })}
//                 />
//                 {errors.city && (
//                   <p className="text-red-600 text-sm mt-1">
//                     City is required
//                   </p>
//                 )}
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   placeholder="State/Region"
//                   className={`w-full border rounded-lg px-3 py-2 focus:ring-1 ${
//                     errors.state ? "border-red-500" : "focus:ring-red-500"
//                   }`}
//                   value={form.state}
//                   onChange={(e) => setForm({ ...form, state: e.target.value })}
//                 />
//                 {errors.state && (
//                   <p className="text-red-600 text-sm mt-1">
//                     State is required
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Total and Pay Button */}
//           <div className="flex justify-between items-center pt-4 border-t">
//             <p className="text-lg font-semibold">Total: ₹1554/-</p>
//             <button
//               type="submit"
//               className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg font-medium"
//             >
//               Pay Now
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }
