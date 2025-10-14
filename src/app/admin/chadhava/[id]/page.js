"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { useParams, useRouter } from "next/navigation";
import { fetchWithWait } from "../../../../../helper/method";
import { fetchChadhavaDetailAction, updateChadhavaAction, requestChadhavaAction } from "@/redux/actions/chadhavaAction";

import Api from "../../../../../services/fetchApi";

const api = new Api()

const EditChadhavaForm = () => {

  // const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    slug: "",
    ratingValue: "",
    ratingReviews: "",
    specialDay: "",
    location: "",
    date: new Date(),
    pujaDetails: "",
    templeHistory: "",
    isActive: true,
    isActiveOnHome: false,
    isRecommended: false,
    commonFaqs: true,
    isActivePandit: false,
    packages: [{ packImg: "", title: "", description: "", price: "", currency: "INR", tags: "" }],
    recommendedChadawa: [{ recommendedImg: "", status: "", title: "", location: "", date: new Date(), price: "", currency: "INR" }],
    faqs: [{ icon: null, title: "", description: "" }],
    banners: [{imgUrl: null, type: "", position: 0}],
    pujaPerformedBy: { name: "", temple: "", pujaPerformerImg: "", bio: "" },
  });

  const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const params = useParams();

  const { chadhavaDetail } = useSelector((state) => state.chadhavas);



  const dispatch = useDispatch();
  const router = useRouter();
  // const { pujaData } = useSelector((state) => state.puja);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.title),
    }));
  }, [formData?.title]);


  useEffect(() => {
    if (params?.id) {
      dispatch(fetchChadhavaDetailAction(params.id));
    }
  }, [params?.id]);

  useEffect(() => {
    if (chadhavaDetail) {
      setFormData({
        id : params.id,
        title: chadhavaDetail.title || "",
        subTitle: chadhavaDetail.subTitle || "",
        slug: chadhavaDetail.slug || "",
        ratingValue: chadhavaDetail.ratingValue || "",
        ratingReviews: chadhavaDetail.ratingReviews || "",
        specialDay: chadhavaDetail.specialDay || "",
        location: chadhavaDetail.location || "",
        date: chadhavaDetail.date ? new Date(chadhavaDetail.date) : new Date(),
        pujaDetails: chadhavaDetail.pujaDetails || "",
        templeHistory: chadhavaDetail.templeHistory || "",
        isActive: chadhavaDetail.isActive,
        isActiveOnHome: chadhavaDetail.isActiveOnHome,
        isRecommended: chadhavaDetail.isRecommended,
        isActivePandit: chadhavaDetail.isActivePandit,
        commonFaqs: chadhavaDetail.commonFaqs,

        // Banners
        banners: chadhavaDetail.chadhavaBanners
          ? chadhavaDetail.chadhavaBanners.map((b) => ({
              imgUrl: b.image_url || "",
              type: b.type || "",
              position: b.position || ""
          }))
          : [{imgUrl: null, type: "", position: 0}],

        // Packages
        packages: chadhavaDetail.chadhavaPackages
          ? chadhavaDetail.chadhavaPackages.map((p) => ({
            packImg: p.packImg || "",
            title: p.title || "",
            description: p.description || "",
            price: p.price || "",
            currency: p.currency || "INR",
            tags: p.tags || "",
          }))
          : [{ packImg: "", title: "", description: "", price: "", currency: "INR", tags: "" }],

        // Recommended Chadawas
        recommendedChadawa: chadhavaDetail.isRecommended && chadhavaDetail.recommendedChadawas
          ? chadhavaDetail.recommendedChadawas.map((r) => ({
            recommendedImg: r.recommendedImg || "",
            title: r.title || "",
            status: r.status || "",
            location: r.location || "",
            date: r.date ? new Date(r.date) : new Date(),
            price: r.price || "",
            currency: r.currency || "INR",
          }))
          : [{ recommendedImg: "", status: "", title: "", location: "", date: new Date(), price: "", currency: "INR" }],

        // FAQs
        faqs: !chadhavaDetail.commonFaqs && chadhavaDetail.chadhavaFaqs
          ? chadhavaDetail.chadhavaFaqs.map((f) => ({
            icon: f.icon || "",
            title: f.question || "",
            description: f.answer || "",
          }))
          : [{ icon: "", title: "", description: "" }],

        // Puja Performed By (assuming only one record)
        pujaPerformedBy: chadhavaDetail.isActivePandit && chadhavaDetail.pujaPerformeds?.[0]
          ? {
            name: chadhavaDetail.pujaPerformeds[0].name || "",
            temple: chadhavaDetail.pujaPerformeds[0].temple || "",
            pujaPerformerImg: chadhavaDetail.pujaPerformeds[0].pujaPerformerImg || "",
            bio: chadhavaDetail.pujaPerformeds[0].bio || "",
          }
          : { name: "", temple: "", pujaPerformerImg: "", bio: "" },
      });
    }
  }, [chadhavaDetail]);



  const handleChange = async (e, index) => {
    const { name, value, files } = e.target;


    if (files && files[0]) {
      const file = files[0];

      // Local preview
      const localPreview = URL.createObjectURL(file);


      if (name === "imgUrl") {
        setFormData((prev) => {
          const updated = [...prev.banners];
          updated[index].imgUrl = localPreview.toString();
          return { ...prev, banners: updated };
        });
      } else if (name === "recommendedImg") {
        // Update FAQ icon preview
        setFormData((prev) => {
          const updated = [...prev.recommendedChadawa];
          updated[index].recommendedImg = localPreview.toString();
          return { ...prev, recommendedChadawa: updated };
        });
      } else if (name === "icon") {
        // Update FAQ icon preview
        setFormData((prev) => {
          const updated = [...prev.faqs];
          updated[index].icon = localPreview.toString();
          return { ...prev, faqs: updated };
        });
      } else if (name === "packImg") {
        // Update Package Image preview
        setFormData((prev) => {
          const updated = [...prev.packages];
          updated[index].packImg = localPreview.toString();
          return { ...prev, packages: updated };
        });
      } else if (name === "pujaPerformerImg") {
        setFormData((prev) => ({
          ...prev,
          pujaPerformedBy: {
            ...prev.pujaPerformedBy,
            pujaPerformerImg: localPreview,
          },
        }));
      }

      // Upload to server
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      try {
        const res = await fetch(`${baseAPIURL}/uploads`, {
          method: "POST",
          body: uploadFormData,
        });

        const data = await res.json();


        if (res.ok) {
          if (name === "imgUrl") {
            setFormData((prev) => {
              const updated = [...prev.banners];
              updated[index].imgUrl = (data.storedAs).toString(); // server path
              return { ...prev, banners: updated };
            });
          } else if (name === "recommendedImg") {
            setFormData((prev) => {
              const updated = [...prev.recommendedChadawa];
              updated[index].recommendedImg = (data.storedAs).toString(); // server path
              return { ...prev, recommendedChadawa: updated };
            });
          } else if (name === "icon") {
            setFormData((prev) => {
              const updated = [...prev.faqs];
              updated[index].icon = (data.storedAs).toString(); // server path
              return { ...prev, faqs: updated };
            });
          } else if (name === "packImg") {
            setFormData((prev) => {
              const updated = [...prev.packages];
              updated[index].packImg = (data.storedAs).toString(); // server path
              return { ...prev, packages: updated };
            });
          } else if (name === "pujaPerformerImg") {
            setFormData((prev) => ({
              ...prev,
              pujaPerformedBy: {
                ...prev.pujaPerformedBy,
                pujaPerformerImg: data.storedAs.toString(),
              },
            }));
          }
        } else {
          alert("Upload failed: " + data.error);
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Error while uploading file");
      }
    } else {
      // Handle nested fields using destructuring and dynamic key access
      if (name.startsWith("pujaPerformedBy.")) {
        const field = name.split(".")[1]; // Gets 'name', 'temple', or 'bio'
        setFormData((prev) => ({
          ...prev,
          pujaPerformedBy: {
            ...prev.pujaPerformedBy,
            [field]: value, // Dynamically set the correct nested field
          },
        }));
      } else {
        // Handle top-level fields
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }

    // else {
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    //   }));
    // }
  };



  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWithWait({ dispatch, action: updateChadhavaAction(formData) }).then((res) => {
      if (res.status === 200) {
        dispatch(requestChadhavaAction()); // Fetch updated puja data
        router.push('/admin/chadhava/list')
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

    api.UpdeteChadhavaFlags(payload)
      .then((res) => {
        if (res.status === 200) {
          dispatch(fetchChadhavaDetailAction(params.id))
        } else {
          alert(res.error || "Something went wrong");
        }
      })
      .catch((e) => {
        console.error("Toggle error:", e);
      });
  };
  
  // const handleToggle = (id, field, currentValue) => {
  //   // field = "isActive" | "isActiveOnHome"
  //   const payload = {
  //     id,
  //     [field]: !currentValue,
  //   };
    
  //   const data  = {...formData, ...payload}

  //   fetchWithWait({ dispatch, action: updateChadhavaAction(data) })
  //     .then((res) => {
  //       if (res.status === 200) {
  //         // alert(res.message || `${field} updated successfully`);
  //         dispatch(fetchChadhavaDetailAction(params.id))
  //       } else {
  //         alert(res.error || "Something went wrong");
  //       }
  //     })
  //     .catch((e) => {
  //       console.error("Toggle error:", e);
  //     });
  // };

  
  return (
    <div className="flex-1 overflow-y-auto max-h-screen scrollbar-hide">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="mx-auto shadow-md rounded-lg p-6 space-y-6 overflow-y-auto"
      >
        {/* <h1 className="text-2xl font-bold">Puja Form</h1> */}

        {/* Title */}
        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData?.slug}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Sub Title</label>
          <input
            type="text"
            name="sutTitle"
            value={formData.subTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Images (File Upload) */}
         <div>
                  <label className="block font-semibold mb-2">Banners</label>
        
                  {formData?.banners.map((item, index) => (
                    <div key={index} className="border p-3 rounded mb-3 relative">
                      {formData?.banners.length > 1 && <button
                        type="button"
                        onClick={() => {
                          const updated = formData?.banners.filter((_, i) => i !== index);
                          setFormData({ ...formData, banners: updated });
                        }}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>}
        
                      <div className="mb-3">
                        <label className="block font-medium">Banner</label>
                        {item.imgUrl ? (
                          <div className="relative w-32 h-32">
                            <img
                              src={item.imgUrl}
                              alt={`banner imgUrl ${index}`}
                              className="w-32 h-32 object-cover rounded border cursor-pointer"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...formData?.banners];
                                updated[index].imgUrl = null;
                                setFormData({ ...formData, banners: updated });
                              }}
                              className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ) : (
                          <input
                            type="file"
                            name="imgUrl"
                            accept="image/*"
                            onChange={(e) => handleChange(e, index)} // ✅ index now works
                            className="w-32 h-32 border rounded flex items-center justify-center text-sm p-2 cursor-pointer"
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                      <select
                        value={item.type}
                        onChange={(e) => {
                          const updated = [...formData?.banners];
                          updated[index].type = e.target.value;
                          setFormData({ ...formData, banners: updated });
                        }}
                        className="w-full border p-2 rounded mb-2"
                      >
                        <option value="">Select</option>
                        <option value="eng">English</option>
                        <option value="hi">Hindi</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Position"
                        value={item.position}
                        onChange={(e) => {
                          const updated = [...formData?.banners];
                          updated[index].position = e.target.value;
                          setFormData({ ...formData, banners: updated });
                        }}
                        className="w-full border p-2 rounded mb-2"
                      />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        banners: [...formData?.banners, { imgUrl: "", type: "", position: "" }],
                      })
                    }
                    className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
                  >
                    + Add Banners
                  </button>
        
                </div>

        {/* Rating */}
        <div className="grid grid-cols-3 gap-3">

          {/* Date */}
          <div>
            <label className="block font-semibold">Date</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Rating Value</label>
            <input
              type="number"
              step="0.1"
              name="ratingValue"
              value={formData.ratingValue}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Rating Reviews</label>
            <input
              type="number"
              name="ratingReviews"
              value={formData.ratingReviews}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

        </div>

        {/* Special Day */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-semibold">Special Day</label>
            <input
              type="text"
              name="specialDay"
              value={formData.specialDay}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

        </div>


        {/* Puja Details */}
        <div>
          <label className="block font-semibold">Puja Details</label>
          <textarea
            name="pujaDetails"
            value={formData.pujaDetails}
            rows="4"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Temple History */}
        <div>
          <label className="block font-semibold">Temple History</label>
          <textarea
            name="templeHistory"
            value={formData.templeHistory}
            rows="3"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Packages */}
        <div>
          <label className="block font-semibold">Package</label>
          {formData?.packages.map((item, index) => (
            <div key={index} className="border p-3 rounded mb-3 relative">
              {formData?.packages.length > 1 && <button
                type="button"
                onClick={() => {
                  const updated = formData?.packages.filter((_, i) => i !== index);
                  setFormData({ ...formData, packages: updated });
                }}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>}

              <div className="mb-3">
                <label className="block font-medium">Package Image</label>
                {item.packImg ? (
                  <div className="relative w-15 h-15">
                    <img
                      src={item.packImg}
                      alt={`Package image ${index}`}
                      className="w-15 h-15 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData?.packages];
                        updated[index].packImg = null;
                        setFormData({ ...formData, packages: updated });
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    name="packImg"
                    accept="image/*"
                    onChange={(e) => handleChange(e, index)} // ✅ index now works
                    className="w-15 h-15 border rounded flex items-center justify-center text-sm p-2"
                  />
                )}
              </div>

              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) => {
                  const updated = [...formData?.packages];
                  updated[index].title = e.target.value;
                  setFormData({ ...formData, packages: updated });
                }}
                className="w-full border p-2 rounded mb-2"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="price"
                  value={item.price}
                  onChange={(e) => {
                    const updated = [...formData?.packages];
                    updated[index].price = e.target.value;
                    setFormData({ ...formData, packages: updated });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="tags"
                  value={item.tags}
                  onChange={(e) => {
                    const updated = [...formData?.packages];
                    updated[index].tags = e.target.value;
                    setFormData({ ...formData, packages: updated });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />
              </div>
              <textarea
                placeholder="Description"
                value={item.description}
                onChange={(e) => {
                  const updated = [...formData?.packages];
                  updated[index].description = e.target.value;
                  setFormData({ ...formData, packages: updated });
                }}
                className="w-full border p-2 rounded"
              />

            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                packages: [...formData?.packages, { packImg: "", title: "", description: "", price: "", currency: "INR", tags: "" }],
              })
            }
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            + Add Packages
          </button>
        </div>

        <div className="flex items-center justify-between border p-3 rounded">
          <label className="font-semibold">Recommended Chadhava</label>
          <button
            type="button"
            onClick={() =>{
              setFormData((prev) => ({ ...prev, isRecommended: !prev.isRecommended })),

              handleToggle(chadhavaDetail.id, "isRecommended", chadhavaDetail.isRecommended)
              
              }
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              formData.isRecommended ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isRecommended ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Recommended Chadawa */}
       { formData.isRecommended && <div>
          <label className="block font-semibold">Recommended Chadawa</label>
          {formData?.recommendedChadawa.map((item, index) => (
            <div key={index} className="border p-3 rounded mb-3 relative">
              {formData?.recommendedChadawa.length > 1 && <button
                type="button"
                onClick={() => {
                  const updated = formData?.recommendedChadawa.filter((_, i) => i !== index);
                  setFormData({ ...formData, recommendedChadawa: updated });
                }}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>}

              <div className="mb-3">
                <label className="block font-medium">Image</label>
                {item.recommendedImg ? (
                  <div className="relative w-15 h-15">
                    <img
                      src={item.recommendedImg}
                      alt={`Package image ${index}`}
                      className="w-15 h-15 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData?.recommendedChadawa];
                        updated[index].recommendedImg = null;
                        setFormData({ ...formData, recommendedChadawa: updated });
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    name="recommendedImg"
                    accept="image/*"
                    onChange={(e) => handleChange(e, index)} // ✅ index now works
                    className="w-15 h-15 border rounded flex items-center justify-center text-sm p-2"
                  />
                )}
              </div>

              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) => {
                  const updated = [...formData?.recommendedChadawa];
                  updated[index].title = e.target.value;
                  setFormData({ ...formData, recommendedChadawa: updated });
                }}
                className="w-full border p-2 rounded mb-2"
              />
              <div className="grid grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="status"
                  value={item.status}
                  onChange={(e) => {
                    const updated = [...formData?.recommendedChadawa];
                    updated[index].status = e.target.value;
                    setFormData({ ...formData, recommendedChadawa: updated });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />
                <input
                  type="text"
                  placeholder="location"
                  value={item.location}
                  onChange={(e) => {
                    const updated = [...formData?.recommendedChadawa];
                    updated[index].location = e.target.value;
                    setFormData({ ...formData, recommendedChadawa: updated });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />
                <DatePicker
                  selected={item.date}
                  onChange={(date) => {
                    const updated = [...formData.recommendedChadawa];
                    updated[index].date = date;
                    setFormData({ ...formData, recommendedChadawa: updated });
                  }}
                  className="w-full border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="price"
                  value={item.price}
                  onChange={(e) => {
                    const updated = [...formData?.recommendedChadawa];
                    updated[index].price = e.target.value;
                    setFormData({ ...formData, recommendedChadawa: updated });
                  }}
                  className="w-full border p-2 rounded mb-2"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                recommendedChadawa: [...formData?.recommendedChadawa, { recommendedImg: "", status: "", title: "", location: "", date: new Date(), price: "", currency: "INR" }],
              })
            }
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            + Add Packages
          </button>
        </div>}

        <div className="flex items-center justify-between border p-3 rounded">
          <label className="font-semibold">Common Faqs</label>
          <button
            type="button"
            onClick={() =>{
              setFormData((prev) => ({ ...prev, commonFaqs: !prev.commonFaqs })),

              handleToggle(chadhavaDetail.id, "commonFaqs", chadhavaDetail.commonFaqs)
              
              }
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              formData.commonFaqs ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.commonFaqs ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* FAQs */}

      { !formData.commonFaqs && <div>
          <label className="block font-semibold">FAQs</label>
          {formData?.faqs.map((faq, index) => (
            <div key={index} className="border p-3 rounded mb-3 relative">
              {formData?.faqs.length > 1 && <button
                type="button"
                onClick={() => {
                  const updated = formData?.faqs.filter((_, i) => i !== index);
                  setFormData({ ...formData, faqs: updated });
                }}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>}

              <div className="mb-3">
                <label className="block font-medium">FAQ Icon</label>
                {faq.icon ? (
                  <div className="relative w-15 h-15">
                    <img
                      src={faq.icon}
                      alt={`FAQ Icon ${index}`}
                      className="w-15 h-15 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData?.faqs];
                        updated[index].icon = null;
                        setFormData({ ...formData, faqs: updated });
                      }}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    name="icon"
                    accept="image/*"
                    onChange={(e) => handleChange(e, index)} // ✅ index now works
                    className="w-15 h-15 border rounded flex items-center justify-center text-sm p-2"
                  />
                )}
              </div>

              <input
                type="text"
                placeholder="Title"
                value={faq.title}
                onChange={(e) => {
                  const updated = [...formData?.faqs];
                  updated[index].title = e.target.value;
                  setFormData({ ...formData, faqs: updated });
                }}
                className="w-full border p-2 rounded mb-2"
              />
              <textarea
                placeholder="Description"
                value={faq.description}
                onChange={(e) => {
                  const updated = [...formData?.faqs];
                  updated[index].description = e.target.value;
                  setFormData({ ...formData, faqs: updated });
                }}
                className="w-full border p-2 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                faqs: [...formData?.faqs, { icon: "", title: "", description: "" }],
              })
            }
            className="bg-green-500 text-white px-4 py-1 rounded"
          >
            + Add FAQ
          </button>
        </div>}


        <div className="flex items-center justify-between border p-3 rounded">
          <label className="font-semibold">Puja Performed by Pandit.</label>
          <button
            type="button"
            onClick={() =>{
                setFormData((prev) => ({ ...prev, isActivePandit: !prev.isActivePandit }))
                handleToggle(chadhavaDetail.id, "isActivePandit", chadhavaDetail.isActivePandit)
              }
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              formData.isActivePandit ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isActivePandit ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

      { formData.isActivePandit && <div>
          <label className="block font-semibold">Puja Performed By</label>
          <div className="mb-3">
            <label className="block font-medium">Image</label>

            {formData.pujaPerformedBy.pujaPerformerImg ? (
              <div className="relative w-20 h-20">
                <img
                  src={formData.pujaPerformedBy.pujaPerformerImg}
                  alt="Puja Performer"
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      pujaPerformedBy: { ...prev.pujaPerformedBy, pujaPerformerImg: "" },
                    }))
                  }
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <input
                type="file"
                name={`pujaPerformerImg`}
                accept="image/*"
                onChange={handleChange}
                className="w-20 h-20 border rounded flex items-center justify-center text-sm p-2"
              />
            )}
          </div>

          <input
            type="text"
            name={`pujaPerformedBy.name`}
            placeholder="name"
            value={formData.pujaPerformedBy.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name={`pujaPerformedBy.temple`}
            placeholder="temple"
            value={formData.pujaPerformedBy.temple}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            name={`pujaPerformedBy.bio`}
            placeholder="bio"
            value={formData.pujaPerformedBy.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />
        </div>}

          {/* Toggle Switches */}
      <div className="grid grid-cols-2 gap-6 mt-4">

        {/* isActive */}
        <div className="flex items-center justify-between border p-3 rounded">
          <label className="font-semibold">Is Active</label>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              formData.isActive ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* isActiveOnHome */}
        <div className="flex items-center justify-between border p-3 rounded">
          <label className="font-semibold">Show on Home</label>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, isActiveOnHome: !prev.isActiveOnHome }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              formData.isActiveOnHome ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isActiveOnHome ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

      </div>

        <button
          type="button"
          onClick={() => router.push("/admin/chadhava/list")}
          className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-ret-700 transition"
        >
          Cancle
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditChadhavaForm;