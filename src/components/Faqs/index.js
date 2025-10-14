'use client'

import React, { useState } from 'react'
import { Trash,SquarePen } from "lucide-react";

const FAQs = ({ faqs, heading, handleDelete, handleEdit }) => {

    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div>
            {heading &&<h2 className="text-xl font-semibold mb-3">{heading}</h2>}
            <div className="space-y-3">
                {faqs?.map((faq) => {
                    return <div
                        key={faq.id}
                        className="relative border rounded-lg p-3 bg-white shadow-sm"
                    >
                        <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full text-left font-medium text-gray-800 cursor-pointer"
                        >
                            {faq.question}
                        </button>
                        {openFaqIndex === faq.id && (
                            <p className="mt-2 text-gray-700"><hr />{faq.answer}</p>
                        )}
                        <div className='absolute right-2 top-2'>
                            <button className='bg-green-600 cursor-pointer rounded p-1 mx-1 text-white' onClick={() => handleEdit(faq)}><SquarePen width={18} hanging={18} /></button>
                            <button className='bg-red-600 cursor-pointer rounded p-1 mx-1 text-white' onClick={() => handleDelete(faq)}><Trash width={18} hanging={18} /></button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default FAQs;