"use client";

import { deleteChadhavaAction, requestChadhavaAction } from "@/redux/actions/chadhavaAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchWithWait } from "../../../../../helper/method";

export default function PujasPage() {
  const [packages, setPackages] = useState(null);
  const [offering, setOffering] = useState(null);
  const [faqs, setFAQs] = useState(null);
  const [images, setImages] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const { allChadhava } = useSelector((state) => state.chadhavas);

  useEffect(() => {
    dispatch(requestChadhavaAction());
  }, [dispatch]);

  const handleEdit = (id) => {
    router.push(`/admin/chadhava/${id}`)
  };

  const handleMouseOver = (value, data) => {
    if (value === "Packeges") setPackages(data);
    else if (value === "Offerings") setOffering(data);
    else if (value === "Faqs") setFAQs(data);
    else if (value === "Images") setImages(data);
  };


  const handleDelete = (id) => {
    console.log("handleDelete", id)
      fetchWithWait({ dispatch, action: deleteChadhavaAction({"id": id}) }).then((res) => {
        console.log("Response:", res);
        if (res.status === 200) {
          alert(res.message)
          dispatch(requestChadhavaAction());
        } else {
          console.log("Error:", res.error);
          alert(res.error)
        }
      }).catch((e) => {
        console.log(`error`, e)
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
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Slug</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Special Day</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Puja Details</th>
                <th className="p-2 border">Temple History</th>
                <th className="p-2 border">Packages</th>
                <th className="p-2 border">Offerings</th>
                <th className="p-2 border">FAQs</th>
                <th className="p-2 border">Banners</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {allChadhava?.map((chadhava) => (
                <tr
                  key={chadhava.id}
                  className="text-center border hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  <td className="p-2 border whitespace-nowrap">{chadhava.title}</td>
                  <td className="p-2 border whitespace-nowrap">{chadhava.slug}</td>
                  <td className="p-2 border">{chadhava.date}</td>
                  <td className="p-2 border">
                    {chadhava.ratingValue} ({chadhava.ratingReviews})
                  </td>
                  <td className="p-2 border">{chadhava.specialDay}</td>
                  <td className="p-2 border whitespace-nowrap">{chadhava.location}</td>
                  <td className="p-2 border max-w-xs truncate">
                    {chadhava.pujaDetails}
                  </td>
                  <td className="p-2 border max-w-xs truncate">
                    {chadhava.templeHistory}
                  </td>
                  <td
                    className="p-2 border cursor-pointer text-blue-600"
                    onMouseOver={() =>
                      handleMouseOver("Packeges", chadhava.chadhavaPackages)
                    }
                    onMouseLeave={() => setPackages(null)}
                  >
                    Packages
                  </td>
                  <td
                    className="p-2 border cursor-pointer text-blue-600"
                    onMouseOver={() =>
                      handleMouseOver("Offerings", chadhava.chadhavaOfferings)
                    }
                    onMouseLeave={() => setOffering(null)}
                  >
                    Offerings
                  </td>
                  <td
                    className="p-2 border cursor-pointer text-blue-600"
                    onMouseOver={() => handleMouseOver("Faqs", chadhava.chadhavaFaqs)}
                    onMouseLeave={() => setFAQs(null)}
                  >
                    FAQs
                  </td>
                  <td
                    className="p-2 border cursor-pointer text-blue-600"
                    onMouseOver={() => handleMouseOver("Images", chadhava.chadhavaImages)}
                    onMouseLeave={() => setImages(null)}
                  >
                    Images
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
                      onClick={() => handleEdit(chadhava.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
                      onClick={() => handleDelete(chadhava.id)}
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

      {/* {packages && (
        <div className="absolute top-10 left-10 bg-white shadow-lg border rounded p-4 z-50">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-green-500">
                <th className="p-2 border">id</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Package Type</th>
                <th className="p-2 border">Package Price</th>
              </tr>
            </thead>
            <tbody>
              {packages?.map((pack) => (
                <tr key={pack.id} className="text-center border">
                  <td className="p-2 border">{pack.id}</td>
                  <td className="p-2 border">
                    {pack.packImg ? (
                      <img
                        src={pack.packImg}
                        alt="package"
                        className="w-16 h-16 object-cover mx-auto"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="p-2 border">{pack.packageType}</td>
                  <td className="p-2 border">{pack.packagePrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}


    </div>
  );
}
