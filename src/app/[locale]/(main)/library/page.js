"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Api from "../../../../../services/fetchApi";
import { useRouter } from "next/navigation";
import { useWithLang } from "../../../../../helper/useWithLang";

const api = new Api();

const Library = () => {

  const [allLibrary, setAllLibrary] = useState(null);

  const router = useRouter();

  const withLang = useWithLang();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.GetAllLibrary();

        if (res.status === 200) {
          console.log("Library Data:", res?.data?.data);
          setAllLibrary(res?.data);
        }
      } catch (error) {
        console.error("Failed to fetch Library:", error);
      }
    };

    fetchData();
  }, []);

  // console.log("allLibrary", allLibrary);

const handlaRedirectArticle = (category, slug = "") => {
  let path = slug 
    ? `/library/${category}/${slug}`    // Single article page
    : `/library/${category}`;           // Category list page

  router.push(withLang(path));
};



  return (
    <div className="bg-white text-gray-800">
      {/* Sub Nav */}
      <div className="px-6 py-3">
        <nav className="flex gap-6">
          <Link href="#" className="text-gray-600">
            Home
          </Link>
          <Link href="#" className="text-orange-600 font-semibold border-b-2 border-orange-600">
            Library
          </Link>
        </nav>
      </div>

      {/* Popular Topics */}
      <section className="px-6 py-8">
        <h2 className="text-lg font-semibold mb-4">See today&apos;s popular topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: "Aarti", count: allLibrary?.allAartis?.length, color: "bg-orange-50" },
            { title: "Chalisa Collection", count: allLibrary?.allChalisas?.length, color: "bg-orange-50" },
            { title: "Horoscope", count: allLibrary?.allHoroscopes?.length, color: "bg-orange-50" },
            { title: "Mantras", count: allLibrary?.allMantras?.length, color: "bg-orange-50" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`bg-orange-50 rounded-xl p-4 shadow-sm hover:shadow-md transition`}
            >
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.count} Article</p>
            </div>
          ))}
        </div>
        {/* <button className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700">
          See more popular topics →
        </button> */}
      </section>

      {/* Category Section Component */}
      {allLibrary ? (
        Object.entries(allLibrary).map(([key, value], idx) => {

          // Generate category slug
          const category = key
            .replace("all", "")
            .replace(/([A-Z])/g, " $1")
            .trim()
            .toLowerCase();

          return (
            <section key={idx} className="px-6 py-10">

              {/* Section header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {category.toUpperCase()}
                </h2>

                <button
                  className="px-3 py-1 bg-orange-500 text-white text-sm rounded-lg hover:bg-orange-600"
                  onClick={() => handlaRedirectArticle(category)}
                >
                  View more →
                </button>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {value?.length === 0 ? (
                  <p className="text-gray-500 text-sm">No items found</p>
                ) : (
                  value.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-xl border p-4 shadow-sm hover:shadow-md transition text-center bg-white cursor-pointer"
                      onClick={() => handlaRedirectArticle(category, item.slug)}
                    >
                      <img
                        src={item.icon}
                        className="h-28 w-full object-cover rounded-lg mb-2"
                        alt={item.title}
                      />
                      <p className="text-sm font-medium">{item.title}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          );
        })
      ) : (
        <div className="px-6 py-10 text-gray-500">Loading...</div>
      )}

    </div>
  );
}


export default Library;
