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
} from "@/redux/actions/cartActions";
import { formatDate } from "../../../../../../utils/localstorage";
import Link from "next/link";

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
    "Pandit performs Sankalpa with devotee details",
    "Offerings to Lord Vishnu with sacred mantras",
    "Chanting of 1,00,000 Hare Krishna Maha Mantras",
    "Vishnu Sahasranama Parayanam",
    "Prasad distribution & blessings",
  ],
  reviews: [
    { rating: 5, text: "Amazing Puja experience, felt very blessed!" },
    { rating: 4, text: "Peaceful and divine atmosphere" },
    { rating: 5, text: "Prasad was received on time, great service" },
  ],
};

const reviews = [
  {
    name: "Anjali Sharma",
    date: "Oct 20, 2025",
    rating: 5,
    comment:
      "It was an amazing experience. The Puja was beautifully organized and gave me peace of mind. Jai Maa Lakshmi!",
    avatar: "/images/individual.webp",
  },
  {
    name: "Rohit Verma",
    date: "Oct 22, 2025",
    rating: 4,
    comment:
      "Well managed and authentic service. Got the Puja video on time and received Prasad the next day.",
    avatar: "/images/couple.webp",
  },
  {
    name: "Priya Nair",
    date: "Oct 24, 2025",
    rating: 5,
    comment:
      "It felt divine! I could see the whole Puja clearly through the live stream. Thank you for this beautiful initiative.",
    avatar: "/images/individual.webp",
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
    { id: "reviews", label: "Reviews", ref: reviewsRef },
    { id: "faq", label: "FAQ", ref: faqRef },
  ];

  useEffect(() => {
    const { slugs } = params;
    if (slugs) {
      dispatch(fetchPujaDetailPageAction(slugs));
    }
  }, [params]);

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
    const packageData = {
      type: 'puja',
      productId : pujaDetailPage?.id,
      productTitle : pujaDetailPage?.title,
      productSlug : pujaDetailPage?.slug,
      productImg : pujaDetailPage?.["pujaBanners"]?.[0]?.imageUrl || "",
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
    <div className="w-full font-sans scroll-smooth">
      <Container>
        <Breadcrumbs pathname={pathname} />
        {/* Banner */}
        <div className="flex flex-col lg:flex-row gap-6">
          {isLoading ? (
            <PageLaoder />
          ) : (
            <div className="flex-1 w-[600px] h-[400px] relative">
              <PageDetailHeroSlider
                heroSlides={pujaDetailPage?.["pujaBanners"]}
              />
            </div>
          )}
          <div className="flex-1 space-y-6 bg-white/70 rounded-2xl p-4 transition-all duration-300">
            {/* Title */}
            <h1 className="font-secondary text-2xl lg:text-3xl font-bold text-[var(--color-dark)] leading-tight">
              {pujaDetailPage?.["title"]}
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-lg uppercase font-bold text-[var(--color-dark)] opacity-90">
              {pujaDetailPage?.["subTitle"]}
            </p>

            {/* Location & Date */}
            <div className="flex flex-col sm:flex-col sm:items-baseline sm:justify-start items-baseline gap-3 border-t border-b py-3 border-gray-100">
              <div className="flex items-center gap-2 text-[var(--color-info)] font-bold uppercase text-base tracking-wider">
                <MapPin size={30} className="text-[var(--color-info)]" />
                {pujaDetailPage?.["location"]}
              </div>
              <div className="flex items-center gap-2 text-[var(--color-info)] uppercase font-bold text-base">
                <CalendarDays size={24} />
                {`${formattedDate} ${pujaDetailPage?.["specialDay"]}`}
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-orange-50 p-2.5 rounded-xl border border-orange-200 flex items-center  gap-3">
              <Clock className="text-[var(--color-primary)] w-6 h-6" />{" "}
              <CountdownTimer
                date={pujaDetailPage?.["date"]}
                CountdownHeading={
                  <span className="text-[var(--color-dark)] whitespace-nowrap font-semibold text-lg">
                    Puja booking will close in:
                  </span>
                }
              />
            </div>

            {/* Devotee Avatars */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex -space-x-3">
                <LazyImage
                  src="/images/individual.webp"
                  alt="devotee"
                  width={42}
                  height={42}
                  className=" w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <LazyImage
                  src="/images/couple.webp"
                  alt="devotee"
                  width={42}
                  height={42}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <LazyImage
                  src="/images/individual.webp"
                  alt="devotee"
                  width={42}
                  height={42}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <LazyImage
                  src="/images/couple.webp"
                  alt="devotee"
                  width={42}
                  height={42}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
                <LazyImage
                  src="/images/individual.webp"
                  alt="devotee"
                  width={42}
                  height={42}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                />
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-[var(--color-primary)] w-5 h-5" />
                <span className="font-secondary font-bold text-xl text-[var(--color-dark)]">
                  <strong className="text-2xl font-extrabold text-[var(--color-primary)]">
                    3,00,000+
                  </strong>{" "}
                  Devotees have participated
                </span>
              </div>
            </div>

            <div className="flex justify-between mb-0 text-white">
              {/* Select Puja Package Button */}
              <Link
                href={"#pujapakage"}
                className="w-1/2 p-4 bg-[var(--color-primary-light)] cursor-pointer transition hover:bg-[var(--color-primary)] rounded-tl-[10px]"
              >
                <button className="font-secondary w-full text-lg font-bold flex items-center justify-center gap-2">
                  <Package className="w-5 h-5 text-white" />
                  <span className=" cursor-pointer">Select Puja Package</span>
                </button>
              </Link>

              {/* View Reviews Button */}
              <div className="w-1/2 p-4 cursor-pointer bg-[var(--color-accent)] transition hover:bg-[var(--color-yellow)] rounded-br-[10px]">
                <button
                  onClick={() => setIsOpen(true)}
                  className="text-[var(--color-dark)] font-secondary w-full text-lg font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5 text-[var(--color-dark)]" />
                  <span className=" cursor-pointer">
                    View what Devotees say
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center mt-10">
              {/* Popup Overlay */}
              {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                  {/* Modal Box */}
                  <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl relative overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center p-5 border-b border-gray-200">
                      <h2 className="text-xl md:text-2xl font-secondary font-bold text-[var(--color-dark)]">
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
                    <div className="p-6 flex flex-col sm:flex-row items-center justify-between border-b border-gray-100">
                      <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <p className="text-5xl font-proxi-bold text-[var(--color-primary)] leading-none">
                          4.9
                        </p>
                        <div className="flex justify-center sm:justify-start mt-1">
                          {renderStars(5)}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Based on 1,200+ reviews
                        </p>
                      </div>
                      <button className="border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition px-5 py-2 rounded-lg font-semibold">
                        Write a Review
                      </button>
                    </div>

                    {/* Reviews Scroll Area */}
                    <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
                      {reviews.map((review, i) => (
                        <div
                          key={i}
                          className="p-5 bg-[var(--color-background)] border border-gray-100 rounded-xl hover:shadow-md transition relative"
                        >
                          <Quote className="absolute top-3 right-3 w-5 h-5 text-[var(--color-accent)] opacity-30" />
                          <div className="flex items-center mb-3">
                            <Image
                              src={review.avatar}
                              alt={review.name}
                              width={100}
                              height={100}
                              className="w-12 h-12 rounded-full mr-4 object-cover"
                            />
                            <div>
                              <h4 className="font-proxi-bold text-lg text-[var(--color-dark)]">
                                {review.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {review.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center mb-2">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {review.comment}
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

        {/* Tabs */}
        <div className=" bg-white text-[var(--color-dark)]">
          {/* Sticky Tab Navigation */}
          <div className="bg-white sticky top-20 z-20 flex justify-center gap-12 px-4 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => handleScroll(t.ref, t.id)}
                className={`relative py-3 text-xl font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTab === t.id
                    ? "text-[var(--color-primary)] font-bold after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[var(--color-primary)]"
                    : "text[var(--color-dark)] hover:text-[var(--color-primary)]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 max-w-6xl mx-auto space-y-16">
            {/* 🕉️ About */}
            <section ref={aboutRef} className="bg-white rounded-2xl p-6">
              <h2 className="font-secondary text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-3">
                <Info className="w-6 h-6" /> The Power of Devotion
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {pujaDetailPage?.["pujaDetails"]}
              </p>
            </section>

            {/* 🎁 Puja Benefits */}
            <section ref={benefitsRef} className="bg-white rounded-2xl p-6">
              <h2 className="font-secondary text-3xl font-bold text-[var(--color-primary)] mb-6">
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
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {b.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {b.description?.slice(0, 100)}...
                      <span className="text-[var(--color-primary)] font-semibold cursor-pointer hover:underline">
                        Read more
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 📜 Puja Process */}
            <section ref={processRef} className="bg-white rounded-2xl p-6">
              <h2 className="font-secondary text-3xl font-bold text-[var(--color-primary)] mb-6">
                Puja Process
              </h2>

              <div className="grid md:grid-cols-4 gap-6">
                {pujaData.process.map((step, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col bg-[#fffaf5] border border-orange-100 rounded-xl p-5 text-left hover:shadow-md transition-all duration-200"
                  >
                    {/* Step number badge */}
                    <span className="absolute -top-3 -left-3 bg-[var(--color-primary)] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>

                    {/* Step Title */}
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {step.split(":")[0]}
                    </h4>

                    {/* Step Description */}
                    <p className="text-gray-600 text-sm">
                      {step.split(":")[1] || ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 🛕 Temple */}
            <section ref={templeRef} className="bg-white rounded-2xl p-6">
              <h2 className="font-secondary text-2xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-4">
                <Landmark className="w-6 h-6" />{" "}
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
                  <p className="text-gray-700 text-justify leading-relaxed">
                    {pujaDetailPage?.["templeHistories"][0]?.["templeHistory"]}
                  </p>
                </div>
              </div>
            </section>

            {/* 💰 Packages */}
            <section
              id="pujapakage"
              ref={packagesRef}
              className="bg-white rounded-2xl p-6"
            >
              <h2 className="font-secondary text-2xl font-bold text-[var(--color-primary)] mb-4">
                Select Puja Package
              </h2>
              <PujaPackages
                pujaPackages={pujaDetailPage?.["pujaPackages"]}
                onAddToCart={handleAddPackages}
              />
            </section>

            {/* ⭐ Reviews */}
            <section ref={reviewsRef} className="bg-white rounded-2xl p-6">
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
            </section>

            {/* ❓ FAQ */}
            <section ref={faqRef} className="bg-white rounded-2xl p-6">
              <h2 className="font-secondary text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-4">
                <HelpCircle className="w-6 h-6" /> Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {pujaDetailPage?.["pujaFaqs"]?.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-orange-100 rounded-xl p-3 bg-[#fffdf9]"
                  >
                    <button
                      onClick={() => toggleFaq(i)}
                      className="font-secondary text-lg font-bold w-full text-left text-[var(--color-dark)] flex justify-between items-center"
                    >
                      {faq.question}
                      <span className="text-[var(--color-primary)] text-lg">
                        {openFaqIndex === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaqIndex === i && (
                      <p className="mt-2 text-[--color-dark] leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </Container>

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

            {/* Participate Button */}
            <button
              onClick={handlaRedirect}
              className="flex justify-center items-center font-secondary text-lg font-bold w-full bg-[var(--color-primary)] text-white py-3 rounded-xl hover:[var(--color-primary-light)] transition-colors uppercase cursor-pointer"
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
