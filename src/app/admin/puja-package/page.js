"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithWait } from "../../../../helper/method";
import PackagesComponent from "@/components/PujaPackages/AdminPackage";

import { addNewPackageDataAction, deletePackageAction, requestPackageDataAction } from "@/redux/actions/packageActions";
import { addNewOfferingDataAction, deleteOfferingAction, requestOfferingDataAction } from "@/redux/actions/offeringActions";
import AdminOfferingCard from "@/components/OfferingCard/adminCard";

const PujaPackages = () => {


    const [formData, setFormData] = useState({
        packages: [{ packImg: null, packageType: "", packagePrice: "" }],
        offerings: [{ offerimg: null, title: "", description: "", price: "" }],
    });

    const [editId, setEditId] = useState(null);
    const [addNewPackage, setAddNewPackage] = useState(false);
    const [addNewOffering, setAddNewOffering] = useState(false);

    const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;



    const dispatch = useDispatch();
    const { allPackage } = useSelector((state) => state.packages);
    const { allOffering } = useSelector((state) => state.offering);


    useEffect(() => {
        dispatch(requestPackageDataAction())
        dispatch(requestOfferingDataAction())
    },[])


    const handleChange = async (e, index) => {
        e.preventDefault();

        const { name, value, files } = e.target;

        if (files && files[0]) {
            const file = files[0];

            // Local preview
            const localPreview = URL.createObjectURL(file);


            if (name === "packImg") {
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
                    if (name === "packImg") {
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
                    } else {
                        alert("Upload failed: " + data.error);
                    }
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
        fetchWithWait({ dispatch, action: addNewPackageDataAction(formData) }).then((res) => {
            if (res.status === 200) {
                setAddNewPackage(false)
                dispatch(requestPackageDataAction());
            } else {
                console.log("Error:", res.error);
                alert(res.message)
            }
        }).catch((e) => {
            console.log(`error`, e)
        })
    };

    const handleOfferSubmit = (e) => {
        e.preventDefault();

        const payload = {
            offerings: formData.offerings,
        };

        // console.log("handleOfferSubmit", payload)
        fetchWithWait({ dispatch, action: addNewOfferingDataAction(payload) }).then((res) => {
            if (res.status === 200) {
                setAddNewPackage(false)
                dispatch(requestOfferingDataAction());
            } else {
                console.log("Error:", res.error);
                alert(res.message)
            }
        }).catch((e) => {
            console.log(`error`, e)
        })
    };

    const handleDelete = (data) => {
        fetchWithWait({ dispatch, action: deletePackageAction(data) }).then((res) => {
            if (res.status === 200) {
                dispatch(requestPackageDataAction());
            } else {
                console.log("Error:", res.error);
                alert(res.message)
            }
        }).catch((e) => {
            console.log(`error`, e)
        })
    }

    const handleOfferDelete = (data) => {
        fetchWithWait({ dispatch, action: deleteOfferingAction(data) }).then((res) => {
            if (res.status === 200) {
                dispatch(requestOfferingDataAction());
            } else {
                console.log("Error:", res.error);
                alert(res.message)
            }
        }).catch((e) => {
            console.log(`error`, e)
        })
    }

    return (
        <div className="flex-1 p-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
            <div>
                <div className="flex justify-end items-center mb-4">
                <button
                    className={`${
                        addNewPackage
                        ? "bg-gradient-to-r from-red-500 to-red-600"
                        : "bg-gradient-to-r from-green-500 to-green-600"
                    } text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer`}
                    onClick={() => setAddNewPackage(!addNewPackage)}
                >
                {addNewPackage ? "Back" : "+ Add New Package"}
                </button>

            </div>
           { Array.isArray(allPackage) && allPackage.length > 0 && !addNewPackage ?
                <>
                    <h2 className="text-xl font-bold mb-4">Available Common Packages</h2>
                    <PackagesComponent pujaPackages={allPackage} handleDelete={handleDelete}  />
                </>

                : 
           
                <div
                    className="mx-auto shadow-md rounded-lg p-6 space-y-6 scrollbar-hide"
                >

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
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
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
                                        <input
                                            type="file"
                                            name="packImg"
                                            accept="image/*"
                                            onChange={(e) => handleChange(e, index)}
                                            className="w-32 h-32 border rounded flex items-center justify-center text-sm p-2 cursor-pointer"
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
                            className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
                        >
                            + Add Package
                        </button>
                    </div>


                    {/* Submit */}
                    <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                        onClick={(e) => handleSubmit(e)}
                        
                    >
                        Submit
                    </button>
                </div>}
            </div>


            <div>
                <div className="flex justify-end items-center mb-4">
                    <button
                        className={`${
                            addNewOffering
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : "bg-gradient-to-r from-green-500 to-green-600"
                        } text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer`}
                        onClick={() => setAddNewOffering(!addNewOffering)}
                    >
                    {addNewOffering ? "Back" : "+ Add New Offering"}
                    </button>

                </div>

               { Array.isArray(allOffering) && allOffering.length && !addNewOffering ? 
               <section className="py-6">
                    <h2 className="text-xl font-bold mb-4">Available Common Offerings</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {allOffering.map((off) => (
                        <AdminOfferingCard
                            key={off.id}
                            offering={off}
                            handleOfferDelete={handleOfferDelete}
                        />
                        ))}
                    </div>
                </section>
                    : 
                <div
                    className="mx-auto shadow-md rounded-lg p-6 space-y-6 scrollbar-hide"
                >
                <div>
                    <label className="block font-semibold">Offerings</label>
                    {formData?.offerings.map((offering, index) => (
                        <div key={index} className="border p-3 rounded mb-3 relative">
                            {formData?.offerings.length > 1 && <button
                                type="button"
                                onClick={() => {
                                    const updated = formData?.offerings.filter((_, i) => i !== index);
                                    setFormData({ ...formData, offerings: updated });
                                }}
                                className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                            >
                                <Trash2 size={18} />
                            </button>}

                            <div className="mb-3">
                                <label className="block font-medium">Offering Image</label>
                                {offering.offerimg ? (
                                    <div className="relative w-32 h-32">
                                        <img
                                            src={offering.offerimg}
                                            alt={`offering image ${index}`}
                                            className="w-32 h-32 object-cover rounded border cursor-pointer"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = [...formData?.offerings];
                                                updated[index].offerimg = null;
                                                setFormData({ ...formData, offerings: updated });
                                            }}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        name="offerimg"
                                        accept="image/*"
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-32 h-32 border rounded flex items-center justify-center text-sm p-2 cursor-pointer"
                                    />
                                )}
                            </div>

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

                            <textarea
                                placeholder="Offering description"
                                value={offering.description}
                                onChange={(e) => {
                                    const updated = [...formData?.offerings];
                                    updated[index].description = e.target.value;
                                    setFormData({ ...formData, offerings: updated });
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
                                offerings: [...formData?.offerings, { title: "", description: "", price: "" }],
                            })
                        }
                        className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
                    >
                        + Add Offerings
                    </button>
                </div>
                {/* Submit */}
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                    onClick={(e) => handleOfferSubmit(e)}
                >
                    Submit
                </button>
                </div>}
            </div>
        </div>
    );
};

export default PujaPackages;
