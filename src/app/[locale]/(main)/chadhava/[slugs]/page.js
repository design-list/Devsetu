"use client";

import Container from "@/components/Container";
import LazyImage from "@/components/Atom/LazyImage";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchChadhavaWebDetailAction } from "@/redux/actions/chadhavaAction";
import Breadcrumbs from "@/components/Breadcrumbs";
import ChadhavaDetailHeroSlider from "@/components/HeroBanner/ChadhavaDetailHeroSlider";
import PageLaoder from "@/components/Atom/loader/pageLaoder";
import { addOfferingAction, updateOfferingCountAction } from "@/redux/actions/cartActions";
import { useWithLang } from "../../../../../../helper/useWithLang";



const ChadhavaDetailsPage = () => {

    const params = useParams();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const router = useRouter();
    const withLang = useWithLang();

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const { chadhavaWebDetail } = useSelector((state) => state.chadhavas);
    const { allCarts } = useSelector((state) => state.cart)
    const { isLoading } = useSelector((state) => state.loader)

    useEffect(() => {
        const { slugs } = params
        if (slugs) {
            dispatch(fetchChadhavaWebDetailAction(slugs))
        }
    }, [params])



    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    const hanldeAddChadhava = (item) => {
        dispatch(addOfferingAction(item))
    }

    const handleQuantityChange = (id, changeType) => {
        dispatch(updateOfferingCountAction(id, changeType))
    }

    const handlaRedirect = () => {
        router.push(withLang(`/puja-cart`))
    }

    console.log("allCarts", allCarts)

    if(isLoading){
        return<PageLaoder />
    }

    return (
        <div className="w-full font-sans">
            <Breadcrumbs pathname={pathname} />
            <Container>
                <div className="bg-gray-50 p-4 lg:p-8 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 w-[600px] h-[400px] relative">
                        <ChadhavaDetailHeroSlider heroSlides={chadhavaWebDetail?.['chadhavaBanners']} />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            {chadhavaWebDetail?.['title']}
                        </h2>
                        { chadhavaWebDetail?.['subTitle'] && <p className="text-gray-600 mb-3">
                            <span className="mr-2">🕉</span>
                            {chadhavaWebDetail?.['subTitle']}
                        </p>}

                        <p className="text-gray-700 font-medium mb-4">
                            🌟 <span className="font-bold">According to sacred scriptures</span>,
                           {chadhavaWebDetail?.['pujaDetails']}
                            {/* <a href="#" className="text-blue-600 underline ml-1">Read more</a> */}
                        </p>

                        {/* People Avatars + Count */}
                        <div className="flex items-center mb-2">
                            <div className="flex -space-x-3">
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                                <LazyImage src="/images/couple.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                                <LazyImage src="/images/couple.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                                <LazyImage src="/images/individual.webp" alt="devotee" width={35} height={35} className="rounded-full border-2 border-white" />
                            </div>
                        </div>

                        <p className="text-gray-700">
                            Till now <span className="text-orange-600 font-bold">1,50,000+ Devotees</span> have participated in Chadava
                            conducted by Sri Mandir Chadava Seva.
                        </p>

                    </div>
                </div>



                {/* Content Sections */}
                <div className="p-6 max-w-5xl mx-auto space-y-16">
                    <div className="max-w-5xl mx-auto">
                        {/* Title */}
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Choose an offering</h1>

                        {/* Offerings List */}
                        <div className="space-y-6">
                            {chadhavaWebDetail?.['chadhavaPackages'].map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex items-start justify-between rounded-lg border p-4 ${item.highlight
                                        ? "bg-gradient-to-r from-pink-50 to-white border-pink-300"
                                        : "bg-white border-gray-200"
                                        }`}
                                >
                                    {/* Left Content */}
                                    <div className="pr-4">
                                        {item.tags && <h2
                                            className={`text-lg font-semibold ${item.tags ? "text-pink-600" : "text-gray-800"
                                                }`}
                                        >
                                            {item.tags}
                                        </h2>}
                                        <h2 className={`text-lg font-semibold text-gray-800 }`} >
                                            {item.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                        <p className="text-green-600 font-bold mt-2">{item.price}</p>
                                    </div>

                                    {/* Right Image + Button */}
                                    <div className="flex flex-col items-center">
                                        <LazyImage
                                            src={item.packImg}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            className="rounded-md object-cover"
                                        />
                                    {(() => {
                                        // current item का add_on entry खोजो
                                        const matchedAddOn = allCarts?.add_ons?.find(add => add.id === item.id);

                                        // अगर मिला तो quantity वाला UI दिखाओ
                                        if (matchedAddOn) {
                                            return (
                                            <div className="flex items-center border rounded-lg px-2 py-1">
                                                <button
                                                onClick={() => handleQuantityChange(item.id, "decrement")}
                                                className="text-gray-600 hover:text-black"
                                                >
                                                <Minus size={14} />
                                                </button>

                                                <span className="mx-2 text-sm font-semibold">
                                                {matchedAddOn.quantity ?? 1}
                                                </span>

                                                <button
                                                onClick={() => handleQuantityChange(item.id, "increment")}
                                                className="text-gray-600 hover:text-black"
                                                >
                                                <Plus size={14} />
                                                </button>
                                            </div>
                                            );
                                        }

                                        // अगर नहीं मिला तो +Add button दिखाओ
                                        return (
                                            <button
                                            onClick={() => hanldeAddChadhava(item)}
                                            className="mt-3 border border-green-600 text-green-600 px-3 py-1 rounded-lg hover:bg-green-50"
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
                    <section>
                        <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>
                        <div className="space-y-3">
                            {chadhavaWebDetail?.["chadhavaFaqs"]?.map((faq, i) => (
                                <div
                                    key={i}
                                    className="border rounded-lg p-3 bg-white shadow-sm"
                                >
                                    <button
                                        onClick={() => toggleFaq(i)}
                                        className="w-full text-left font-medium text-gray-800 cursor-pointer"
                                    >
                                        {faq.question}
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
                        <div className="sticky bottom-0 bg-green-600 rounded text-white border-t shadow-md p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{`${allCarts?.["add_ons"].length} : Offerings . ₹ ${allCarts?.['grand_total']}`}</p>
                            </div>
                            <button
                                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
                                onClick={handlaRedirect}
                            >
                                Cart Review →
                            </button>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default ChadhavaDetailsPage;