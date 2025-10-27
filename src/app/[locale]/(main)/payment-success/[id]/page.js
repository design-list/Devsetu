"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MessageCircle, ChevronDown, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchCartDetailAction } from "@/redux/actions/cartActions";

const PaymentSuccess = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();

  const { cartDetails } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch((fetchCartDetailAction(params.id)));
  }, [params]);

  console.log("cartDetails", cartDetails);

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

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Booking ID */}
        {cartDetails?.['id'] && <p className="text-sm text-gray-500 mb-4 font-medium">Booking ID #{cartDetails?.['id']}</p>}

        {/* Main Layout */}
        <div className="grid md:grid-cols-[1.7fr_1fr] gap-8">
          {/* LEFT SECTION */}
          <div className="space-y-8">
            {/* Watch Puja Video */}
            <div className="bg-gradient-to-r from-orange-200 to-orange-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between">
              <div className="text-center sm:text-left space-y-2">
                <h2 className="text-xl font-semibold text-orange-900">
                  Watch Your Puja Video
                </h2>
                <p className="text-gray-700 text-sm">
                  Panditji has recited the Names in A-Z order. Watch the video to hear your name.
                </p>
              </div>
              <button className="bg-orange-600 text-white px-4 py-2 rounded-md mt-4 sm:mt-0 hover:bg-orange-700 transition">
                Watch Your Puja Video
              </button>
            </div>

            {/* Puja & Participant's Details */}
            {cartDetails?.['user_details'] && <div>
              <h3 className="text-lg font-semibold mb-3">
                Puja and Participant's Details
              </h3>
              <div className="border rounded-md divide-y">
                {cartDetails?.['package'] && <div className="p-3">
                  <p className="font-medium">{cartDetails?.['package'].productTitle}</p>
                  <p className="text-gray-500 text-sm">{cartDetails?.['package'].name}</p>
                </div>}
                <div className="p-3">
                  <p className="font-medium">{cartDetails?.['user_details'].name}</p>
                  <p className="text-gray-500 text-sm">{`${cartDetails?.['user_details'].whatsapp} • ${cartDetails?.['user_details'].name}`}</p>
                  {
                    cartDetails?.['user_details']?.members?.map((member, index) => (
                      <p key={index} className="text-gray-500 text-sm">{member}</p>
                    ))
                  }
                  
                </div>
              </div>
            </div>}

            {/* Puja Video & Updates */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Puja video & updates</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold text-lg leading-5">✔</span>
                  <p className="text-gray-700">
                    Your Puja is successfully conducted by Sri Mandir on 23rd August, Bhadrapada Krishna Amavasya
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-600 font-bold text-lg leading-5">✔</span>
                  <p className="text-gray-700">
                    Your Puja was conducted from <strong>11:00 AM - 6:52 PM</strong>
                  </p>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  What to do during Puja →
                </button>
              </div>
            </div>

            {/* GLIMPSES SECTION */}
            <div className="border-l-2 border-green-500 pl-4 space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-600 w-5 h-5" />
                <h4 className="font-semibold text-gray-800">
                  Here are some glimpses of your puja shared by our team from the temple
                </h4>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-md overflow-hidden bg-yellow-200 aspect-square">
                  <video controls className="w-full h-full object-cover" />
                </div>
                <div className="rounded-md overflow-hidden bg-yellow-200 aspect-square">
                  <video controls className="w-full h-full object-cover" />
                </div>
                <div className="rounded-md overflow-hidden relative aspect-square">
                  <img
                    src="https://placehold.co/300x300/orange/white?text=Temple+1"
                    alt="Temple glimpse"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-xs text-white px-2 py-1">
                    Navgrah Shani Temple (श्री नवग्रह शनि)
                  </div>
                </div>
                <div className="rounded-md overflow-hidden relative aspect-square">
                  <img
                    src="https://placehold.co/300x300/orange/white?text=+10"
                    alt="More glimpses"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-xs text-white px-2 py-1">
                    Navgrah Shani Temple (श्री नवग्रह शनि)
                  </div>
                </div>
              </div>
            </div>

            {/* MESSAGE FROM PANDITJI */}
            <div className="border-l-2 border-green-500 pl-4 space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-600 w-5 h-5" />
                <h4 className="font-semibold text-gray-800">Message from Panditji</h4>
              </div>
              <p className="text-gray-500 text-sm">
                Navagrah Shani Temple, Ujjain, Madhya Pradesh
              </p>
              <div className="rounded-md overflow-hidden bg-yellow-200 aspect-video">
                <video controls className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            {/* FAQ Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Frequently asked questions</h3>
              <div className="border rounded-md divide-y">
                {faqs.map((item, i) => (
                  <div key={i} className="p-3">
                    <button
                      onClick={() => toggleFAQ(i)}
                      className="w-full flex justify-between items-center text-left font-medium text-gray-800"
                    >
                      {item.q}
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform ${
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
                          transition={{ duration: 0.25 }}
                        >
                          <p className="mt-2 text-gray-600 text-sm">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Help & Support for Puja Booking
              </h3>
              <div className="bg-gray-100 p-4 rounded-md space-y-3">
                <div className="flex items-start space-x-3">
                  <Phone className="text-green-700 w-5 h-5 mt-0.5" />
                  <p className="text-gray-800 leading-tight">
                    080-711-74417 <br />
                    <span className="text-gray-500 text-sm">
                      You can call us from 10:30 AM - 7:30 PM
                    </span>
                  </p>
                </div>

                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 bg-white px-3 py-2 rounded-md shadow-sm border hover:bg-gray-50 transition">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <span>Email us</span>
                  </button>

                  <button className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition">
                    <MessageCircle className="w-4 h-4" />
                    <span>Whatsapp us</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;