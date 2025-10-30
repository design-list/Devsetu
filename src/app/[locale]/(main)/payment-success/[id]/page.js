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

const PaymentSuccess = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const { cartDetails } = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.loader);

  useEffect(() => {
    dispatch(fetchCartDetailAction(params.id));
  }, [params]);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      q: "What should I do during the puja?",
      a: "You can meditate, chant mantras, or simply sit in silence while the puja is being conducted.",
    },
    {
      q: "How do I change the puja participants or address details?",
      a: "You can update the details by contacting our support team before the puja date.",
    },
    {
      q: "When will I get video with my name & gotra pronounced?",
      a: "The video will be available shortly after the puja is completed.",
    },
    {
      q: "When will I get teerth prasad?",
      a: "The teerth prasad is usually dispatched within a few days after the puja.",
    },
  ];


  if (isLoading) {
    return <PageLaoder />
  }

  // console.log("cartDetails", cartDetails)

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#fffaf5] via-[#fff6ee] to-[#fffaf2] py-14 px-6">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-orange-100 p-8 md:p-12">

        {/* Booking Header */}
        {cartDetails?.id && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-gray-600 mb-6"
          >
            <div className="flex justify-between">
              {cartDetails?.['id'] && <>Booking ID: <span className="font-semibold text-orange-700">#{cartDetails?.id}</span></>}
              {cartDetails?.['paymentStatus'] && <spen className="font-semibold text-orange-700">Payment status: {cartDetails?.['paymentStatus']}</spen>}
            </div>

          </motion.div>
        )}

        {/* Main Layout */}
        <div className="grid md:grid-cols-[1.7fr_1fr] gap-12">

          {/* LEFT SECTION */}
          <div className="space-y-10">
            {/* 🎥 Watch Puja Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#fef3e9] to-[#fffaf2] border border-orange-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-sm"
            >
              <div className="text-center sm:text-left space-y-2">
                <h2 className="text-xl font-bold text-orange-900">
                  Watch Your Puja Video
                </h2>
                <p className="text-gray-700 text-sm">
                  Panditji has recited the names in order. Watch to hear your Sankalp.
                </p>
              </div>
              <button className="mt-4 sm:mt-0 flex items-center gap-2 bg-gradient-to-r from-[#f57e20] to-[#f15822] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:scale-[1.03] transition">
                <PlayCircle className="w-5 h-5" /> Watch Now
              </button>
            </motion.div>

            {/* Puja & Participant's Details */}
             {/* {cartDetails?.['user_details'] && <div>
              <h3 className="text-lg font-semibold mb-3">
                Puja and Participant's Details
              </h3>
              <div className="border rounded-md divide-y">
                <div className="p-3">
                  <p className="font-medium">{cartDetails?.['user_details'].name}</p>
                  <p className="text-gray-500 text-sm">{`${cartDetails?.['user_details'].whatsapp} • ${cartDetails?.['user_details'].name}`}</p>
                  {
                    cartDetails?.['user_details']?.members?.map((member, index) => (
                      <p key={index} className="text-gray-500 text-sm">{member}</p>
                    ))
                  }
                </div>

               {cartDetails?.['package'] && <div className="p-3">
                  <p className="font-medium">{cartDetails?.['package'].productTitle}</p>
                  <p className="text-gray-500 text-sm">{cartDetails?.['package'].name}</p>
                </div>}

                <div className="space-y-2 text-sm">
                  {cartDetails?.["add_ons"].map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-gray-700"
                    >
                      <span>{item?.name}</span>
                      <span>₹{`${item?.price}* ${item?.quantity}`}</span>
                    </div>
                  ))}
                  {cartDetails?.["grandTotal"] && <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total Amount</span>
                    <span>₹{cartDetails?.["grandTotal"]}</span>
                  </div>}
                </div>
              </div>
            </div>
            } */}

             {cartDetails?.user_details && (
              <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  Puja & Participant’s Details
                </h3>
                <div className="divide-y">
                  {cartDetails?.package && (
                    <div className="py-2">
                      <p className="font-semibold text-gray-800">{cartDetails.package.productTitle}</p>
                      <p className="text-gray-500 text-sm">{cartDetails.package.name}</p>
                    </div>
                  )}
                  <div className="py-2">
                    <p className="font-semibold text-gray-800">
                      {cartDetails.user_details.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {cartDetails.user_details.whatsapp} • {cartDetails.user_details.name}
                    </p>
                    {cartDetails?.user_details?.members?.map((m, i) => (
                      <p key={i} className="text-gray-500 text-sm">{m}</p>
                    ))}
                  </div>
                </div>
                
              </div>
            )}


            {/* 🌸 Puja Video & Updates */}
            <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-orange-800 mb-4">Puja Video & Updates</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>✅ Your Puja was conducted by Sri Mandir on 23rd August (Bhadrapada Krishna Amavasya).</p>
                <p>✅ Conducted between <strong>11:00 AM - 6:52 PM</strong>.</p>
                <button className="text-orange-600 font-medium hover:underline mt-2">
                  What to do during Puja →
                </button>
              </div>
            </div>

            {/* 🌺 Glimpses Section */}
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

            {/* 🙏 Message from Panditji */}
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
            </div>
          </div>


            {/* RIGHT SECTION */}
            <div className="space-y-8">
              {/* FAQ Accordion */}
              <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">Frequently Asked Questions</h3>
                {faqs.map((item, i) => (
                  <div key={i} className="border-t first:border-t-0">
                    <button
                      onClick={() => toggleFAQ(i)}
                      className="w-full py-3 flex justify-between items-center text-left text-gray-800 font-medium"
                    >
                      {item.q}
                      <ChevronDown
                        className={`w-4 h-4 text-orange-500 transition-transform ${openFAQ === i ? "rotate-180" : ""
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
                          className="pb-3 text-sm text-gray-600"
                        >
                          {item.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Support Card */}
              <div className="bg-gradient-to-br from-orange-100 via-orange-50 to-white border border-orange-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  Help & Support for Puja Booking
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <Phone className="text-green-700 w-5 h-5 mt-1" />
                    <p>
                      <span className="font-semibold">080-711-74417</span>
                      <br />
                      <span className="text-gray-600">
                        Available 10:30 AM - 7:30 PM
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border px-3 py-2 rounded-md shadow-sm hover:bg-orange-50 transition">
                      <Mail className="w-4 h-4 text-gray-600" />
                      <span>Email us</span>
                    </button>

                    <button className="flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition">
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
