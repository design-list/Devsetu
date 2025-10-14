"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithWait } from "../../../../helper/method";
import { validateFields } from "../../../../helper/validateFields";
import {
  addNewFaqsDataAction,
  deleteFaqsAction,
  requestFaqsDataAction,
  updateFaqsAction,
} from "@/redux/actions/faqActions";
import FAQs from "@/components/Faqs";

const PujaForm = () => {
  const [formData, setFormData] = useState({
    faqs: [{ type: "", title: "", description: "" }],
  });

  const [errors, setErrors] = useState([]);
  const [editId, setEditId] = useState(null);
  const [addNewFaq, setAddNewFaq] = useState('');

  const dispatch = useDispatch();
  const { allFaqs, pujaFaqs, chadhavaFaqs } = useSelector((state) => state.faqs);

  useEffect(() => {
    dispatch(requestFaqsDataAction());
  }, [dispatch]);

  useEffect(() => {
    if (editId && allFaqs?.length) {
        setFormData({
            faqs: [
                {
                  type: editId.type || "",
                  title: editId.question || "",
                  description: editId.answer || "",
                },
            ],
        });
    }
  }, [editId, allFaqs]);

  // 🧠 CREATE
  const handleSubmit = (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateFields(
      formData.faqs,
      ["type"]
    );
    setErrors(validationErrors);

    if (!isValid) {
      alert("Please select the FAQ type fields before submitting.");
      return;
    }

    fetchWithWait({ dispatch, action: addNewFaqsDataAction(formData) })
      .then((res) => {
        if (res.status === 200) {
          dispatch(requestFaqsDataAction());
          setAddNewFaq(null)
          setEditId(null)
          setFormData({ faqs: [{ type: "", title: "", description: "" }] });
        } else {
          alert(res.message || "Something went wrong.");
        }
      })
      .catch((e) => {
        console.log("error", e);
        alert("Error while saving FAQs.");
      });
  };


  // ✏️ UPDATE

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedFaq = {
      id: editId.id,
      type: formData.faqs[0].type,
      question: formData.faqs[0].title,
      answer: formData.faqs[0].description,
    };

    fetchWithWait({ dispatch, action: updateFaqsAction(updatedFaq) })
      .then((res) => {
        if (res.status === 200) {
          dispatch(requestFaqsDataAction());
          setEditId(null);
          setAddNewFaq(null)
          setFormData({ faqs: [{ type: "", title: "", description: "" }] });
        } else {
          alert(res.message || "Something went wrong.");
        }
      })
      .catch((e) => {
        console.log("error", e);
        alert("Error while updating FAQs.");
      });
  };

  // 🗑️ DELETE
  const handleDelete = (item) => {
    fetchWithWait({ dispatch, action: deleteFaqsAction(item) })
      .then((res) => {
        if (res.status === 200) {
          dispatch(requestFaqsDataAction());
        } else {
          alert(res.message || "Something went wrong.");
        }
      })
      .catch((e) => {
        console.log("error", e);
        alert("Error while deleting FAQ.");
      });
  };


  // 🧾 RENDER
  if (!editId && !addNewFaq) {
    return (
      <div className="flex-1 p-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
        <div className="flex justify-end items-center mb-4">
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
            onClick={() => setAddNewFaq("addNew")}
          >
            + Add New FAQs
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.isArray(pujaFaqs) && pujaFaqs.length > 0 && (
            <FAQs
              faqs={pujaFaqs}
              handleDelete={handleDelete}
              handleEdit={setEditId}
              heading={"Puja FAQs"}
            />
          )}

          {Array.isArray(chadhavaFaqs) && chadhavaFaqs.length > 0 && (
            <FAQs
              faqs={chadhavaFaqs}
              handleDelete={handleDelete}
              handleEdit={setEditId}
              heading={"Chadhava FAQs"}
            />
          )}
        </div>
      </div>

    );
  }


  return (
    <div className="flex-1 p-1 pb-3 overflow-y-auto max-h-screen scrollbar-hide">
      <form
        onSubmit={editId ? handleUpdate : handleSubmit}
        className="mx-auto shadow-md rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block font-semibold">FAQs</label>
          {formData.faqs.map((faq, index) => (
            <div key={index} className="border p-3 rounded mb-3 relative">
              {formData.faqs.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = formData.faqs.filter((_, i) => i !== index);
                    setFormData({ ...formData, faqs: updated });
                  }}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <select
                value={faq.type}
                disabled = {editId ? true : false}
                onChange={(e) => {
                  const updated = [...formData.faqs];
                  updated[index].type = e.target.value;
                  setFormData({ ...formData, faqs: updated });
                }}
                className={`w-full border p-2 rounded mb-2 ${editId && "bg-gray-300"} ${
                  errors[index]?.type ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select</option>
                <option value="puja">Puja</option>
                <option value="chadhava">Chadhava</option>
              </select>

              <input
                type="text"
                placeholder="Title"
                value={faq.title}
                onChange={(e) => {
                  const updated = [...formData.faqs];
                  updated[index].title = e.target.value;
                  setFormData({ ...formData, faqs: updated });
                }}
                className={`w-full border p-2 rounded mb-2 ${
                  errors[index]?.title ? "border-red-500" : "border-gray-300"
                }`}
              />

              <textarea
                placeholder="Description"
                value={faq.description}
                onChange={(e) => {
                  const updated = [...formData.faqs];
                  updated[index].description = e.target.value;
                  setFormData({ ...formData, faqs: updated });
                }}
                className={`w-full border p-2 rounded ${
                  errors[index]?.description ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>
          ))}

          {!editId && addNewFaq && (
            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  faqs: [...formData.faqs, { type: "", title: "", description: "" }],
                })
              }
              className="bg-green-500 text-white px-4 py-1 rounded cursor-pointer"
            >
              + Add FAQ
            </button>
          )}
        </div>

        {addNewFaq && <button
          type="button"
          onClick={() => setAddNewFaq(null)}
          className="bg-red-600 text-white mr-2 px-6 py-2 rounded hover:bg-red-700 transition cursor-pointer"
        >
           Back
        </button>}

        {editId && <button
          type="button"
          onClick={() => setEditId(null)}
          className="bg-red-600 text-white mr-2 px-6 py-2 rounded hover:bg-red-700 transition cursor-pointer"
        >
           Cancel
        </button>}

        <button
          type="submit"
          className="bg-blue-600 text-white mr-2 px-6 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          {editId ? "Update" : "Submit"}
        </button>

        
      </form>
    </div>
  );
};

export default PujaForm;
