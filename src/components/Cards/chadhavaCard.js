import React from 'react'
import LazyImage from '../Atom/LazyImage';

function ChadhavaCard({cards}) {
  return (
    <>
        {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <LazyImage
                 src={card.img || "/images/herobanner.webp"}
                  alt={card.title}
                  width={400}
                  height={320}
                  className="w-full h-full object-cover"
              />
              <h2 className="text-xl font-semibold mt-3 text-gray-800">
                {card.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2 flex-grow">{card.desc}</p>
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
                Book Your Chadhava
              </button>
            </div>
          ))}
    </>
  )
}

export default ChadhavaCard;