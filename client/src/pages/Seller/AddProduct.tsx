"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import { sellerInputLabel, sellerInputTag } from "../../style/style";
import { base_url, imageValidTypes } from "../../static/data";
import { AppDispatch, RootState } from "../../state/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesRaw } from "../../state/actions/categoryAction";
import { no_image } from "../../utils/logo";
import Plus from "../../widgets/icons/Plus";
import Subtract from "../../widgets/icons/Subtract";


export default function AddProduct() {
  // Reference for the hidden file input
  const fileInputRef = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { category } = useSelector((state: RootState) => state.category);
  const { store } = useSelector((state: RootState) => state.store);
  const [image, setImage] = useState<any>([]);
  const [imagePreview, setImagePreview] = useState<any>([]);

  useEffect(() => {
    if (!category) {
      dispatch(fetchCategoriesRaw());
    }
  }, []);
  const handleFileInputChange = (e: any) => {
    const files = Array.from(e.target.files); // Get selected files
    const validFiles = files.filter((file:any) =>
      imageValidTypes.includes(file.type)
    ); // Validate file types

    if (validFiles.length > 0) {
      setImage((prevImages: any) => [...prevImages, ...validFiles]);

      const newPreviews = validFiles.map((file:any) => URL.createObjectURL(file)); // Generate previews
      setImagePreview((prevPreviews: any) => [...prevPreviews, ...newPreviews]);
    } else {
      alert("Some files are not valid images");
    }
  };
  const deleteLastImage = () => {
    setImage((prevImages: any) => prevImages.slice(0, -1));
    setImagePreview((prevPreviews: any) => prevPreviews.slice(0, -1));
  };
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   const handleNestedInputChange = (
  //     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  //     nestedKey: string
  //   ) => {
  //     const { name, value } = e.target;
  //     setFormData((prevData: any) => ({
  //       ...prevData,
  //       [nestedKey]: {
  //         ...prevData[nestedKey as keyof ProductFormData],
  //         [name]: value,
  //       },
  //     }));
  //   };

  const addSpecification = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      specification: [...prevData.specification, { title: "", section: [] }],
    }));
  };

  const addSection = (specIndex: number) => {
    setFormData((prevData: any) => {
      const newSpecification = [...prevData.specification];
      newSpecification[specIndex].section.push({ key: "", value: "" });
      return { ...prevData, specification: newSpecification };
    });
  };

  const handleSpecificationChange = (
    specIndex: number,
    field: "title" | "key" | "value",
    sectionIndex: number | null,
    value: string
  ) => {
    setFormData((prevData: any) => {
      const newSpecification = [...prevData.specification];
      if (field === "title") {
        newSpecification[specIndex].title = value;
      } else if (sectionIndex !== null) {
        newSpecification[specIndex].section[sectionIndex][field] = value;
      }
      return { ...prevData, specification: newSpecification };
    });
  };

  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    specification: [],

    original_price: null,
    discount_percentage: null ,

    quantity: null,

    color: "",
    size: "",
    weight: "",

    status: "available",

    estimated_delivery_date: "",

    store: "",
    category: "",
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("original_price", formData.original_price);
    productData.append("discount_percentage", formData.discount_percentage);
    productData.append("quantity", formData.quantity);
    productData.append("status", formData.status);
    productData.append("color", formData.color);
    productData.append("size", formData.size);
    productData.append("weight", formData.weight);
    productData.append(
      "estimated_delivery_date",
      formData.estimated_delivery_date
    );
    productData.append("category", formData.category);
    productData.append("store", store._id); // Adding storeId from redux

    if (image.length >= 0) {
      image.forEach((img: File) => {
        productData.append(`image`, img);
      });
    }

    formData.specification.forEach((spec: any, index: any) => {
      productData.append(`specification[${index}][title]`, spec.title);
      spec.section.forEach((section: any, sectionIndex: any) => {
        productData.append(
          `specification[${index}][section][${sectionIndex}][key]`,
          section.key
        );
        productData.append(
          `specification[${index}][section][${sectionIndex}][value]`,
          section.value
        );
      });
    });

    try {
      const response = await fetch(`${base_url}/product/add`, {
        method: "POST",
        credentials: "include",
        body: productData,
      });

      if (response.ok) {
        console.log(await response.json());
      }
    } catch (error: any) {
      alert(
        "Error adding product: " + error.response?.data?.message ||
          error.message
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-4 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>

      {/* Basic Information */}
      <div className="mb-4">
        <label htmlFor="name" className={sellerInputLabel}>
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          placeholder="Ex. Tecno Spark 20C 4GB Ram and 128GB Rom - Official"
          onChange={handleInputChange}
          required
          className={sellerInputTag}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className={sellerInputLabel}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Ex. Offering smooth performance and ample storage for your needs."
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={3}
          className={sellerInputTag}
        ></textarea>
      </div>

      {/* Specification */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specifications
        </label>
        {formData.specification.map((spec: any, specIndex: any) => (
          <div key={specIndex} className={sellerInputLabel}>
            <input
              type="text"
              value={spec.title}
              placeholder="ex. key-features"
              onChange={(e) =>
                handleSpecificationChange(
                  specIndex,
                  "title",
                  null,
                  e.target.value
                )
              }
              className={sellerInputTag}
            />
            {spec.section.map((section: any, sectionIndex: any) => (
              <div key={sectionIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={section.key}
                  
                  onChange={(e) =>
                    handleSpecificationChange(
                      specIndex,
                      "key",
                      sectionIndex,
                      e.target.value
                    )
                  }
                  placeholder="Ex. Display:"
                  className={`${sellerInputTag} w-1/2 text-xs`}
                />
                <input
                  type="text"
                  value={section.value}
                  onChange={(e) =>
                    handleSpecificationChange(
                      specIndex,
                      "value",
                      sectionIndex,
                      e.target.value
                    )
                  }
                  placeholder="Ex. Super Amoled display"
                  className={`${sellerInputTag} w-1/2 text-xs`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addSection(specIndex)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              + Add Key-Value Pair
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSpecification}
          className="mt-2 px-4 py-2 duration-200 text-xs bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none flex items-start justify-center font-semibold"
        >
          <Plus width={17} height={17} color={"#ffffff"}/> Specification
        </button>
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Original Price */}
          <div className="">
            <label htmlFor="original_price" className={sellerInputLabel}>
              Original Price
            </label>
            <input
              type="number"
              id="original_price"
              name="original_price"
              placeholder="Inset price"
              value={formData.original_price}
              onChange={handleInputChange}
              required
              className={sellerInputTag}
            />
          </div>
          {/* Discount Percentage */}
          <div className="">
            <label htmlFor="discount_percentage" className={sellerInputLabel}>
              Discount Percentage
            </label>
            <input
              type="number"
              id="discount_percentage"
              name="discount_percentage"
              placeholder="Ex. 50"
              value={formData.discount_percentage}
              onChange={handleInputChange}
              className={sellerInputTag}
            />
          </div>
          <div className="">
            <label htmlFor="quantity" className={sellerInputLabel}>
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              className={sellerInputTag}
            />
          </div>
          {/* Status */}
          <div className="">
            <label htmlFor="status" className={sellerInputLabel}>
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={sellerInputTag}
            >
              <option value="available">Available</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Attributes
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="">
            <label htmlFor="color" className={sellerInputLabel}>
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              placeholder="Ex. Red"
              required
              value={formData.color}
              onChange={handleInputChange}
              className={sellerInputTag}
            />
          </div>
          <div className="">
            <label htmlFor="size" className={sellerInputLabel}>
              Size
            </label>
            <input
              type="text"
              id="size"
              name="size"
              placeholder="Ex. XXL"
              required
              value={formData.size}
              onChange={handleInputChange}
              className={sellerInputTag}
            />
          </div>
          <div className="">
            <label htmlFor="weight" className={sellerInputLabel}>
              Weight
            </label>
            <input
              type="text"
              id="weight"
              placeholder="Ex. 135g"
              name="weight"
              required
              value={formData.weight}
              onChange={handleInputChange}
              className={sellerInputTag}
            />
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="mb-4">
        <label className={`${sellerInputLabel} mb-4`}>Product image</label>
        {/* Add Image */}
   
          
          {/* Hidden file input */}
          <input
          placeholder="Insert product image"
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hide default file input
            accept={imageValidTypes.join(",")}
            multiple
            onChange={handleFileInputChange}
          />


        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {imagePreview.length > 0 ? (
            imagePreview.map((preview:any, index:any) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 rounded object-cover"
              />
            ))
          ) : (
            <img
              src={no_image}
              alt="no_image"
              className="w-24 h-24 rounded-full"
            />
          )}
        </div>
        <div className="flex items-center justify-start gap-4">

        <button
            type="button"
            onClick={() => fileInputRef.current?.click()} // Trigger file input when clicked
            className="my-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-semibold duration-200 text-xs flex items-start justify-center"
          >
            <Plus width={17} height={17} color={"#fff"} /> Image
          </button>

        <button
            type="button"
            onClick={deleteLastImage} // Trigger file input when clicked
            className="my-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-semibold duration-200 text-xs flex items-start justify-center"
          >
            <Subtract width={17} height={17} color={"#fff"} /> Remove
          </button>
        </div>
      </div>

      {/* Delivery */}
      <div className="mb-4">
        <label className="block  text-sm font-medium text-gray-700 mb-2">
          Delivery
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="estimated_delivery_date"
              className={sellerInputLabel}
            >
              Estimated Delivery Date
            </label>
            <input
              type="date"
              id="estimated_delivery_date"
              name="estimated_delivery_date"
              value={formData.estimated_delivery_date}
              onChange={handleInputChange}
              required
              className={sellerInputTag}
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className={sellerInputLabel}>
              Category
            </label>
            <select
              name="category"
              className={sellerInputTag}
              id="category"
              onChange={handleInputChange}
              required
              value={formData.category}
            >
              <option value="">Select Category</option>
              {category?.map((category: any, index: number) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none "
        >
          Add Product
        </button>
      </div>
    </form>
  );
}
