"use client";

import { useLang } from "../../langProviders";
import HeroBanner from "../../../components/HeroBanner";
import Reviews from "../../../components/Review";
import PujaCard from "../../../components/Cards/pujaCard";
import Main from "../../../components/Main";
import Container from "../../../components/Container";
import ContinuousSlider from "../../../components/Continuousslider";
import HowItWorks from "../../../components/Howitworks";
import LibraryCards from "../../../components/LibraryCards";
import StatsSection from "../../../components/Statssection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestHomePageAction } from "@/redux/actions/homeAction";
import ChadhavaCard from "@/components/Cards/chadhavaCard";
import PageLaoder from "@/components/Atom/loader/pageLaoder";
import SectionLoader from "@/components/Atom/loader/sectionLoader";
import { useWithLang } from "../../../../helper/useWithLang";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Namaste from "../../../../public/icons/namaste.svg";
import Link from "next/link";

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


const Home = () => {
  const { heroBanner, pujaCard, chadhavaCard } = useSelector(
    (state) => state.home
  );
  const { isLoading } = useSelector((state) => state.loader);

  const dispatch = useDispatch();

  const withLang = useWithLang();
  const router = useRouter();

  useEffect(() => {
    dispatch(requestHomePageAction());
  }, []);

  const { lang, setLang, t } = useLang();

  if (isLoading) {
    return <PageLaoder />;
  }

  const handlaRedirect = (base, slug) => {
    router.push(withLang(`/${base}/${slug}`));
  };

  return (
    <Main className="HomePage">
      <HeroBanner height={600} width={1521} slides={heroBanner} />
      <ContinuousSlider />
      <Container>
        <section className="py-3 md:py-8">
          <div className="mx-auto max-w-screen-md text-left md:text-center  lg:mb-0">
            <h2 className="font-secondary text-center text-3xl md:text-4xl uppercase font-bold text-[var(--primary)] mb-2 mt-5 drop-shadow-lg">
              Special <span className="text-[var(--color-info)]">puja</span>
            </h2>
            <p className="text-sm md:text-xl text-[var(--color-dark)] text-center md:text-center">
              Connect with the divine from home. Get your puja performed in your
              name at India’s holy temples and invite peace, joy, and prosperity
              into your life.
            </p>
          </div>
          {isLoading ? (
            <SectionLoader />
          ) : (
            <PujaCard
              pujas={pujaCard}
              PujaName={"pujas"}
              viewmore={true}
              handlaRedirect={handlaRedirect}
              withLang={withLang}
            />
          )}
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-screen-md text-left md:text-center  lg:mb-0">
            <h2 className="font-secondary text-center text-3xl md:text-4xl uppercase font-bold text-[var(--primary)] mb-2 mt-5 drop-shadow-lg">Special
              <span className="text-[var(--color-info)]"> chadhavas</span>{" "}
              
            </h2>
            <p className="text-sm md:text-xl text-[var(--color-dark)]">
              Offer your devotion through special chadhavas and seek divine
              blessings for yourself and your loved ones.
            </p>
          </div>
          {isLoading ? (
            <SectionLoader />
          ) : (
            <ChadhavaCard
              chadhava={chadhavaCard}
              viewmore={true}
              handlaRedirect={handlaRedirect}
              withLang={withLang}
            />
          )}
        </section>
      </Container>

      <HowItWorks />

      {/* <section className="py-8"> */}
        {/* <div className="mx-auto max-w-screen-md text-left md:text-center lg:mb-0">
            <h2 className="font-secondary capitalize text-center text-3xl font-bold text-[var(--primary)] mb-2 mt-5">
             Explore Knowledge
            </h2>
            <p className="text-base"></p>
          </div> */}
        {/* <LibraryCards />
      </section> */}

      {/* <section className="bg-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Can a puja done on your behalf be effective?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10">
            Learn from trusted experts how a puja arranged from home with true
            devotion is as effective as one attended in-person at a temple.
          </p>
          <Effectiveness />
        </section> */}

      <section className="py-14 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-accent)]">
        <Container>
          <h2 className="font-secondary text-center text-white text-3xl font-bold mb-10">
            Reviews
          </h2>
          <Reviews reviews={reviews} />
        </Container>
      </section>

      <StatsSection />

      <section className="relative bg-white py-8 md:py-20 overflow-hidden text-center">
        {/* Top Ornament */}
        {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 opacity-80">
          <Image
            src="/icons/ornament-gold.svg"
            alt="Golden Ornament"
            width={160}
            height={50}
          />
        </div> */}

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="font-secondary text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-6">
            Start Your Spiritual Journey Today
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-dark)] leading-relaxed mb-10">
            Join thousands of devotees worldwide who connect with temples and
            rituals through{" "}
            <span className="text-[var(--color-primary)] font-semibold">
              DevaSetu
            </span>
            .
          </p>

          <div className="text-center">
            <Link href={'#'} className="w-[160px] m-auto cursor-pointer bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] hover:scale-105 hover:shadow-lg transition-all duration-300 text-white px-4 py-2 rounded-lg font-semibold text-lg shadow-xl flex items-center">
            Begin Now <Image src={Namaste} alt="Namaste Icon" width={30} height={30}  />
          </Link>
          </div>
        </div>

        {/* Bottom Ornament */}
        {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 opacity-80 rotate-180">
          <Image
            src="/icons/ornament-gold.svg"
            alt="Golden Ornament Bottom"
            width={160}
            height={50}
          />
        </div> */}
      </section>

      {/* <section className="p-16 bg-teal-500">
          <div className=" flex-col md:flex-row items-center justify-between px-6">
            <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-6">
                India’s Largest Devotional Platform
              </h2>
              <p className="text-white-600 max-w-3xl">
                We are committed to building the most trusted destination that serves
                the devotional needs of millions of devotees in India and abroad,
                providing them the access they always wanted.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <PlatformInfo />
            </div>
          </div>
        </section> */}

      {/* <section className="py-16 bg-gray-50">
          <h2 className="text-center text-3xl font-bold mb-10">
            One App for all your devotional needs
          </h2>
          <Features features={features} />
        </section> */}

      {/* <section className="py-16 bg-white">
          <h2 className="text-center text-3xl font-bold mb-10">
            Read interesting articles about upcoming fasts, festivals, and Sanatan Dharma
          </h2>
          <Chalisa chalisaItems={chalisaItems} />
        </section> */}
    </Main>
  );
};

export default Home;
