"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
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


  const handlaRedirect = () => {
    router.push(withLang('/cart-review'));
  }

  // console.log("CART data", allCarts)


  return (


    <div className="max-w-7xl mx-auto p-6">
      <div>
        <h3 className="font-secondary text-2xl font-semibold mb-6">Add more offering items</h3>

        {/* ✅ Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allOffering?.map((off) => (
            <div
              key={off.id}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex gap-4">
                <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border">
                  <LazyImage
                    src={off.offerimg}
                    alt={off.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-base">{off.title}</h4>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-4">
                    {off.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="font-secondary text-lg text-[var(--color-primary)] font-bold">
                  ₹{off.price}
                </span>
                {allCarts?.add_ons?.some(add => add.id === off.id) ? (
                  <button
                    className="border border-[var(--color-primary-light)] text-[var(--color-primary)] text-sm px-3 py-1 rounded-md flex items-center gap-1 hover:bg-green-50"
                  >
                    Added
                  </button>
                ) : (
                  <button
                    onClick={() => hanldeAddOtherOffers(off)}
                    className="cursor-pointer border border-[var(--color-primary-light)] text-[var(--color-primary)] text-sm px-3 py-1 rounded-md flex items-center gap-1 hover:bg-green-50"
                  >
                    <Plus size={14} /> Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Bottom Button (full width) */}

        <div className="mt-10">
          <button
            onClick={handlaRedirect}
            className="font-secondary w-[250px] bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)] text-white font-bold py-3 rounded-lg text-lg flex justify-center items-center float-right"
          >
            Next →
          </button>
        </div>
      </div>
    </div>

  );
}


export default PujaCart;