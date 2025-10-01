"use client";

import Image from "next/image";
import Link from "next/link";

  const wishes = [
    "Wishing you a prosperous and joyful Meena Sankranti!",
    "May the blessings of Lord Vishnu fill your life with happiness and peace.",
    "May this Meena Sankranti bring new beginnings and positivity.",
    "Wishing you success, peace, and prosperity always.",
  ];

// export default function ArticleBody({ wishes = [] }) {
const ArticleDetails = () => {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-orange-600">Home</Link>
          </li>
          <span>›</span>
          <li>
            <Link href="/articles" className="hover:text-orange-600">Articles</Link>
          </li>
          <span>›</span>
          <li>
            <Link href="/articles/wishes" className="hover:text-orange-600">Wishes</Link>
          </li>
          <span>›</span>
          <li className="text-gray-700 font-medium">
            Meena Sankranti Quotes & Wishes
          </li>
        </ol>
      </nav>
    <div className="py-4 mb-8">
        <Image
          src={"/images/chalisa.png"}
          alt="Meena Sankranti"
          className="w-full h-120 object-fill rounded-lg"
        />
    </div>
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900">
        Meena Sankranti Quotes & Wishes
      </h1>

      {/* Intro */}
      <p className="text-lg text-gray-700 mb-6">
        Looking for meaningful Meena Sankranti wishes? Explore spiritual quotes to celebrate 
        the significance of Meena Sankranti and embrace positive energy, health, and spiritual growth.
      </p>

      {/* About Section */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-3">About Meena Sankranti</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Meena Sankranti is a significant festival celebrated by Hindus, marking the transition of the Sun into 
        the zodiac sign of Pisces (Meena Rashi). It usually falls around the 14th or 15th of March every year. 
        This day holds great importance as it marks the end of the winter solstice and the beginning of longer days, 
        signifying new beginnings and growth.
      </p>
      <p className="text-gray-700 leading-relaxed mb-4">
        The festival is dedicated to Lord Vishnu and is associated with various customs and rituals. Devotees offer 
        prayers to seek blessings for prosperity, health, and peace. A key tradition during Meena Sankranti is the 
        ritual bathing in holy rivers like the Ganges and the Yamuna, symbolizing purification of the soul. People 
        also prepare sweets and delicacies, and families come together to share meals, strengthening bonds of unity.
      </p>
      <p className="text-gray-700 leading-relaxed mb-8">
        In some regions, processions and cultural events are organized. Farmers also pray for a good harvest, as 
        this time of year marks the beginning of the agricultural season. Overall, Meena Sankranti is a time of joy, 
        reflection, and spiritual growth, bringing people together in celebration and gratitude.
      </p>

      {/* Wishes Section */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Meena Sankranti Quotes and Wishes
      </h2>

      {wishes.length > 0 ? (
        <ul className="list-decimal pl-6 space-y-3 text-gray-700">
          {wishes.map((wish, idx) => (
            <li key={idx}>{wish}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No wishes available.</p>
      )}

      {/* Published info */}
      <div className="mt-10 text-sm text-gray-500">
        Published by <span className="font-semibold text-gray-700">Sri Mandir</span> · May 19, 2025
      </div>

      {/* Share Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <button className="px-3 py-2 bg-orange-500 text-white text-sm rounded-lg shadow hover:bg-orange-600">
          Share
        </button>
        <button className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600">
          WhatsApp
        </button>
      </div>

      {/* Recommended Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Recommended</h3>
          <Link href="#" className="text-orange-600 text-sm hover:underline">
            Read more ›
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Ayyappa Swamy Puja Quotes & Wishes",
            "Skanda Sashti Quotes & Wishes",
            "Makaravilakku Quotes & Wishes",
          ].map((title, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-medium text-gray-800">{title}</h4>
              <p className="text-sm text-gray-500 mt-2">
                Celebrate the auspicious occasion with devotion and joy.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}


export default ArticleDetails;