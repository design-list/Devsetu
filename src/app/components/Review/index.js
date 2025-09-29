
const Reviews = ({ reviews }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-20">
            {reviews.map((r, idx) => (
                <div key={idx} className="bg-white shadow-md rounded-xl p-6">
                    <p className="text-gray-700 italic mb-4">“{r.text}”</p>
                    <h4 className="font-semibold">{r.name}</h4>
                    <p className="text-sm text-gray-500">{r.city}</p>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
