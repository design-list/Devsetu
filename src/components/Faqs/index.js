'use client'

import React, { useState } from 'react'

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
                        className="border rounded-lg p-3 bg-white shadow-sm"
                    >
                        <button
                            onClick={() => toggleFaq(faq.id)}
                            className="w-full text-left font-medium text-gray-800 cursor-pointer"
                        >
                            {faq.question}
                        </button>
                        {openFaqIndex === faq.id && (
                            <p className="mt-2 text-gray-700">{faq.answer}</p>
                        )}
                        <button className='bg-green-600 cursor-pointer rounded p-2 mx-1 text-white' onClick={() => handleEdit(faq.id)}>Edit</button>
                        <button className='bg-red-600 cursor-pointer rounded p-2 mx-1 text-white' onClick={() => handleDelete(faq)}>Delete</button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default FAQs;