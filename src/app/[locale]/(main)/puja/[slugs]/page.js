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
import {
  Star,
  X,
  Quote,
  Package,
  MessageSquare,
  MapPin,
  CalendarDays,
  Users,
  Clock,
  Info,
  Gift,
  BookOpen,
  Landmark,
  HelpCircle,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  addNewCartAction,
  addPackageAction,
  requestClearCartAction,
} from "@/redux/actions/cartActions";
import { formatDate } from "../../../../../../utils/localstorage";
import Link from "next/link";
import Reviews from "@/components/Review";
import PujaExperience from "@/components/PujaExperience";

const pujaData = {
  benefits: [
    "Peace & Positivity",
    "Prosperity & Success",
    "Health & Well-being",
    "Family Harmony",
    "Spiritual Growth",
    "Removal of Obstacles",
  ],
  process: [
    "Select Puja Package",
    "Provide Your Details",
    "Optional Add - Ons",
    "Receive Puja Video and Blessings",
    "Receive DevaPrasadam",
  ],
  reviews: [
    { rating: 5, text: "Amazing Puja experience, felt very blessed!" },
    { rating: 4, text: "Peaceful and divine atmosphere" },
    { rating: 5, text: "Prasad was received on time, great service" },
  ],
};

const reviews = [
  {
    name: "Ritika Sharma",
    city: "Delhi",
    text: "Booked Baglamukhi puja on Dhanteras. Honestly didn’t expect it to feel so real. Video came next day — felt like I was sitting there in temple.",
  },
  {
    name: "Rajesh Mehta",
    city: "Pune",
    text: "Did Mangalnath Chadhava for my son’s mangal dosh. Panditji said his name in the puja, got full faith now. Mahadev ki kripa.",
  },
  {
    name: "Manisha Tiwari",
    city: "Indore",
    text: "My diya floated on Kshipra so beautifully. I actually got goosebumps watching the video. Jai Maa Kshipra.",
  },
  {
    name: "Anil Deshmukh",
    city: "Dubai",
    text: "I stay in Dubai, can’t visit temples easily. Through DevaSetu, I did my first puja online. Simple, clean, no confusion.",
  },
  {
    name: "Sneha Patel",
    city: "Ahmedabad",
    text: "Did Lalita Tripura Sundari chadhava for Navratri. The team kept updating me. Puja looked pure, not commercial type.",
  },
  {
    name: "Ramesh Iyer",
    city: "Bengaluru",
    text: "Very nice experience. Got the video link on time, and I could see my name in sankalp. Whole family watched together.",
  },
  {
    name: "Aditi Gupta",
    city: "Jaipur",
    text: "Booked puja for my parents from my phone. They saw video on TV and got so emotional. Thank you DevaSetu.",
  },
  {
    name: "Vikas Sharma",
    city: "Ujjain",
    text: "Easy process, everything step by step. Not like other apps. Proper mandir, proper pandit. Felt real.",
  },
  {
    name: "Neha Joshi",
    city: "Mumbai",
    text: "I joined the free Deep Daan. Watching hundreds of diyas floating was magical. Felt very peaceful inside.",
  },
  {
    name: "Sanjay Agarwal",
    city: "Kolkata",
    text: "Offered for my late father. Didn’t think online puja can touch heart like this. Truly divine feeling.",
  },
];

