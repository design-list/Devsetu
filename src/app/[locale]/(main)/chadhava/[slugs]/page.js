"use client";

import Container from "@/components/Container";
import PageDetailHeroSlider from "@/components/HeroBanner/PageDetailHeroSlider";
import LazyImage from "@/components/Atom/LazyImage";

const pujaData = {

    "faq": [
        {
            "q": "How will the puja be performed?",
            "a": "Both Online & Offline participation available."
        },
        { "q": "Will I receive Prasad?", "a": "Yes, Prasad will be couriered to your home." },
        {
            "q": "Can I include family names?",
            "a": "Yes, family member names can be included in Sankalpa."
        }
    ]
}

const data = [
    {
        title: "Wednesday Special",
        image: "/images/pujadetail.webp",
    },
    {
        title: "Friday Puja",
        image: "/images/pujadetail1.webp",
    },
    {
        title: "Special Occasion",
        image: "/images/chalisa.png",
    }
]

const ChadhavaDetailsPage = () => {

    const offerings = [
        {
            id: 1,
            title: "Offer Oil to Shani Dev",
            desc: "On this grand occasion, pacify the Lord of Karma, Shani Dev, by offering oil at the Shri Navagraha Shani Temple. Appeasing Saturn helps in balancing the influence of all other planets, bringing stability and peace to your life.",
            price: "₹70",
            img: "/images/chalisa.png",
        },
        {
            id: 2,
            title: "Special Combo Chadhava",
            desc: "Tel & 1 Havan Ahuti • Shani Trayodashi Havan Ahuti Shri Navgrah Shani Temple • 4 October, Saturday • Oil • Shani Trayodashi Chadhava & Deepdaan Shri Navgrah Shani Temple • 4 October, Saturday",
            price: "₹121",
            img: "/images/chalisa.png",
            highlight: true, // special styling
        },
        {
            id: 3,
            title: "Black Urad Dal Seva",
            desc: "Black Urad Dal is specifically offered to pacify the doshas of the two most powerful karmic planets, Shani (Saturn) and Rahu. This service helps mitigate sudden obstacles, delays, and hidden problems.",
            price: "₹51",
            img: "/images/chalisa.png",
        },
        {
            id: 4,
            title: "Brahmin Bhojan",
            desc: "Offering Brahmin Bhojan is considered very auspicious and removes karmic obstacles, providing blessings of prosperity and peace in life.",
            price: "₹201",
            img: "/images/chalisa.png",
        },
    ];

    return (
        <div className="w-full font-sans">
            <Container>
                <div className="bg-gray-50 p-4 lg:p-8 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 w-[600px] h-[400px] relative">
                        <PageDetailHeroSlider heroSlides={data} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            Shani Trayodashi Special Chadava, Hawan, Deepdaan Mahaseva
                        </h2>
                        <p className="text-gray-600 mb-3">
                            <span className="mr-2">🕉</span>
                            On Shani Trayodashi, take this chance to attain peace from Shani
                            doshas with the powerful Ujjain Chadava!
                        </p>

                        <p className="text-gray-700 font-medium mb-4">
                            🌟 <span className="font-bold">According to sacred scriptures</span>,
                            Shani Dev is revered as the divine Karmfal Data - the cosmic dispenser
                            of justice who ensures every soul receives the fruits of their actions.
                            <a href="#" className="text-blue-600 underline ml-1">Read more</a>
                        </p>

                        {/* People Avatars + Count */}
                        <div className="flex items-center mb-2">
                            <div className="flex -space-x-3">
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                                <LazyImage src="/images/couple.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                                <LazyImage src="/images/couple.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                            </div>
                        </div>

                        <p className="text-gray-700">
                            Till now <span className="text-orange-600 font-bold">1,50,000+ Devotees</span> have participated in Chadava
                            conducted by Sri Mandir Chadava Seva.
                        </p>

                    </div>
                </div>



                {/* Content Sections */}
                <div className="p-6 max-w-5xl mx-auto space-y-16">
                    <div className="max-w-5xl mx-auto">
                        {/* Title */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Choose an offering</h1>

                        {/* Offerings List */}
                        <div className="space-y-6">
                            {offerings.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-start justify-between rounded-lg border p-4 ${item.highlight
                                        ? "bg-gradient-to-r from-pink-50 to-white border-pink-300"
                                        : "bg-white border-gray-200"
                                        }`}
                                >
                                    {/* Left Content */}
                                    <div className="pr-4">
                                        <h2
                                            className={`text-lg font-semibold ${item.highlight ? "text-pink-600" : "text-gray-800"
                                                }`}
                                        >
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                                        <p className="text-green-600 font-bold mt-2">{item.price}</p>
                                    </div>

                                    {/* Right Image + Button */}
                                    <div className="flex flex-col items-center">
                                        <LazyImage
                                            src={item.img}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            className="rounded-md object-cover"
                                        />
                                        <button className="mt-3 border border-green-600 text-green-600 px-3 py-1 rounded-lg hover:bg-green-50">
                                            + Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-xl font-semibold mb-3">Frequently asked Questions</h2>
                        <div className="space-y-3">
                            {pujaData.faq.map((faq, i) => (
                                <details key={i} className="border rounded-lg p-3">
                                    <summary className="cursor-pointer font-medium">{faq.q}</summary>
                                    <p className="mt-2 text-gray-600">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                </div>
            </Container>
        </div>
    );
}

export default ChadhavaDetailsPage;