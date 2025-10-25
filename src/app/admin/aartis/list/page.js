"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchWithWait } from "../../../../../helper/method";

import Api from "../../../../../services/fetchApi";
import LazyImage from "@/components/Atom/LazyImage";

const api = new Api()

export default function PujasPage() {

  const [aartis, setAartis] = useState([]);

  const router = useRouter();


  useEffect(() => {
    api.GetAllAartis()
      .then((res) => {
        console.log("Aartis fetched:", res);
        if (res.status === 200) {
          setAartis(res.data);
        } else {
          alert(res.error || "Something went wrong");
        }
      })
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/aartis/${id}`)
  };



  const handleDelete = (id) => {
    api.DeleteAartis(id)
      .then((res) => {
        if (res.status === 200) {
          alert("Aarti deleted successfully!");
          api.GetAllAartis()
            .then((res) => {
              if (res.status === 200) {
                setAartis(res.data);
              }
            })
        } else {
          alert(res.message || "Something went wrong!");
        }
      })
  };


  return (
    <div className="flex-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
      {/* Page Content */}
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm md:text-base">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Slug</th>
                <th className="p-2 border">About Aarti</th>
                <th className="p-2 border">Aarti Content</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {aartis?.map((item) => (
                <tr
                  key={item.id}
                  className="text-left border hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  <td className="p-2 border whitespace-nowrap">{item.id}</td>
                  <td className="p-2 border cursor-pointer text-blue-600">
                    <LazyImage src={item.icon} alt={item.title} width={50} height={50} className="w-12 h-12 object-cover mx-auto" />
                  </td>
                  <td className="p-2 border whitespace-nowrap">{item.title}</td>
                  <td className="p-2 border whitespace-nowrap">{item.slug}</td>
                  <td className="p-2 border whitespace-nowrap">{item.aboutArticle}</td>
                  <td className="p-2 border whitespace-nowrap">{item.aartis}</td>
                  

                  <td className="p-2 border space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
