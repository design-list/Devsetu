import { CheckCircle, Plus } from 'lucide-react';
import React from 'react'

const offeringCard = ({ Offerings, handleAddOtherOffers }) => {
    return (
        <div className="grid grid-cols-1 gap-8 max-w-5xl m-auto">
            {Offerings?.map((off) => {
                const isAdded = allCarts?.add_ons?.some((add) => add.id === off.id);
                const hasTags = off.tags && off.tags.trim() !== "";

                return (
                    <div
                        key={off.id}
                        className={`group rounded-2xl p-5 shadow-sm border transition-all duration-300 relative overflow-hidden 
                        ${hasTags ? "bg-yellow-50 border-yellow-400 shadow-md" : "bg-white border-gray-100 hover:shadow-lg"}`}
                    >

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-[var(--color-primary)] to-yellow-400 transition-all duration-300 rounded-2xl"></div>

                        <div className="flex gap-4 items-start">
                            <div className="flex-1">
                                {hasTags && (
                                    <span className="inline-block bg-yellow-500 text-white text-xs font-semibold px-3 mb-2 py-1 rounded-full shadow">
                                        {off.tags}
                                    </span>
                                )}
                                <h4 className="font-semibold text-[var(--color-dark)] text-base md:text-xl leading-tight">
                                    {off.title}
                                </h4>
                                <p className="text-[var(--color-dark)] text-sm md:text-base mt-2 line-clamp-4 leading-snug">
                                    {off.description}
                                </p>
                            </div>
                            <div className="w-20 md:w-28 h-20 md:h-28 rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                                <LazyImage
                                    src={off.offerimg}
                                    alt={off.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-secondary text-lg md:text-2xl text-[var(--color-primary)] font-bold mt-2 md:mt-0">
                                ₹{off.price}
                            </span>

                            {isAdded ? (
                                <button className="md:-mt-[24px] mr-2 md:mr-[20px] border border-green-400 text-green-600 text-xs md:text-sm px-1 py-1 rounded-md flex items-center gap-1 bg-green-50 font-normal cursor-default">
                                    <CheckCircle size={14} /> Added
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAddOtherOffers(off)}
                                    className="md:-mt-[24px] mr-2 md:mr-[20px] cursor-pointer border border-[var(--color-primary-light)] text-[var(--color-primary)] text-xs md:text-sm px-3 py-1.5 rounded-md flex items-center gap-1 bg-orange-50 font-medium hover:bg-orange-50 transition-all z-10"
                                >
                                    <Plus size={14} /> Add
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default offeringCard;