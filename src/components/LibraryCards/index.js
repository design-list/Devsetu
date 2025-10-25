// components/Categories.js
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        id: 1,
        title: "Aarti",
        desc: "Find complete lyrics of all the famous Aartis and easily worship your beloved God.",
        img: "/images/aarti_article_image.webp", // replace with your actual image path
        link: "#",
    },
    {
        id: 2,
        title: "Chalisa",
        desc: "You will get complete Chalisa of all the deities. Read Chalisa during the Pooja of your beloved deities and seek their grace.",
        img: "/images/chaalisa_article_image.webp",
        link: "#",
    },
    {
        id: 3,
        title: "Mantra",
        desc: "Here you will find all the powerful mantras for peace of mind. Chant these mantras and remove all the obstacles from life.",
        img: "/images/mantra_article_image.webp",
        link: "#",
    },
    {
        id: 4,
        title: "Ayurvedic & Home Remedies",
        desc: "We have brought the precious knowledge of Ayurveda for you, these remedies will help you lead a healthy life.",
        img: "/images/ayurvedic_article_image.webp",
        link: "#",
    },
];

export default function LibraryCards() {
    return (
        <section className="pt-8 pb-16 bg-[var(--forcast)]">
            <div className="max-w-7xl mx-auto md:px-6">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((cat) => (
                      
                            <div key={cat.id}
                            className="flex flex-col bg-[var(--forcast)] rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                        >
                            {/* Image */}
                            <div className="w-full h-full overflow-hidden max-h-52 rounded-xl">
                                <Image
                                    src={cat.img}
                                    alt={cat.title}
                                    // fill
                                    className="object-contain"
                                    width={500}
                                    height={500}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="font-secondary text-lg font-bold mb-2 text-[var(--color-dark)]">{cat.title}</h3>
                                <p className="text-[var(--color-dark)] text-sm flex-grow">{cat.desc}</p>
                                <Link
                                    href={cat.link}
                                    className="flex items-center mt-4 text-[var(--color-primary-light)] font-semibold hover:underline"
                                >
                                    Read All <ArrowUpRight />
                                </Link>
                            </div>
                        </div>
                        
                    ))}
                </div>
            </div>
        </section>
    );
}
