"use client";

import { useEffect } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { requestOfferingDataAction } from "@/redux/actions/offeringActions";
import LazyImage from "@/components/Atom/LazyImage";
import { addOfferingAction, removePackageAction, updateOfferingCountAction } from "@/redux/actions/cartActions";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../../../helper/useWithLang";

const PujaCart = () => {

  const dispatch = useDispatch();

  const { allCarts } = useSelector((state) => state.cart)
  const { allOffering } = useSelector((state) => state.offering)

  const router = useRouter();
  const withLang = useWithLang();


  useEffect(() => {
    dispatch(requestOfferingDataAction())
  }, [])

  const hanldeAddOtherOffers = (item) => {
    dispatch(addOfferingAction(item))
  }


  const handleQuantityChange = (id, changeType) => {
    dispatch(updateOfferingCountAction(id, changeType))
  }

  const handleRemovePackages = () => {
    dispatch(removePackageAction());
  };

  const handlaRedirect = () => {
    router.push(withLang('/checkout'))
  }

  console.log("CART data", allCarts)


  return (

    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT SECTION - Booking Summary */}
      <div>
        <h2 className="font-secondary text-2xl font-semibold mb-4">Review Booking</h2>
        <div className="space-y-4 relative">

          {allCarts?.['package'] !== null && <div
            className="border border-[var(--color-dark)]/10 rounded-lg p-4 shadow-sm bg-white"
          >
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start space-y-1">
              <p className="text-lg font-medium">{allCarts?.['package']?.productTitle}</p>
              <h3 className="text-lg font-small">{allCarts?.['package']?.packageType}</h3>
            </div>
            
            <button
              onClick={handleRemovePackages}
              className="bg-red-600 p-1 rounded text-white hover:bg-red-700 cursor-pointer"
            >
              <Trash2 />
            </button>
          </div>

            <div className="flex justify-between items-center mt-2">
              <span className="font-secondary font-bold text-[var(--color-dark)] text-xl">₹{allCarts?.['package']?.packagePrice}</span>
            </div>
          </div>}

          {
            allCarts?.['add_ons'].map((item) => {
              return <div
                key={item.id}
                className="border border-[var(--color-dark)]/10 rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="text-lg font-medium">{item.title}</h3>
                {item.type && <p className="text-gray-500 text-sm">{item.description}</p>}
                <div className="flex justify-between items-center mt-2">
                  <span className="font-secondary font-bold text-[var(--color-dark)] text-xl">₹{item.price}</span>
                  <div className="flex items-center border border-[var(--color-dark)]/10 rounded-lg px-2 py-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, "decrement")}
                      className="text-text-[var(--color-dark)] hover:text-black cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="mx-2 text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, "increment")}
                      className="text-gray-600 hover:text-black cursor-pointer"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

              </div>
            })
          }
          {/* Coupon */}
          {/* <button className="w-full border border-gray-300 text-gray-600 text-sm font-medium py-2 rounded-lg hover:bg-gray-50">
            Apply Coupon
          </button> */}

          {/* Bill Details */}
          {allCarts?.['add_ons'].length > 0 && <div className="border-t pt-4 mt-4">
            <h3 className="text-lg uppercase font-semibold mb-3">Bill details</h3>
            <div className="space-y-2 text-sm">
              {allCarts?.['add_ons'].map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-[var(--color-dark)]"
                >
                  <span className=" text-lg ">{item.title.split(" ").slice(0, 2).join(" ")}</span>
                  <span className="font-secondary text-lg font-bold ">₹{(item.price) * (item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t pt-2">
                <span className="text-lg font-bold uppercase">Total</span>
                <span className="font-secondary text-xl">₹{allCarts?.['grand_total']}</span>
              </div>
            </div>
          </div>}

          {/* Continue Button */}
          <button onClick={handlaRedirect} className="font-secondary w-full bg-[var(--color-primary-light)] hover:[var(--color-primary)]
             text-white font-bold py-3 rounded-lg mt-4 flex justify-between px-4 items-center cursor-pointer">
            ₹{allCarts?.['grand_total']}
            <span className="text-lg font-medium">
              Cart Review →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}


export default PujaCart;