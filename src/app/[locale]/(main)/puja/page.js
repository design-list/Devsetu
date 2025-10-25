'use client'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Landmark, Users, Building, Sparkles } from "lucide-react";

import PujaCard from "@/components/Cards/pujaCard";
import Container from "@/components/Container";
import PageHeroSlider from "@/components/HeroBanner/PageHeroSlider";
import { requestPujaWebPageAction } from "@/redux/actions/pujaActions";
import SectionLoader from "@/components/Atom/loader/sectionLoader";
import { useWithLang } from "../../../../../helper/useWithLang";
import { useRouter } from "next/navigation";


const PujaPage = () => {

  const dispatch = useDispatch();

  const { pujaCard, heroBanner } = useSelector((state) => state.pujas)
  const { isLoading } = useSelector((state) => state.loader)

  const withLang = useWithLang();
  const router = useRouter();

  useEffect(() => {
    dispatch(requestPujaWebPageAction())
  }, [dispatch])


  const handlaRedirect = (base,slug) => {
    router.push(withLang(`/${base}/${slug}`))
  }

  return (
    <div className="text-[var(--color-dark)]">

      {/* Hero Section */}

      <section className="relative py-8 px-6 text-center">
        <h1 className="font-secondary text-2xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
          Perform Puja as per Vedic rituals at Famous Hindu Temples in India
        </h1>
        <PageHeroSlider heroBanner={heroBanner} handlaRedirect={handlaRedirect} />
      </section>

      {/* Featured Puja */}
      <Container>
        <section className="pb-8 px-6">
          <h2 className="font-secondary text-center text-4xl uppercase font-bold text-[var(--primary)] mt-5">Featured Pujas</h2>
          <PujaCard pujas={pujaCard} PujaName={'pujas'} handlaRedirect={handlaRedirect} viewmore={false} withLang={withLang} />
        </section>

        {/* Testimonials */}
        <section className="bg-[var(--color-info)] py-12 px-6">
          <h2 className="font-secondary text-center text-3xl font-bold mb-6">What devotees Say about Sri Mandir Puja?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white shadow rounded-lg p-4">
              <p className="italic text-gray-700 mb-2">“So many puja options for all the devotees. Great to get the grace of god from our homes. Most authentic and trustworthy puja service compared to others.”</p>
              <p className="font-secondary text-sm font-semibold">- Ramesh Chandra Bhatt, Nagpur</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <p className="italic text-gray-700 mb-2">“I really like the whole process of Puja at Sri Mandir. Proper guidance and constant support.”</p>
              <p className="font-secondary text-sm font-semibold">- Aparna Mal, Puri</p>
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <p className="italic text-gray-700 mb-2">“I liked the fact that we can book puja online and get prasad delivery.”</p>
              <p className="font-secondary text-sm font-semibold">- Shivraj Dobhi, Agra</p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-6 text-center bg-[var(--color-background)] text-[var(--color-foreground)]">
          <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-10 text-[var(--color-dark)]">
            Start your <span className="text-[var(--color-primary)]">Sacred Journey</span> with <br />
            <span className="text-[var(--color-info)]">DevaSetu Puja Service</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {/* Pujas Done */}
            <div className="bg-[var(--color-primary-light)]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-3">
                <Landmark className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <p className="text-3xl font-secondary font-bold text-[var(--color-primary)] mb-1">10,00,000+</p>
              <p className="text-xl font-secondary font-medium text-[var(--color-dark)]">Pujas Done</p>
            </div>

            {/* Happy Devotees */}
            <div className="bg-[var(--color-info)]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-[var(--color-info)]" />
              </div>
              <p className="text-3xl font-secondary font-bold text-[var(--color-info)] mb-1">300,000+</p>
              <p className="text-xl font-secondary font-medium text-[var(--color-dark)]">Happy Devotees</p>
            </div>

            {/* Famous Temples */}
            <div className="bg-[var(--color-accent)]/10 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-3">
                <Building className="w-8 h-8 text-[var(--color-accent)]" />
              </div>
              <p className="text-3xl font-secondary font-bold text-[var(--color-accent)] mb-1">100+</p>
              <p className="text-xl font-secondary font-medium text-[var(--color-dark)]">Famous Temples</p>
            </div>

            {/* Spreading Dharma */}
            <div className="bg-[var(--color-dark)]/5 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-center mb-3">
                <Sparkles className="w-8 h-8 text-[var(--color-dark)]" />
              </div>
              <p className="text-3xl font-secondary font-bold text-[var(--color-dark)] mb-1">1 Sankalp</p>
              <p className="text-xl font-secondary font-medium text-[var(--color-dark)]">Spreading Sanatan Dharma</p>
            </div>
          </div>
        </section>

        {/* How Puja Works */}
        <section className="bg-gray-50 py-12 px-6">
          <h2 className="font-secondary text-3xl md:text-4xl font-bold mb-10 text-[var(--color-dark)] text-center">
            Start your <span className="text-[var(--color-primary)]">How does</span> Sri Mandir Online <br />
            <span className="text-[var(--color-info)]">Puja Works?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h3 className="font-bold mb-2">Choose Your Puja</h3>
              <p className="text-sm text-gray-600">Select your Puja from the list</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h3 className="font-bold mb-2">Your Information</h3>
              <p className="text-sm text-gray-600">Fill in your Name and Gotra in the form</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h3 className="font-bold mb-2">Puja Video & Aashirwad</h3>
              <p className="text-sm text-gray-600">Receive video on WhatsApp and Aashirwad box at home</p>
            </div>
          </div>
        </section>

        {/* Purohit Section */}
        <section className="py-12 px-6">
          <h2 className="text-xl font-bold text-center mb-6">Meet the experienced community of Sri Mandir Purohits</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h3 className="font-bold mb-2">Acharya Ramjas Dwivedi</h3>
              <p className="text-sm text-gray-600">Prayagraj | 15 years</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h3 className="font-bold mb-2">Pandit Ashish Bhatt</h3>
              <p className="text-sm text-gray-600">Haridwar | 5 years</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h3 className="font-bold mb-2">Pandit Hanshul Dutt</h3>
              <p className="text-sm text-gray-600">Haridwar | 5 years</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h3 className="font-bold mb-2">Pandit Ravi Dubey</h3>
              <p className="text-sm text-gray-600">Ujjain | 5 years</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 text-center">
              <h3 className="font-bold mb-2">Pandit Saurabh Gautam</h3>
              <p className="text-sm text-gray-600">Varanasi | 4 years</p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}


export default PujaPage;