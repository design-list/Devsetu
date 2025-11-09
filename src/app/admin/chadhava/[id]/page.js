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
    tithi: "",
    tags: "",
    focus: "",
    location: "",
    date: new Date(),
    pujaDetails: "",
    isActive: true,
    isActiveOnHome: false,
    isRecommended: false,
    commonFaqs: true,
    chadhavaFocus: [{ focusIcon: "", foucs: "" }],
    packages: [{ packImg: "", title: "", description: "", price: 0, strikePrice: 0, position: "", currency: "INR", tags: "" }],
    faqs: [{ title: "", description: "" }],
    banners: [{ imgUrl: "", mobileImageUrl: "", type: "", position: 0 }],
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
        id: params.id,
        title: chadhavaDetail.title || "",
        subTitle: chadhavaDetail.subTitle || "",
        slug: chadhavaDetail.slug || "",
        tithi: chadhavaDetail.tithi || "",
        tags: chadhavaDetail.tags || "",
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
            mobileImageUrl: b.mobileImageUrl || "",
            type: b.type || "",
            position: b.position || ""
          }))
          : [{ imgUrl: "", mobileImageUrl: "", type: "", position: 0 }],

        chadhavaFocus: chadhavaDetail.chadhavaFocus
          ? chadhavaDetail.chadhavaFocus.map((b) => ({
            focusIcon: b.focusIcon || "",
            foucs: b.foucs || "",
          }))
          : [{ focusIcon: "", foucs: "" }],

        // Packages
        packages: chadhavaDetail.chadhavaPackages
          ? chadhavaDetail.chadhavaPackages.map((p) => ({
            packImg: p.packImg || "",
            title: p.title || "",
            description: p.description || "",
            price: p.price || 0,
            currency: p.currency || "INR",
            tags: p.tags || "",
            position: p.position || "",
            strikePrice: p.strikePrice || "",
          }))
          : [{ packImg: "", title: "", description: "", price: 0, strikePrice: 0, position: "", currency: "INR", tags: "" }],

        // Recommended Chadawas
        recommendedChadawa: chadhavaDetail.isRecommended && chadhavaDetail.recommendedChadawas
          ? chadhavaDetail.recommendedChadawas.map((r) => ({
            recommendedImg: r.recommendedImg || "",
            title: r.title || "",
            status: r.status || "",
            location: r.location || "",
            date: r.date ? new Date(r.date) : new Date(),
            price: r.price || 0,
            currency: r.currency || "INR",
          }))
          : [{ recommendedImg: "", status: "", title: "", location: "", date: new Date(), price: 0, currency: "INR" }],

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
    e.preventDefault();
    const { name, value, files } = e.target;

    // ✅ Helper function to update nested or direct field
    const updateFormField = (path, val) => {
      setFormData((prev) => {
        let updatedData = { ...prev };

        switch (path) {
          case "banners": {
            const updatedBanners = [...prev.banners];
            updatedBanners[index][name] = val;
            updatedData.banners = updatedBanners;
            break;
          }
          case "faqs": {
            const updatedFaqs = [...prev.faqs];
            updatedFaqs[index][name] = val;
            updatedData.faqs = updatedFaqs;
            break;
          }
          case "packages": {
            const updatedPackages = [...prev.packages];
            updatedPackages[index][name] = val;
            updatedData.packages = updatedPackages;
            break;
          }
          case "chadhavaFocus": {
            const updatedFocus = [...prev.chadhavaFocus];
            updatedFocus[index][name] = val;
            updatedData.chadhavaFocus = updatedFocus;
            break;
          }
          default:
            updatedData[name] = val;
            break;
        }

        return updatedData;
      });
    };

    // 🖼️ Handle file uploads
    if (files && files[0]) {
      const file = files[0];
      const localPreview = URL.createObjectURL(file);

      // 1️⃣ Local preview update
      if (["imgUrl", "mobileImageUrl"].includes(name)) updateFormField("banners", localPreview);
      else if (name === "focusIcon") updateFormField("chadhavaFocus", localPreview);
      else if (name === "icon") updateFormField("faqs", localPreview);
      else if (name === "packImg") updateFormField("packages", localPreview);
      else console.warn("Unexpected file field:", name);

      // 2️⃣ Upload to backend
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const data = await res.json();
        console.log("Upload response:", data);

        // ✅ handle both success types (boolean or status)
        if (!data.success && data?.status !== 200 && !res.ok) {
          console.error("Upload failed:", data);
          alert("Upload failed: " + (data?.error || "Unknown error"));
          return;
        }

        const uploadedUrl = (data?.url || data?.storedAs || "").toString();

        // 3️⃣ Replace preview with actual uploaded URL
        if (["imgUrl", "mobileImageUrl"].includes(name)) updateFormField("banners", uploadedUrl);
        else if (name === "focusIcon") updateFormField("chadhavaFocus", uploadedUrl);
        else if (name === "icon") updateFormField("faqs", uploadedUrl);
        else if (name === "packImg") updateFormField("packages", uploadedUrl);
      } catch (err) {
        console.error("Upload error:", err);
        alert("Error while uploading file");
      }

      return; // exit after file handling
    }

    // ✏️ Handle text (non-file) fields
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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



  return (
    <div className="flex-1 p-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl bg-white shadow-lg rounded-2xl p-6 space-y-8 overflow-y-auto scrollbar-hide"
      >

        {/* 🛕 Main Info Section */}
        <section className="p-4 border rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Chadhava Information</h2>
          <div className="grid grid-cols-2 gap-4">
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
                name="subTitle"
                value={formData.subTitle}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
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
          <div className="flex flex-col md:flex-row gap-4">

            {/* Date */}
            <div className="flex-1">
              <label className="font-semibold block mb-1">Date</label>
              <DatePicker
                selected={formData.date}
                onChange={(date) => setFormData({ ...formData, date })}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Tithi */}
            <div className="flex-1">
              <label className="block font-semibold mb-1">Tithi</label>
              <input
                type="text"
                value={formData.tithi}
                name="tithi"
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            {/* Tags */}
            <div className="flex-1">
              <label className="block font-semibold mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* 🖼️ Banners Section */}
        <section className="p-4 border rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Banners</h2>

          {formData.banners.map((item, index) => (
            <div key={index} className="relative border p-4 rounded-lg bg-gray-50 mb-3">
              {formData.banners.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = formData.banners.filter((_, i) => i !== index);
                    setFormData({ ...formData, banners: updated });
                  }}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <div className="flex items-center gap-4">
                {item.imgUrl ? (
                  <div className="relative">
                    <img
                      src={item.imgUrl}
                      alt={`banner-${index}`}
                      className="w-50 h-30 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.banners];
                        updated[index].imgUrl = null;
                        setFormData({ ...formData, banners: updated });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="text-sm text-gray-500">Upload</span>
                    <input type="file" name="imgUrl" className="hidden" accept="image/*" onChange={(e) => handleChange(e, index)} />
                  </label>
                )}
                {item.mobileImageUrl ? (
                  <div className="relative">
                    <img
                      src={item.mobileImageUrl}
                      alt={`mobile banner-${index}`}
                      className="w-50 h-30 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.banners];
                        updated[index].mobileImageUrl = null;
                        setFormData({ ...formData, banners: updated });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="text-sm text-gray-500">Upload</span>
                    <input type="file" name="mobileImageUrl" className="hidden" accept="image/*" onChange={(e) => handleChange(e, index)} />
                  </label>
                )}

                <div className="flex-1 grid grid-cols-2 gap-3">
                  <select
                    value={item.type}
                    onChange={(e) => {
                      const updated = [...formData.banners];
                      updated[index].type = e.target.value;
                      setFormData({ ...formData, banners: updated });
                    }}
                    className="border p-2 rounded-lg"
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
                      const updated = [...formData.banners];
                      updated[index].position = e.target.value;
                      setFormData({ ...formData, banners: updated });
                    }}
                    className="border p-2 rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                banners: [...formData.banners, { imgUrl: "", mobileImageUrl: "", type: "", position: 0 }],
              })
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Banner
          </button>
        </section>

        {/* Puja Details */}
        <section className="p-4 border rounded-xl space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-700 pb-2">Chadhava Details</h2>
            <textarea
              name="pujaDetails"
              value={formData.pujaDetails}
              rows="4"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

        </section>


        <section className="p-4 border rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
            Chadhava Focus
          </h2>

          {formData.chadhavaFocus.map((item, index) => (
            <div
              key={index}
              className="relative border p-4 rounded-lg bg-gray-50 mb-3"
            >
              {formData.chadhavaFocus.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = formData.chadhavaFocus.filter((_, i) => i !== index);
                    setFormData({ ...formData, chadhavaFocus: updated });
                  }}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <div className="flex items-center gap-4">
                {item.focusIcon ? (
                  <div className="relative">
                    <img
                      src={item.focusIcon}
                      alt={`focus-${index}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.chadhavaFocus];
                        updated[index].focusIcon = null;
                        setFormData({ ...formData, chadhavaFocus: updated });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="text-sm text-gray-500">Upload</span>
                    <input
                      type="file"
                      name="focusIcon"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleChange(e, index)}
                    />
                  </label>
                )}

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Enter focus text"
                    value={item.foucs}
                    onChange={(e) => {
                      const updated = [...formData.chadhavaFocus];
                      updated[index].foucs = e.target.value;
                      setFormData({ ...formData, chadhavaFocus: updated });
                    }}
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                chadhavaFocus: [
                  ...formData.chadhavaFocus,
                  { focusIcon: null, foucs: "" },
                ],
              })
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Focus
          </button>
        </section>


        {/* Packages */}
        <section className="p-4 border rounded-xl space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-700 pb-2">Offerings</h2>
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
                  <label className="block font-medium">Offerings Image</label>
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
                    <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                      <span className="text-sm text-gray-500">Upload</span>
                      <input
                        type="file"
                        name="packImg"
                        accept="image/*"
                        onChange={(e) => handleChange(e, index)} // ✅ index now works
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                  <input
                    type="text"
                    placeholder="Position"
                    value={item.position}
                    onChange={(e) => {
                      const updated = [...formData?.packages];
                      updated[index].position = e.target.value;
                      setFormData({ ...formData, packages: updated });
                    }}
                    className="w-full border p-2 rounded mb-2"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
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
                    type="number"
                    placeholder="Strike Off"
                    value={item.strikePrice}
                    onChange={(e) => {
                      const updated = [...formData?.packages];
                      updated[index].strikePrice = e.target.value;
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
                  packages: [...formData?.packages, { packImg: "", title: "", description: "", price: 0, strikePrice: 0, position: "", currency: "INR", tags: "" }],
                })
              }
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              + Add Offerings
            </button>
          </div>
        </section>

        {/* FAQs */}
        <section className="p-4 border rounded-xl space-y-4">

          <div className="flex items-center justify-between border p-3 rounded">
            <label className="font-semibold">Common Faqs</label>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, commonFaqs: !prev.commonFaqs }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.commonFaqs ? "bg-green-600" : "bg-gray-600"
                }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.commonFaqs ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
          </div>

          {!formData.commonFaqs && <div>
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
        </section>

        <section className="p-4 border rounded-xl space-y-4">
          <div className="grid grid-cols-2 gap-6 mt-4">

            {/* isActive */}
            <div className="flex items-center justify-between border p-3 rounded">
              <label className="font-semibold">Is Active</label>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, isActive: !prev.isActive }))
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.isActive ? "bg-green-600" : "bg-gray-600"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActive ? "translate-x-6" : "translate-x-1"
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
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${formData.isActiveOnHome ? "bg-green-600" : "bg-gray-600"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.isActiveOnHome ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>

          </div>
        </section>


        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>

      </form>
    </div>
  );
};

export default EditChadhavaForm;