import { FlameKindling, MapPinned, ShieldCheck, Star, UsersRound } from "lucide-react";

// components/StatsSection.js
export default function StatsSection() {
  const stats = [
    { value: "30M+ <br /> Devotees", label: "have trusted us in their devotional journey", icon: <UsersRound size={62} strokeWidth={0.5} /> },
    { value: "5.0 <br /> Star Rating", label: "Over 1 Lakh devotees express their love for us on playstore", icon: <Star size={62} strokeWidth={0.5} /> },
    { value: "30+ <br/ > Countries", label: "We help devotees globally reconnect with their devotional heritage", icon: <MapPinned size={62} strokeWidth={0.5} /> },
    { value: "3M+ <br /> Services", label: "Millions of devotees have commenced Pooja and Chadhava at famous temples of India with us to seek God's grace.", icon: <FlameKindling size={62} strokeWidth={0.5} /> },
  ];

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="flex justify-between flex-col md:flex-row">
        <div className="w-full md:w-2/3 md:px-6 grid md:grid-cols-2 gap-4 md:gap-0 lg:grid-cols-2">
        {/* Stats cards */}
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border-silver flex flex-col justify-start text-left items-baseline px-4 md:px-15 py-4 md:py-20 md:mx-8 md:my-4"
          >
          {item.icon}
            <h3 className="font-secondary capitalize text-4xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: item.value }} />
            <p className="text-[var(--primary)] text-base capitalize">{item.label}</p>
          </div>
        ))}
      </div>
      {/* Highlighted card */}
        <div className="md:w-1/3 my-4 bg-[var(--color-primary-light)] text-[var(--forcast)] rounded-xl flex flex-col justify-center p-8">
        <ShieldCheck size={92} strokeWidth={0.5} />
          <span className="uppercase text-xl font-bold mb-2">Dev Setu</span>
          <h3 className="font-secondary text-4xl font-bold mb-2">Trusted by Over 30 Million Devotees</h3>
          <p className="text-lg font-normal">India’s Largest Devotional Platform</p>
        </div>
      </div>
    </section>
  );
}
