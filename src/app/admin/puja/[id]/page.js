"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { fetchWithWait } from "../../../../../helper/method";
import { addNewPujaDataAction, fetchPujaDetailAction, requestPujaDataAction, updatePujaAction } from "@/redux/actions/pujaActions";
import { useParams, useRouter } from "next/navigation";

const EditPujaForm = () => {

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        ratingValue: "",
        ratingReviews: "",
        specialDay: "",
        location: "",
        date: new Date(),
        pujaDetails: "",
        templeHistory: "",
        packages: [{ packImg: null, packageType: "", packagePrice: "" }],
        offerings: { offerimg: [null], offers: [{ title: "", description: "" }] },
        faqs: [{ icon: null, title: "", description: "" }],
        images: [],
    });

    const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const dispatch = useDispatch();
    const params = useParams();
    const router = useRouter();

    const { pujaDetail } = useSelector((state) => state.pujas);

    console.log("pujaDetail", pujaDetail)

    useEffect(() => {
        dispatch(fetchPujaDetailAction(params.id))
    }, [params.id]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            slug: slugify(prev.title),
        }));
    }, [formData?.title]);


    useEffect(() => {
        if (pujaDetail) {
            setFormData({
                id: pujaDetail.id,
                title: pujaDetail.title || "",
                slug: pujaDetail.slug || "",
                ratingValue: pujaDetail.ratingValue || "",
                ratingReviews: pujaDetail.ratingReviews || "",
                specialDay: pujaDetail.specialDay || "",
                location: pujaDetail.location || "",
                date: pujaDetail.date ? new Date(pujaDetail.date) : new Date(),
                pujaDetails: pujaDetail.pujaDetails || "",
                templeHistory: pujaDetail.templeHistory || "",

                packages: pujaDetail.pujaPackages?.length
                    ? pujaDetail.pujaPackages?.map((p) => ({
                        packImg: p.packImg || null,
                        packageType: p.packageType || "",
                        packagePrice: p.packagePrice || "",
                    }))
                    : [{ packImg: null, packageType: "", packagePrice: "" }],

                offerings: {
                    offerimg:
                        pujaDetail.pujaOfferings?.[0]?.offerimg?.length > 0
                            ? pujaDetail.pujaOfferings[0].offerimg
                            : [null],
                    offers: pujaDetail.pujaOfferings?.map((o) => ({
                        title: o.title || "",
                        description: o.Description || "",
                    })) || [{ title: "", description: "" }],
                },

                faqs: pujaDetail.pujaFaqs?.map((f) => ({
                    icon: f.icon || null,
                    title: f.question || "",
                    description: f.answer || "",
                })) || [{ icon: null, title: "", description: "" }],

                images: pujaDetail.pujaImages?.map((i) => i.imageUrl) || [null],
            });
        }
    }, [pujaDetail]);



    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
    }

    const handleChange = async (e, index) => {
        e.preventDefault();

        const { name, value, files } = e.target;

        if (files && files[0]) {
            const file = files[0];

            // Local preview
            const localPreview = URL.createObjectURL(file);

            if (name === "image") {
                // Update images preview
                setFormData((prev) => {
                    const updated = [...prev.images];
                    updated[index] = localPreview;
                    return { ...prev, images: updated };
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
                    const updatedImgs = [...prev.offerings.offerimg];
                    updatedImgs[index] = localPreview;
                    return {
                        ...prev,
                        offerings: { ...prev.offerings, offerimg: updatedImgs },
                    };
                });
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
                console.log("datadatadata", data)

                if (res.ok) {
                    if (name === "image") {
                        setFormData((prev) => {
                            const updated = [...prev.images];
                            updated[index] = (data.storedAs).toString(); // server path
                            return { ...prev, images: updated };
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
                    } else if (name === "offerimg") {
                        setFormData((prev) => {
                            const updatedImgs = [...prev.offerings.offerimg];
                            updatedImgs[index] = (data.storedAs).toString(); // replace null with uploaded path
                            return {
                                ...prev,
                                offerings: { ...prev.offerings, offerimg: updatedImgs },
                            };
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



    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWithWait({ dispatch, action: updatePujaAction(formData) }).then((res) => {
            console.log("Response:", res);
            if (res.status === 200) {
                dispatch(requestPujaDataAction());
                router.push("/admin/puja/list")
            } else {
                console.log("Error:", res.error);
                alert(res.error)
            }
        }).catch((e) => {
            console.log(`error`, e)
        })
    };


    const handleCancel = () => {
        router.push("/admin/puja/list")
    }

    return (
        <div className="flex-1 p-6 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
            <form
                onSubmit={handleSubmit} className="mx-auto shadow-md rounded-lg p-6 space-y-6 max-h-screen scrollbar-hide" >
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
                        value={formData.slug}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Rating */}
                <div className="grid grid-cols-2 gap-4">
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
                    <label className="block font-semibold">Packages</label>
                    {formData?.packages.map((packaging, index) => (
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
                                {packaging.packImg ? (
                                    <div className="relative w-32 h-32">
                                        <img
                                            src={packaging.packImg}
                                            alt={`Packaging image ${index}`}
                                            className="w-32 h-32 object-cover rounded border"
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
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-32 h-32 border rounded flex items-center justify-center text-sm p-2"
                                    />
                                )}
                            </div>

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
                            <textarea
                                placeholder="Package Price"
                                value={packaging.packagePrice}
                                onChange={(e) => {
                                    const updated = [...formData?.packages];
                                    updated[index].packagePrice = e.target.value;
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
                                packages: [...formData?.packages, { packageType: "", packagePrice: "" }],
                            })
                        }
                        className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                        + Add Package
                    </button>
                </div>

                {/* Offerings */}

                <div>
                    <label className="block font-semibold">Offerings</label>

                    {/* Upload Images */}
                    <div className="mb-4">

                        {/* Images (File Upload) */}
                        <div>
                            <label className="block font-semibold mb-2">Images</label>

                            <div className="flex flex-wrap gap-4">
                                {formData.offerings.offerimg?.map((img, index) => (
                                    <div key={index} className="relative">
                                        {img ? (
                                            <div>
                                                <img
                                                    src={img}
                                                    alt={`Uploaded ${index}`}
                                                    className="w-32 h-32 object-cover rounded border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const updated = formData?.offerings.offerimg.filter((_, i) => i !== index);
                                                        setFormData({ ...formData, offerings: { ...formData.offerings, offerimg: updated } });
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <input
                                                type="file"
                                                name="offerimg"
                                                accept="image/*"
                                                onChange={(e) => handleChange(e, index)}
                                                className="w-32 h-32 border rounded flex items-center justify-center text-sm p-2"
                                            />
                                        )}
                                    </div>
                                ))}

                                {/* Add Image Button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            offerings: {
                                                ...formData.offerings,
                                                offerimg: [...formData.offerings.offerimg, null]
                                            }
                                        })
                                    }
                                    className="w-32 h-32 border-2 border-dashed border-green-500 flex items-center justify-center rounded text-green-600 hover:bg-green-50"
                                >
                                    + Add Image
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Offers List */}
                    {formData?.offerings?.offers.map((offering, index) => (
                        <div key={index} className="border p-3 rounded mb-3 relative">
                            {formData?.offerings?.offers.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedOffers = formData.offerings.offers.filter(
                                            (_, i) => i !== index
                                        );
                                        setFormData({
                                            ...formData,
                                            offerings: {
                                                ...formData.offerings,
                                                offers: updatedOffers,
                                            },
                                        });
                                    }}
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}

                            <input
                                type="text"
                                placeholder="Title"
                                value={offering.title}
                                onChange={(e) => {
                                    const updatedOffers = [...formData.offerings.offers];
                                    updatedOffers[index].title = e.target.value;
                                    setFormData({
                                        ...formData,
                                        offerings: {
                                            ...formData.offerings,
                                            offers: updatedOffers,
                                        },
                                    });
                                }}
                                className="w-full border p-2 rounded mb-2"
                            />

                            <textarea
                                placeholder="Description"
                                value={offering.description}
                                onChange={(e) => {
                                    const updatedOffers = [...formData.offerings.offers];
                                    updatedOffers[index].description = e.target.value;
                                    setFormData({
                                        ...formData,
                                        offerings: {
                                            ...formData.offerings,
                                            offers: updatedOffers,
                                        },
                                    });
                                }}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    ))}

                    {/* Add new Offer */}
                    <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                ...formData,
                                offerings: {
                                    ...formData.offerings,
                                    offers: [
                                        ...formData.offerings.offers,
                                        { title: "", description: "" },
                                    ],
                                },
                            })
                        }
                        className="bg-green-500 text-white px-4 py-1 rounded"
                    >
                        + Add Offering
                    </button>
                </div>

                {/* FAQs */}
                <div>
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
                </div>

                {/* Images (File Upload) */}
                <div>
                    <label className="block font-semibold mb-2">Images</label>

                    <div className="flex flex-wrap gap-4">
                        {formData?.images.map((img, index) => (
                            <div key={index} className="relative">
                                {img ? (
                                    <div>
                                        <img
                                            src={img}
                                            alt={`Uploaded ${index}`}
                                            className="w-32 h-32 object-cover rounded border"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = formData?.images.filter((_, i) => i !== index);
                                                setFormData({ ...formData, images: updated });
                                            }}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-32 h-32 border rounded flex items-center justify-center text-sm p-2"
                                    />
                                )}
                            </div>
                        ))}

                        {/* Add Image Button */}
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    images: [...formData?.images, null],
                                })
                            }
                            className="w-32 h-32 border-2 border-dashed border-green-500 flex items-center justify-center rounded text-green-600 hover:bg-green-50"
                        >
                            + Add Image
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Cancel
                </button>
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

export default EditPujaForm;
