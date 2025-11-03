"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  User,
  Video,
  Gift,
  Package,
  CheckCircle,
  Globe2, Building2, Star
} from "lucide-react";

// import { , User, Gift, Video, Package } from "lucide-react";

import PujaCard from "@/components/Cards/pujaCard";
import Container from "@/components/Container";
import PageHeroSlider from "@/components/HeroBanner/PageHeroSlider";
import { requestPujaWebPageAction } from "@/redux/actions/pujaActions";
// import SectionLoader from "@/components/Atom/loader/sectionLoader";
import { useWithLang } from "../../../../../helper/useWithLang";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import PanditJi from "../../../../../public/images/pandit-ji.png";
import Reviews from "@/components/Review";
import HowPujaWorks from "@/components/OnlineSteps";

const purohits = [
  {
    name: "Acharya Ramjas Dwivedi",
    location: "Prayagraj",
    experience: "15 years",
    img: PanditJi,
  },
  {
    name: "Pandit Ashish Bhatt",
    location: "Haridwar",
    experience: "5 years",
    img: PanditJi,
  },
  {
    name: "Pandit Hanshul Dutt",
    location: "Haridwar",
    experience: "5 years",
    img: PanditJi,
  },
  {
    name: "Pandit Ravi Dubey",
    location: "Ujjain",
    experience: "5 years",
    img: PanditJi,
  },
  {
    name: "Pandit Saurabh Gautam",
    location: "Varanasi",
    experience: "4 years",
    img: PanditJi,
  },
];

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

const steps = [
    {
      title: "Select Puja Package",
      text: "Make your selection from our wide range of pujas.",
      color: "var(--color-primary)",
      icon: <Package className="w-5 h-5" />,
      // img: SliderImg,
    },
    {
      title: "Provide Your Details",
      text: "After selecting your preferred puja, fill in your Name and Gotra for Sankalp.",
      color: "var(--color-info)",
      icon: <User className="w-5 h-5" />,
      // img: SliderImg,
    },
    {
      title: "Optional Add-Ons",
      text: "Include Chadhava, Seva, or other offerings to enhance your puja experience.",
      color: "var(--color-accent)",
      icon: <Gift className="w-5 h-5" />,
      // img: SliderImg,
    },
    {
      title: "Receive Puja Video & Blessings",
      text: "The video of your completed puja will be shared on WhatsApp within 3–4 days.",
      color: "var(--color-primary-light)",
      icon: <Video className="w-5 h-5" />,
      // img: SliderImg,
    },
    {
      title: "Receive DevaPrasadam",
      text: "A box of DevaPrasadam* will be delivered to your home at no extra cost.",
      color: "var(--color-dark)",
      icon: <CheckCircle className="w-5 h-5" />,
      // img: SliderImg,
    },
  ];

