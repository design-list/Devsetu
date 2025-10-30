"use client";

import { useEffect } from "react";
import { Plus, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { requestOfferingDataAction } from "@/redux/actions/offeringActions";
import LazyImage from "@/components/Atom/LazyImage";
import {
  addOfferingAction,
} from "@/redux/actions/cartActions";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../../../helper/useWithLang";
import Container from "@/components/Container";

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

  const handleRedirect = () => {
    router.push(withLang("/cart-review"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f4] to-[#fff] md:px-6 py-12">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h3 className="font-secondary text-3xl font-bold text-[var(--color-primary)] tracking-tight mb-4 sm:mb-0">
            Add More Offering Items 🪔
          </h3>
          <button
            onClick={handleRedirect}
            className="font-secondary bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)] text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md transition-all duration-300"
          >
            Next →
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8">
          {allOffering?.map((off) => {
            const isAdded = allCarts?.add_ons?.some((add) => add.id === off.id);

            return (
              <div
                key={off.id}
                className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-[var(--color-primary)] to-yellow-400 transition-all duration-300 rounded-2xl"></div>

                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--color-dark)] text-xl leading-tight">
                      {off.title}
                    </h4>
                    <p className="text-[var(--color-dark)] text-base mt-2 line-clamp-4 leading-snug">
                      {off.description}
                    </p>
                  </div>
                   <div className="w-28 h-28 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                    <LazyImage
                      src={off.offerimg}
                      alt={off.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-secondary text-lg text-[var(--color-primary)] font-bold">
                    ₹{off.price}
                  </span>

                  {isAdded ? (
                    <button className="-mt-[10px] mr-[17px] border border-green-400 text-green-600 text-sm px-1 py-1 rounded-md flex items-center gap-1 bg-green-50 font-normal cursor-default">
                      <CheckCircle size={14} /> Added
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddOtherOffers(off)}
                      className="-mt-[10px] mr-[17px] cursor-pointer border border-[var(--color-primary-light)] text-[var(--color-primary)] text-sm px-3 py-1.5 rounded-md flex items-center gap-1 font-medium hover:bg-orange-50 transition-all z-10"
                    >
                      <Plus size={14} /> Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default PujaCart;
