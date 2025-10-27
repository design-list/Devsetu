"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchWithWait } from "../../../../../helper/method";

import Api from "../../../../../services/fetchApi";
import LazyImage from "@/components/Atom/LazyImage";

const api = new Api()

const ChalisaPage = () => {

  const [chalisa, setChalisa] = useState([]);

  const router = useRouter();


  useEffect(() => {
    api.GetAllChalisa()
      .then((res) => {
        console.log("Chalisa fetched:", res);
        if (res.status === 200) {
          setChalisa(res.data);
        } else {
          alert(res.error || "Something went wrong");
        }
      })
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/chalisa/${id}`)
  };



  const handleDelete = (id) => {
    api.DeleteChalisa(id)
      .then((res) => {
        if (res.status === 200) {
          alert("Chalisa deleted successfully!");
          api.GetAllChalisa()
            .then((res) => {
              if (res.status === 200) {
                setChalisa(res.data);
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
                <th className="p-2 border">About Chalisa</th>
                <th className="p-2 border">Opening Doha</th>
                <th className="p-2 border">Chaupai</th>
                <th className="p-2 border">Closeing Doha</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {chalisa?.map((item) => (
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
                  <td className="p-2 border whitespace-nowrap">{item.openingDoha}</td>
                  <td className="p-2 border whitespace-nowrap">{item.chaupai}</td>
                  <td className="p-2 border whitespace-nowrap">{item.closeDoha}</td>
                  

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


export default ChalisaPage;