export default function PujaDetailsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const router = useRouter();
  const withLang = useWithLang();

  const handlaRedirect = (slug) => {
    router.push(withLang(`/puja-cart/`));
  };

  const { pujaDetailPage } = useSelector((state) => state.pujas);
  const { isLoading } = useSelector((state) => state.loader);

  // Create refs for each section
  const aboutRef = useRef(null);
  const benefitsRef = useRef(null);
  const processRef = useRef(null);
  const templeRef = useRef(null);
  const packagesRef = useRef(null);
  const videosRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);

  const [activeTab, setActiveTab] = useState("about");

  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [cartItem, setCartItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const tabs = [
    { id: "about", label: "About Puja", ref: aboutRef },
    { id: "benefits", label: "Benefits", ref: benefitsRef },
    { id: "process", label: "Process", ref: processRef },
    { id: "temple", label: "About Temple", ref: templeRef },
    { id: "packages", label: "Packages", ref: packagesRef },
    { id: "youtubevideos", label: "Completed Puja", ref: videosRef },
    { id: "reviews", label: "Reviews", ref: reviewsRef },
    { id: "faq", label: "FAQ", ref: faqRef },
  ];

  useEffect(() => {
    dispatch(requestClearCartAction ());
  }, [router]);

  useEffect(() => {
    const { slugs } = params;
    if (slugs) {
      dispatch(fetchPujaDetailPageAction(slugs));
    }
  }, [params]);

  // 🔹 ScrollSpy: highlight active tab while scrolling
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 160;
      for (let i = tabs.length - 1; i >= 0; i--) {
        const section = tabs[i].ref.current;
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(tabs[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [tabs]);

  // 🔹 Smooth Scroll with Header Offset Fix
  const handleScroll = (ref, active) => {
    const headerOffset = window.innerWidth < 768 ? 70 : 115;
    const elementPosition = ref.current?.getBoundingClientRect().top ?? 0;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveTab(active);
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleAddPackages = (pkg) => {
    const packageData = {
      type: "puja",
      productId: pujaDetailPage?.id,
      productTitle: pujaDetailPage?.title,
      productSlug: pujaDetailPage?.slug,
      location: pujaDetailPage?.location,
      tithi: pujaDetailPage?.specialDay,
      date: pujaDetailPage?.date,
      productImg: pujaDetailPage?.["pujaBanners"]?.[0]?.imageUrl || "",
      ...pkg,
    };

    dispatch(addPackageAction(packageData));
    setCartItem(pkg);
    setIsCartOpen(true); // open slide-in panel
  };

  const formattedDate = formatDate(pujaDetailPage?.["date"], "full");

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating
              ? "text-[var(--color-primary)] fill-[var(--color-primary)]"
              : "text-gray-300"
          }`}
        />
      ));
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="w-full font-sans scroll-smooth pdp-page">
      {/* Banner */}
      <Container>
        <Breadcrumbs pathname={pathname} />

        <div className="flex flex-col lg:flex-row gap-2 md:gap-6 w-full">
          {isLoading ? (
            <PageLaoder />
          ) : (
            <div className="flex-1 w-full h-[150px] lg:w-[600px] sm:h-[300px] md:h-[380px] lg:h-[400px] relative">
              <PageDetailHeroSlider
                heroSlides={pujaDetailPage?.["pujaBanners"]}
                width={"w-full"}
              />
            </div>
          )}

          <div className="flex-1 space-y-6 bg-white/70 rounded-2xl transition-all duration-300">
            <div className="glow-text text-sm md:text-base flex text-center w-full justify-center md:justify-start text-transparent bg-clip-text bg-gradient-to-b from-[#d42f0e] via-[#f15822] to-[#f8b500] font-bold uppercase tracking-widest mb-1">
              {pujaDetailPage?.tags && pujaDetailPage.tags}
            </div>
            {/* Title */}
            <h1 className="font-secondary text-xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-dark)] leading-tight text-center lg:text-left">
              {pujaDetailPage?.["title"]}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg uppercase font-bold text-[var(--color-dark)] opacity-90 text-center lg:text-left">
              {pujaDetailPage?.["subTitle"]}
            </p>

            {/* Location & Date */}
            <div className="flex flex-col sm:flex-col items-start flex-wrap gap-3 border-t border-b py-3 border-gray-100">
              <div className="flex items-center gap-2 text-[var(--color-info)] font-bold uppercase text-sm sm:text-base tracking-wider">
                <MapPin size={24} className="text-[var(--color-info)]" />
                <span className="md:truncate">
                  {pujaDetailPage?.["location"]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[var(--color-info)] uppercase font-bold text-sm sm:text-base">
                <CalendarDays size={22} />
                <span>{`${formattedDate} ${pujaDetailPage?.["specialDay"]}`}</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-orange-50 p-3 sm:p-4 rounded-xl border border-orange-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Clock className="text-[var(--color-primary)] w-6 h-6" />
                <span className="text-[var(--color-dark)] whitespace-nowrap font-semibold text-base sm:text-lg">
                  Puja booking will close in:
                </span>
              </div>
              <CountdownTimer date={pujaDetailPage?.["date"]} />
            </div>

            {/* Devotee Avatars */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 mt-2">
              <div className="flex justify-center sm:justify-start -space-x-3">
                {[
                  "/images/individual.webp",
                  "/images/couple.webp",
                  "/images/individual.webp",
                  "/images/couple.webp",
                  "/images/individual.webp",
                ].map((src, i) => (
                  <LazyImage
                    key={i}
                    src={src}
                    alt="devotee"
                    width={40}
                    height={40}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-md"
                  />
                ))}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
                <Users className="text-[var(--color-primary)] w-5 h-5" />
                <span className="font-secondary font-bold text-base sm:text-xl text-[var(--color-dark)]">
                  <strong className="text-xl sm:text-2xl font-extrabold text-[var(--color-primary)]">
                    20,000+
                  </strong>{" "}
                  Devotees have participated
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between text-white mt-4">
              <Link
                href={"#pujapakage"}
                className="w-full sm:w-1/2 p-2 md:p-4 bg-[var(--color-primary-light)] text-center cursor-pointer transition hover:bg-[var(--color-primary)] rounded-tl-[10px] sm:rounded-tr-none"
              >
                <button className="font-secondary w-full text-sm md:text-lg font-bold flex items-center justify-center gap-2">
                  <Package className="w-5 h-5 text-white" />
                  <span>Select Puja Package</span>
                </button>
              </Link>

              <div className="w-full sm:w-1/2 p-2 md:p-4 cursor-pointer bg-[var(--color-accent)] transition hover:bg-[var(--color-yellow)] text-center rounded-b-[10px] sm:rounded-bl-none sm:rounded-br-[10px] mt-2 sm:mt-0">
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[var(--color-dark)] font-secondary w-full text-sm md:text-lg font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-[var(--color-dark)]" />
                  <span>View what Devotees say</span>
                </button>
              </div>
            </div>

            {/* Review Popup */}
            <div className="text-center mt-10">
              {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4">
                  <div className="bg-white w-full max-w-md sm:max-w-2xl md:max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200">
                      <h2 className="text-lg sm:text-2xl font-secondary font-bold text-[var(--color-dark)]">
                        Devotee Reviews
                      </h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                      >
                        <X className="w-6 h-6 text-[var(--color-dark)]" />
                      </button>
                    </div>

                    {/* Overall Rating */}
                    <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between border-b border-gray-100">
                      <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <p className="text-4xl sm:text-5xl font-proxi-bold text-[var(--color-primary)] leading-none">
                          4.9
                        </p>
                        <div className="flex justify-center sm:justify-start mt-1">
                          {renderStars(5)}
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--color-dark)] mt-1">
                          Based on 1,200+ reviews
                        </p>
                      </div>
                      <button className="border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition px-4 sm:px-5 py-2 rounded-lg font-semibold text-sm sm:text-base">
                        Write a Review
                      </button>
                    </div>

                    {/* Reviews Scroll Area */}
                    <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                      {reviews.map((review, i) => (
                        <div
                          key={i}
                          className="p-4 sm:p-5 bg-[var(--color-background)] border border-gray-100 rounded-xl hover:shadow-md transition relative"
                        >
                          <Quote className="absolute top-3 right-3 w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent)] opacity-30" />
                          <div className="flex items-center mb-2 sm:mb-3">
                            <div>
                              <h4 className="text-base sm:text-lg text-[var(--color-dark)]">
                                {review.name}
                              </h4>
                            </div>
                          </div>
                          <p className="text-[var(--color-dark)] text-left leading-relaxed text-sm sm:text-base">
                            {review.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Tabs */}
      <div className=" bg-white text-[var(--color-dark)]">
        {/* Sticky Tab Navigation */}
        <div className="bg-white sticky top-14 md:top-16 sm:top-20 z-20 flex items-center justify-start sm:justify-center gap-4 sm:gap-8 md:gap-12 px-3 sm:px-6 py-2 overflow-x-auto scrollbar-hide border-b border-gray-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => handleScroll(t.ref, t.id)}
              className={`relative py-2 sm:py-3 text-sm sm:text-base md:text-lg lg:text-xl font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === t.id
                  ? "text-[var(--color-primary)] font-bold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[var(--color-primary)]"
                  : "text-[var(--color-dark)] hover:text-[var(--color-primary)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* 🕉️ About */}
          <section ref={aboutRef} className="bg-white py-8 md:px-4">
            <Container>
              <h2 className="font-secondary uppercase text-xl md:text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-3">
                About Puja
              </h2>
              <p className="text-sm md:text-lg text-[var(--color-dark)] md:leading-relaxed">
                {pujaDetailPage?.["pujaDetails"]}
              </p>
            </Container>
          </section>

          {/* 🎁 Puja Benefits */}
          <section
            ref={benefitsRef}
            className="bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9] py-8 md:px-4"
          >
            <Container>
              <h2 className="font-secondary uppercase text-xl md:text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-3">
                Puja Benefits
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {pujaDetailPage?.["pujaBenefits"]?.map((b, i) => (
                  <div
                    key={b.id || i}
                    className="flex flex-col items-start bg-[#fffaf5] p-5 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-200"
                  >
                    {/* Icon circle */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-[var(--color-primary)] mb-3">
                      <Gift className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[var(--color-dark)]  mb-2">
                      {b.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[var(--color-dark)]  text-sm leading-relaxed">
                      {b.description}
                    </p>
                    {/* <p className="text-[var(--color-dark)]  text-sm leading-relaxed">
                      {b.description?.slice(0, 100)}...
                      <span className="text-[var(--color-primary)] font-semibold cursor-pointer hover:underline">
                        Read more
                      </span>
                    </p> */}
                  </div>
                ))}
              </div>
            </Container>
          </section>

          {/* 📜 Puja Process */}
          <section
            ref={processRef}
            className="bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9] py-10 sm:py-14 px-4 sm:px-6 lg:px-10"
          >
            <Container>
              {/* Heading */}
              <h2 className="font-secondary uppercase text-xl md:text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-8">
                Puja Process
              </h2>

              {/* Steps Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
                {pujaData.process.map((step, index) => {
                  const [title, description] = step.split(":");
                  return (
                    <div
                      key={index}
                      className="relative flex flex-col bg-[#fffaf5] border border-orange-100 rounded-2xl p-5 sm:p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {/* Step number badge */}
                      <span className="absolute -top-3 -left-3 bg-[var(--color-primary)] text-white w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-md">
                        {index + 1}
                      </span>

                      {/* Step Title */}
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--color-dark)] mb-2 mt-1">
                        {title.trim()}
                      </h4>

                      {/* Step Description */}
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {description?.trim() || ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Container>
          </section>

          {/* 🛕 Temple */}
          <section ref={templeRef} className="bg-white py-8 md:px-4">
            <Container>
              <h2 className="font-secondary uppercase text-xl md:text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-3">
                {/* <Landmark className="w-12 md:w-6 h-12 md:h-6" />{" "} */}
                {pujaDetailPage?.["templeHistories"][0]?.["templeName"]}
              </h2>
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Image */}
                <div className="w-full md:w-1/2">
                  <LazyImage
                    src={pujaDetailPage?.["templeHistories"][0]?.["templeImg"]}
                    alt="Temple"
                    width={800}
                    height={400}
                    className="rounded-xl object-cover w-full h-auto"
                  />
                </div>

                {/* Description */}
                <div className="w-full md:w-1/2">
                  <p className="text-sm md:text-base text-[var(--color-dark)] text-justify md:leading-relaxed">
                    {pujaDetailPage?.["templeHistories"][0]?.["templeHistory"]}
                  </p>
                </div>
              </div>
            </Container>
          </section>

          {/* 💰 Packages */}
          <section
            id="pujapakage"
            ref={packagesRef}
            className="bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9] py-8 md:px-4"
          >
            <Container>
              <h2 className="font-secondary uppercase text-xl md:text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-3">
                Select Puja Package
              </h2>
              <PujaPackages
                pujaPackages={pujaDetailPage?.["pujaPackages"]}
                onAddToCart={handleAddPackages}
              />
            </Container>
          </section>

          {/* ⭐ Reviews */}
          {/* <section ref={reviewsRef} className="bg-white py-8 px-4">
              <h2 className="font-secondary text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-4">
                <Star className="w-6 h-6" /> Reviews & Ratings
              </h2>
              <div className="space-y-4">
                {pujaData.reviews.map((rev, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-orange-100 bg-[#fffaf5] hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-1 mb-1 text-yellow-500">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">{rev.text}</p>
                  </div>
                ))}
              </div>
            </section> */}

          <section ref={videosRef} className="relative py-8 md:px-4">
            <Container>
              {/* Heading */}
              <h2 className="font-secondary uppercase text-xl md:text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-3">
                Glimpses of our past puja experience
              </h2>

              <PujaExperience />
            </Container>
          </section>

          <section
            id="reviews"
            ref={reviewsRef}
            className="py-14 bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9]"
          >
            <Container>
              <h2 className="font-secondary uppercase text-xl md:text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-3">
                Reviews
              </h2>
              {/* <h2 className="font-secondary text-center text-3xl font-bold mb-10">
                 Reviews
                </h2> */}
              <Reviews reviews={reviews} />
            </Container>
          </section>

          {/* ❓ FAQ */}
          <section ref={faqRef} className="bg-white py-8 md:px-4">
            <Container>
              <h2 className="font-secondary uppercase text-xl md:text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-3">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {pujaDetailPage?.["pujaFaqs"]?.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-orange-100 rounded-xl p-3 bg-[#fffdf9]"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      className="font-secondary text-sm md:text-lg font-bold w-full text-left text-[var(--color-dark)] flex justify-between items-center"
                    >
                      {faq.question}
                      <span className="text-[var(--color-primary)] text-lg">
                        {openFaqIndex === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaqIndex === i && (
                      <p className=" text-sm md:text-base mt-2 text-[--color-dark] md:leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Container>
          </section>
        </div>
      </div>
      {/* Slide-in Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-bold">Your Selected Package</h2>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Package Details */}
        {cartItem && (
          <div className="p-5 flex flex-col items-center gap-4">
            {/* Package Image */}
            {cartItem.packImg && (
              <div className="w-40 h-40 relative">
                <LazyImage
                  src={cartItem.packImg}
                  alt={cartItem.packageType}
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            )}

            {/* Name & Price */}
            <h3 className="text-xl font-bold text-center">
              {cartItem.packageType}
            </h3>
            <p className="font-secondary text-2xl font-semibold text-[var(--color-primary)]">
              ₹{cartItem.packagePrice}
            </p>

            <p className="text-sm">{cartItem.packageDescription}</p>

            {/* Participate Button */}
            <button
              onClick={handlaRedirect}
              className="flex justify-center items-center font-secondary text-base md:text-lg font-bold w-full bg-[var(--color-primary)] text-white py-3 rounded-xl hover:[var(--color-primary-light)] transition-colors uppercase cursor-pointer"
            >
              Participate Now <ArrowRight />
            </button>
          </div>
        )}
      </div>

      {/* Optional overlay when open */}
      {isCartOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/50 z-40"
        ></div>
      )}
    </div>
  );
}
