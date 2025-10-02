"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import PageDetailHeroSlider from "@/components/HeroBanner/PageDetailHeroSlider";

const pujaData = {
    "id": 1,
    "title": "1,00,000 Hare Krishna Maha Mantra Japa, Vishnu Sahasranama Path",
    "subtitle": "Receive divine grace and prosperity through Maha Japa and Vishnu Sahasranama.",
    "price": "₹1100",
    "banner": "/images/pujadetail.webp",
    "temple": {
        "name": "ISKCON Temple, Ghaziabad, Uttar Pradesh",
        "description": "The puja will be conducted at ISKCON Temple, Ghaziabad. This temple is dedicated to Lord Krishna and is known for its divine atmosphere.",
        "image": "/temple.jpg"
    },
    "about": "By chanting the Maha Mantra one’s mind gets purified, devotion increases and obstacles are removed. Vishnu Sahasranama Path is considered very auspicious and brings prosperity, success and divine blessings.",
    "benefits": [
        "Peace & Positivity",
        "Prosperity & Success",
        "Health & Well-being",
        "Family Harmony",
        "Spiritual Growth",
        "Removal of Obstacles"
    ],
    "process": [
        "Pandit performs Sankalpa with devotee details",
        "Offerings to Lord Vishnu with sacred mantras",
        "Chanting of 1,00,000 Hare Krishna Maha Mantras",
        "Vishnu Sahasranama Parayanam",
        "Prasad distribution & blessings"
    ],
    "packages": [
        {
            "name": "Individual Puja",
            "price": "₹1100",
            "features": ["Pandit service", "Sankalpa with your name", "Prasad courier"]
        },
        {
            "name": "Family Puja",
            "price": "₹2100",
            "features": ["Pandit service", "Family name Sankalpa", "Prasad courier"]
        },
        {
            "name": "Group Puja",
            "price": "₹5100",
            "features": ["Pandit service", "Group Sankalpa", "Prasad courier"]
        },
        {
            "name": "Special Family Puja",
            "price": "₹11000",
            "features": ["Dedicated Pandit", "Detailed Sankalpa", "Premium Prasad courier"]
        }
    ],
    "reviews": [
        { "rating": 5, "text": "Amazing Puja experience, felt very blessed!" },
        { "rating": 4, "text": "Peaceful and divine atmosphere" },
        { "rating": 5, "text": "Prasad was received on time, great service" }
    ],
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

export default function PujaDetailsPage() {
    // Create refs for each section
    const aboutRef = useRef(null);
    const benefitsRef = useRef(null);
    const processRef = useRef(null);
    const templeRef = useRef(null);
    const packagesRef = useRef(null);
    const reviewsRef = useRef(null);
    const faqRef = useRef(null);

    const [activeTab, setActiveTab] = useState("about");

    const tabs = [
        { id: "about", label: "About", ref: aboutRef },
        { id: "benefits", label: "Benefits", ref: benefitsRef },
        { id: "process", label: "Process", ref: processRef },
        { id: "temple", label: "Temple", ref: templeRef },
        { id: "packages", label: "Packages", ref: packagesRef },
        { id: "reviews", label: "Reviews", ref: reviewsRef },
        { id: "faq", label: "FAQ", ref: faqRef }
    ];

    const handleScroll = (ref, active) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveTab(active);
    };

    return (
        <div className="w-full font-sans scroll-smooth">
            <Container>
                {/* Banner */}
                <div className="bg-gray-50 p-4 lg:p-8 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 w-[600px] h-[400px] relative">
                        <PageDetailHeroSlider heroSlides={data}  />
                    </div>
                    <div className="flex-1 space-y-3">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                            {pujaData.title}
                        </h1>
                        <p className="text-sm text-gray-600">{pujaData.subtitle}</p>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl font-semibold text-orange-600">
                                {pujaData.price}
                            </span>
                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-lg">
                                Select Puja Package
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b bg-white sticky top-18 z-10 flex gap-6 px-4 overflow-x-auto">
                    {tabs.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => handleScroll(t.ref, t.id)}
                            className={`py-3 text-sm whitespace-nowrap transition-colors ${activeTab === t.id
                                    ? "text-orange-600 border-b-2 border-orange-600 font-semibold"
                                    : "text-gray-600 hover:text-orange-500"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Content Sections */}
                <div className="p-6 max-w-5xl mx-auto space-y-16">
                    {/* About */}
                    <section ref={aboutRef}>
                        <h2 className="text-xl font-semibold mb-3">The Power of Devotion</h2>
                        <p className="text-gray-600 leading-relaxed">{pujaData.about}</p>
                    </section>

                    {/* Benefits */}
                    <section ref={benefitsRef}>
                        <h2 className="text-xl font-semibold mb-3">Puja Benefits</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pujaData.benefits.map((b, i) => (
                                <div key={i} className="p-4 border rounded-lg shadow-sm">
                                    🙏 {b}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Process */}
                    <section ref={processRef}>
                        <h2 className="text-xl font-semibold mb-3">Puja Process</h2>
                        <ol className="list-decimal ml-6 text-gray-700 space-y-2">
                            {pujaData.process.map((step, i) => (
                                <li key={i}>{step}</li>
                            ))}
                        </ol>
                    </section>

                    {/* Temple */}
                    <section ref={templeRef}>
                        <h2 className="text-xl font-semibold mb-3">{pujaData.temple.name}</h2>
                        <Image
                            src={pujaData.temple.image}
                            alt="Temple"
                            width={800}
                            height={400}
                            className="rounded-lg mb-4"
                        />
                        <p className="text-gray-600">{pujaData.temple.description}</p>
                    </section>

                    {/* Packages */}
                    <section ref={packagesRef}>
                        <h2 className="text-xl font-semibold mb-3">Select Puja Package</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {pujaData.packages.map((pkg, i) => (
                                <div key={i} className="p-6 border rounded-xl shadow hover:shadow-lg">
                                    <h3 className="text-lg font-semibold">{pkg.name}</h3>
                                    <p className="text-orange-600 text-xl font-bold mt-2">{pkg.price}</p>
                                    <ul className="mt-3 text-sm text-gray-600 space-y-1">
                                        {pkg.features.map((f, j) => (
                                            <li key={j}>✅ {f}</li>
                                        ))}
                                    </ul>
                                    <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg">
                                        Participate →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Reviews */}
                    <section ref={reviewsRef}>
                        <h2 className="text-xl font-semibold mb-3">Reviews & Ratings</h2>
                        <div className="space-y-4">
                            {pujaData.reviews.map((rev, i) => (
                                <div key={i} className="p-4 border rounded-lg shadow-sm">
                                    {"⭐".repeat(rev.rating)} - {rev.text}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ */}
                    <section ref={faqRef}>
                        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>
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

