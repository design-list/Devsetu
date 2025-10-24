'use client'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  },[dispatch])


  const handlaRedirect = (base,slug) => {
    router.push(withLang(`/${base}/${slug}`))
  }

  return (
    <div className="font-sans text-gray-800">
      
      {/* Hero Section */}
      
      <section className="relative bg-green-50 py-12 px-6 text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
          Perform Puja as per Vedic rituals at Famous Hindu Temples in India
        </h1>
        <PageHeroSlider heroBanner={heroBanner} handlaRedirect={handlaRedirect} />
      </section>

     {/* Featured Puja */}
     <Container>
      <section className="py-12 px-6">
        <h2 className="text-xl font-bold text-center mb-10">Featured Pujas</h2>
          <PujaCard pujas={pujaCard} PujaName={'pujas'} handlaRedirect={handlaRedirect} viewmore={false} withLang={withLang} />
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-12 px-6">
        <h2 className="text-xl font-bold text-center mb-6">What devotees Say about Sri Mandir Puja?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="italic text-gray-700 mb-2">“So many puja options for all the devotees. Great to get the grace of god from our homes. Most authentic and trustworthy puja service compared to others.”</p>
            <p className="text-sm font-semibold">- Ramesh Chandra Bhatt, Nagpur</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="italic text-gray-700 mb-2">“I really like the whole process of Puja at Sri Mandir. Proper guidance and constant support.”</p>
            <p className="text-sm font-semibold">- Aparna Mal, Puri</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="italic text-gray-700 mb-2">“I liked the fact that we can book puja online and get prasad delivery.”</p>
            <p className="text-sm font-semibold">- Shivraj Dobhi, Agra</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-xl font-bold mb-6">Start your Sacred Journey with Sri Mandir Puja Service</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-red-50 p-6 rounded-lg">
            <p className="text-2xl font-bold text-red-600">10,00,000+</p>
            <p className="text-sm">Pujas Done</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">300,000+</p>
            <p className="text-sm">Happy Devotees</p>
          </div>
          <div className="bg-pink-50 p-6 rounded-lg">
            <p className="text-2xl font-bold text-pink-600">100+</p>
            <p className="text-sm">Famous Temples</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">1 Sankalp</p>
            <p className="text-sm">Spreading Sanatan Dharma</p>
          </div>
        </div>
      </section>

      {/* How Puja Works */}
      <section className="bg-gray-50 py-12 px-6">
        <h2 className="text-xl font-bold text-center mb-6">How does Sri Mandir Online Puja Works?</h2>
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
        <h2 className="text-xl font-bold text-center mb-6">Meet the experienced community of Sri Mandir Purohit's</h2>
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