const PujaPage = () => {
  const dispatch = useDispatch();

  const { pujaCard, heroBanner } = useSelector((state) => state.pujas);
  const { isLoading } = useSelector((state) => state.loader);

  const withLang = useWithLang();
  const router = useRouter();

  useEffect(() => {
    dispatch(requestPujaWebPageAction());
  }, [dispatch]);

  const handlaRedirect = (base, slug) => {
    router.push(withLang(`/${base}/${slug}`));
  };

  return (
    <div className="puja-page text-[var(--color-dark)]">
      {/* Hero Section */}

      <section className="relative py-8 px-2 md:px-6 text-center">
       <Container>
         <h1 className="font-secondary text-lg md:text-4xl font-bold text-[var(--color-dark)] mb-4">
          Perform Puja as per Vedic rituals at Famous Hindu Temples in India
        </h1>
        <PageHeroSlider
          heroBanner={heroBanner}
          handlaRedirect={handlaRedirect}
        />
       </Container>
      </section>

      {/* Featured Puja */}
      <Container>
        <section className="pb-8 md:px-6">
          <h2 className="font-secondary text-center text-xl md:text-4xl uppercase font-bold text-[var(--primary)] md:mt-5">
            Featured Pujas
          </h2>
          <PujaCard
            pujas={pujaCard}
            PujaName={"pujas"}
            handlaRedirect={handlaRedirect}
            viewmore={false}
            withLang={withLang}
          />
        </section>

        {/* Testimonials */}
        {/* <section className="bg-[var(--color-info)] py-12 px-6">
          <h2 className="font-secondary text-center text-3xl font-bold mb-6">What devotees Say about DevaSetu Puja?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white shadow rounded-lg p-4">
              <p className="italic text-gray-700 mb-2">“So many puja options for all the devotees. Great to get the grace of god from our homes. Most authentic and trustworthy puja service compared to others.”</p>
              <p className="font-secondary text-sm font-semibold">- Ramesh Chandra Bhatt, Nagpur</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <p className="italic text-gray-700 mb-2">“I really like the whole process of Puja at DevaSetu. Proper guidance and constant support.”</p>
              <p className="font-secondary text-sm font-semibold">- Aparna Mal, Puri</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <p className="italic text-gray-700 mb-2">“I liked the fact that we can book puja online and get prasad delivery.”</p>
              <p className="font-secondary text-sm font-semibold">- Shivraj Dobhi, Agra</p>
            </div>
          </div>
        </section> */}
      </Container>

      {/* Review */}
      <section className="py-4 md:py-14 bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9]">
        <Container>
          <h2 className="font-secondary text-center text-lg md:text-3xl font-bold mb-4 md:mb-10">
            What devotees Say about DevaSetu Puja?
          </h2>
          <Reviews reviews={reviews} />
        </Container>
      </section>

      {/* How Puja Works */}
      <section className="relative py-8 md:px-6 overflow-hidden">
        {/* Heading */}
        <h2 className="text-center font-secondary text-lg font-bold mb-10 text-[var(--color-dark)]">
          How does <span className="text-[var(--color-info)]">DevaSetu</span>{" "}
          Online Puja Work?
        </h2>

        <HowPujaWorks steps={steps} />
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-b from-[#fff3e2] to-[#fffaf5] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 text-center text-[var(--color-foreground)] relative overflow-hidden">
        <Container>
          {/* Heading */}
          <h2 className="font-secondary text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 sm:mb-10 text-[var(--color-dark)] leading-tight">
            Start your{" "}
            <span className="text-[var(--color-primary)]">Sacred Journey</span>{" "}
            with
            <span className="text-[var(--color-info)]">
              {" "}
              DevaSetu Puja Service
            </span>
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Pujas Done */}
            {/* Happy Devotees */}
            <div className="bg-[var(--color-info)]/10 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-3">
                <Globe2 className="w-8 h-8 text-[var(--color-info)]" />
              </div>
              <p className="text-2xl sm:text-3xl font-secondary font-bold text-[var(--color-info)] mb-1">
                20+
              </p>
              <p className="text-lg sm:text-xl font-secondary font-medium text-[var(--color-dark)]">
                Countries
              </p>
            </div>

            {/* Famous Temples */}
            <div className="bg-[var(--color-accent)]/10 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-3">
                <Building2 className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
              <p className="text-2xl sm:text-3xl font-secondary font-bold text-[var(--color-accent)] mb-1">
                100+
              </p>
              <p className="text-lg sm:text-xl font-secondary font-medium text-[var(--color-dark)]">
                Temples
              </p>
            </div>

            {/* Spreading Dharma */}
            <div className="bg-[var(--color-dark)]/5 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-3">
                < Users className="w-8 h-8 text-[var(--color-dark)]" />
              </div>
              <p className="text-2xl sm:text-3xl font-secondary font-bold text-[var(--color-dark)] mb-1">
                20,000+
              </p>
              <p className="text-lg sm:text-xl font-secondary font-medium text-[var(--color-dark)]">
                Happy Devotees
              </p>
            </div>

            <div className="bg-[var(--color-primary-light)]/10 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-center mb-3">
                <Star className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <p className="text-2xl sm:text-3xl font-secondary font-bold text-[var(--color-primary)] mb-1">
                4.6
              </p>
              <p className="text-lg sm:text-xl font-secondary font-medium text-[var(--color-dark)]">
                Average Rating
              </p>
            </div>
          </div>
        </Container>

      </section>

      {/* Purohit Section */}
      {/* <section className="py-16 px-6 bg-[var(--color-background)] text-[var(--color-foreground)]">
        <Container>
          <h2 className="font-secondary text-3xl md:text-4xl font-bold text-center mb-2 text-[var(--color-dark)]">
            Meet the Experienced{" "}
            <span className="text-[var(--color-primary)]">Community</span> of
            <span className="text-[var(--color-info)]"> DevaSetu Purohits</span>
          </h2>
          <div className="text-center mb-6">
            <p className="text-base text-[var(--color-dark)] font-primary max-w-2xl mx-auto">
              Our Purohits are certified Vedic scholars from renowned temples
              across India, performing each Puja with devotion, precision, and
              authenticity.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {purohits.map((purohit, index) => (
              <div
                key={index}
                className="bg-[var(--white)] border border-[var(--color-primary-light)]/20 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="w-full h-48 bg-[var(--color-primary-light)]/10 flex items-center justify-center">
                  <Image
                    src={purohit.img}
                    alt={purohit.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="font-proxi-bold text-lg text-[var(--color-dark)] mb-2">
                    {purohit.name}
                  </h3>
                  <div className="flex justify-center items-center gap-2 text-sm text-[var(--color-dark)]">
                    <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>{purohit.location}</span>
                  </div>
                  <div className="flex justify-center items-center gap-2 text-sm mt-1 text-[var(--color-dark)]">
                    <Clock className="w-4 h-4 text-[var(--color-info)]" />
                    <span>{purohit.experience} experience</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section> */}
    </div>
  );
};

export default PujaPage;
