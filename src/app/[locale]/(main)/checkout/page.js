"use client";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithWait } from "../../../../../helper/method";
import { validateFields } from "../../../../../helper/validateFields";
import { addNewCartAction, requestClearCartAction } from "@/redux/actions/cartActions";
import { paymentVerifyAction, requestPaymentOrderAction } from "@/redux/actions/paymentActions";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../../../helper/useWithLang";
import SectionLoader from "@/components/Atom/loader/sectionLoader";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import LazyImage from "@/components/Atom/LazyImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import TempleIcon from "../../../../../public/icons/puja-temple1.png"
import { formatDate } from "../../../../../utils/localstorage";
import BreadcrumbSteps from "@/components/Breadcrumbs/Breadcrumb";

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
  const [isOpen, setIsOpen] = useState(false);
  const [isActivePrasad, setDevaPrashadm] = useState(false);

  const dispatch = useDispatch();

  const { allCarts } = useSelector((state) => state.cart);

  const router = useRouter();
  const withLang = useWithLang();

  // generate once when component mounts
  useEffect(() => {
    setStoreId(uuidv4());
  }, []);

  useEffect(() => {
    if (allCarts?.package?.type === 'puja' && allCarts?.package?.noOfPeople) {
      const count = allCarts.package.noOfPeople - 1;
      setMembers(Array(count).fill(""));
    } else {
      setMembers([""]);
    }
  }, [allCarts?.package]);


  useEffect(() => {
    if (allCarts?.package?.type === "chadhava") {
      // केवल non-empty members गिनो
      const filledMembers = members.filter((m) => m.trim() !== "");

      if (filledMembers.length === 0) {
        setPriceOfMember(0);
      } else {
        setPriceOfMember(filledMembers.length * 50);
      }
    } else {
      setPriceOfMember(0);
    }
  }, [members, allCarts?.package?.type]);


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
    if (checked) setGotra("Kashyap");
    else setGotra("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

  let fieldsToValidate = ["whatsapp", "name"];

  if (isActivePrasad && allCarts?.package?.type === "puja") {
    fieldsToValidate = [
      "whatsapp",
      "name",
      "address",
      "postalCode",
      "city",
      "state",
    ];
  }

  const { isValid, errors: validationErrors } = validateFields([form], fieldsToValidate);

  if (allCarts?.package) {
    setErrors(validationErrors[0]);
    if (!isValid) return;
  }


    if (!gotra.trim() && !dontKnow) {
      alert("Please enter your gotra or check the box if you don't know it.");
      return;
    }

    setIsLoading(true);


    const userDetails = { ...form, members, gotra };
    // const payload = { ...allCarts, store_id: storeId, userDetails };

    const payload = { ...allCarts, store_id: storeId, isActivePrasad, userDetails, grand_total: finalTotal };

    try {
      // Step 1: Save cart
      const cartRes = await fetchWithWait({ dispatch, action: addNewCartAction(payload) });

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
          setIsLoading(false);
        });

      const sdkLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
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
            const verifyPayload = { ...response, cart_id: cartRes.data.cart_id };
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

    <section className="min-h-screen bg-gradient-to-br from-[var(--color-accent)]/15 via-[var(--color-background)] to-[var(--color-primary-light)]/10 pt-4 md:py-10 px-4 md:px-10 font-[var(--font-primary)]">
      <BreadcrumbSteps currentStep={4} />
      <div className="mt-4 md:mt-0 max-w-3xl mx-auto bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl p-3 md:p-8 relative overflow-hidden border border-[var(--color-primary-light)]/30">
        {/* Decorative Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-light)]/10 to-transparent pointer-events-none rounded-3xl"></div>

        <h1 className="text-xl md:text-3xl font-[var(--font-secondary)] text-[var(--color-dark)] mb-4 text-center relative z-10 tracking-tight">
          🛕 Secure Checkout
        </h1>

        {/* Cart Summary Section */}
        <div className="border border-[var(--color-primary-light)] rounded-2xl p-3 md:p-6 mb-8 bg-gradient-to-br from-white to-[var(--color-background)]/60 shadow-md relative z-10 transition hover:shadow-lg">
          <h2 className="font-semibold text-lg text-[var(--color-primary)] mb-2 md:mb-4">
            Your Cart Summary
          </h2>

          {allCarts?.["package"] && (
            <div className="border-t border-dashed border-[var(--color-accent)] pt-4 mt-4" onClick={() => setIsOpen(!isOpen)}>
              <div className="flex justify-between items-center cursor-pointer">
                <span className="font-medium text-gray-800 text-sm md:text-base">
                  {allCarts?.["package"]?.productTitle}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-6 h-6 text-[var(--color-dark)] top-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-[var(--color-dark)] top-0" />
                  )}
              </div>
              { allCarts?.["package"]?.packageType && <span className="bg-[var(--color-accent)]/20 text-[var(--color-dark)] px-3 py-1 rounded-full text-sm md:text-base font-semibold mt-2 md:mt-0 inline-block">
                  {allCarts?.["package"]?.packageType}
                </span> }
              {allCarts?.["package"]?.packagePrice && (
                <div className="flex justify-between text-[var(--color-dark)] font-medium mt-4">
                  <span>Base Price</span>
                  <span>₹{allCarts?.["package"]?.packagePrice}</span>
                </div>
              )}

              {isOpen && (
              <div className="p-4 flex flex-col gap-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <LazyImage
                    src={TempleIcon}
                    alt="Temple Icon"
                    width={22}
                    height={22}
                    className="mr-2 relative -top-1.5 "
                  />
                  {allCarts?.package?.location}
                  
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="relative -left-1 text-2xl text-[var(--color-primary-light)]"
                  />
                  {formatDate(allCarts?.package?.date, "full")} {allCarts?.package?.tithi}
                </div>
              </div>
            )}
            </div>
          )}

          {allCarts?.["add_ons"]?.length > 0 && (
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

              { (allCarts?.['other_charges']?.pandit_charge > 0 && allCarts?.package?.type === "puja") &&
                <div
                  className="flex justify-between text-gray-700 font-medium"
                >
                  <span>Pandit Dakhina </span>
                  <span>
                    ₹{allCarts?.['other_charges']?.pandit_charge}
                  </span>
                </div>
              }

              <div className="flex justify-between font-semibold border-t pt-2 text-[var(--color-dark)]">
                <span>Total Amount</span>
                <span>₹{allCarts?.["grand_total"]}</span>
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        <form className="space-y-2 md:space-y-6 relative z-10">
          {/* WhatsApp */}
          <div>
            <label className=" text-sm md:text-base block font-medium mb-2 text-[var(--color-dark)]">
              WhatsApp Number*
            </label>
            <div className="flex gap-2">
              <select className="border rounded-lg px-3 py-2 bg-white shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] transition">
                <option value="+91">🇮🇳 +91</option>
              </select>
              <input
                type="tel"
                placeholder="Enter your mobile number"
                className={` text-sm md:text-base flex-1 border rounded-lg px-3 py-2 shadow-sm transition focus:ring-2 ${errors.whatsapp
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-[var(--color-primary)]"
                  }`}
                value={form.whatsapp}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  setForm({ ...form, whatsapp: value });
                }}
                maxLength={10}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className=" text-sm md:text-base block font-medium mb-2 text-[var(--color-dark)]">
              Full Name*
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`text-sm md:text-base w-full border rounded-lg px-3 py-2 shadow-sm transition focus:ring-2 ${errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-[var(--color-primary)]"
                }`}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Gotra Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your Gotra"
              value={gotra}
              onChange={(e) => setGotra(e.target.value)}
              disabled={dontKnow}
              className={`text-sm md:text-base w-full border rounded-lg px-3 py-2 md:py-3 pr-10 shadow-sm transition ${dontKnow
                  ? "bg-gray-100 cursor-not-allowed"
                  : "focus:ring-2 focus:ring-[var(--color-primary)]"
                }`}
            />
            <Info
              className="absolute right-3 top-[9px] md:top-3.5 text-[var(--color-info)] cursor-pointer hover:text-[var(--color-primary)] transition"
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
           {(
              (allCarts?.package?.type === "puja" && allCarts?.package?.noOfPeople > 1) ||
              allCarts?.package?.type === "chadhava"
            ) && (
              <label className="block font-medium mb-2 text-[var(--color-dark)]">
                Family Members{" "}
                {allCarts?.package?.type === "chadhava" && " / ₹50 each"}
              </label>
            )}

            <div className="space-y-2">
              {members.map((member, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Member name"
                    value={member}
                    onChange={(e) => handleMemberChange(i, e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] transition"
                  />
                  {allCarts?.package?.type === "chadhava" && members.length > 1 && (
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
                className="text-sm mt-2 text-[var(--color-primary)] hover:underline font-medium transition"
              >
                + Add another member
              </button>
            )}
          </div>

          {allCarts?.package?.type === "puja" && <div className="flex items-center justify-between border p-2 md:p-3 rounded">
            <label className="text-sm md:text-lg font-semibold">Want DevaPrasadam?</label>
            <button
              type="button"
              onClick={() => setDevaPrashadm((prev) => !prev)} 
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isActivePrasad ? "bg-green-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isActivePrasad ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>}

          {/* Address */}
         { !isActivePrasad || allCarts?.package?.type !== "chadhava" && 
           <div>
            <label className="block font-medium mb-2 text-[var(--color-dark)]">
              Address
            </label>
            <input
              type="text"
              placeholder="Street Address"
              className={`w-full border rounded-lg px-3 py-2 shadow-sm transition focus:ring-2 ${errors.address
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-[var(--color-primary)]"
                }`}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className={`w-full border rounded-lg px-3 py-2 shadow-sm transition focus:ring-2 ${errors.postalCode
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-[var(--color-primary)]"
                    }`}
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="City"
                  className={`w-full border rounded-lg px-3 py-2 shadow-sm transition focus:ring-2 ${errors.city
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-[var(--color-primary)]"
                    }`}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="State"
                  className={`w-full border rounded-lg px-3 py-2 shadow-sm transition focus:ring-2 ${errors.state
                      ? "border-red-500 focus:ring-red-400"
                      : "focus:ring-[var(--color-primary)]"
                    }`}
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>
          </div>
         }

          {/* Total + Pay */}
          <div className="flex justify-between items-center pt-5 border-t border-[var(--color-primary-light)]">
            <p className="text-base md:text-xl font-semibold text-[var(--color-dark)]">
              Total: ₹{finalTotal}/-
            </p>
            <button
              type="button"
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-white px-4 md:px-8 py-2 md:py-3 rounded-md md:rounded-xl font-semibold shadow-md hover:scale-[1.03] hover:shadow-lg transition-transform"
              onClick={handleSubmit}
            >
              Pay Now
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-gray-500">{
          isLoading && <SectionLoader />}</div>
      </div>
      {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4 border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                I do not know my Lineage (Gotra), what should I do?
              </h3>
              <p className="text-sm text-gray-700 mb-5 leading-relaxed">
                If you do not know your lineage (gotra), in this situation, you can consider your
                lineage as <b>Kashyap</b> because Rishi Kashyap is a sage whose descendants can be
                found in every caste. Therefore, he is considered a revered sage. The priest will
                chant these details during the worship.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}
