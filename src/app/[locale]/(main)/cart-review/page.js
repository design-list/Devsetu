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
  const { allOffering } = useSelector((state) => state.offering);

  const router = useRouter();
  const withLang = useWithLang();

  useEffect(() => {
    dispatch(requestOfferingDataAction());
  }, [dispatch]);

  const handleAddOtherOffers = (item) => {
    dispatch(addOfferingAction(item));
  };

  const handleQuantityChange = (id, changeType) => {
    dispatch(updateOfferingCountAction(id, changeType));
  };

  const handleRemovePackages = () => {
    dispatch(removePackageAction());
    dispatch(requestClearCartAction());
  };

  const handlaRedirect = () => {
    router.push(withLang('/checkout'))
  }

  const handlaBackToHome = () => {
    router.push(withLang('/'))
  }

  // console.log("CART data", allCarts)

  if (!allCarts.grand_total) {
    return <div className="min-h-screen bg-gradient-to-b from-[#fffaf4] via-[#fffefd] to-[#fff] py-10 px-4">
      <div className="flex justify-center item-center max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 border border-orange-100 relative overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] rounded-t-2xl"></div>
            <h2 className="font-secondary text-2xl font-bold text-[var(--color-primary)] mb-6">
              cart is empty 🪔
            </h2>

            <button 
            onClick={handlaBackToHome}
            className="w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-3 rounded-xl mt-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex justify-between items-center px-5 cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-lg font-medium"> Book your Pujas Or Chavdhavas</span>
            </button>
        </div>
      </div>
    </div>
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf4] via-[#fffefd] to-[#fff] py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SECTION */}
        <div className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 border border-orange-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] rounded-t-2xl"></div>

          <h2 className="font-secondary text-2xl font-bold text-[var(--color-primary)] mb-6">
            Review Booking 🪔
          </h2>

          {allCarts?.['package'] !== null && <div
            className="border border-[var(--color-dark)]/10 rounded-lg p-4 shadow-sm bg-white"
          >
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start space-y-1">
              <p className="text-lg font-medium">{allCarts?.['package']?.productTitle}</p>
              <h3 className="text-lg font-small">{allCarts?.['package']?.packageType}</h3>
            </div>
            
           {allCarts?.['package'] && <button
              onClick={handleRemovePackages}
              className="bg-red-600 p-1 rounded text-white hover:bg-red-700 cursor-pointer"
            >
              <Trash2 />
            </button>}
          </div>

            {allCarts?.['package']?.packagePrice && <div className="flex justify-between items-center mt-2">
              <span className="font-secondary font-bold text-[var(--color-dark)] text-xl">₹{allCarts?.['package']?.packagePrice}</span>
            </div>}
          </div>}

            {/* ADD-ONS LIST */}
            {allCarts?.["add_ons"].map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl p-5 bg-white hover:shadow-md transition-all"
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
                        onClick={() =>
                          handleQuantityChange(item.id, "decrement")
                        }
                        className="p-1.5 text-gray-600 hover:text-black"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "increment")
                        }
                        className="p-1.5 text-gray-600 hover:text-black"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* BILL DETAILS */}
            {allCarts?.["add_ons"].length > 0 && (
              <div className="border-t pt-5 mt-5">
                <h3 className="text-lg uppercase font-semibold mb-3 text-gray-800">
                  Bill Details
                </h3>
                <div className="space-y-2 text-sm">
                  {allCarts?.["add_ons"].map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-gray-700"
                    >
                      <span className="text-base">{item.title}</span>
                      <span className="font-secondary font-semibold text-base">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold border-t pt-3 mt-2">
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                      Total
                    </span>
                    <span className="font-secondary text-xl text-[var(--color-primary)]">
                      ₹{allCarts?.["grand_total"]}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA BUTTON */}
            <button
              onClick={handlaRedirect}
              className="w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-3 rounded-xl mt-6 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex justify-between items-center px-5"
            >
              <span className="font-secondary text-xl">
                ₹{allCarts?.["grand_total"]}
              </span>
              <span className="text-lg font-medium">Proceed to Checkout →</span>
            </button>
          </div>
        </div>
      </div>
  );
};

export default PujaCart;
