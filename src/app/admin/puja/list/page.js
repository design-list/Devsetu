"use client";

import { deletePujaAction, requestPujaDataAction, updatePujaAction } from "@/redux/actions/pujaActions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash,SquarePen } from "lucide-react";
import { fetchWithWait } from "../../../../../helper/method";
import { useRouter } from "next/navigation";
import Api from "../../../../../services/fetchApi";

const api = new Api()

export default function PujasPage() {
  const [packages, setPackages] = useState(null);
  const [offering, setOffering] = useState(null);
  const [faqs, setFAQs] = useState(null);
  const [images, setImages] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const { allPuja } = useSelector((state) => state.pujas);

  useEffect(() => {
    dispatch(requestPujaDataAction());
  }, []);

  const handleEdit = (id) => {
    router.push(`/admin/puja/${id}`)
  };

  const handleMouseOver = (value, data) => {
    if (value === "Packeges") setPackages(data);
    else if (value === "Offerings") setOffering(data);
    else if (value === "Faqs") setFAQs(data);
    else if (value === "Images") setImages(data);
  };


  const handleDelete = (id) => {
      fetchWithWait({ dispatch, action: deletePujaAction({"id": id}) }).then((res) => {
        if (res.status === 200) {
          alert(res.message)
          dispatch(requestPujaDataAction());
        } else {
          console.log("Error:", res.error);
          alert(res.error)
        }
      }).catch((e) => {
        console.log(`error`, e)
      })
    };

    const handleToggle = (id, field, currentValue) => {
      const payload = {
        id,
        field,
        value: !currentValue,
      };
  
      api.UpdetePujaFlags(payload)
        .then((res) => {
          if (res.status === 200) {
            dispatch(requestPujaDataAction());
          } else {
            alert(res.error || "Something went wrong");
          }
        })
        .catch((e) => {
          console.error("Toggle error:", e);
        });
    };
    

  return (
    <div className="flex-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
      {/* Page Content */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm md:text-base">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Sub Title</th>
                <th className="p-2 border">Slug</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Rating</th>
                <th className="p-2 border">Special Day</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Puja Details</th>
                <th className="p-2 border">Common-Packages</th>
                <th className="p-2 border">Common-Offerings</th>
                <th className="p-2 border">Common-Faqs</th>
                <th className="p-2 border">Is Active</th>
                <th className="p-2 border">Active on home</th>
                <th className="p-2 border">Packages</th>
                <th className="p-2 border">Offerings</th>
                <th className="p-2 border">FAQs</th>
                <th className="p-2 border">Banners</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(allPuja)&&allPuja?.map((puja) => (
                <tr
                  key={puja.id}
                  className="text-center border hover:bg-gray-50 hover:text-blue-600 transition"
                >
                  <td className="p-2 border whitespace-nowrap">{puja.id}</td>
                  <td className="p-2 border whitespace-nowrap">{puja.title}</td>
                  <td className="p-2 border whitespace-nowrap">{puja.subTitle}</td>
                  <td className="p-2 border whitespace-nowrap">{puja.slug}</td>
                  <td className="p-2 border">{puja.date}</td>
                  <td className="p-2 border">
                    {puja.ratingValue} ({puja.ratingReviews})
                  </td>
                  <td className="p-2 border">{puja.specialDay}</td>
                  <td className="p-2 border whitespace-nowrap">{puja.location}</td>
                  <td className="p-2 border max-w-xs truncate">
                    {puja.pujaDetails}
                  </td>

                  <td className="p-2 border max-w-xs truncate">
                    <button
                      type="button"
                      onClick={() => handleToggle(puja.id, "commonPack", puja.commonPack)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${puja.commonPack ? "bg-green-600" : "bg-gray-600"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${puja.commonPack ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </td>

                  <td className="p-2 border max-w-xs truncate">
                    <button
                      type="button"
                      onClick={() => handleToggle(puja.id, "commonOffer", puja.commonOffer)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${puja.commonOffer ? "bg-green-600" : "bg-gray-600"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${puja.commonOffer ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </td>

                  <td className="p-2 border max-w-xs truncate">
                    <button
                      type="button"
                      onClick={() => handleToggle(puja.id, "commonFaqs", puja.commonFaqs)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${puja.commonFaqs ? "bg-green-600" : "bg-gray-600"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${puja.commonFaqs ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </td>

                 <td className="p-2 border max-w-xs truncate">
                    <button
                      type="button"
                      onClick={() => handleToggle(puja.id, "isActive", puja.isActive)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${puja.isActive ? "bg-green-600" : "bg-gray-600"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${puja.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </td>

                  <td className="p-2 border max-w-xs truncate">
                    <button
                      type="button"
                      onClick={() => handleToggle(puja.id, "isActiveOnHome", puja.isActiveOnHome)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${puja.isActiveOnHome ? "bg-green-600" : "bg-gray-600"
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${puja.isActiveOnHome ? "translate-x-6" : "translate-x-1"
                          }`}
                      />
                    </button>
                  </td>
                  
                  <td
                    className="p-2 border cursor-pointer text-blue-600"
                    onMouseOver={() =>
                      handleMouseOver("Packeges", puja.pujaPackages)
                    }
                    onMouseLeave={() => setPackages(null)}
                  >
                    Packages
                  </td>
                  <td
                    className="p-2 border cursor-pointer text-blue-600"
                    onMouseOver={() =>
                      handleMouseOver("Offerings", puja.pujaOfferings)
                    }
                    onMouseLeave={() => setOffering(null)}
                  >
                    Offerings
                  </td>
                  <td
                    className="p-2 border cursor-pointer text-blue-600"
                    onMouseOver={() => handleMouseOver("Faqs", puja.pujaFaqs)}
                    onMouseLeave={() => setFAQs(null)}
                  >
                    FAQs
                  </td>
                  <td
                    className="p-2 border cursor-pointer text-blue-600"
                    onMouseOver={() => handleMouseOver("Images", puja.pujaImages)}
                    onMouseLeave={() => setImages(null)}
                  >
                    Images
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
                      onClick={() => handleEdit(puja.id)}
                    >
                      <SquarePen width={18} hanging={18} />
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm cursor-pointer"
                      onClick={() => handleDelete(puja.id)}
                    >
                      <Trash width={18} hanging={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
