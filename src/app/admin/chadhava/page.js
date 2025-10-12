"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { fetchWithWait } from "../../../../helper/method";
import { addNewChadhavaAction, requestChadhavaAction } from "@/redux/actions/chadhavaAction";

const ChadhavaForm = () => {

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
    isActive: true,
    isActiveOnHome: false,
    isRecommended: false,
    commonFaqs: true,
    isActivePandit: false,
    temple: { templeImg: null, templeName: "", templeHistory: "" },
    packages: [{ packImg: "", title: "", description: "", price: "", currency: "INR", tags: "" }],
    recommendedChadawa: [{ recommendedImg: "", status: "", title: "", location: "", date: new Date(), price: "", currency: "INR" }],
    faqs: [{ icon: null, title: "", description: "" }],
    banners: [{imgUrl: null, type: "", position: 0}],
    pujaPerformedBy: { name: "", temple: "", pujaPerformerImg: "", bio: "" },
  });

  const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;



  const dispatch = useDispatch();
  // const { pujaData } = useSelector((state) => state.puja);

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

      // Local preview
      const localPreview = URL.createObjectURL(file);


      if (name === "imgUrl") {
        // Update images preview
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
    // console.log("Submitting form data===:", formData);
    fetchWithWait({ dispatch, action: addNewChadhavaAction(formData) }).then((res) => {
      if (res.status === 200) {
        dispatch(requestChadhavaAction()); // Fetch updated puja data
      } else {
        console.log("Error:", res.error);
        alert(res.error)
      }
    }).catch((e) => {
      console.log(`error`, e)
    })
  };



// const exportStyledExcel = async (e) => {
//   e.preventDefault();
//   const workbook = new ExcelJS.Workbook();

//   // 🧾 Main Info Sheet
//   const mainSheet = workbook.addWorksheet('Main Info');
//   mainSheet.columns = [
//     { header: 'Title', key: 'title', width: 40 },
//     { header: 'Slug', key: 'slug', width: 40 },
//     { header: 'Rating', key: 'ratingValue', width: 10 },
//     { header: 'Reviews', key: 'ratingReviews', width: 10 },
//     { header: 'Special Day', key: 'specialDay', width: 20 },
//     { header: 'Location', key: 'location', width: 30 },
//     { header: 'Date', key: 'date', width: 25 },
//     { header: 'Puja Details', key: 'pujaDetails', width: 80 },
//     { header: 'Temple History', key: 'templeHistory', width: 80 },
//   ];
//   mainSheet.addRow({
//     title: formData?.title ?? '',
//     slug: formData?.slug ?? '',
//     ratingValue: formData?.ratingValue ?? '',
//     ratingReviews: formData?.ratingReviews ?? '',
//     specialDay: formData?.specialDay ?? '',
//     location: formData?.location ?? '',
//     date: formData?.date ? new Date(formData.date).toISOString() : '',
//     pujaDetails: formData?.pujaDetails ?? '',
//     templeHistory: formData?.templeHistory ?? '',
//   });
//   mainSheet.getRow(1).font = { bold: true };

//   // 🙏 Puja Performer Sheet
//   const performerSheet = workbook.addWorksheet('Puja Performer');
//   performerSheet.columns = [
//     { header: 'Name', key: 'name', width: 20 },
//     { header: 'Temple', key: 'temple', width: 30 },
//     { header: 'Image URL', key: 'pujaPerformerImg', width: 50 },
//     { header: 'Bio', key: 'bio', width: 80 },
//   ];
//   performerSheet.addRow(formData?.pujaPerformedBy ?? {});
//   performerSheet.getRow(1).font = { bold: true };

//   // 📦 Packages Sheet
//   const packagesSheet = workbook.addWorksheet('Packages');
//   packagesSheet.columns = [
//     { header: 'Image URL', key: 'packImg', width: 50 },
//     { header: 'Title', key: 'title', width: 30 },
//     { header: 'Description', key: 'description', width: 60 },
//     { header: 'Price', key: 'price', width: 10 },
//     { header: 'Currency', key: 'currency', width: 10 },
//     { header: 'Tags', key: 'tags', width: 20 },
//   ];
//   (formData?.packages ?? []).forEach(pkg => packagesSheet.addRow(pkg));
//   packagesSheet.getRow(1).font = { bold: true };

