"use client";

import { useEffect, useState } from "react";
import { Plus, Minus, Trash } from "lucide-react";
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
        <h2 className="text-lg font-semibold mb-4">Review Booking</h2>
        <div className="space-y-4">

          { allCarts?.['package'] !== null && <div
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{allCarts?.['package']?.packageType}</h3> 
              <button onClick={handleRemovePackages} className="bg-red-600 p-1 rounded text-white hover:bg-red-700 cursor-pointer">
                <Trash height={14} width={14} />
              </button>
            </div>
            {/* {item.type && <p className="text-gray-500 text-sm">{item.type}</p>} */}
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold text-gray-700">₹{allCarts?.['package']?.packagePrice}</span>
            </div>
          </div>}

          {
            allCarts?.['add_ons'].map((item) => {
              return <div
                key={item.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <h3 className="font-medium">{item.title}</h3>
                {item.type && <p className="text-gray-500 text-sm">{item.description}</p>}
                <div className="flex justify-between items-center mt-2">
                  <span className="font-semibold text-gray-700">₹{item.price}</span>
                  <div className="flex items-center border rounded-lg px-2 py-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, "decrement")}
                      className="text-gray-600 hover:text-black"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="mx-2 text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, "increment")}
                      className="text-gray-600 hover:text-black"
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
            <h3 className="text-base font-semibold mb-3">Bill details</h3>
            <div className="space-y-2 text-sm">
              {allCarts?.['add_ons'].map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-gray-700"
                >
                  <span>{item.title.split(" ").slice(0, 2).join(" ")}</span>
                  <span>₹{(item.price) * (item.quantity)}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Total Amount</span>
                <span>₹{allCarts?.['grand_total']}</span>
              </div>
            </div>
          </div>}

          {/* Continue Button */}
          <button  onClick={handlaRedirect} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg mt-4 flex justify-between px-4 items-center">
            ₹{allCarts?.['grand_total']}
            <span className="text-sm font-medium cursor-pointer">
              Cart Review →
            </span>
          </button>
        </div>
      </div>

      {/* RIGHT SECTION - More Offerings */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Add more offering items</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allOffering?.map((off) => (
            <div
              key={off.id}
              className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border">
                <LazyImage
                  src={off.offerimg}
                  alt={off.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-base">{off.title}</h4>
                <p className="text-gray-600 text-sm mt-1 line-clamp-5">
                  {off.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-3">
                <span className="text-green-600 font-bold">₹{off.price}</span>
                {allCarts?.add_ons?.some(add => add.id === off.id) ? (
                  <button
                  className="border border-green-500 text-green-600 text-sm px-3 py-1 rounded-md flex items-center gap-1 hover:bg-green-50"
                >
                  Added
                </button>
                ) : (
                  <button
                    onClick={() => hanldeAddOtherOffers(off)}
                    className="border border-green-500 text-green-600 text-sm px-3 py-1 rounded-md flex items-center gap-1 hover:bg-green-50"
                  >
                    <Plus size={14} /> Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default PujaCart;