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
    name: "Archana Nair",
    city: "Bengaluru",
    text: "So many pujas updates for all the devotees. Great to be part of this app. I’ve never been happier with online puja service compared to others.",
  },
  {
    name: "Ramesh Chandra Bhatt",
    city: "Nagpur",
    text: "I really like the entire aspect of puja arranged. Great customer support & easy process! I always get notified in time. Very authentic experience.",
  },
  {
    name: "Aparna Mal",
    city: "Pune",
    text: "I did my first live darshan puja via DevaSetu and it felt so divine. I was able to see all the rituals done live from the temple.",
  },
  {
    name: "Shivraj Dobhi",
    city: "Agra",
    text: "The best part is one can book puja services from anywhere. The app is so easy to use and very trustworthy. My family always uses DevaSetu services.",
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
      <HeroBanner slides={heroBanner} />
      <ContinuousSlider />
      <Container>
        <section className="py-8 font">
          <div className="mx-auto max-w-screen-md text-left md:text-center  lg:mb-0">
            <h2 className="font-secondary text-center text-4xl uppercase font-bold text-[var(--primary)] mb-2 mt-5 drop-shadow-lg">
              Special <span className="text-[var(--color-info)]">puja</span>
            </h2>
            <p className="text-xl text-[var(--color-dark)]">
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
            <h2 className="font-secondary text-center text-4xl uppercase font-bold text-[var(--primary)] mb-2 mt-5 drop-shadow-lg">
              <span className="text-[var(--color-info)]">Special</span>{" "}
              chadhavas
            </h2>
            <p className="text-xl text-[var(--color-dark)]">
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

      <section className="py-8">
        {/* <div className="mx-auto max-w-screen-md text-left md:text-center lg:mb-0">
            <h2 className="font-secondary capitalize text-center text-3xl font-bold text-[var(--primary)] mb-2 mt-5">
             Explore Knowledge
            </h2>
            <p className="text-base"></p>
          </div> */}
        <LibraryCards />
      </section>

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

      <section className="py-16 bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9]">
        <Container>
          <h2 className="font-secondary text-center text-3xl font-bold mb-10">
            Reviews & Ratings
          </h2>
          <Reviews reviews={reviews} />
        </Container>
      </section>

      <StatsSection />

      <section className="relative bg-gradient-to-b from-[#fff3e2] to-[#fffaf5] py-20 overflow-hidden text-center">
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
        <div className="relative z-10 max-w-3xl mx-auto px-6">
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
            <Link href={'#'} className="w-[160px] m-auto cursor-pointer bg-gradient-to-r from-[var(--color-primary-light)] to-[var(--color-primary)] hover:scale-105 hover:shadow-lg transition-all duration-300 text-white px-4 py-2 rounded-xl font-semibold text-lg shadow-xl flex items-center">
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
