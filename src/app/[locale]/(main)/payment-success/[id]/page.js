"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  CheckCircle2,
  PlayCircle,
  Video,
  Sparkles,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchCartDetailAction } from "@/redux/actions/cartActions";
import PageLaoder from "@/components/Atom/loader/pageLaoder";
import LazyImage from "@/components/Atom/LazyImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUser } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../../../../utils/localstorage";
import TempleIcon from "../../../../../../public/icons/puja-temple1.png"
import BookingTracker from "@/components/BookingTracker";

const PaymentSuccess = () => {

  const [openFAQ, setOpenFAQ] = useState(null);
  const [otherChargesData, setOtherChargesData] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const { cartDetails } = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.loader);

  useEffect(() => {
    dispatch(fetchCartDetailAction(params.id));
  }, [params]);

useEffect(() => {
  if (cartDetails?.otherCharges) {
    try {
      const parsed =
        typeof cartDetails.otherCharges === "string"
          ? JSON.parse(cartDetails.otherCharges)
          : cartDetails.otherCharges;
      setOtherChargesData(parsed);
    } catch (err) {
      console.error("❌ Failed to parse otherCharges:", err);
      setOtherChargesData({});
    }
  } else {
    setOtherChargesData({});
  }
}, [cartDetails]);


  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };


  const pujaFaqs = [
    {
      q: "How do I change puja participants or address details?",
      a: "You can message us on WhatsApp or email at customerservices.devasetu@gmail.com with your Booking ID. Please note that changes can only be made up to 24 hours before the puja begins",
    },
    {
      q: "When will I receive the video with my name and gotra pronounced?",
      a: "The entire video recording of your puja along with name & gotra sankalp will be shared within 3-4 days after the puja is done. After the Puja is completed, our temple team sends the Puja video to our central team. This includes the clips of Mandir darshan, Puja preparation, Hawan etc. Our editing team stitches these clips into a single video and adds subtitles for readability. They also include subtitles for your name and gotra sankalp. This entire process can take upto 3 days.",
    },
    {
      q: "When will I receive DevaPrasadam?",
      a: "If you have opted to receive DevaPrasadam, our team will dispatch the box to your address within 24 hours of the puja. Delivery may take 4-10 days, depending on your location. We use top delivery partners like Delhivery to ensure fast delivery.",
    },
  ];

  const chadhavaFaqs = [
    {
      q: "How do I change the chadhava participant name or address details?",
      a: "You can WhatsApp us or email us at customerservices.devasetu@gmail.com with your Booking ID. Changes can be made up to 24 hours before the chadhava.",
    },
    {
      q: "When will I receive the video of my chadhava?",
      a: "You will receive the video within 2 to 3 days after the chadhava. Our temple team records the offering and darshan, and we share the final video with you once compiled.",
    },
  ];


  if (isLoading) {
    return <PageLaoder />
  }

  // console.log("cartDetails", cartDetails)

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#fffaf5] via-[#fff6ee] to-[#fffaf2]">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-b-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-orange-100 p-2 md:p-12">
      <BookingTracker
        type= {cartDetails?.package?.type}
        paymentStatus= {cartDetails?.['paymentStatus']}
        bookingId={cartDetails?.id}
        pujaDate={formatDate(cartDetails?.package?.date, "full")}
        currentStep={1}
      />

        {/* Booking Header */}
        {cartDetails?.id && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-600 mb-8 border-b border-orange-100 pb-3"
          >
          </motion.div>
        )}

        {/* Main Layout */}
        <div className="grid md:grid-cols-[1.7fr_1fr] gap-12">

          {/* LEFT SECTION */}
          <div className="space-y-8">
             {cartDetails?.user_details && (
              <div className="bg-gradient-to-br from-[#fffaf6] via-white to-[#fff8f1] border border-orange-100 rounded-2xl shadow-md p-6 transition-all hover:shadow-lg">
                <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="text-orange-500" />
                  Puja & Participant’s Details
                </h3>

                <div className="divide-y divide-orange-50">
                  {cartDetails?.package && (
                    <div className="py-3">
                      <p className="font-bold text-yellow-600 text-base">
                        {cartDetails.package.productTitle}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {cartDetails.package.name}
                      </p>
                      <div className="mt-3 flex flex-col gap-2 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <LazyImage
                            src={TempleIcon}
                            alt="Temple Icon"
                            width={22}
                            height={22}
                            className="mr-2"
                          />
                          {cartDetails?.package?.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faCalendarDays}
                            className="text-[var(--color-primary-light)] text-lg"
                          />
                          {formatDate(cartDetails?.package?.date, "full")}{" "}
                          {cartDetails?.package?.tithi}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="py-3 text-sm">
                    {cartDetails?.package?.basePrice > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>{cartDetails.package.name}</span>
                        <span>₹{cartDetails?.package?.basePrice}</span>
                      </div>
                    )}

                    {cartDetails?.add_ons && (
                      <>
                        {
                          cartDetails?.add_ons?.map((item) => {
                            return<div className="flex justify-between text-gray-700">
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>
                            </div>
                          })
                        }
                        
                      </>
                    )}

                    {otherChargesData?.pandit_charge > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>{"Pandit Dakshina"}</span>
                        <span>₹{`${otherChargesData?.pandit_charge}`}</span>
                      </div>
                    )}

                    {otherChargesData?.pandit_charge > 0 && (
                      <div className="flex justify-between text-gray-700">
                        <span>Pandit Dakshina</span>
                        <span>₹{otherChargesData?.pandit_charge}</span>
                      </div>
                    )}

                    {cartDetails?.["grandTotal"] && (
                      <div className="flex justify-between font-semibold border-t border-orange-100 mt-2 pt-2 text-orange-700">
                        <span>Total Amount</span>
                        <span>₹{cartDetails?.["grandTotal"]}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3">
                    <p className="font-semibold text-gray-800">
                      {cartDetails?.user_details?.name} <span>{` (${cartDetails?.user_details?.gotra})`}</span>
                    </p>
                    <p className="text-gray-500 text-sm">
                      {cartDetails?.user_details?.whatsapp} •{" "}
                      {cartDetails?.user_details?.name}
                    </p>
                    <div className="mt-1 space-y-1">
                      {cartDetails?.user_details?.members?.map((m, i) => (
                        <p key={i} className="text-gray-500 text-sm">
                          {m}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                
              </div>
            )} 

            {cartDetails?.isActivePrasad && (
              <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-6">
                <div className="space-y-3 text-sm text-gray-700">
                  <p className="text-orange-600">
                    Puja Prashadm will Delhiverd on address :{" "}
                  </p>
                  <p>
                    {cartDetails?.user_details?.address},{" "}
                    {cartDetails?.user_details?.city},{" "}
                    {cartDetails?.user_details?.state} -{" "}
                    {cartDetails?.user_details?.postalCode}
                  </p>
                </div>
              </div>
            )}

          
            {/* <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">Puja Video & Updates</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>✅ Your Puja was conducted by Sri Mandir on 23rd August (Bhadrapada Krishna Amavasya).</p>
                <p>✅ Conducted between <strong>11:00 AM - 6:52 PM</strong>.</p>
                <button className="text-orange-600 font-medium hover:underline mt-2">
                  What to do during Puja →
                </button>
              </div>
            </div>

            <div className="border-l-4 border-orange-400 pl-5 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-orange-500 w-5 h-5" />
                <h4 className="font-semibold text-gray-800">
                  Glimpses from your Puja at the temple
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-lg overflow-hidden relative aspect-square bg-orange-50"
                  >
                    <img
                      src={`https://placehold.co/300x300/fef4ea/ffffff?text=Temple+${i}`}
                      alt={`Temple ${i}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black/40 text-[10px] text-white px-2 py-1">
                      Navgrah Shani Temple
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-l-4 border-orange-400 pl-5 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="text-orange-500 w-5 h-5" />
                <h4 className="font-semibold text-gray-800">Message from Panditji</h4>
              </div>
              <p className="text-gray-500 text-sm">
                Navagrah Shani Temple, Ujjain, Madhya Pradesh
              </p>
              <div className="rounded-lg overflow-hidden bg-orange-50 aspect-video">
                <video controls className="w-full h-full object-cover rounded-md" />
              </div>
            </div> */}

          </div>


            {/* RIGHT SECTION */}


             <div className="space-y-8">
              {cartDetails?.package?.type === "puja" && (
                <div className="bg-white border border-orange-100 rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">
                    Frequently Asked Questions
                  </h3>
                  {pujaFaqs.map((item, i) => (
                    <div key={i} className="border-t first:border-t-0">
                      <button
                        onClick={() => toggleFAQ(i)}
                        className="w-full py-3 flex justify-between items-center text-left text-gray-800 font-medium hover:text-orange-700 transition"
                      >
                        {item.q}
                        <ChevronDown
                          className={`w-4 h-4 text-orange-500 transition-transform ${
                            openFAQ === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openFAQ === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pb-3 text-sm text-gray-600 leading-relaxed"
                          >
                            {item.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}

              {cartDetails?.package?.type === "chadhava" && (
                <div className="bg-white border border-orange-100 rounded-2xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">
                    Frequently Asked Questions
                  </h3>
                  {chadhavaFaqs.map((item, i) => (
                    <div key={i} className="border-t first:border-t-0">
                      <button
                        onClick={() => toggleFAQ(i)}
                        className="w-full py-3 flex justify-between items-center text-left text-gray-800 font-medium hover:text-orange-700 transition"
                      >
                        {item.q}
                        <ChevronDown
                          className={`w-4 h-4 text-orange-500 transition-transform ${
                            openFAQ === i ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {openFAQ === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pb-3 text-sm text-gray-600 leading-relaxed"
                          >
                            {item.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}

              {/* SUPPORT */}
              <div className="bg-gradient-to-br from-orange-50 via-white to-orange-100 border border-orange-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  Help & Support for Puja Booking
                </h3>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="flex items-start gap-3">
                    <Phone className="text-green-700 w-5 h-5 mt-1" />
                    <p>
                      <span className="font-semibold text-gray-800">
                        078-779-61501
                      </span>
                      <br />
                      <span className="text-gray-500">
                        Available 10:30 AM - 7:30 PM
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-md shadow-sm hover:bg-orange-50 transition">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span>customerservices.devasetu@gmail.com</span>
                    </button>

                    <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition">
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;
