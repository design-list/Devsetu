"use client";

import { useEffect } from "react";
import { Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { requestOfferingDataAction } from "@/redux/actions/offeringActions";
import LazyImage from "@/components/Atom/LazyImage";
import {
  addOfferingAction,
  removePackageAction,
  requestClearCartAction,
  updateOfferingCountAction,
} from "@/redux/actions/cartActions";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../../../helper/useWithLang";

const PujaCart = () => {
  const dispatch = useDispatch();
  const { allCarts } = useSelector((state) => state.cart);
  const router = useRouter();
  const withLang = useWithLang();

  useEffect(() => {
    dispatch(requestOfferingDataAction());
  }, [dispatch]);

  const handleQuantityChange = (id, type) =>
    dispatch(updateOfferingCountAction(id, type));

  const handleRemovePackages = () => {
    dispatch(removePackageAction());
    dispatch(requestClearCartAction());
  };

  const goToCheckout = () => router.push(withLang("/checkout"));
  const goHome = () => router.push(withLang("/"));

  // EMPTY STATE
  if (!allCarts?.grand_total) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#fffaf4] via-[#fffefd] to-[#fff] flex justify-center items-center px-4">
        <div className="bg-white/80 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-3xl p-8 max-w-lg w-full text-center border border-orange-100">
          <div className="h-2 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] rounded-t-2xl mb-4"></div>
          <h2 className="font-secondary text-3xl font-bold text-[var(--color-primary)] mb-4">
            Your Cart is Empty 🪔
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven’t added any Puja or Chadhava yet. Start your
            spiritual journey today.
          </p>
          <button
            onClick={goHome}
            className="w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-3 rounded-xl mt-2 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-lg font-medium">Book Your Puja Now</span>
          </button>
        </div>
      </div>
    );
  }

  // FILLED CART
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf4] via-[#fffefd] to-[#fff] py-12 px-4">
      <div className="max-w-3xl mx-auto grid grid-cols-1 gap-10">
        {/* LEFT SECTION */}
        <div className="bg-white/90 backdrop-blur-md border border-orange-100 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] rounded-t-3xl"></div>

          <h2 className="font-secondary text-2xl font-bold text-[var(--color-primary)] mb-6 flex items-center gap-2">
            Review Your Booking 🪔
          </h2>

          {/* PACKAGE CARD */}
          {allCarts?.package && (
            <div className="border border-[var(--color-dark)]/10 rounded-2xl p-5 shadow-sm bg-gradient-to-br from-white to-orange-50/30 hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-800">
                    {allCarts.package.productTitle}
                  </p>
                  <span className="text-sm text-gray-500">
                    {allCarts.package.packageType}
                  </span>
                </div>
                <button
                  onClick={handleRemovePackages}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
             {allCarts.package.packagePrice && <div className="flex justify-between items-center mt-3">
                <span className="font-secondary font-bold text-[var(--color-dark)] text-xl">
                  ₹{allCarts.package.packagePrice}
                </span>
              </div>}
            </div>
          )}

          {/* ADD-ONS */}
          {allCarts?.add_ons.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-5 mt-5 bg-white/90 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-3">
                  <h3 className="font-medium text-lg text-gray-800">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-secondary font-semibold text-[var(--color-primary)] text-lg">
                    ₹{item.price}
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-md mt-2 bg-gray-50">
                    <button
                      onClick={() => handleQuantityChange(item.id, "decrement")}
                      className="p-1.5 text-gray-600 hover:text-black"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, "increment")}
                      className="p-1.5 text-gray-600 hover:text-black"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* BILL SUMMARY */}
          {allCarts?.add_ons.length > 0 && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg uppercase font-semibold mb-3 text-gray-800 tracking-wide">
                Bill Summary
              </h3>
              <div className="space-y-2 text-base">
                {allCarts.add_ons.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-gray-700"
                  >
                    <span>{item.title}</span>
                    <span className="font-secondary font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between font-semibold border-t pt-4 mt-3 text-lg">
                  <span className="text-[var(--color-primary)]">Total</span>
                  <span className="font-secondary text-[var(--color-primary)] text-xl">
                    ₹{allCarts.grand_total}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* CTA */}
          <button
            onClick={goToCheckout}
            className="w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-4 rounded-xl mt-8 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex justify-between items-center px-6"
          >
            <span className="font-secondary text-xl">
              ₹{allCarts.grand_total}
            </span>
            <span className="text-lg font-medium">Proceed to Checkout →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PujaCart;
