"use client";

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import HeroBanner from '@/components/HeroBanner';


const slidesData = [
  {
    title: "Navratri  Special Puja",
    // highlight: "Til Tarpanam",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/images/6 member.webp", // replace with actual image in public/images
  },
];




const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      <HeroBanner slides={slidesData} />
      <section className="relative bg-gradient-to-r from-orange-100 via-yellow-100 to-orange-50 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About DevaSetu
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-700">
          Faith is the bridge connecting the divine with everyday life. At
          DevaSetu, we bring puja, chadhava, and sacred rituals closer to you —
          wherever you are.
        </p>
      </section>

      {/* About Content */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Essence
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our name itself means <span className="font-semibold">“the bridge
            to the gods”</span> and that is the essence of what we strive to
            create for every devotee. Rooted in tradition yet guided by modern
            technology, DevaSetu partners with experienced priests and renowned
            temples to ensure every offering is performed with{" "}
            <span className="font-semibold">purity, devotion, and
            authenticity</span>.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            From a simple prayer to elaborate anusthans, every ritual is
            conducted with the same sincerity as if you were present in person.
            DevaSetu is not just a service, but a{" "}
            <span className="font-semibold">spiritual companion</span>, helping
            you celebrate festivals, fulfill vows, and receive blessings with
            ease and trust.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            How DevaSetu Started
          </h2>
          <p className="text-gray-700 leading-relaxed">
            DevaSetu was born out of a simple realization: in today’s busy,
            global world, many devotees are unable to visit temples or perform
            rituals the way they wish to. What began as a heartfelt effort to
            make puja accessible for friends and family soon grew into a
            platform that connects countless devotees with temples, priests, and
            rituals across India.
          </p>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Guided by faith and powered by technology, DevaSetu continues to
            expand this <span className="font-semibold">bridge of devotion</span>.
          </p>
        </div>

        {/* Founder Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Meet the Founder
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <span className="font-semibold">Utkarsh Mansinghka</span>, ex
              Investment Banker at Barclays, London, envisioned DevaSetu as a
              bridge that makes spirituality accessible for all.
            </p>
            <Link
              href="https://www.linkedin.com/in/utkarsh-mansinghka-b6a288117/"
              target="_blank"
              className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
            >
              Connect on LinkedIn
            </Link>
          </div>
          <div className="flex justify-center">
            <Image
              src="/founder.jpg" // Replace with actual founder image path
              alt="Founder Utkarsh Mansinghka"
              width={350}
              height={350}
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>

        {/* Join Section */}
        <div className="bg-orange-50 rounded-2xl p-8 text-center shadow">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Join Our Journey
          </h2>
          <p className="text-gray-700 mb-6">
            We are always looking for passionate individuals who share our
            vision of blending devotion with technology. If you would like to be
            a part of DevaSetu’s growing family, send your CV to:
          </p>
          <Link
            href="mailto:utkarsh.mansinghka@devasetu.com"
            className="inline-block px-5 py-3 bg-orange-500 text-white font-medium rounded-lg shadow hover:bg-orange-600 transition"
          >
            utkarsh.mansinghka@devasetu.com
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;