"use client";

export default function WishesBody() {
  const wishes = [
    "Meena Sankranti",
    "Ayyappa Swamy",
    "Skanda Sashti",
    "Makaravilakku",
    "Vaikuntha Ekadashi",
    "Datta Jayanti",
    "Tulasi Vivaha",
    "Dev Uthani",
    "Chhath Puja",
    "Bhai Dooj Quotes",
    "Govardhan Puja",
    "Deepawali Quotes",
    "Naraka Chaturdashi",
    "Dhanteras Quotes",
    "Ahoi Ashtami",
    "Karva Chauth",
    "Sharad Purnima",
    "Vijayadashami",
    "Maha Navami",
    "Durga Ashtami",
    "Sharad Navratri",
    "Pitru Paksha",
    "Ananta Chaturdashi",
    "Onam Quotes",
    "Rishi Panchami",
    "Ganesh Chaturthi",
    "Hartalika Teej",
    "Krishna Janmashtami",
    "Raksha Bandhan",
    "Naga Panchami",
    "Nirjala Ekadashi",
    "Ganga Dussehra",
    "Vat Savitri Vrat",
    "Narasimha Jayanti",
    "Ganga Saptami",
    "Akshaya Tritiya",
    "Ratha Saptami",
    "Baisakhi Quotes",
    "Hanuman Jayanti",
    "Rama Navami",
    "Chaitra Navratri",
    "Holi Quotes",
    "Maha Shivratri",
    "Vasant Panchami",
    "Lohri Quotes",
    "Pongal Quotes",
    "Makar Sankranti",
    "Basava Jayanti",
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      {/* Tabs */}
      <div className="flex gap-8 border-b mb-6">
        <button className="pb-2 text-gray-600 hover:text-orange-600 transition">
          Articles
        </button>
        <button className="pb-2 border-b-2 border-orange-600 text-orange-600 font-semibold">
          Wishes
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Wishes</h1>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishes.map((wish, index) => (
          <div
            key={index}
            className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="font-medium text-gray-800 truncate">{wish}</h2>
            <p className="text-sm text-gray-500 mt-2">
              Updated at May 19, 2025
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
