// components/HowItWorks.js
import { Laptop, Smartphone, Search, Headphones, HandCoins, ReceiptText, Headset, Haze } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <HandCoins size={40} strokeWidth={1.25} className="w-12 h-12 text-[var(--secondary)]" />,
    title: "Offerings",
    desc: "Claim your blessing package and choose your Chadhava options",
  },
  {
    id: 2,
    icon: <ReceiptText size={40} strokeWidth={1.25} className="w-12 h-12 text-[var(--secondary)]" />,
    title: "Details",
    desc: "Fill name and gotra and pay dakshina",
  },
  {
    id: 3,
    icon: <Headset size={40} strokeWidth={1.25} className="w-12 h-12 text-[var(--secondary)]" />,
    title: "Vidhi",
    desc: "Pandit ji will offer the chadhawa on the said date",
  },
  {
    id: 4,
    icon: <Haze size={40} strokeWidth={1.25} className="w-12 h-12 text-[var(--secondary)]" />,
    title: "Blessings",
    desc: "Receive Video on Whatsapp in 2-3 days",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] text-[var(--forcast)] py-16 rounded-lg">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="font-secondary text-4xl font-extrabold mb-2 ">How it works</h2>
        <p className="text-[var(--color-dark)] text-xl mb-12">
          Domun can help you save on your home-related finances
        </p>

        <div className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 after:hidden md:after:block after:absolute after:w-full after:h-1 after:bg-[var(--color-background)] after:left-0 after:top-[48%]">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white text-[var(--primary)] rounded-4xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition z-10"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full text-[var(--primary)] mb-4">
                {step.icon}
              </div>
              <h3 className="font-secondary uppercase text-2xl font-semibold mb-2">{step.title}</h3>
              <p className="text-base text-[var(--primary)]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
