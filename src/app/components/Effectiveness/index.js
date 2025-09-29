"use client";
import LazyImage from "../atom/LazyImage";
import Iframe from "../atom/Iframe";

const Effectiveness = () => {
    return (

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 px-4">
            <Iframe width={'150'} height={'150'} />
            {
                [1, 2, 3,].map((items, index) => {
                    return <div key={index} className="relative w-64 h-40">
                        <LazyImage width={300} height={250} alt="Video1" className="rounded-lg object-cover" />
                    </div>
                })
            }
        </div>
    );
};

export default Effectiveness;
