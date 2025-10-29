"use client";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithWait } from "../../../../../helper/method";
import { validateFields } from "../../../../../helper/validateFields";
import {
  addNewCartAction,
  requestClearCartAction,
} from "@/redux/actions/cartActions";
import {
  paymentVerifyAction,
  requestPaymentOrderAction,
} from "@/redux/actions/paymentActions";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../../../helper/useWithLang";
import SectionLoader from "@/components/Atom/loader/sectionLoader";
import { Info } from "lucide-react";

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

  const [errors, setErrors] = useState({});

  const [storeId, setStoreId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priceOfMember, setPriceOfMember] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [gotra, setGotra] = useState("");
  const [dontKnow, setDontKnow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();

  const { allCarts } = useSelector((state) => state.cart);

  const router = useRouter();
  const withLang = useWithLang();

  // generate once when component mounts
  useEffect(() => {
    setStoreId(uuidv4());
  }, []);

  useEffect(() => {
    if (!allCarts?.package?.type && allCarts?.package?.noOfPeople) {
      const count = allCarts.package.noOfPeople - 1;
      setMembers(Array(count).fill(""));
    } else {
      setMembers([""]);
    }
  }, [allCarts?.package]);

  // // Calculate ₹50 per member (only if package.type exists)
  //   useEffect(() => {
  //     if (allCarts?.package?.type) {
  //       setPriceOfMember(members.length * 50);
  //     } else {
  //       setPriceOfMember(0);
  //     }
  //   }, [members, allCarts?.package?.type]);

  //   // 🔥 Update final total dynamically
  //   useEffect(() => {
  //     const baseTotal = allCarts?.grand_total || 0;
  //     setFinalTotal(baseTotal + priceOfMember);
  //   }, [allCarts?.grand_total, priceOfMember]);

  // Calculate ₹50 per member (only if package.type exists)

  useEffect(() => {
    if (allCarts?.package?.type === "chadhava") {
      // check if members array is completely empty (no names)
      const isMembersEmpty =
        members.length === 0 || members.every((m) => !m.trim());

      if (isMembersEmpty) {
        setPriceOfMember(0);
      } else {
        setPriceOfMember(members.length * 50);
      }
    } else {
      setPriceOfMember(0);
    }
  }, [members, allCarts?.package?.type === "chadhava"]);

  // 🔥 Update final total dynamically
  useEffect(() => {
    const baseTotal = allCarts?.grand_total || 0;
    setFinalTotal(baseTotal + priceOfMember);
  }, [allCarts?.grand_total, priceOfMember]);

  const handleAddMember = () => {
    if (members.length < 10) {
      setMembers([...members, ""]);
    } else {
      alert("You can add up to 10 members only.");
    }
  };

  const handleRemoveMember = (index) =>
    setMembers(members.filter((_, i) => i !== index));

  const handleMemberChange = (index, value) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setDontKnow(checked);
    if (checked) setGotra("Kshyapa");
    else setGotra("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!gotra.trim() && !dontKnow) {
      alert("Please enter your gotra or check the box if you don't know it.");
      return;
    }

    setIsLoading(true);

    const { isValid, errors: validationErrors } = validateFields(
      [form],
      ["whatsapp", "name", "address", "postalCode", "city", "state"]
    );

    if (allCarts?.package) {
      setErrors(validationErrors[0]);
      if (!isValid) return;

      // const memberErrors = members.map((m) => !m.trim());

      // if (memberErrors.includes(true)) {
      //   setErrors((prev) => ({
      //     ...prev,
      //     members: "Please fill all member names",
      //   }));
      //   return;
      // }
    }

    const userDetails = { ...form, members };
    // const payload = { ...allCarts, store_id: storeId, userDetails };

    const payload = {
      ...allCarts,
      store_id: storeId,
      userDetails,
      grand_total: finalTotal,
    };

    try {
      // Step 1: Save cart
      const cartRes = await fetchWithWait({
        dispatch,
        action: addNewCartAction(payload),
      });

      if (cartRes.status !== 200) {
        alert(cartRes.message || "Error saving cart.");
        setIsLoading(false);
        return;
      }

      // Step 2: Create Razorpay Order
      const orderPayload = {
        amount: cartRes.data.grand_total,
        currency: "INR",
        receipt: `cart_${cartRes.data.cart_id}`,
        cart_id: cartRes.data.cart_id,
      };

      const orderRes = await fetchWithWait({
        dispatch,
        action: requestPaymentOrderAction(orderPayload),
      });

      if (orderRes.status !== 200) {
        alert(orderRes.message || "Error creating payment order.");
        setIsLoading(false);
        return;
      }

      // Step 3: Ensure Razorpay SDK is loaded
      const loadScript = (src) =>
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

      const sdkLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!sdkLoaded) {
        alert("Razorpay SDK failed to load.");
        setIsLoading(false);
        return;
      }

      // Step 4: Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderRes.order.amount,
        currency: "INR",
        name: allCarts?.package?.packageType || "Checkout Payment",
        description: "Payment for your cart",
        order_id: orderRes.order.id,
        handler: async (response) => {
          try {
            const verifyPayload = {
              ...response,
              cart_id: cartRes.data.cart_id,
            };
            const verifyRes = await fetchWithWait({
              dispatch,
              action: paymentVerifyAction(verifyPayload),
            });

            if (verifyRes.success) {
              // alert("✅ Payment Successful!");
              setForm({
                whatsapp: "",
                name: "",
                address: "",
                postalCode: "",
                city: "",
                state: "",
              });
              setMembers([]);
              setErrors({});
              setIsLoading(false);
              router.push(withLang(`/payment-success/${cartRes.data.cart_id}`)); // ✅ custom redirect
              dispatch(requestClearCartAction());
            } else {
              alert(verifyRes.message || "Payment verification failed.");
              setIsLoading(false);
              router.push(withLang(`/payment-failed`));
            }

            // if (verifyRes.success) {
            //   alert("✅ Payment Successful!");
            // } else {
            //   alert(verifyRes.message || "Payment verification failed.");
            // }
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
        console.error("Payment Failed:", response.error);
        alert("❌ Payment Failed. Please try again.");
        setIsLoading(false);
        router.push(withLang(`/payment-failed`));
      });
    } catch (error) {
      console.error("Error in payment flow:", error);
      setIsLoading(false);
      alert("Something went wrong. Please try again.");
    }
  };

  // console.log("Rendered Checkout Page with storeId:", allCarts);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[var(--color-accent)]/20 via-[var(--color-background)] to-[var(--color-primary-light)]/10 py-10 px-4 md:px-10 font-[var(--font-primary)]">
      <div className="max-w-3xl mx-auto bg-[var(--color-white)] shadow-xl rounded-3xl p-6 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 to-transparent pointer-events-none rounded-3xl"></div>

        <h1 className="text-3xl font-[var(--font-secondary)] text-[var(--color-dark)] mb-8 text-center relative z-10">
          🛕 Secure Checkout
        </h1>

        {/* Cart Details */}
        <div className="border border-[var(--color-primary-light)] rounded-2xl p-5 mb-8 bg-[var(--color-background)]/40 shadow-sm relative z-10">
          <h2 className="font-semibold text-lg mb-3 text-[var(--color-primary)]">
            Your Cart Summary
          </h2>

          {allCarts?.["package"] && (
            <div className="border-t border-dashed border-[var(--color-accent)] pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">
                  {allCarts?.["package"]?.productTitle}
                </span>
                <span className="bg-[var(--color-accent)]/20 text-[var(--color-dark)] px-3 py-1 rounded-full text-sm font-semibold">
                  {allCarts?.["package"]?.packageType}
                </span>
              </div>
              <div className="flex justify-between text-gray-700 font-medium">
                <span>Base Price</span>
                <span>₹{allCarts?.["package"]?.packagePrice}</span>
              </div>
            </div>
          )}

          {allCarts?.["add_ons"].length > 0 && (
            <div className="border-t border-dashed border-[var(--color-accent)] pt-4 mt-4 space-y-2 text-sm">
              {allCarts?.["add_ons"].map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-700 font-medium"
                >
                  <span>{item.title.split(" ").slice(0, 2).join(" ")}</span>
                  <span>
                    ₹{item.price} × {item.quantity}
                  </span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t pt-2 text-[var(--color-dark)]">
                <span>Total Amount</span>
                <span>₹{allCarts?.["grand_total"]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <form className="space-y-6 relative z-10">
          {/* WhatsApp */}
          <div>
            <label className="block font-medium mb-2 text-[var(--color-dark)]">
              WhatsApp Number
            </label>
            <div className="flex gap-2">
              <select className="border rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-[var(--color-primary)]">
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className={`flex-1 border rounded-lg px-3 py-2 shadow-sm transition focus:ring-2 ${
                  errors.whatsapp
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-[var(--color-primary)]"
                }`}
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block font-medium mb-2 text-[var(--color-dark)]">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full border rounded-lg px-3 py-2 shadow-sm transition focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-[var(--color-primary)]"
              }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Gotra */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your Gotra"
              value={gotra}
              onChange={(e) => setGotra(e.target.value)}
              disabled={dontKnow}
              className={`w-full border rounded-lg px-3 py-3 pr-10 shadow-sm transition ${
                dontKnow
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-[var(--color-primary)]"
              }`}
            />
            <Info
              className="absolute right-3 top-3.5 text-[var(--color-info)] cursor-pointer hover:text-[var(--color-primary)]"
              size={20}
              onClick={() => setShowPopup(true)}
            />
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={dontKnow}
              onChange={handleCheckboxChange}
              className="w-4 h-4 accent-[var(--color-primary)]"
            />
            I don’t know my Gotra
          </label>

          {/* Members */}
          <div>
            <label className="block font-medium mb-2 text-[var(--color-dark)]">
              Family Members{" "}
              {allCarts?.package?.type === "chadhava" && " / ₹50 each"}
            </label>
            <div className="space-y-2">
              {members.map((member, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Member name"
                    value={member}
                    onChange={(e) => handleMemberChange(i, e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  {allCarts?.package?.type === "chadhava" &&
                    members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(i)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        ✕
                      </button>
                    )}
                </div>
              ))}
            </div>
            {allCarts?.package?.type === "chadhava" && (
              <button
                type="button"
                onClick={handleAddMember}
                className="text-sm mt-2 text-[var(--color-primary)] hover:underline font-medium"
              >
                + Add another member
              </button>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-2 text-[var(--color-dark)]">
              Address
            </label>
            <input
              type="text"
              placeholder="Street Address"
              className="w-full border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)]"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <input
                type="text"
                placeholder="Postal Code"
                className="border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                className="border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="State"
                className="border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)]"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
              />
            </div>
          </div>

          {/* Total + Pay */}
          <div className="flex justify-between items-center pt-5 border-t border-[var(--color-primary-light)]">
            <p className="text-xl font-semibold text-[var(--color-dark)]">
              Total: ₹{finalTotal}/-
            </p>
            <button
              type="button"
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:scale-[1.02] transition-transform"
              onClick={handleSubmit}
            >
              Pay Now
            </button>
          </div>
        </form>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm mx-4">
              <h3 className="text-lg font-semibold mb-3 text-[var(--color-dark)]">
                Unsure about your Gotra?
              </h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                If you don’t know your lineage (Gotra), you can consider it as{" "}
                <b>Kshyapa</b>. Rishi Kshyapa is considered a revered sage whose
                descendants exist across many lineages.
              </p>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white px-6 py-2 rounded-lg font-medium"
              >
                Okay
              </button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-3xl">
            <SectionLoader />
          </div>
        )}
      </div>
    </section>
  );
}
