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
    <section className="py-16 bg-white">
      <div className="flex justify-between">
        <div className="w-2/3 px-6 grid md:grid-cols-2 lg:grid-cols-2">
        {/* Stats cards */}
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border-silver flex flex-col justify-start text-left items-baseline px-15 py-20 mx-8 my-4"
          >
          {item.icon}
            <h3 className="capitalize text-4xl font-bold mb-2" dangerouslySetInnerHTML={{ __html: item.value }} />
            <p className="text-[var(--primary)] text-base capitalize">{item.label}</p>
          </div>
        ))}
      </div>
      {/* Highlighted card */}
        <div className="w-1/3 my-4 bg-[var(--secondary)] text-[var(--forcast)] rounded-xl flex flex-col justify-center p-8">
        <ShieldCheck size={92} strokeWidth={0.5} />
          <span className="uppercase text-xl font-bold mb-2">Dev Setu</span>
          <h3 className="text-4xl font-bold mb-2">Trusted by Over 30 Million Devotees</h3>
          <p className="text-lg font-normal">India’s Largest Devotional Platform</p>
        </div>
      </div>
    </section>
  );
}
