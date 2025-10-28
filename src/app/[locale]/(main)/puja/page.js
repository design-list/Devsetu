"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Landmark,
  Users,
  Building,
  Sparkles,
  ListChecks,
  User,
  Video,
  Gift,
  MapPin,
  Clock,
} from "lucide-react";

import PujaCard from "@/components/Cards/pujaCard";
import Container from "@/components/Container";
import PageHeroSlider from "@/components/HeroBanner/PageHeroSlider";
import { requestPujaWebPageAction } from "@/redux/actions/pujaActions";
import SectionLoader from "@/components/Atom/loader/sectionLoader";
import { useWithLang } from "../../../../../helper/useWithLang";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PanditJi from "../../../../../public/images/pandit-ji.png";
import Reviews from "@/components/Review";

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
    <div className="text-[var(--color-dark)]">
      {/* Hero Section */}

      <section className="relative py-8 px-6 text-center">
        <h1 className="font-secondary text-2xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
          Perform Puja as per Vedic rituals at Famous Hindu Temples in India
        </h1>
        <PageHeroSlider
          heroBanner={heroBanner}
          handlaRedirect={handlaRedirect}
        />
      </section>

      {/* Featured Puja */}
      <Container>
        <section className="pb-8 px-6">
          <h2 className="font-secondary text-center text-4xl uppercase font-bold text-[var(--primary)] mt-5">
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

      <section className="py-14 bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9]">
        <Container>
          <h2 className="font-secondary text-center text-3xl font-bold mb-10">
            What devotees Say about DevaSetu Puja?
          </h2>
          <Reviews reviews={reviews} />
        </Container>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 text-center text-[var(--color-foreground)]">
        <Container>
          <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-10 text-[var(--color-dark)]">
            Start your{" "}
            <span className="text-[var(--color-primary)]">Sacred Journey</span>{" "}
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

      {/* How Puja Works */}
      <section className="bg-gradient-to-br from-[#fff8f3] via-[#fff3e6] to-[#fff0d9] py-16 px-6 text-[var(--color-foreground)]">
        <Container>
          <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-12 text-center text-[var(--color-dark)]">
            Start your{" "}
            <span className="text-[var(--color-primary)]">Sacred Journey</span>{" "}
            with
            <span className="text-[var(--color-info)]">
              {" "}
              DevaSetu Online Puja
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="relative bg-[var(--color-primary-light)]/10 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-center mb-4">
                <ListChecks className="w-10 h-10 text-[var(--color-primary)] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-secondary font-bold text-xl text-[var(--color-dark)] mb-2">
                Choose Your Puja
              </h3>
              <p className="text-sm font-primary text-[var(--color-dark)]">
                Select your desired Puja from our wide list of sacred rituals.
              </p>
              <span className="absolute -top-4 left-6 bg-[var(--color-primary)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                Step 1
              </span>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[var(--color-info)]/10 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-center mb-4">
                <User className="w-10 h-10 text-[var(--color-info)] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-secondary font-bold text-xl text-[var(--color-dark)] mb-2">
                Fill Your Information
              </h3>
              <p className="text-sm font-primary text-[var(--color-dark)]">
                Enter your Name and Gotra — our priests will include them in the
                Puja Sankalp.
              </p>
              <span className="absolute -top-4 left-6 bg-[var(--color-info)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                Step 2
              </span>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[var(--color-accent)]/10 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-center mb-4">
                <Video className="w-10 h-10 text-[var(--color-accent)] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="font-secondary font-bold text-xl text-[var(--color-dark)] mb-2">
                Watch & Receive Blessings
              </h3>
              <p className="text-sm font-primary text-[var(--color-dark)]">
                Get Puja video on WhatsApp and receive your sacred Aashirwad box
                at home.
              </p>
              <span className="absolute -top-4 left-6 bg-[var(--color-accent)] text-white px-3 py-1 rounded-full text-xs font-semibold">
                Step 3
              </span>
            </div>
          </div>

          {/* Optional Closing Line */}
          <div className="text-center mt-12">
            <p className="font-secondary text-3xl text-[var(--color-dark)] mx-auto">
              Every Puja is performed with devotion by experienced priests at
              holy temples — connecting you to divine energy from the comfort of
              your home.
            </p>
          </div>
        </Container>
      </section>

      {/* Purohit Section */}
      <section className="py-16 px-6 bg-[var(--color-background)] text-[var(--color-foreground)]">
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
                {/* Image Placeholder or Actual Image */}
                <div className="w-full h-48 bg-[var(--color-primary-light)]/10 flex items-center justify-center">
                  <Image
                    src={purohit.img}
                    alt={purohit.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-6 text-center">
                  <h3 className="font-proxi-bold text-lg text-[var(--color-dark)] mb-2">
                    {purohit.name}
                  </h3>
                  <div className="flex justify-center items-center gap-2 text-sm text-[var(--color-dark)]">
                    <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                    <span>{purohit.location}</span>
                  </div>
                  {/* <div className="flex justify-center items-center gap-2 text-sm mt-1 text-[var(--color-dark)]">
                    <Clock className="w-4 h-4 text-[var(--color-info)]" />
                    <span>{purohit.experience} experience</span>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PujaPage;