//   // 🪔 Recommended Chadawa Sheet
//   const chadawaSheet = workbook.addWorksheet('Recommended Chadawa');
//   chadawaSheet.columns = [
//     { header: 'Image URL', key: 'recommendedImg', width: 50 },
//     { header: 'Status', key: 'status', width: 15 },
//     { header: 'Title', key: 'title', width: 40 },
//     { header: 'Location', key: 'location', width: 30 },
//     { header: 'Date', key: 'date', width: 25 },
//     { header: 'Price', key: 'price', width: 10 },
//     { header: 'Currency', key: 'currency', width: 10 },
//   ];
//   (formData?.recommendedChadawa ?? []).forEach(item => {
//     chadawaSheet.addRow({
//       ...item,
//       date: item.date ? new Date(item.date).toISOString() : '',
//     });
//   });
//   chadawaSheet.getRow(1).font = { bold: true };

//   // ❓ FAQs Sheet
//   const faqsSheet = workbook.addWorksheet('FAQs');
//   faqsSheet.columns = [
//     { header: 'Icon', key: 'icon', width: 10 },
//     { header: 'Title', key: 'title', width: 40 },
//     { header: 'Description', key: 'description', width: 80 },
//   ];
//   (formData?.faqs ?? []).forEach(faq => faqsSheet.addRow(faq));
//   faqsSheet.getRow(1).font = { bold: true };

//   // 🖼️ Images Sheet
//   const imagesSheet = workbook.addWorksheet('Images');
//   imagesSheet.columns = [
//     { header: 'Image URL', key: 'url', width: 80 },
//   ];
//   (formData?.images ?? []).forEach(img => imagesSheet.addRow({ url: img }));
//   imagesSheet.getRow(1).font = { bold: true };

//   // 📥 Download Excel
//   const buffer = await workbook.xlsx.writeBuffer();
//   const blob = new Blob([buffer], {
//     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//   });
//   saveAs(blob, 'TempleChadhavaFullData.xlsx');
// };




  return (
    <div className="flex-1 p-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
      <form
        onSubmit={handleSubmit}
        className="mx-auto shadow-md rounded-lg p-6 space-y-6 scrollbar-hide"
      >
        {/* <h1 className="text-2xl font-bold">Puja Form</h1> */}

        {/* Title */}
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
            name="sutTitle"
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
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Rating Reviews</label>
            <input
              type="number"
              name="ratingReviews"
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
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

        </div>


        {/* Puja Details */}
        <div>
          <label className="block font-semibold">Chadhava Details</label>
          <textarea
            name="pujaDetails"
            rows="4"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Temple History */}
         <div>
          <label className="block font-semibold">Temple History</label>
          <div className="mb-3">
            <label className="block font-medium">Image</label>

            {formData.temple.templeImg ? (
              <div className="relative w-20 h-20">
                <img
                  src={formData.temple.templeImg}
                  alt="temple image"
                  className="w-20 h-20 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      temple: { ...prev.temple, templeImg: "" },
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
                name={`templeImg`}
                accept="image/*"
                onChange={handleChange}
                className="w-20 h-20 border rounded flex items-center justify-center text-sm p-2"
              />
            )}
          </div>

          <input
            type="text"
            name={`temple.templeName`}
            placeholder="name"
            value={formData.temple.templeName}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2"
          />

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
            onClick={() =>
              setFormData((prev) => ({ ...prev, isRecommended: !prev.isRecommended }))
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
      {!formData.isRecommended &&  <div>
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
                    const updated = [...formData?.recommendedChadawa];
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
        </div>
}


        {/* FAQs */}

        <div className="flex items-center justify-between border p-3 rounded">
          <label className="font-semibold">Common Faqs</label>
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
            onClick={() =>
              setFormData((prev) => ({ ...prev, isActivePandit: !prev.isActivePandit }))
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


        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>

        {/* <button
          type="button"
          onClick={(e) => exportStyledExcel(e)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Excel
        </button> */}
      </form>
    </div>
  );
};

export default ChadhavaForm;