"use client";
import PageLaoder from "@/components/Atom/loader/pageLaoder";
import ChadhavaCard from "@/components/Cards/chadhavaCard";
import { requestWebChadhavaAction } from "@/redux/actions/chadhavaAction";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWithLang } from "../../../../../helper/useWithLang";
import PageHeroSlider from "@/components/HeroBanner/PageHeroSlider";
import Container from "@/components/Container";

const ChadhavaPage = () => {
  const dispatch = useDispatch();
  const { heroBanner, chadhavaCard } = useSelector((state) => state.chadhavas);
  const { isLoading } = useSelector((state) => state.loader);

  const router = useRouter();
  const withLang = useWithLang();

  const handlaRedirect = (base, slug) => {
    router.push(withLang(`/${base}/${slug}`));
  };

  useEffect(() => {
    dispatch(requestWebChadhavaAction());
  }, [dispatch]);

  if (isLoading) {
    return <PageLaoder />;
  }

  return (
    <main className="bg-gradient-to-b from-orange-50 via-white to-gray-50 text-gray-800">
      <Container>
        {/* 🌅 Hero Banner */}
        <section className="relative py-8 overflow-hidden">
          {/* <div className="absolute inset-0 bg-[url('/patterns/sacred-bg.svg')] opacity-10 bg-repeat" /> */}
          {/* <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="animate-fadeIn">
            <h1 className="font-secondary text-4xl md:text-5xl font-bold text-[var(--color-dark)] leading-snug mb-6">
              Offer <span className="text-[--color-primary]">Chadhava</span> as per
              Vedic rituals at sacred temples across India
            </h1>

            <p className="text-lg text-gray-700 mb-6">
              Experience divine connection through <b>DevaSetu Chadhava Seva</b>
              . Participate remotely, and receive blessings and video recordings
              of your puja.
            </p>

            <ul className="space-y-3 mb-8 text-gray-700">
              <li>✨ Divine blessings through authentic rituals</li>
              <li>📿 Performed by qualified Purohit ji</li>
              <li>🌍 Offer from anywhere in the world</li>
              <li>🎥 Get your Chadhava video in 2–3 days</li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
                View Offerings
              </button>
              <button className="border border-orange-400 text-orange-600 px-8 py-3 rounded-xl hover:bg-orange-50 hover:shadow-md transition-all duration-300">
                How It Works?
              </button>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="absolute w-72 h-72 bg-orange-100 blur-3xl rounded-full top-10 right-10 opacity-40" />
            <Image
              src="/images/chadhava.webp"
              alt="Chadhava Banner"
              width={500}
              height={450}
              className="object-contain relative z-10 drop-shadow-2xl"
            />
          </div>
        </div> */}
          <h1 className="font-secondary text-2xl md:text-4xl text-center font-bold text-[var(--color-dark)] leading-snug mb-6">
            Offer <span className="text-[var(--color-primary)]">Chadhava</span> as per
            Vedic rituals at sacred temples across India
          </h1>
          <PageHeroSlider heroBanner={heroBanner} handlaRedirect={handlaRedirect} />
        </section>

        {/* 🕉️ Upcoming Chadhava Section */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h2 className="font-secondary text-3xl md:text-4xl font-extrabold text-[var(--color-dark)] mb-4">
              Upcoming <span className="text-[var(--color-primary)]">Chadhava Offerings</span>
            </h2>
            <p className=" text-lg text-[var(--color-dark)] max-w-2xl mx-auto">
              Participate in auspicious Chadhava ceremonies organized at holy
              temples. Each offering is conducted by priests according to Vedic
              traditions.
            </p>
          </div>

          {/* 🪔 Cards Grid */}
          <div className="">
            {chadhavaCard?.length ? (
              <ChadhavaCard
                handlaRedirect={handlaRedirect}
                withLang={withLang}
                chadhava={chadhavaCard}
                viewmore={false}
              />
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No upcoming Chadhava available right now.
              </p>
            )}
          </div>

          {/* 🌼 View More Button */}
          {chadhavaCard?.length > 6 && (
            <div className="text-center mt-10">
              <button
                onClick={() => router.push(withLang("/chadhava/all"))}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                View All Offerings →
              </button>
            </div>
          )}
        </section>

        {/* ✨ Decorative Bottom Divider */}
        <div className="h-1 bg-gradient-to-r from-orange-400 via-yellow-400 to-green-500"></div>
      </Container>
    </main>
  );
};

export default ChadhavaPage;
