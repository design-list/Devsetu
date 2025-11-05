"use client";

import { useEffect } from "react";
import { Plus, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import LazyImage from "@/components/Atom/LazyImage";
import {
  addOfferingAction,
} from "@/redux/actions/cartActions";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../../../helper/useWithLang";
import Container from "@/components/Container";
import BreadcrumbSteps from "@/components/Breadcrumbs/Breadcrumb";
import { fetchPujaDetailPageAction } from "@/redux/actions/pujaActions";

const PujaCart = () => {
  const dispatch = useDispatch();
  const { allCarts } = useSelector((state) => state.cart);
  const { pujaoffering } = useSelector((state) => state.pujas);

  const router = useRouter();
  const withLang = useWithLang();


  useEffect(() => {
  
    if (allCarts?.package?.productSlug) {
        dispatch(fetchPujaDetailPageAction(allCarts?.package?.productSlug));
      }
  }, [allCarts]);

  const handleAddOtherOffers = (item) => {
    dispatch(addOfferingAction(item));
  };

  const handleRedirect = () => {
    router.push(withLang("/cart-review"));
  };

  // console.log("pujaofferingpujaoffering",pujaoffering)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff9f4] to-[#fff] md:px-6 pb-12 pt-4">      
      <Container>
      <BreadcrumbSteps currentStep={2} />

        <div className="max-w-5xl m-auto flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-2 mt-8 text-center md:text-left">
          <h3 className="font-secondary text-2xl md:text-3xl font-bold text-[var(--color-primary)] tracking-tight md:mb-4 sm:mb-0">
            Add More Offering Items 🪔
          </h3>
          <button
            onClick={handleRedirect}
            className="font-secondary hidden md:block bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)] text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-md transition-all duration-300"
          >
            Next →
          </button>
        </div>

        {/* Grid Layout */}


        <div className="grid grid-cols-1 gap-8 max-w-5xl m-auto">
          {pujaoffering?.map((off) => {
            const isAdded = allCarts?.add_ons?.some((add) => add.id === off.id);
            const hasTags = off.tags && off.tags.trim() !== "";

            return (
              <div
              key={off.id}
              className={`group rounded-2xl p-5 shadow-sm border transition-all duration-300 relative overflow-hidden 
                ${hasTags ? "bg-yellow-50 border-yellow-400 shadow-md" : "bg-white border-gray-100 hover:shadow-lg"}`}
              >
            
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-[var(--color-primary)] to-yellow-400 transition-all duration-300 rounded-2xl"></div>

                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    {hasTags && (
                      <span className="inline-block bg-yellow-500 text-white text-xs font-semibold px-3 mb-2 py-1 rounded-full shadow">
                        {off.tags}
                      </span>
                    )}
                    <h4 className="font-semibold text-[var(--color-dark)] text-base md:text-xl leading-tight">
                      {off.title}
                    </h4>
                    <p className="text-[var(--color-dark)] text-sm md:text-base mt-2 line-clamp-4 leading-snug">
                      {off.description}
                    </p>
                  </div>
                   <div className="w-20 md:w-28 h-20 md:h-28 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                    <LazyImage
                      src={off.offerimg}
                      alt={off.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-secondary text-lg md:text-2xl text-[var(--color-primary)] font-bold mt-2 md:mt-0">
                    ₹{off.price}
                  </span>

                  {isAdded ? (
                    <button className="md:-mt-[24px] mr-2 md:mr-[20px] border border-green-400 text-green-600 text-xs md:text-sm px-1 py-1 rounded-md flex items-center gap-1 bg-green-50 font-normal cursor-default notranslate"
                     translate="no"
                    >
                      <CheckCircle size={14} /> Added
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddOtherOffers(off)}
                      className="md:-mt-[24px] mr-2 md:mr-[20px] cursor-pointer border border-[var(--color-primary-light)] text-[var(--color-primary)] text-xs md:text-sm px-3 py-1.5 rounded-md flex items-center gap-1 bg-orange-50 font-medium hover:bg-orange-50 transition-all z-10 notranslate"
                      translate="no"
                    >
                      <Plus size={14} /> Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

         <button
            onClick={handleRedirect}
            className="font-secondary block md:hidden bg-[var(--color-primary-light)] hover:bg-[var(--color-primary)] text-white font-semibold py-2 md:py-3 px-5 md:px-8 rounded-lg text-lg shadow-md transition-all duration-300 mt-5 m-auto"
          >
            Next →
          </button>
      </Container>
    </div>
  );
};

export default PujaCart;
