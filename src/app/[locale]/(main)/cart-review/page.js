"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Lock,
  Calendar,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { requestOfferingDataAction } from "@/redux/actions/offeringActions";
import LazyImage from "@/components/Atom/LazyImage";
import {
  addPanditDakshinaAction,
  removePackageAction,
  requestClearCartAction,
  updateOfferingCountAction,
} from "@/redux/actions/cartActions";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../../../helper/useWithLang";
import TempleIcon from "../../../../../public/icons/puja-temple1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate } from "../../../../../utils/localstorage";
import BreadcrumbSteps from "@/components/Breadcrumbs/Breadcrumb";

const PujaCart = () => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const presetAmounts = [51, 101, 151];

  const dispatch = useDispatch();
  const { allCarts } = useSelector((state) => state.cart);
  const router = useRouter();
  const withLang = useWithLang();

  useEffect(() => {
    dispatch(requestOfferingDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (selectedAmount) {
      const amount = parseInt(selectedAmount);
      dispatch(addPanditDakshinaAction(amount));
    } else {
      dispatch(addPanditDakshinaAction(0));
    }
  }, [selectedAmount]);

  const handleQuantityChange = (id, type) =>
    dispatch(updateOfferingCountAction(id, type));

  const handleRemovePackages = () => {
    dispatch(removePackageAction());
    dispatch(requestClearCartAction());
  };

  const goToCheckout = () => router.push(withLang("/checkout"));
  const goHome = () => router.push(withLang("/"));

  const handleSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const handleManualChange = (e) => {
    setSelectedAmount(e.target.value);
  };

  console.log("allCartsallCarts", allCarts);

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
    <div className="min-h-screen bg-gradient-to-b from-[#fffaf4] via-[#fffefd] to-[#fff] pt-4 pb-6 md:py-12 px-4">
      <BreadcrumbSteps currentStep={3} />
      <div className="max-w-3xl mx-auto grid grid-cols-1 gap-10">
        {/* LEFT SECTION */}
        <div className="bg-white/90 backdrop-blur-md border border-orange-100 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-3 md:p-6 relative overflow-hidden mt-8 md:mt-0">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] rounded-t-3xl"></div>

          <h2 className="font-secondary text-lg md:text-2xl font-bold text-[var(--color-primary)] my-2 md:my-4 md:mb-6 flex justify-center md:justify-baseline items-center gap-2">
            Review Your Booking 🪔
          </h2>

          <div
            className="md:border md:border-[var(--color-dark)]/10 rounded-2xl p-2.5 md:p-5 md:shadow-sm bg-gradient-to-br from-white to-orange-50/30 hover:shadow-lg transition-all duration-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex justify-between items-center cursor-pointer">
              <div className="flex flex-col">
                <p className="text-base md:text-lg font-semibold text-[var(--color-dark)]">
                  {allCarts?.package?.productTitle}
                </p>
              </div>
              <button
                onClick={handleRemovePackages}
                className="absolute top-[22%] md:top-[16%] right-[7%] md:right-[50px] bg-yellow-500 hover:bg-red-600 text-white p-1 md:p-2 rounded-md transition"
              >
                <Trash2 size={18} />
              </button>

              {isOpen ? (
                <ChevronUp className="w-6 h-6 text-[var(--color-dark)] top-0" />
              ) : (
                <ChevronDown className="w-6 h-6 text-[var(--color-dark)] top-0" />
              )}
            </div>

            <span className="text-sm text-[var(--color-dark)]">
              {allCarts?.package?.packageType}
            </span>
            {allCarts?.package?.packagePrice && (
              <div className="flex justify-between items-center mt-2">
                <span className="font-secondary font-bold text-[var(--color-dark)] text-base md:text-xl">
                  ₹{allCarts?.package?.packagePrice}
                </span>
              </div>
            )}

            <hr className="mt-4 md:mt-0" />
            {/* Expandable Content */}
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

          {/* ADD-ONS */}
          <div className=" grid grid-cols-2 md:grid-cols-3 gap-2">
            {allCarts?.add_ons.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-xl md:rounded-xl p-2.5 md:p-3 md:mt-5 bg-white/90 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-start flex-col">
                  <div className="flex-1 pr-3">
                    {item?.title?.endsWith("(₹51)") ? (
                        <>
                          {item?.title?.replace("(₹51)", "")}
                          <span className="line-through text-red-500">(₹51)</span>
                        </>
                      ) : (
                        <h3 className="font-bold text-sm md:text-lg text-[var(--color-dark)]">{item?.title}</h3>
                      )}
                  </div>

                  <div className="w-full flex flex-row justify-between items-end ">
                    <span className="font-secondary font-semibold text-[var(--color-primary)] text-base md:text-lg">
                      ₹{item.price}
                    </span>
                    <div className="flex items-center border border-gray-300 rounded-md mt-2 bg-gray-50">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, "decrement")
                        }
                        className="p-1.5 text-[var(--color-dark)] hover:text-black cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-1 md:px-3 text-sm md:text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          item.title.endsWith("(₹51)")
                          ? alert("One person can add only 1"):
                          handleQuantityChange(item.id, "increment")
                        }
                        className="p-1.5 text-[var(--color-dark)] hover:text-black cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

         { allCarts?.package?.type === "puja" && <>
            <h2 className="text-base md:text-lg font-semibold text-[var(--color-dark)] mt-4">
              Select Pandit Dakshina Amount (₹)
            </h2>
            <div className="flex flex-row items-center gap-4 bg-white my-2 w-full mx-auto">
              {/* Preset Buttons */}
              <div className="flex md:justify-center gap-4 w-full md:w-auto">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handleSelect(amount)}
                    className={`px-3 md:px-6 py-1 md:py-2 rounded-xl text-sm
                    md:text-base font-medium border transition-all duration-200 ${
                      selectedAmount == amount
                        ? "bg-orange-500 text-white border-orange-500 shadow-md"
                        : "bg-white text-[var(--color-dark)] border-gray-300 hover:bg-orange-100"
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
                {/* Manual Input */}
                <div className="hidden md:flex items-center gap-2 w-full justify-center">
                  <label htmlFor="manual" className="text-gray-600 font-medium">
                    Custom:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-[var(--color-dark)]">
                      ₹
                    </span>
                    <input
                      id="manual"
                      type="number"
                      value={selectedAmount}
                      onChange={handleManualChange}
                      placeholder="Custom amount"
                      className="pl-7 pr-3 py-2 border-b text-base border-gray-300 focus:outline-none text-[var(--color-dark)] w-full appearance-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
          }


          {/* Manual Input */}
            {allCarts?.package?.type === "puja" && <div className="flex md:hidden items-center gap-2 mt-4 w-full md:justify-center">
              <label htmlFor="manual" className=" text-sm md:text-base text-gray-600 font-medium">
                Custom:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-[var(--color-dark)]">
                  ₹
                </span>
                <input
                  id="manual"
                  type="number"
                  value={selectedAmount}
                  onChange={handleManualChange}
                  placeholder="Custom amount"
                  className="pl-7 pr-3 py-2 border-b text-base border-gray-300 focus:outline-none text-[var(--color-dark)] w-full appearance-none"
                />
              </div>
            </div> }

          {/* BILL SUMMARY */}
          {allCarts?.add_ons.length > 0 && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg uppercase font-semibold mb-3 text-[var(--color-dark)] tracking-wide">
                Bill Summary
              </h3>
              <div className="space-y-2 text-base">
                {allCarts.add_ons.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-[var(--color-dark)]"
                  >
                    <span>{item.title}</span>
                    <span className="font-secondary font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between text-[var(--color-dark)]">
                  {selectedAmount && parseInt(selectedAmount) > 0 && (
                    <>
                      <span>Pandit Dakshina</span>
                      <span className="font-secondary font-semibold">
                        ₹{selectedAmount}
                      </span>
                    </>
                  )}
                </div>

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
            className="w-full bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] text-white font-semibold py-2 md:py-4 rounded-xl mt-4 md:mt-8 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex justify-between items-center px-3 md:px-6"
          >
            <span className="font-secondary text-base md:text-xl">
              ₹{allCarts.grand_total}
            </span>
            <span className="text-base md:text-lg font-medium">Proceed to Checkout →</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PujaCart;
