"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import { fetchWithWait } from "../../../../helper/method";
import { addNewChadhavaAction, requestChadhavaAction } from "@/redux/actions/chadhavaAction";
import { useRouter } from "next/navigation";

const ChadhavaForm = () => {

  // const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    slug: "",
    tithi: "",
    tags: "",
    location: "",
    date: new Date(),
    pujaDetails: "",
    isActive: true,
    isActiveOnHome: false,
    isRecommended: false,
    commonFaqs: true,
    chadhavaFocus: [{ focusIcon: null, foucs: "" }],
    packages: [{ packImg: "", title: "", description: "", price: 0, currency: "INR", tags: "" }],
    faqs: [{ title: "", description: "" }],
    banners: [{ imgUrl: null, type: "", position: 0 }],

  });

  const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;



  const dispatch = useDispatch();
  // const { pujaData } = useSelector((state) => state.puja);
  const router = useRouter();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.title),
    }));
  }, [formData?.title]);


  const handleChange = async (e, index) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      const localPreview = URL.createObjectURL(file);


      if (name === "imgUrl") {
        setFormData((prev) => {
          const updated = [...prev.banners];
          updated[index].imgUrl = localPreview.toString();
          return { ...prev, banners: updated };
        });
      } else if (name === "focusIcon") {
        setFormData((prev) => {
          const updated = [...prev.chadhavaFocus];
          updated[index].focusIcon = localPreview.toString();
          return { ...prev, chadhavaFocus: updated };
        });
      } else if (name === "packImg") {
        setFormData((prev) => {
          const updated = [...prev.packages];
          updated[index].packImg = localPreview.toString();
          return { ...prev, packages: updated };
        });
      } else {
        alert("Upload failed: ");
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
              updated[index].imgUrl = (data.storedAs).toString();
              return { ...prev, banners: updated };
            });
          }
          else if (name === "focusIcon") {
            console.log("data.storedAs", data.storedAs)

            setFormData((prev) => {
              
              const updated = [...prev.chadhavaFocus];
              updated[index].focusIcon = (data.storedAs).toString();
              return { ...prev, chadhavaFocus: updated };
            });
          }
          else if (name === "packImg") {
            setFormData((prev) => {
              const updated = [...prev.packages];
              updated[index].packImg = (data.storedAs).toString();
              return { ...prev, packages: updated };
            });
          }
        } else {
          alert("Upload failed: " + data.error);
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Error while uploading file");
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

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
    // console.log("Submitting form data===:", formData);
    fetchWithWait({ dispatch, action: addNewChadhavaAction(formData) }).then((res) => {
      if (res.status === 200) {
        dispatch(requestChadhavaAction());
        router.push('/admin/chadhava/list')
      } else {
        console.log("Error:", res.error);
        alert(res.error)
      }
    }).catch((e) => {
      console.log(`error`, e)
    })
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
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block font-semibold">Location</label>
              <input
                type="text"
                name="location"
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
              <label className="block font-semibold mb-1">Special Tags</label>
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
                      className="w-24 h-24 object-cover rounded-lg border"
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
                banners: [...formData.banners, { imgUrl: "", type: "", position: 0 }],
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
                  packages: [...formData?.packages, { packImg: "", title: "", description: "", price: 0, currency: "INR", tags: "" }],
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

export default ChadhavaForm;