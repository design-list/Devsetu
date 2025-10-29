"use client";
import PageLaoder from "@/components/Atom/loader/pageLaoder";
import ChadhavaCard from "@/components/Cards/chadhavaCard";
import { requestWebChadhavaAction } from "@/redux/actions/chadhavaAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWithLang } from "../../../../../helper/useWithLang";
import Container from "@/components/Container";
import ChadhavaHeroSlider from "@/components/HeroBanner/ChadhavaHeroSlider";
import { Landmark, Users, Building, Sparkles } from "lucide-react";
import Reviews from "@/components/Review";
import HowPujaWorks from "@/components/OnlineSteps";

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

const ChadhavaPage = () => {
  const dispatch = useDispatch();
  const { heroBanner, chadhavaCard } = useSelector((state) => state.chadhavas);
  const { isLoading } = useSelector((state) => state.loader);

  const router = useRouter();
  const withLang = useWithLang();

  const handlaRedirect = (base, slug) => {
    router.push(withLang(`/${base}/${slug}`));
  };

  useEffect(() => {
    dispatch(requestWebChadhavaAction());
  }, [dispatch]);

  if (isLoading) {
    return <PageLaoder />;
  }

  return (
    <main className="bg-gradient-to-b from-orange-50 via-white to-gray-50 text-gray-800">
      <Container>
        {/* 🌅 Hero Banner */}
        <section className="relative py-8 overflow-hidden">
          {/* <div className="absolute inset-0 bg-[url('/patterns/sacred-bg.svg')] opacity-10 bg-repeat" /> */}
          {/* <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fadeIn">
            <h1 className="font-secondary text-4xl md:text-5xl font-bold text-[var(--color-dark)] leading-snug mb-6">
              Offer <span className="text-[--color-primary]">Chadhava</span> as per
              Vedic rituals at sacred temples across India
            </h1>

            <p className="text-lg text-gray-700 mb-6">
              Experience divine connection through <b>DevaSetu Chadhava Seva</b>
              . Participate remotely, and receive blessings and video recordings
              of your puja.
            </p>

            <ul className="space-y-3 mb-8 text-gray-700">
              <li>✨ Divine blessings through authentic rituals</li>
              <li>📿 Performed by qualified Purohit ji</li>
              <li>🌍 Offer from anywhere in the world</li>
              <li>🎥 Get your Chadhava video in 2–3 days</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                View Offerings
              </button>
              <button className="border border-orange-400 text-orange-600 px-8 py-3 rounded-xl hover:bg-orange-50 hover:shadow-md transition-all duration-300">
                How It Works?
              </button>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="absolute w-72 h-72 bg-orange-100 blur-3xl rounded-full top-10 right-10 opacity-40" />
            <Image
              src="/images/chadhava.webp"
              alt="Chadhava Banner"
              width={500}
              height={450}
              className="object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
        </div> */}
          <h1 className="font-secondary text-2xl md:text-4xl text-center font-bold text-[var(--color-dark)] leading-snug mb-6">
            Offer <span className="text-[var(--color-primary)]">Chadhava</span>{" "}
            as per Vedic rituals at sacred temples across India
          </h1>
          <ChadhavaHeroSlider
            heroBanner={heroBanner}
            handlaRedirect={handlaRedirect}
          />
        </section>
      </Container>


        {/* 🕉️ Upcoming Chadhava Section */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h2 className="font-secondary text-3xl md:text-4xl font-extrabold text-[var(--color-dark)] mb-4">
              Upcoming{" "}
              <span className="text-[var(--color-primary)]">
                Chadhava Offerings
              </span>
            </h2>
            <p className=" text-lg text-[var(--color-dark)] max-w-2xl mx-auto">
              Participate in auspicious Chadhava ceremonies organized at holy
              temples. Each offering is conducted by priests according to Vedic
              traditions.
            </p>
          </div>

          {/* 🪔 Cards Grid */}
          <div className="">
            {chadhavaCard?.length ? (
              <ChadhavaCard
                handlaRedirect={handlaRedirect}
                withLang={withLang}
                chadhava={chadhavaCard}
                viewmore={false}
              />
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No upcoming Chadhava available right now.
              </p>
            )}
          </div>

          {/* 🌼 View More Button */}
          {/* {chadhavaCard?.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => router.push(withLang("/chadhava/all"))}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                View All Offerings →
              </button>
            </div>
          )} */}
        </section>

        {/* Review */}
        <section className="py-14 bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9]">
          <Container>
            <h2 className="font-secondary text-center text-3xl font-bold mb-10">
              What devotees Say about DevaSetu Puja?
            </h2>
            <Reviews reviews={reviews} />
          </Container>
        </section>

        {/* How Puja Works */}
        <section className="relative py-20 px-6 overflow-hidden">
          {/* Heading */}
          <h2 className="text-center font-secondary text-3xl font-bold mb-10 text-[var(--color-dark)]">
            How does <span className="text-[var(--color-info)]">DevaSetu</span>{" "}
            Online Puja Work?
          </h2>

          <HowPujaWorks />
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-b from-[#fff3e2] to-[#fffaf5] py-16 px-6 text-center text-[var(--color-foreground)]">
          <Container>
            <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-10 text-[var(--color-dark)]">
              Start your{" "}
              <span className="text-[var(--color-primary)]">
                Sacred Journey
              </span>{" "}
              with
              <span className="text-[var(--color-info)]">
                {" "}
                DevaSetu Puja Service
              </span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {/* Pujas Done */}
              <div className="bg-[var(--color-primary-light)]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-center mb-3">
                  <Landmark className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <p className="text-3xl font-secondary font-bold text-[var(--color-primary)] mb-1">
                  10,00,000+
                </p>
                <p className="text-xl font-secondary font-medium text-[var(--color-dark)]">
                  Pujas Done
                </p>
              </div>

              {/* Happy Devotees */}
              <div className="bg-[var(--color-info)]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-center mb-3">
                  <Users className="w-8 h-8 text-[var(--color-info)]" />
                </div>
                <p className="text-3xl font-secondary font-bold text-[var(--color-info)] mb-1">
                  300,000+
                </p>
                <p className="text-xl font-secondary font-medium text-[var(--color-dark)]">
                  Happy Devotees
                </p>
              </div>

              {/* Famous Temples */}
              <div className="bg-[var(--color-accent)]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-center mb-3">
                  <Building className="w-8 h-8 text-[var(--color-accent)]" />
                </div>
                <p className="text-3xl font-secondary font-bold text-[var(--color-accent)] mb-1">
                  100+
                </p>
                <p className="text-xl font-secondary font-medium text-[var(--color-dark)]">
                  Famous Temples
                </p>
              </div>

              {/* Spreading Dharma */}
              <div className="bg-[var(--color-dark)]/5 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex justify-center mb-3">
                  <Sparkles className="w-8 h-8 text-[var(--color-dark)]" />
                </div>
                <p className="text-3xl font-secondary font-bold text-[var(--color-dark)] mb-1">
                  1 Sankalp
                </p>
                <p className="text-xl font-secondary font-medium text-[var(--color-dark)]">
                  Spreading Sanatan Dharma
                </p>
              </div>
            </div>
          </Container>
        </section>
    </main>
  );
};

export default ChadhavaPage;
