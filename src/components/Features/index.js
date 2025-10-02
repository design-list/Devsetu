import LazyImage from "../Atom/LazyImage";

const Features = ({ features }) => {
    return (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-20">
            {features.map((f, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6">
                    <LazyImage src={f.src} width={65} height={65} />
                    <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                    <p className="text-sm text-gray-600">{f.desc}</p>
                </div>
            ))}
        </div>

    );
};

export default Features;
