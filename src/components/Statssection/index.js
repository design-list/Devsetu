"use client";

import { motion } from "framer-motion";
import { Globe2, Building2, Users, Star, ShieldCheck } from "lucide-react";
import Container from "../Container";
import Image from "next/image";
import Trusted from "../../../public/icons/shield.png";

export default function StatsSection() {
  const stats = [
    { icon: Globe2, value: "20+", label: "Countries" },
    { icon: Building2, value: "100+", label: "Temples" },
    { icon: Users, value: "20,000+", label: "Happy Devotees" },
    { icon: Star, value: "4.6", label: "Average Rating" },
  ];

  return (
    <section className="bg-gradient-to-b from-[#fff3e2] to-[#fffaf5] relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 overflow-hidden">
      <Container>
        {/* Decorative gradient glow (optional) */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(241,88,34,0.08)_0%,transparent_70%)] pointer-events-none"></div> */}

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT SIDE — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h2 className="font-secondary text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-4 sm:mb-6 leading-tight">
              Trusted by Hindus Globally
            </h2>
            <p className="text-[var(--color-dark)] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0">
              Committed to serving the devotional needs of millions, we make
              sacred rituals and blessings accessible wherever you are.
            </p>

            {/* Highlight Badge */}
            <div className="mt-8 sm:mt-10 inline-flex flex-wrap justify-center md:justify-start items-center gap-3 bg-white border border-orange-100 shadow-md px-5 sm:px-6 py-3 rounded-full">
              <ShieldCheck size={26} className="text-green shrink-0" />
              <span className="text-[var(--color-primary)] font-semibold uppercase text-sm sm:text-base text-center">
                India’s Most Trusted Devotional Platform
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE — Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-2 gap-6 sm:gap-8"
          >
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-[0_8px_20px_rgba(241,88,34,0.1)] border border-orange-100 text-center py-8 sm:py-10 px-4 sm:px-6 hover:shadow-[0_10px_25px_rgba(241,88,34,0.2)] hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[#f57e20] flex items-center justify-center text-white shadow-lg">
                      <Icon size={28} className="sm:size-32" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">
                    {item.value}
                  </h3>
                  <p className="text-gray-700 mt-1 text-base sm:text-lg">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
