import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Close } from "./icons";

// interface ModalInput {
//   type: "text" | "textarea" | "select" | "file";
//   name: string;
//   label?: string;
//   placeholder?: string;
//   value?: string;
//   required?: boolean;
//   disabled?: boolean;
//   options?: { label: string; value: string }[];
// }

// interface ModalProps {
//   action: "update" | "add" | "delete";
//   modalLabel: string;
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (id?: string, data?: any) => void;
//   input: () => ModalInput[];
//   data?: any;
// }

const Modal = ({
  action,
  modalLabel,
  isOpen,
  onClose,
  onSubmit,
  input,
  data,
}) => {
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState<File | null>(null);
  const [oldImage, setOldImage] = useState<string>(null);
  const [imageChanged, setimageChanged] = useState<boolean>(false);
  const initializeFormData = () => {
    if (input) {
      const initialFormData: { [key: string]: string } = {};
      input().forEach((i) => {
        
        if(i.type !== 'file'){
          initialFormData[i.name] = i.value || "";
        }
        if (i.type === "file") 
          {
            setOldImage(i.value)
        }
      });
      setFormData(initialFormData);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setimageChanged(true)
    } else {
      alert("Photo is not valid");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formDataValues = new FormData();

    // Append text fields
    Object.keys(formData).forEach(key => {
      formDataValues.append(key, formData[key]);
    });
    if (action === "update" || action === "add") {
      if (image) {
        formDataValues.append("image", image);
        onSubmit(formDataValues,data?._id);
      
      } else {
        console.log(data?.id)
        onSubmit(formDataValues,data?._id );
      }
    } else if (action === "delete") {
      onSubmit(data?._id);
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      initializeFormData();
      console.log(data?._id)
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  return (
    <div className="overflow-x-hidden backdrop-blur-sm bg-gray-600/45 overflow-y-auto fixed h-full flex justify-center items-center top-0 left-0 min-w-full z-50">
      <div className="relative w-full max-w-md">
        <div className="bg-gray-100 duration-700 pb-4 rounded-lg shadow-lg">
          <div className="text-right p-2">
            <button
              type="button"
              className="text-gray-800 duration-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
              onClick={onClose}
            >
              <Close />
            </button>
          </div>
          <div className="px-7 flex flex-col gap-4">
            <h3 className="text-xl border-b py-2 font-medium text-center">
              {action.charAt(0).toUpperCase() + action.slice(1)} {modalLabel}
            </h3>
            {action === "update" || action === "add" ? (
              input().map((field, index) => {
                if (field.type === "text" || field.type === "textarea") {
                  return (
                    <div key={index}>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-gray-900 inline-block mb-2"
                      >
                        {field.label || "Unknown"}
                      </label>
                      {field.type === "text" ? (
                        <input
                          type="text"
                          name={field.name}
                          id={field.name}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-blue-500 block w-full p-2.5"
                          placeholder={field.placeholder || "Unknown field"}
                          required={field.required || false}
                          disabled={field.disabled || false}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <textarea
                          name={field.name}
                          id={field.name}
                          className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                          placeholder={field.placeholder || "Unknown field"}
                          required={field.required || false}
                          disabled={field.disabled || false}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      )}
                    </div>
                  );
                } else if (field.type === "select") {
                  return (
                    <div key={index}>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-gray-900 inline-block mb-2"
                      >
                        {field.label || "Unknown"}
                      </label>
                      <select
                        name={field.name}
                        id={field.name}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                        value={formData[field.name] || ""}
                        onChange={handleInputChange}
                        disabled={field.disabled || false}
                      >
                        {field.options?.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                } else if (field.type === "file") {
                  return (
                    <div key={index}>
                      <label
                        htmlFor={field.name}
                        className="text-sm font-medium text-gray-900 inline-block mb-2"
                      >
                        {field.label || "Unknown file"}
                      </label>
                      <input
                        type="file"
                        name={field.name}
                        id={field.name}
              accept=".jpeg, .jpg, .png"
                        onChange={handleFileInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
                      />
                      {(image || oldImage) && (
                        <div className="mt-2">
                          <img
                            // src={URL.createObjectURL(image)}
                            src={imageChanged?URL.createObjectURL(image):`data:image/jpeg;base64,${oldImage}`}
                            alt="Uploaded Preview"
                            className="w-24 h-24 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ) : action === "delete" ? (
              <div>
                <h2 className="text-xl font-bold">Are you sure?</h2>
                <p className="text-sm text-gray-500 py-2">
                  Do you really want to delete this {modalLabel}? This process cannot be undone.
                </p>
              </div>
            ) : (
              <div>No preview</div>
            )}

            <div className="flex gap-2 justify-end flex-wrap">
              <button
                type="button"
                onClick={handleSubmit}
                className={`mb-2 md:mb-0 ${action === "delete" ? "bg-red-500 border border-red-500 hover:bg-red-600" : "bg-blue-700 border-blue-700 hover:bg-blue-600"}  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg `}
              >
                {action === "delete" ? "Delete" : "Save"}
              </button>
              <button
                onClick={onClose}
                className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
