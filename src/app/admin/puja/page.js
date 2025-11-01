"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { fetchWithWait } from "../../../../helper/method";
import { addNewPujaDataAction, requestPujaDataAction } from "@/redux/actions/pujaActions";
import Image from "next/image";

const PujaForm = () => {

  // const [startDate, setStartDate] = useState(new Date());

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    slug: "",
    ratingValue: "",
    ratingReviews: "",
    tags: "",
    specialDay: "",
    location: "",
    date: new Date(),
    pujaDetails: "",
    isActive: true,
    commonOffer: true,
    commonPack: true,
    commonFaqs: true,
    isActiveOnHome: false,
    packages: [{ packImg: null, packageType: "", packagePrice: "" }],
    offerings: [{ offerimg: null, title: "", description: "",tags: "", price: "" }],
    faqs: [{ title: "", description: "" }],
    pujaBenefits: [{ title: "", description: "" }],
    temple: { templeImg: null, templeName: "", templeHistory: "" },
    banners: [{imgUrl: null, type: "", position: 1}],

  });

    // banners: [{ desktopImg: "", mobileImg: "", type: "", position: "" }],



  const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;



  const dispatch = useDispatch();
  const { allPuja } = useSelector((state) => state.pujas);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      slug: slugify(prev.title),
    }));
  }, [formData?.title]);


  const handleChange = async (e, index) => {
    e.preventDefault();

    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      // Local preview
      const localPreview = URL.createObjectURL(file);

      if (name === "imgUrl") {
        // Update images preview
        setFormData((prev) => {
          const updated = [...prev.banners];
          updated[index].imgUrl = localPreview.toString();
          return { ...prev, banners: updated };
        });
      } else if (name === "mobileImg") {
        // Update images preview
        setFormData((prev) => {
          const updated = [...prev.banners];
          updated[index].mobileImg = localPreview.toString();
          return { ...prev, banners: updated };
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
      } else if (name === "offerimg") {
        setFormData((prev) => {
          const updated = [...prev.offerings];
          updated[index].offerimg = localPreview.toString();
          return { ...prev, offerings: updated };
        });
      } else if (name === "templeImg") {
        setFormData((prev) => ({
          ...prev,
          temple: {
            ...prev.temple,
            templeImg: localPreview,
          },
        }));
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
              updated[index].imgUrl = (data.storedAs).toString(); // server path
              return { ...prev, banners: updated };
            });
          } else if (name === "mobileImg") {
            setFormData((prev) => {
              const updated = [...prev.banners];
              updated[index].mobileImg = (data.storedAs).toString(); // server path
              return { ...prev, banners: updated };
            });
          } 
          else if (name === "icon") {
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
          } else if (name === "offerimg") {
             setFormData((prev) => {
              const updated = [...prev.offerings];
              updated[index].offerimg = (data.storedAs).toString(); // server path
              return { ...prev, offerings: updated };
            });
          } else if (name === "templeImg") {
            setFormData((prev) => ({
              ...prev,
              temple: {
                ...prev.temple,
                templeImg: data.storedAs.toString(),
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
    } else if (name.startsWith("temple.")) {
        const field = name.split(".")[1];
        setFormData((prev) => ({
          ...prev,
          temple: {
            ...prev.temple,
            [field]: value, // Dynamically set the correct nested field
          },
        })); 
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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   fetchWithWait({ dispatch, action: addNewPujaDataAction(formData) }).then((res) => {
  //     if (res.status === 200) {
  //       alert("Puja added successfully!");

  //       dispatch(requestPujaDataAction());
  //     } else {
  //       console.log("Error:", res.error);
  //       alert(res.message)
  //     }
  //   }).catch((e) => {
  //     console.log(`error`, e)
  //   })
  // };


  const handleSubmit = (e) => {
    e.preventDefault();

    fetchWithWait({ dispatch, action: addNewPujaDataAction(formData) })
      .then((res) => {
        if (res.status === 200) {
          alert("Puja added successfully!");

          dispatch(requestPujaDataAction());

          // ✅ Reset form after success
          setFormData({
            title: "",
            subTitle: "",
            slug: "",
            ratingValue: "",
            ratingReviews: "",
            specialDay: "",
            location: "",
            date: new Date(),
            pujaDetails: "",
            isActive: true,
            commonOffer: true,
            commonPack: true,
            commonFaqs: true,
            isActiveOnHome: false,
            packages: [{ packImg: null, packageType: "", packagePrice: "" }],
            offerings: [{ offerimg: null, title: "", description: "", price: "" }],
            faqs: [{ title: "", description: "" }],
            pujaBenefits: [{ title: "", description: "" }],
            temple: { templeImg: null, templeName: "", templeHistory: "" },
            banners: [{ imgUrl: null, type: "", position: 1 }],
          });
        } else {
          console.log("Error:", res.error);
          alert(res.message);
        }
      })
      .catch((e) => {
        console.log(`error`, e);
      });
  };



  return (
    <div className="flex-1 p-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl bg-white shadow-lg rounded-2xl p-6 space-y-8 overflow-y-auto scrollbar-hide"
      >
      <section className="p-4 border rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Puja Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleChange}
            className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold">Slug</label>
            <input
              type="text"
              name="slug"
              disabled
              value={formData?.slug}
              onChange={handleChange}
            className="w-full border p-2 rounded"
            />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Benefits Title</label>
            <input
              type="text"
              name="subTitle"
              value={formData?.subTitle}
              onChange={handleChange}
            className="w-full border p-2 rounded"
            />
        </div>

        <div>
          <label className="block font-semibold">Special Tags</label>
          <input
            type="text"
            name="tags"
            value={formData?.tags}
            onChange={handleChange}
           className="w-full border p-2 rounded"
          />
        </div>
        </div>


        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Rating Value</label>
            <input
              type="number"
              step="0.1"
              name="ratingValue"
              value={formData?.ratingValue}
              onChange={handleChange}
             className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Rating Reviews</label>
            <input
              type="number"
              name="ratingReviews"
              value={formData?.ratingReviews}
              onChange={handleChange}
             className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
         {/* Date */}
          <div>
            <label className="block font-semibold">Date</label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
             className="w-full border p-2 rounded"
            />
          </div>

          {/* Special Day */}
          <div>
            <label className="block font-semibold">Special Day</label>
            <input
              type="text"
              name="specialDay"
              value={formData?.specialDay}
              onChange={handleChange}
             className="w-full border p-2 rounded"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold">Puja Location</label>
            <input
              type="text"
              name="location"
              value={formData?.location}
              onChange={handleChange}
             className="w-full border p-2 rounded"
            />
          </div>
        </div>
      </section>

        <section className="p-4 border rounded-xl space-y-4">
          <h2 className="text-xl font-bold text-gray-700 border-b pb-2">Banners</h2>

          {formData?.banners.map((item, index) => (
            <div key={index} className="relative border p-4 rounded-lg bg-gray-50 mb-3">
              {formData?.banners.length > 1 && 
              <button
                type="button"
                onClick={() => {
                  const updated = formData?.banners.filter((_, i) => i !== index);
                  setFormData({ ...formData, banners: updated });
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>}

              <div className="flex items-center gap-4">
                {item.imgUrl ? (
                  <div className="relative">
                    <Image
                      src={item.imgUrl}
                      alt={`banner imgUrl ${index}`}
                      width={800}
                      height={500}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                        onClick={() => {
                        const updated = [...formData?.banners];
                        updated[index].imgUrl = null;
                        setFormData({ ...formData, banners: updated });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="text-sm text-gray-500">Upload</span>
                     <input
                        type="file"
                        name="imgUrl"
                        accept="image/*"
                        onChange={(e) => handleChange(e, index)} // ✅ index now works
                        className="hidden"
                      />
                  </label>
                )}
              
              <div className="flex-1 grid grid-cols-2 gap-3">
              <select
                value={item.type}
                onChange={(e) => {
                  const updated = [...formData?.banners];
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
                  const updated = [...formData?.banners];
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
                banners: [...formData?.banners, { imgUrl: "", type: "", position: "" }],
              })
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            + Add Banners
          </button>
        </section>

        {/* Rating */}
        

        {/* Puja Details */}
        <section className="p-4 border rounded-xl space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-700 pb-2">Puja Details</h2>
           <div>
             <textarea
              name="pujaDetails"
              value={formData?.pujaDetails}
              rows="4"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
           </div>
          </div>
        </section>

         {/* Temple History */}

        <section className="p-4 border rounded-xl space-y-4">
            <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
              Tample History
            </h2>
              {formData.temple.templeImg ? (
                <div className="relative w-20 h-20">
                  <img
                    src={formData.temple.templeImg}
                    alt={`temple image`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        temple: { ...prev.temple, templeImg: "" },
                      }))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ) : (
                 <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                  <span className="text-sm text-gray-500">Upload</span>
                  <input
                    type="file"
                    name={`templeImg`}
                    accept="image/*"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              )}

              <input
                type="text"
                name={`temple.templeName`}
                placeholder="name"
                value={formData.temple.templeName}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
              />
            <div className="flex-1 grid grid-cols-1 gap-3">
              <textarea
                type="text"
                name={`temple.templeHistory`}
                placeholder="About temple"
                rows={4}
                value={formData.temple.templeHistory}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-2"
              />
            </div>
        </section> 

        <section className="p-4 border rounded-xl space-y-4">
            <div>
              <h2 className="text-xl font-bold text-gray-700 pb-2">Puja Benefits</h2>
              {formData?.pujaBenefits.map((faq, index) => (
                <div key={index} className="border p-3 rounded mb-3 relative">
                  {formData?.pujaBenefits.length > 1 && <button
                    type="button"
                    onClick={() => {
                      const updated = formData?.pujaBenefits.filter((_, i) => i !== index);
                      setFormData({ ...formData, pujaBenefits: updated });
                    }}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>}

                  <input
                    type="text"
                    placeholder="Title"
                    value={faq.title}
                    onChange={(e) => {
                      const updated = [...formData?.pujaBenefits];
                      updated[index].title = e.target.value;
                      setFormData({ ...formData, pujaBenefits: updated });
                    }}
                    className="w-full border p-2 rounded mb-2"
                  />
                  <textarea
                    placeholder="Description"
                    value={faq.description}
                    onChange={(e) => {
                      const updated = [...formData?.pujaBenefits];
                      updated[index].description = e.target.value;
                      setFormData({ ...formData, pujaBenefits: updated });
                    }}
                  className="w-full border p-2 rounded"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  pujaBenefits: [...formData?.pujaBenefits, { title: "", discription: "" }],
                })
              }
              className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
            >
            + Add Benefits
          </button>
        </section>

        <section className="p-4 border rounded-xl space-y-4">
          <div className="flex items-center justify-between border p-3 rounded">
            <h2 className="text-xl font-bold text-gray-700">Packages</h2>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, commonPack: !prev.commonPack }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                formData.commonPack ? "bg-green-600" : "bg-gray-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.commonPack ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        
        { !formData.commonPack && <div>
            {formData?.packages.map((packaging, index) => (
              <div key={index} className="relative border p-4 rounded-lg bg-gray-50 mb-3">
                {formData?.packages.length > 1 && <button
                  type="button"
                  onClick={() => {
                    const updated = formData?.packages.filter((_, i) => i !== index);
                    setFormData({ ...formData, packages: updated });
                  }}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>}

                <div className="mb-3">
                  <label className="block font-medium">Package Image</label>
                  {packaging.packImg ? (
                    <div className="relative w-32 h-32">
                      <Image
                        src={packaging.packImg}
                        alt={`Packaging image ${index}`}
                        className="w-32 h-32 object-cover rounded border cursor-pointer"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formData?.packages];
                          updated[index].packImg = null;
                          setFormData({ ...formData, packages: updated });
                        }}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
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
                      onChange={(e) => handleChange(e, index)}
                      className="hidden"
                    />
                  </label>
                    
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Package Type"
                      value={packaging.packageType}
                      onChange={(e) => {
                        const updated = [...formData?.packages];
                        updated[index].packageType = e.target.value;
                        setFormData({ ...formData, packages: updated });
                      }}
                      className="w-full border p-2 rounded mb-2"
                    />
                    </div>
                    <div>
                      <input
                        placeholder="Package Price"
                        value={packaging.packagePrice}
                        onChange={(e) => {
                          const updated = [...formData?.packages];
                          updated[index].packagePrice = e.target.value;
                          setFormData({ ...formData, packages: updated });
                        }}
                      className="w-full border p-2 rounded mb-2"
                      />
                    </div>
                    <div>
                      <input
                        placeholder="No. of People"
                        value={packaging.noOfPeople}
                        onChange={(e) => {
                        const updated = [...formData?.packages];
                        updated[index].noOfPeople = e.target.value;
                        setFormData({ ...formData, packages: updated });
                        }}
                        className="w-full border p-2 rounded mb-2"
                      />
                    </div>
                  </div>
                
              <textarea
                  placeholder="Package Description"
                  value={packaging.packageDescription}
                  onChange={(e) => {
                      const updated = [...formData?.packages];
                      updated[index].packageDescription = e.target.value;
                      setFormData({ ...formData, packages: updated });
                  }}
                className="w-full border p-2 rounded mb-2"
              />
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  packages: [...formData?.packages, { packImg: null, packageType: "", packagePrice: "", packageDescription: "", noOfPeople: "" }],
                })
              }
              className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
            >
              + Add Package
            </button>
          </div>}
        </section>

      <section className="p-4 border rounded-xl space-y-4">
        <div className="flex items-center justify-between border p-3 rounded">
          <h2 className="text-xl font-bold text-gray-700">Offerings</h2>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, commonOffer: !prev.commonOffer }))
            }
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              formData.commonOffer ? "bg-green-600" : "bg-gray-600"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.commonOffer ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        
        { !formData.commonOffer && <div>

          {formData?.offerings.map((offering, index) => (
            <div key={index} className="relative border p-4 rounded-lg bg-gray-50 mb-3">
              {formData?.offerings.length > 1 && <button
                type="button"
                onClick={() => {
                  const updated = formData?.offerings.filter((_, i) => i !== index);
                  setFormData({ ...formData, offerings: updated });
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>}

              <div className="flex items-center gap-4 mb-3">
                {offering.offerimg ? (
                  <div className="relative w-32 h-32">
                    <img
                      src={offering.offerimg}
                      alt={`offering image ${index}`}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData?.offerings];
                        updated[index].offerimg = null;
                        setFormData({ ...formData, offerings: updated });
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                    <span className="text-sm text-gray-500">Upload</span>
                    <input
                    type="file"
                    name="offerimg"
                    accept="image/*"
                    onChange={(e) => handleChange(e, index)}
                    className="hidden"
                  />
                  </label>
                  
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Offering Type"
                    value={offering.title}
                    onChange={(e) => {
                      const updated = [...formData?.offerings];
                      updated[index].title = e.target.value;
                      setFormData({ ...formData, offerings: updated });
                    }}
                    className="w-full border p-2 rounded mb-2"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Tags"
                    value={offering.tags}
                    onChange={(e) => {
                      const updated = [...formData?.offerings];
                      updated[index].tags = e.target.value;
                      setFormData({ ...formData, offerings: updated });
                    }}
                    className="w-full border p-2 rounded mb-2"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Offering price"
                    value={offering.price}
                    onChange={(e) => {
                      const updated = [...formData?.offerings];
                      updated[index].price = e.target.value;
                      setFormData({ ...formData, offerings: updated });
                    }}
                    className="w-full border p-2 rounded mb-2"
                  />
                </div>
              </div>
              <textarea
                placeholder="Offering description"
                value={offering.description}
                onChange={(e) => {
                  const updated = [...formData?.offerings];
                  updated[index].description = e.target.value;
                  setFormData({ ...formData, offerings: updated });
                }}
               className="w-full border p-2 rounded mb-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                offerings: [...formData?.offerings, { offerimg: null, title: "", description: "", tags: "", price: "" }],
              })
            }
            className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
          >
            + Add Offerings
          </button>
        </div>}
        </section>

         <div className="flex items-center justify-between border p-3 rounded">
          <label className="font-semibold">Common FAQs</label>
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({ ...prev, commonFaqs: !prev.commonFaqs }))
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
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
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
                faqs: [...formData?.faqs, { title: "", description: "" }],
              })
            }
            className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
          >
            + Add FAQ
          </button>
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



        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          Submit
        </button>
      {/* 
        <button
          type="button"
          onClick={(e) => (e)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Excle
        </button> */}
      </form>
    </div>
  );
};

export default PujaForm;
