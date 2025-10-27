"use client";

import { motion } from "framer-motion";
import {
  HandCoins,
  ReceiptText,
  Headset,
  Haze,
  Sparkles,
  ShieldCheck,
  Eye,
  HeartHandshake,
} from "lucide-react";

// -----------------------------
// HOW IT WORKS DATA
// -----------------------------
const steps = [
  {
    id: 1,
    icon: HandCoins,
    title: "Select Your Service",
    desc: "Choose from Puja, Chadhava or Seva to connect with the divine.",
  },
  {
    id: 2,
    icon: ReceiptText,
    title: "Share Your Details",
    desc: "Provide your name and gotra for Sankalp, and add optional offerings if you wish.",
  },
  {
    id: 3,
    icon: Headset,
    title: "Rituals by Pandits",
    desc: "Experienced pandits conduct your rituals with devotion and authentic Vedic procedures.",
  },
  {
    id: 4,
    icon: Haze,
    title: "Receive Blessings",
    desc: "Get your ritual video on WhatsApp within 3–4 days and receive a sacred DevaPrasadam box.",
  },
];

// -----------------------------
// OUR PROMISE DATA
// -----------------------------
const promises = [
  {
    icon: ShieldCheck,
    title: "Experienced Pandits",
    desc: "Our pandits are well-versed in authentic Vedic traditions and perform every ritual with utmost devotion.",
  },
  {
    icon: Sparkles,
    title: "Authentic Vedic Rituals",
    desc: "Every puja and seva follows traditional Vedic guidelines, ensuring spiritual purity and accuracy.",
  },
  {
    icon: Eye,
    title: "Transparent Process",
    desc: "From booking to blessings, every step is clear and communicated — no hidden details.",
  },
  {
    icon: HeartHandshake,
    title: "Devotion Beyond Distance",
    desc: "Even from afar, experience divine connection as our team performs rituals on your behalf.",
  },
];

// =========================================================
// HOW IT WORKS SECTION
// =========================================================
export default function HowItWorks() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-accent)] text-white py-18 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/patterns/mandala-bg.svg')] bg-center bg-cover opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)]"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-secondary text-4xl md:text-5xl font-extrabold mb-4 tracking-wide drop-shadow-lg"
        >
          Connect with the Divine in 4 Simple Steps
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-white/90 mb-20 max-w-2xl mx-auto leading-relaxed"
        >
          Experience devotion beyond distance through our transparent and heartfelt process.
        </motion.p>

        {/* Steps */}
        <div className="relative grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 md:gap-8">
          <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[2px] bg-white/30 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-[0_0_25px_rgba(255,200,100,0.5)]">
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.4} />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-white text-[var(--color-primary)] font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-md">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-secondary text-xl font-semibold mb-2 uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="text-white/90 text-base leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    <section className="relative bg-[#fffaf3] py-14 px-6 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('/patterns/flower-border.svg')] bg-center bg-cover opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Ornamental Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12"
        >
          {/* <img
            src="/icons/ornament-gold.svg"
            alt="ornament"
            className="w-20 opacity-70 mb-4"
          /> */}
          <h2 className="font-secondary text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] tracking-wide">
            Our <span className="text-[var(--color-info)]">Promise</span>
          </h2>
          <p className="text-gray-700 text-lg md:text-xl mt-4 max-w-2xl mx-auto">
            A sacred assurance of authenticity, transparency, and devotion — so you can connect with the divine with complete trust.
          </p>
        </motion.div>

        {/* Promise Cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10 md:gap-8">
          {promises.map((promise, i) => {
            const Icon = promise.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl border border-orange-100 shadow-[0_8px_20px_rgba(241,88,34,0.1)] p-8 hover:shadow-[0_12px_35px_rgba(241,88,34,0.25)] hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#f57e20] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-3">
                  {promise.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">{promise.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Ornament */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          {/* <img
            src="/icons/ornament-line.svg"
            alt="ornament divider"
            className="mx-auto w-40 opacity-70"
          /> */}
        </motion.div>
      </div>
    </section>
    </>
  );
}