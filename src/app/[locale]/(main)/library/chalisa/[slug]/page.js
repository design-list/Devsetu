"use client";

import LazyImage from "@/components/Atom/LazyImage";
import Link from "next/link";
import Api from "../../../../../../../services/fetchApi";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useWithLang } from "../../../../../../../helper/useWithLang";

const api = new Api();


const ChalisaDetails = () => {

  const [article, setArticle] = useState(null);
  const params = useParams();
  const withLang = useWithLang();

useEffect(() => {
    const fetchData = async () => {
      try {

        const data = {
          category: "chalisa",
          slug: params.slug
        };

        const res = await api.GetLibraryBySlug(data);

        if (res.status === 200) {
          console.log("Library Data:", res?.data?.data);
          setArticle(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch Library:", error);
      }
    };

    fetchData();
  }, [params]);


  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <ol className="flex flex-wrap gap-1">
          <li><Link href="/" className="hover:text-orange-600">Home</Link></li>
          <span>›</span>
          <li><Link href={withLang("/library")} className="hover:text-orange-600">Library</Link></li>
          <span>›</span>
          <li><span className="text-gray-700 font-medium">{article?.title}</span></li>
        </ol>
      </nav>

      {/* Thumbnail */}
      <div className="py-4 mb-8">
        <img
          src={article?.icon}
          alt={article?.title}
          className="w-full h-120 object-cover rounded-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{article?.title}</h1>

      {/* About Article? */}
      <p className="text-lg text-gray-700 mb-6 whitespace-pre-line">
        {article?.aboutArticle}
      </p>

      {/* Opening Doha */}
      {article?.openingDoha && (
        <>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Opening Doha</h2>
          <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
            {article?.openingDoha}
          </p>
        </>
      )}

      {/* Chalisa / Mantra / Content */}
      {article?.chaupai && (
        <>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Chalisa</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
            {article?.chaupai}
          </p>
        </>
      )}

      {/* Closing Doha */}
      {article?.closeDoha && (
        <>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Closing Doha</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {article?.closeDoha}
          </p>
        </>
      )}

      {/* Footer Info */}
      <div className="mt-10 text-sm text-gray-500">
        Published by <span className="font-semibold text-gray-700">DevaSetu</span> ·{" "}
        {new Date(article?.createdAt).toLocaleDateString("en-GB")}
      </div>

      {/* Share Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <button className="px-3 py-2 bg-orange-500 text-white text-sm rounded-lg shadow hover:bg-orange-600">
          Share
        </button>
        <button className="px-3 py-2 bg-green-500 text-white text-sm rounded-lg shadow hover:bg-green-600">
          WhatsApp
        </button>
      </div>
    </main>
  );
}


export default ChalisaDetails;