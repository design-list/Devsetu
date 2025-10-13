import Link from "next/link";
import LazyImage from "../Atom/LazyImage";

const Chalisa = ({chalisaItems}) => {
    return (

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-20">
            {chalisaItems.map((c, idx) => (
                <div key={idx} className="bg-gray-50 shadow-md rounded-xl p-6 hover:shadow-lg transition">
                    <LazyImage src={c.src} />
                    <h3 className="font-bold text-lg mb-2">{c.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{c.desc}</p>
                    <Link href="#" className="text-orange-600 font-medium text-sm">
                        Read All →
                    </Link>
                </div>
            ))}
        </div>

    );
};

export default Chalisa;
