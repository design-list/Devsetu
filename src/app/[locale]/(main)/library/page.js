"use client";

import Link from "next/link";

const Library = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Sub Nav */}
      <div className="px-6 py-3">
        <nav className="flex gap-6">
          <Link href="#" className="text-gray-600">
            Home
          </Link>
          <Link href="#" className="text-orange-600 font-semibold border-b-2 border-orange-600">
            Articles
          </Link>
        </nav>
      </div>

      {/* Popular Topics */}
      <section className="px-6 py-8">
        <h2 className="text-lg font-semibold mb-4">See today&apos;s popular topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: "Aarti", count: "66", color: "bg-orange-50" },
            { title: "Chalisa Collection", count: "19", color: "bg-orange-50" },
            { title: "Festival", count: "100", color: "bg-orange-50" },
            { title: "Horoscope", count: "1", color: "bg-orange-50" },
            { title: "Wishes", count: "54", color: "bg-orange-50" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-orange-50 rounded-xl p-4 shadow-sm hover:shadow-md transition`}
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.count} Article</p>
            </div>
          ))}
        </div>
        <button className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700">
          See more popular topics →
        </button>
      </section>

      {/* Category Section Component */}
      {[
        { title: "Wishes", items: ["Meena Sankranti", "Ayyappa Swamy", "Skanda Sashti", "Makaravilakku", "Vaikuntha Ekadashi", "Datta Jayanti"] },
        { title: "Mantra", items: ["Ganesha Mantras", "Radha Mantra", "Narayan Mantra", "Kali Mantra", "Agni Mantra", "Maha Rudrabhishek"] },
        { title: "Festival", items: ["Bhadrapada Purnima", "Sawan Shivratri", "Jaya Parvati Fast", "Jagannath Temple Story", "Ved Vyas Jayanti", "Vaishakh Purnima"] },
        { title: "Chalisa Collection", items: ["Hanuman Chalisa", "Kaali Chalisa", "Radha Chalisa", "Parwati Chalisa", "Santoshi Chalisa", "Tulsi Chalisa"] },
        { title: "Aarti", items: ["Ganesh Aarti", "Balaji Aarti", "Dharmaraj Aarti", "Lalita Aarti", "Ramayan Aarti", "Sankata Aarti"] },
        { title: "Horoscope", items: ["Gemini Horoscope 2025"] },
      ].map((section, idx) => (
        <section key={idx} className="px-6 py-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <button className="px-3 py-1 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600">
              view more →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border p-4 shadow-sm hover:shadow-md transition text-center bg-white"
              >
                <div className="h-28 w-full bg-orange-100 rounded-lg mb-2"></div>
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}


export default Library;
