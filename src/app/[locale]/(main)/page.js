'use client'

import { useLang } from "../../langProviders";
import HeroBanner from "../../../components/HeroBanner";
import Reviews from "../../../components/Review";
import PujaCard from "../../../components/Cards/pujaCard";
import Main from '../../../components/Main';
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
    text: "I did my first live darshan puja via Sri Mandir and it felt so divine. I was able to see all the rituals done live from the temple.",
  },
  {
    name: "Shivraj Dobhi",
    city: "Agra",
    text: "The best part is one can book puja services from anywhere. The app is so easy to use and very trustworthy. My family always uses Sri Mandir services.",
  },
];


const Home = () => {

  const { heroBanner, pujaCard, chadhavaCard } = useSelector((state) => state.home)
  const { isLoading } = useSelector((state) => state.loader)

  const dispatch = useDispatch();

  
  const withLang = useWithLang();
  const router = useRouter();
    

  useEffect(() => {
    dispatch(requestHomePageAction())
  },[])

  const { lang, setLang, t } = useLang();

  if(isLoading){
    return <PageLaoder />
  }

  const handlaRedirect = (base,slug) => {
    router.push(withLang(`/${base}/${slug}`))
  }

  return (
    <Main className="HomePage">
      <HeroBanner slides={heroBanner} />
      <ContinuousSlider />
      <Container>
        <section className="py-8 font">
          <div className="mx-auto max-w-screen-md text-left md:text-center  lg:mb-0">
            <h2 className="font-secondary text-center text-4xl uppercase font-bold text-[var(--primary)] mb-2 mt-5">
              Special pujas
            </h2>
            <p className="text-base font-proximanova">Connect with the divine from home. Get your puja performed in your name at India’s holy temples and invite peace, joy, and prosperity into your life.</p>
          </div>
          {isLoading ? <SectionLoader /> : <PujaCard pujas={pujaCard} PujaName={'pujas'} viewmore = {true} handlaRedirect={handlaRedirect} withLang={withLang} />}

        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-screen-md text-left md:text-center  lg:mb-0">
            <h2 className="font-secondary text-center text-4xl uppercase font-bold text-[var(--primary)] mb-2 mt-5">
           Special chadhavas
            </h2>
            <p className="text-base font-proximanova">Offer your devotion through special chadhavas and seek divine blessings for yourself and your loved ones.</p>
          </div>
          {isLoading ? <SectionLoader /> : <ChadhavaCard chadhava={chadhavaCard} viewmore={true} handlaRedirect={handlaRedirect} withLang={withLang} />}

        </section>

        <HowItWorks />

        <section className="py-8">
          <div className="mx-auto max-w-screen-md text-left md:text-center lg:mb-0">
            <h2 className="font-secondary capitalize text-center text-3xl font-bold text-[var(--primary)] mb-2 mt-5">
             Explore Knowledge
            </h2>
            <p className="text-base">Explore the wisdom of Sanatan Dharma through our curated articles, videos, and guides.</p>
          </div>
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

        <section className="py-16 bg-[var(--color-info)]">
          <h2 className="font-secondary text-center text-3xl font-bold mb-10">Reviews & Ratings</h2>
          <Reviews reviews={reviews} />
        </section>

        <StatsSection />

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
      </Container>
    </Main>
  );
}

export default Home;