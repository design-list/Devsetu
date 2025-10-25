"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import moment from "moment";
import PageDetailHeroSlider from "@/components/HeroBanner/PageDetailHeroSlider";
import { useParams, usePathname } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { fetchPujaDetailPageAction } from "@/redux/actions/pujaActions";
import CountdownTimer from "@/components/CountdownTimer";
import LazyImage from "@/components/Atom/LazyImage";
import PageLaoder from "@/components/Atom/loader/pageLaoder";
import PujaPackages from "@/components/PujaPackages/index.js";
import { useWithLang } from "../../../../../../helper/useWithLang";
import { useRouter } from "next/navigation";
import { addNewCartAction, addPackageAction } from "@/redux/actions/cartActions";
import { formatDate } from "../../../../../../utils/localstorage";


const pujaData = {
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
    "reviews": [
        { "rating": 5, "text": "Amazing Puja experience, felt very blessed!" },
        { "rating": 4, "text": "Peaceful and divine atmosphere" },
        { "rating": 5, "text": "Prasad was received on time, great service" }
    ],
}




export default function PujaDetailsPage() {

    const params = useParams();
    const pathname = usePathname();
    const dispatch = useDispatch();


    const router = useRouter();
    const withLang = useWithLang();

    const handlaRedirect = (slug) => {
        router.push(withLang(`/puja-cart/`))
    }


    const { pujaDetailPage } = useSelector((state) => state.pujas);
    const { isLoading } = useSelector((state) => state.loader)

    // Create refs for each section
    const aboutRef = useRef(null);
    const benefitsRef = useRef(null);
    const processRef = useRef(null);
    const templeRef = useRef(null);
    const packagesRef = useRef(null);
    const reviewsRef = useRef(null);
    const faqRef = useRef(null);

    const [activeTab, setActiveTab] = useState("about");

    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [cartItem, setCartItem] = useState(null);


    const tabs = [
        { id: "about", label: "About Puja", ref: aboutRef },
        { id: "benefits", label: "Benefits", ref: benefitsRef },
        { id: "process", label: "Process", ref: processRef },
        { id: "temple", label: "About Temple", ref: templeRef },
        { id: "packages", label: "Packages", ref: packagesRef },
        { id: "reviews", label: "Reviews", ref: reviewsRef },
        { id: "faq", label: "FAQ", ref: faqRef }
    ];


    useEffect(() => {
        const { slugs } = params
        if (slugs) {
            dispatch(fetchPujaDetailPageAction(slugs))
        }
    }, [params])


    // ScrollSpy: active tab on scroll
    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = tabs;
            const scrollPosition = window.scrollY + 150;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i].ref.current;
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveTab(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScrollSpy);
        return () => window.removeEventListener("scroll", handleScrollSpy);
    }, [tabs]);



    const handleScroll = (ref, active) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveTab(active);
    };

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };


    const handleAddPackages = (pkg) => {
        dispatch(addPackageAction(pkg));
        setCartItem(pkg)
    };

    const formattedDate = formatDate(pujaDetailPage?.['date'], 'full');


    return (
        <div className="w-full font-sans scroll-smooth">
            <Breadcrumbs pathname={pathname} />
            <Container>
                {/* Banner */}
                <div className="bg-gray-50 p-4 lg:p-8 flex flex-col lg:flex-row gap-6">
                    {isLoading ? <PageLaoder /> : <div className="flex-1 w-[600px] h-[400px] relative">
                        <PageDetailHeroSlider heroSlides={pujaDetailPage?.['pujaBanners']} />
                    </div>}
                    <div className="flex-1 space-y-3">
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                            {pujaDetailPage?.['title']}
                        </h1>
                        <p className="text-2xl text-gray-600">{pujaDetailPage?.['subTitle']}</p>

                        <p className="text-[18px] font-semibold">
                            {pujaDetailPage?.['location']}
                        </p>
                        <p className="text-[18px] font-semibold text-orange-600">
                            {`${formattedDate} ${pujaDetailPage?.['specialDay']}`}
                        </p>

                        <CountdownTimer date={pujaDetailPage?.['date']} CountdownHeading={"Puja booking will close in:"} />

                        <div className="flex items-center mb-2">
                            <div className="flex -space-x-3">
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={25} className="rounded-full border-3 border-white" />
                                <LazyImage src="/images/couple.webp" alt="devotee" width={35} height={25} className="rounded-full border-3 border-white" />
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={25} className="rounded-full border-3 border-white" />
                                <LazyImage src="/images/couple.webp" alt="devotee" width={35} height={25} className="rounded-full border-3 border-white" />
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={25} className="rounded-full border-3 border-white" />
                            </div>
                        </div>
                        <span className="text-2xl">
                            Till now <strong className="text-orange-600">3,00,000+ Devoteeshave</strong> participated in Pujas conducted by Sri Mandir Puja Seva.
                        </span>
                        <div className="flex items-center gap-4">

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
                        <p className="text-gray-600 leading-relaxed">{pujaDetailPage?.['pujaDetails']}</p>
                    </section>

                    {/* Benefits */}
                    <section ref={benefitsRef}>
                        <h2 className="text-xl font-semibold mb-3">Puja Benefits</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pujaDetailPage?.['pujaBenefits'].map((b) => (
                                <div key={b.id} className="p-4 border rounded-lg shadow-sm">
                                    <strong>🙏 {b.title}</strong>
                                    <p>{b.description}</p>
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

                    <section ref={templeRef} className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">
                            {pujaDetailPage?.['templeHistories'][0]?.['templeName']}
                        </h2>

                        <div className="flex flex-col md:flex-row items-start gap-6">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2">
                                <LazyImage
                                    src={pujaDetailPage?.['templeHistories'][0]?.['templeImg']}
                                    alt="Temple"
                                    width={800}
                                    height={400}
                                    className="rounded-lg object-cover w-full h-auto"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2">
                                <p className="text-gray-700 text-justify leading-relaxed">
                                    {pujaDetailPage?.['templeHistories'][0]?.['templeHistory']}
                                </p>
                            </div>
                        </div>
                    </section>


                    {/* Packages */}
                    <section ref={packagesRef}>
                        {/* <h2 className="text-xl font-semibold mb-3">Select Puja Package</h2> */}
                        <PujaPackages pujaPackages={pujaDetailPage?.['pujaPackages']} onAddToCart={handleAddPackages} />
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
                            {pujaDetailPage?.["pujaFaqs"]?.map((faq, i) => (
                                <div
                                    key={i}
                                    className="border rounded-lg p-3 bg-white shadow-sm"
                                >
                                    <button
                                        onClick={() => toggleFaq(i)}
                                        className="w-full text-left font-medium text-gray-800 cursor-pointer"
                                    >
                                        {faq.question}
                                    </button>
                                    {openFaqIndex === i && (
                                        <p className="mt-2 text-gray-700">{faq.answer}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </Container>

            <div className="space-y-10">
                {/* Add to Cart Button */}
                {cartItem && (
                    <div className="sticky bottom-0 bg-white border-t shadow-md p-4 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{cartItem.packageType}</p>
                            <p className="text-green-600 font-bold">₹{cartItem.packagePrice}</p>
                        </div>
                        <button
                            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
                            onClick={handlaRedirect}
                        >
                            Participate now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
