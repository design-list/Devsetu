// src/app/chadhava/page.js

"use client";
import PageLaoder from "@/components/Atom/loader/pageLaoder";
import SectionLoader from "@/components/Atom/loader/sectionLoader";
import ChadhavaCard from "@/components/Cards/chadhavaCard";
import { requestWebChadhavaAction } from "@/redux/actions/chadhavaAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWithLang } from "../../../../../helper/useWithLang";


const ChadhavaPage = () => {

  const dispatch = useDispatch(); 

  const { heroBanner,chadhavaCard } = useSelector((state) => state.chadhavas)
  const { isLoading } = useSelector((state) => state.loader)

  
  const router = useRouter();
  const withLang = useWithLang();

  const handlaRedirect = (base,slug) => {
    router.push(withLang(`/${base}/${slug}`))
  }


  useEffect(() => {
    dispatch(requestWebChadhavaAction())
  },[dispatch])


  if(isLoading){
    return<PageLaoder />
  }

  return (
    <main className="bg-gray-50">
      {/* ✅ Banner Section */}
      <section className="bg-gradient-to-r from-orange-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">
              Offer Chadhava as per Vedic rituals at sacred Hindu Pilgrimages and Temples
              in India through Sri Mandir from anywhere in the world!
            </h1>

            <ul className="space-y-3 mb-6 text-gray-700">
              <li>✅ Divine Blessings through Chadhava.</li>
              <li>✅ Vedic Rituals Performed by Purohit ji.</li>
              <li>✅ Offer Chadhava from Anywhere.</li>
              <li>✅ Receive Chadhava Video in 2-3 days.</li>
            </ul>

            <div className="flex gap-4">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow">
                View Now
              </button>
              <button className="border border-gray-400 hover:bg-gray-100 px-6 py-3 rounded-lg">
                How It works?
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="/images/chadhava.webp"
              alt="Banner"
              width={450}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* ✅ Upcoming Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Upcoming Chadhava Offerings on Sri Mandir.
        </h2>
        <p className="text-gray-600 mb-10">
          Experience the divine with Sri Mandir Chadhava Seva. Offer Chadhava at
          renowned temples across India, receiving blessings and a video recording of
          the ceremony performed by our Purohit ji on your behalf.
        </p>

        {/* ✅ Card Grid */}
        <div className="py-8">
           <ChadhavaCard handlaRedirect={handlaRedirect} withLang={withLang} chadhava={chadhavaCard} viewmore={false} />
        </div>
      </section>
    </main>
  );
}

export default ChadhavaPage;