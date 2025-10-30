"use client";

import Container from "@/components/Container";
import LazyImage from "@/components/Atom/LazyImage";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Plus, Minus, IndianRupee, HelpCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchChadhavaWebDetailAction } from "@/redux/actions/chadhavaAction";
import Breadcrumbs from "@/components/Breadcrumbs";
import ChadhavaDetailHeroSlider from "@/components/HeroBanner/ChadhavaDetailHeroSlider";
import PageLaoder from "@/components/Atom/loader/pageLaoder";
import {
  addOfferingAction,
  addPackageAction,
  updateOfferingCountAction,
} from "@/redux/actions/cartActions";
import { useWithLang } from "../../../../../../helper/useWithLang";
import OfferingModal from "@/components/OfferingModal";

const ChadhavaDetailsPage = () => {
  const params = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const router = useRouter();
  const withLang = useWithLang();

  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOffering, setSelectedOffering] = useState(false);

  const { chadhavaWebDetail } = useSelector((state) => state.chadhavas);
  const { allCarts } = useSelector((state) => state.cart);
  const { isLoading } = useSelector((state) => state.loader);

  useEffect(() => {
    const { slugs } = params;
    if (slugs) {
      dispatch(fetchChadhavaWebDetailAction(slugs));
    }
  }, [params]);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const hanldeAddChadhava = (item) => {
    dispatch(addOfferingAction(item));
  };

  const handleQuantityChange = (id, changeType) => {
    dispatch(updateOfferingCountAction(id, changeType));
  };

  const handlaRedirect = () => {
    const packageData = {
      type: "chadhava",
      productId: chadhavaWebDetail?.id,
      productTitle: chadhavaWebDetail?.title,
      productSlug: chadhavaWebDetail?.slug,
      productImg: chadhavaWebDetail?.["chadhavaBanners"]?.[0]?.image_url || "",
    };

    dispatch(addPackageAction(packageData));

    router.push(withLang(`/cart-review`));
  };

  const handleShowModal = (item) => {
    setShowModal(true);
    setSelectedOffering(item);
  };

  // console.log("chadhavaWebDetail", chadhavaWebDetail);

  if (isLoading) {
    return <PageLaoder />;
  }

  return (
    <div className="w-full">
      <Container>
        <Breadcrumbs pathname={pathname} />
        <div className="bg-white sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
          {/* Left: Image Slider */}
          <div className="w-full lg:w-[600px] flex-shrink-0 h-[220px] sm:h-[300px] md:h-[380px] lg:h-[420px] relative">
            <ChadhavaDetailHeroSlider
              heroSlides={chadhavaWebDetail?.["chadhavaBanners"]}
            />
          </div>

          {/* Right: Content */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-secondary text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-3 sm:mb-4">
              {chadhavaWebDetail?.["title"]}
            </h2>

            {chadhavaWebDetail?.["subTitle"] && (
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
                <span className="mr-2">🕉</span>
                {chadhavaWebDetail?.["subTitle"]}
              </p>
            )}

            <p className="text-base sm:text-lg md:text-xl text-[var(--color-dark)] text-left font-medium leading-relaxed mb-4 sm:mb-6">
              🌟{" "}
              <span className="font-bold">According to sacred scriptures</span>,
              {chadhavaWebDetail?.["pujaDetails"]}
            </p>

            {/* <p className="text-base sm:text-lg md:text-xl text-[var(--color-dark)] leading-snug">
      Till now{" "}
      <span className="font-secondary font-bold text-xl sm:text-2xl md:text-3xl text-[var(--color-primary)]">
        1,50,000+ Devotees
      </span>{" "}
      have participated in Chadava conducted by DevaSetu Chadava Seva.
    </p> */}
          </div>
        </div>

        {/* Content Sections */}
        <div className="md:p-6 md:max-w-5xl mx-auto space-y-16">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <h1 className="font-secondary text-3xl font-bold text-[var(--color-dark)] mb-6">
              Choose an offering
            </h1>

            {/* Offerings List */}
            <div className="space-y-6">
              {chadhavaWebDetail?.["chadhavaPackages"].map((item) => (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 md:gap-0 justify-between flex-col-reverse md:flex-row w-full md:w-auto rounded-lg border p-4 ${
                    item.highlight
                      ? "bg-gradient-to-r from-pink-50 to-white border-pink-300"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {/* Left Content */}
                  <div className="md:pr-4" onClick={() => handleShowModal(item)}>
                    {item.tags && (
                      <h2
                        className={`text-base font-medium ${
                          item.tags
                            ? "text-[var(--color-primary)]"
                            : "text-[var(--color-dark)]"
                        }`}
                      >
                        {item.tags}
                      </h2>
                    )}
                    <h2
                      className={`font-secondary text-xl font-bold text-[var(--color-dark)] }`}
                    >
                      {item.title}
                    </h2>
                    <p className="text-[var(--color-dark)] text-sm mt-1">
                      {item.description}
                    </p>
                    <p className=" flex items-center text-[var(--color-dark)] font-bold mt-2">
                      <IndianRupee size={16} />
                      {item.price}
                    </p>
                  </div>

                  {/* Right Image + Button */}
                  <div className="flex flex-row items-start justify-between md:justify-baseline md:flex-col md:items-center w-full">
                    <div
                      className="w-28 h-28 relative cursor-pointer"
                      onClick={() => handleShowModal(item)}
                    >
                      <LazyImage
                        src={item.packImg}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="rounded-md w-full h-full object-cover cursor-pointer"
                      />
                    </div>
                    {(() => {
                      const matchedAddOn = allCarts?.add_ons?.find(
                        (add) => add.id === item.id
                      );
                      if (matchedAddOn) {
                        return (
                          <div className="flex items-center border rounded-lg px-2 py-1 mt-4">
                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, "decrement")
                              }
                              className="text-gray-600 hover:text-black"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="mx-2 text-sm font-semibold">
                              {matchedAddOn.quantity ?? 1}
                            </span>

                            <button
                              onClick={() =>
                                handleQuantityChange(item.id, "increment")
                              }
                              className="text-gray-600 hover:text-black"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        );
                      }
                      return (
                        <button
                          onClick={() => hanldeAddChadhava(item)}
                          className=" cursor-pointer whitespace-nowrap mt-3 border border-[var(--color-primary)] text-[var(--color-primary)] px-3 py-1 rounded-lg hover:bg-green-50"
                        >
                          + Add
                        </button>
                      );
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <section className="bg-white rounded-2xl md:p-6">
            <h2 className="font-secondary text-3xl font-bold flex items-center gap-2 text-[var(--color-primary)] mb-4">
              <HelpCircle className="w-6 h-6" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {chadhavaWebDetail?.["chadhavaFaqs"]?.map((faq, i) => (
                <div
                  key={i}
                  className="border border-orange-100 rounded-xl p-3 bg-[#fffdf9]"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="font-secondary text-lg font-bold w-full text-left text-[var(--color-dark)] flex justify-between items-center"
                  >
                    {faq.question}
                    <span className="text-[var(--color-primary)] text-lg">
                      {openFaqIndex === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaqIndex === i && (
                    <p className="mt-2 text-gray-700">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-10">
          {/* Add to Cart Button */}
          {allCarts?.["add_ons"].length > 0 && (
            <div className="fixed w-full left-0 bottom-0 bg-[var(--color-primary-light)] rounded text-white border-t shadow-md p-4 flex justify-between md:justify-center items-center">
              <div>
                <p className=" text-base md:text-xl font-medium uppercase">{`${allCarts?.["add_ons"].length} Offerings ₹${allCarts?.["grand_total"]}`}</p>
              </div>
              <button
                className=" absolute right-0 bg-[var(--color-primary-light)] text-white px-5 py-2 rounded-lg hover:bg-[var(--color-primary)] cursor-pointer"
                onClick={handlaRedirect}
              >
                Cart Review →
              </button>
            </div>
          )}
        </div>

        <OfferingModal
          show={showModal}
          onClose={() => setShowModal(false)}
          selectedOffering={selectedOffering}
          allCarts={allCarts}
          handleQuantityChange={handleQuantityChange}
          onAdd={hanldeAddChadhava}
        />
      </Container>
    </div>
  );
};

export default ChadhavaDetailsPage;
