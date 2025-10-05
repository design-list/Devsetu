'use client'

import Image from "next/image";
import { useLang } from "../../langProviders";
import HeroBanner from "../../../components/HeroBanner";
import Effectiveness from "../../../components/Effectiveness";
import Reviews from "../../../components/Review";
import PlatformInfo from "../../../components/PlatformInfo";
import Features from "../../../components/Features";
import Chalisa from "../../../components/Chalisa";
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



const slidesData = [
  {
    title: "Navratri  Special Puja",
    // highlight: "Til Tarpanam",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    // image: "/images/6 member.webp",
  },
  {
    title: "Dev Setu",
    // highlight: "Til Tarpanam",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    // image: "/images/6 member.webp",
  },
];

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


const features = [
  { title: "Divine Temple", src: "/svg/ic_feature_01.svg", desc: "Set up your temple on your phone, dedicated to your beloved deity." },
  { title: "Hindu Literature", src: "/svg/ic_feature_02.svg", desc: "Get specially curated books, articles and videos based on Sanatan Dharma." },
  { title: "Devotional Music", src: "/svg/ic_feature_03.svg", desc: "Get access to 5000+ Ad-Free Devotional Music, Bhajans, Chalisas, Aartis." },
  { title: "Panchang, Horoscope & Festivals", src: "/svg/ic_feature_04.svg", desc: "Get regular updates on daily Horoscope, Panchang, important Vrat-Festivals." },
  { title: "Puja and Chadhava Seva", src: "/svg/ic_feature_05.svg", desc: "Book personalised Puja and Chadhava Seva in your and your family’s name." },
  { title: "Sanatani Community", src: "/svg/ic_feature_06.svg", desc: "Be a part of India’s largest devotional community and connect with Sanatanis." },
];

const chalisaItems = [
  { title: "Aarti", src: "/images/aarti_article.webp", desc: "Find complete Aartis of all the famous Aartis and easily worship your beloved God." },
  { title: "Chalisa", src: "/images/mantra_article.webp", desc: "You will get complete Chalisas of all the deities. Read Chalisa during Puja." },
  { title: "Mantra", src: "/images/chaalisa_article.webp", desc: "Here you will find all the powerful mantras for peace of mind and removal of obstacles." },
  { title: "Ayurvedic & Home Remedies", src: "/images/ayurvedic_article.webp", desc: "We have brought the precious knowledge of Ayurveda for you." },
];

const pujas = [
  {
    title: "51,000 Pitru Gayatri Mantra Jaap and Til Tarpanam",
    desc: "For Peace of Ancestor’s souls and Resolving Family Disputes",
    img: "/images/herobanner.webp",
    place: "Dharmaranyam Vedi, Gaya, Bihar",
    date: "17 September, Wednesday, Krishna Ekadashi",
  },
  {
    title: "Kashi-Rameshwaram Ghat-Gokarna Pitru Shanti Puja",
    desc: "To Seek Relief from Ancestral Curses and Bring Peace to Departed Souls",
   img: "/images/herobanner.webp",
    place: "Pishach Mochan Kund, Gokarna Kshetra",
    date: "17 September, Wednesday, Krishna Ekadashi",
  },
  {
    title: "Panch Tirth Pitru Dosha Nivaran Puja",
    desc: "For Peace of Ancestor’s souls and Resolving Family Disputes",
     img: "/images/herobanner.webp",
    place: "Kashi, Rameshwaram, Gaya, Gokarna, Hardwar",
    date: "21 September, Sunday, Amavasya",
  },
];


const Home = () => {

  const { heroBanner, pujaCard, chadhavaCard } = useSelector((state) => state.home)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestHomePageAction())
  },[])

  const { lang, setLang, t } = useLang();


  return (
    <Main className="HomePage">
      <HeroBanner slides={heroBanner} />
      <ContinuousSlider />
      <Container>
        <section className="py-8">
          <div className="mx-auto max-w-screen-md text-left md:text-center  lg:mb-0">
            <h2 className=" capitalize text-center text-3xl font-bold text-[var(--primary)] mb-2 mt-5">
              Special pujas
            </h2>
            <p className="text-base">Connect with the divine from home. Get your puja performed in your name at India’s holy temples and invite peace, joy, and prosperity into your life.</p>
          </div>
          <PujaCard pujas={pujaCard} PujaName={'pujas'} viewmore = {true}  />

        </section>

        <section className="py-8">
          <div className="mx-auto max-w-screen-md text-left md:text-center  lg:mb-0">
            <h2 className=" capitalize text-center text-3xl font-bold text-[var(--primary)] mb-2 mt-5">
           Special chadhavas
            </h2>
            <p className="text-base">Offer your devotion through special chadhavas and seek divine blessings for yourself and your loved ones.</p>
          </div>
          <ChadhavaCard chadhava={chadhavaCard} viewmore={true} />

        </section>

        <HowItWorks />

        <section className="py-8">
          <div className="mx-auto max-w-screen-md text-left md:text-center  lg:mb-0">
            <h2 className=" capitalize text-center text-3xl font-bold text-[var(--primary)] mb-2 mt-5">
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

        <section className="py-16 bg-gray-50">
          <h2 className="text-center text-3xl font-bold mb-10">Reviews & Ratings</h2>
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