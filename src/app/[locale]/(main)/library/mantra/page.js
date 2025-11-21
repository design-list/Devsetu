"use client";

import LazyImage from "@/components/Atom/LazyImage";
import Link from "next/link";
import Api from "../../../../../../services/fetchApi";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useWithLang } from "../../../../../../helper/useWithLang";

const api = new Api();

const ArticleDetails = () => {

  const [articles, setArticles] = useState([]);
  const params = useParams();
  const router = useRouter();
  const withLang = useWithLang();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqData = { category: "mantra" };
        const res = await api.GetLibraryByCategory(reqData);

        if (res.status === 200) {
          console.log("Library Data:", res.data?.data);
          setArticles(res.data?.data || res.data);  // <-- FIXED
        }
      } catch (err) {
        console.error("Failed to fetch Library:", err);
      }
    };

    fetchData();
  }, [params]);

  // 🚀 Redirect function FIXED
const handlaRedirectArticle = (category, slug = "") => {
  let path = slug 
    ? `/library/${category}/${slug}`    // Single article page
    : `/library/${category}`;           // Category list page

  router.push(withLang(path));
};

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex flex-wrap gap-2">
          <li><Link href="/" className="hover:text-orange-600">Home</Link></li>
          <span>›</span>
          <li><Link href={withLang("/library")} className="hover:text-orange-600">Articles</Link></li>
          <span>›</span>
          <li className="text-gray-700 font-medium">mantra Collection</li>
        </ol>
      </nav>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">mantra Collection</h1>

      {/* List UI */}
      {/* List Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

        {articles?.length === 0 ? (
          <p className="text-gray-500 text-sm">Loading ...</p>
        ) : (
          articles.map((item, index) => (
            <div
              key={index}
              onClick={() => handlaRedirectArticle("mantra", item.slug)}
              className="flex items-center border gap-4 cursor-pointer hover:shadow-lg transition rounded-lg"
            >
              {/* Image */}
              <div className="w-[150px] h-[120px] overflow-hidden rounded-lg shadow">
                <LazyImage
                  src={item.icon}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Text Section */}
              <div className="flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Updated at{" "}
                  {new Date(item.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))
        )}

      </div>

    </main>
  );
};

export default ArticleDetails;
