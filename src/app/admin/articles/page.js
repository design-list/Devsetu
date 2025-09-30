"use client";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchWithWait } from "../../../../helper/method";
import { addNewArticlesDataAction } from "@/redux/actions/articlesActions";


const articlesOptions = [
    { value: "aartis", label: "Aartis" },
    { value: "chalisas", label: "Chalisas" },
    { value: "festivals", label: "Festivals" },
    { value: "horoscopes", label: "Horoscopes" },
    { value: "wishes", label: "Wishes" },
];

const ArticalsForm = () => {


    const [type, setType] = useState("");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        articles: [{ icon: null, title: "", description: "" }],
    });

    const baseAPIURL = process.env.NEXT_PUBLIC_API_BASE_URL;



    const dispatch = useDispatch();


    const handleChange = async (e, index) => {
        const { name, value, files } = e.target;

        if (files && files[0]) {
            const file = files[0];

            // Local preview
            const localPreview = URL.createObjectURL(file);

            if (name === "icon") {
                // Update images preview
                setFormData((prev) => {
                    const updated = [...prev.articles];
                    updated[index].icon = localPreview.toString();
                    return { ...prev, articles: updated };
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

                if (res.ok) {
                    if (name === "icon") {
                        setFormData((prev) => {
                            const updated = [...prev.articles];
                            updated[index].icon = (data.storedAs).toString(); // server path
                            return { ...prev, articles: updated };
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

        const data = { type, ...formData }
        
        if (!type) {
            setError("Please select an article type.")
            return;
        } 

        fetchWithWait({ dispatch, action: addNewArticlesDataAction(data) }).then((res) => {
            console.log("Response:", res);
            if (res.status === 200) {
                alert("Articles added successfully!");
                // Reset form
                setType("");
                setFormData({ articles: [{ icon: null, title: "", description: "" }] });
                setError("");
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
                className="mx-auto shadow-md rounded-lg p-6 space-y-6 max-h-screen scrollbar-hide"
            >
                <div>
                    <div className="gap-4">
                        <label className="block font-semibold">Select Articles type</label>
                        <select
                            value={type}
                            onChange={(e) => { setType(e.target.value), setError("") }}
                            className="w-[200px] border p-2 rounded mb-2"
                        >
                            <option value="">Select</option>
                            {
                                articlesOptions.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))
                            }
                           
                        </select>
                        {error && <p className="text-red-600">{error}</p>}
                    </div>
                    <label className="block font-semibold">{type?.charAt(0).toUpperCase() + type?.slice(1)}</label>

                    {formData?.articles.map((article, index) => (
                        <div key={index} className="border p-3 rounded mb-3 relative">
                            {formData?.articles.length > 1 && <button
                                type="button"
                                onClick={() => {
                                    const updated = formData?.articles.filter((_, i) => i !== index);
                                    setFormData({ ...formData, articles: updated });
                                }}
                                className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                            >
                                <Trash2 size={18} />
                            </button>}

                            <div className="mb-3">
                                <label className="block font-medium">{type?.charAt(0).toUpperCase() + type?.slice(1)} Image</label>
                                {article.icon ? (
                                    <div className="relative w-32 h-32">
                                        <img
                                            src={article.icon}
                                            alt={`article Icon ${index}`}
                                            className="w-32 h-32 object-cover rounded border cursor-pointer"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updated = [...formData?.articles];
                                                updated[index].icon = null;
                                                setFormData({ ...formData, articles: updated });
                                            }}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type="file"
                                        name="icon"
                                        accept="image/*"
                                        onChange={(e) => handleChange(e, index)}
                                        className="w-32 h-32 border rounded flex items-center justify-center text-sm p-2 cursor-pointer"
                                    />
                                )}
                            </div>

                            <input
                                type="text"
                                placeholder="Title"
                                value={article.title}
                                onChange={(e) => {
                                    const updated = [...formData?.articles];
                                    updated[index].title = e.target.value;
                                    setFormData({ ...formData, articles: updated });
                                }}
                                className="w-full border p-2 rounded mb-2"
                            />
                            <textarea
                                placeholder="Description"
                                value={article.description}
                                rows={6}
                                onChange={(e) => {
                                    const updated = [...formData?.articles];
                                    updated[index].description = e.target.value;
                                    setFormData({ ...formData, articles: updated });
                                }}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    ))}
                   {type && <button
                        type="button"
                        onClick={() =>
                            setFormData({
                                ...formData,
                                articles: [...formData?.articles, { icon: "", title: "", description: "" }],
                            })
                        }
                        className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
                    >
                        + Add {type?.charAt(0).toUpperCase() + type?.slice(1)}
                    </button>}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ArticalsForm;