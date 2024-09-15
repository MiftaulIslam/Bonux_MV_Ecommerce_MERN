import { useEffect, useState } from "react";
import { GetService } from "../../utils/HTTP/Get";
import DataTable from "../../widgets/DataTable/DataTable";
import { Modal } from "../../widgets";
import { PutService } from "../../utils/HTTP/Put";
import { DeleteService } from "../../utils/HTTP/Delete";
import { PostService } from "../../utils/HTTP/Post";
import Loader from "../../widgets/Loader";

const Category = () => {
  const [categories, setCategories] = useState<any | null>(null);
  const [SelectedCategory, setSelectedCategory] = useState(null);
  const [isAddModalOpen, setisAddModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pageSizeOptions = [10, 20, 50, 100];
  const getCategories = async () => {
    setLoading(true)
    const category = await GetService("category/categories-raw", true);
    if(category){
      setCategories(category?.data);
    }
    setLoading(false);
  };
  const fetchCategory = async (id: string) => {
    try{
      setLoading(true)
      const category = await GetService(`category/get-category/${id}`, false);
      if(category){
        setSelectedCategory(category.data);
        setisEditModalOpen(true);
      }
      setLoading(false)

    }catch(err){
      console.log(err);
    }  
  };

  const deleteCategory =  async(id) =>{
    setLoading(true)
      const deleteCategory = await DeleteService(`category/delete-category/${id}`, true)
      setLoading(false)
      getCategories()

  }
  const addCategory =  async(body) =>{
      setLoading(true)
      const addedCategory = await PostService(`category/add`, true, body)
      setLoading(false)
      getCategories()

  }

  const updateCategory = async (body,id)=>{
    console.log(body)
    setLoading(true)
    const updatedCategory = await PutService(`category/update-category/${id}`, true, body)
    setLoading(false)
    getCategories()
  }
  useEffect(() => {
    getCategories();
  }, []);

  //Columns to generate the data table
  const columns = (data: any) => [
    {
      column: "_id",
      label: "ID",
    },
    {
      column: "name",
      label: "Name",
    },
    {
      column: "image",
      label: "Image",
      render: (value, row: any, data: any) => {
       
        return  <img
        src={`data:image/jpeg;base64,${value}`}
        alt=""
        className="mr-4 max-w-[50px] rounded-full"
      />;
      },
    },
    {
      column: "area",
      label: "Area",
    },
    {
      column: "level",
      label: "Level",
      filter: true,
    },
    {
      column: "parentId",
      label: "Parent",
      render: (value: string | number, row: any, data: any) => {
       
        const parent = data.find((item: any) => item._id == value);
        return <span className="italic">{parent ? parent.name : "None"}</span>;
      },
    },
    {
      column: "actions",
      label: "Manage",
      render: (value: string | number, row: any, data: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => fetchCategory(row?._id)}
            className="px-3 py-1 border border-blue-500 text-blue-500 rounded hover:bg-blue-100"
          >
            Edit
          </button>
          <button
            onClick={() =>{ setSelectedCategory(row); setisDeleteModalOpen(true)}}
            className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  // Function to generate input data including filtering parent options
  const inputData = () => {
      // Filter categories to exclude the selected category itself
      const filteredCategories =
        categories?.filter((cat: any) => cat._id !== SelectedCategory?._id) ||
        [];
        const parent = categories.find(
          (item: any) => item._id == SelectedCategory?.parentId
        );
      return [
        {
          type: "text",
          label: "Name",
          placeholder: "Enter category name",
          name: "name",
          value: SelectedCategory?.name || "",
          required: true,
        },
        {
          type: "select",
          label: "Select Area",
          name: "area",
          options: [
            { label: "admin", value: "admin" },
            { label: "client", value: "client" },
          ],
          value: SelectedCategory?.area || "",
        },
        {
          type: "select",
          label: "Select Parent",
          name: "parentId",
          options: !SelectedCategory?.parentId ? 
          [
            { label: "No parent...", value: null }, // Default option
            ...filteredCategories.map((cat) => ({
              label: cat.name,
              value: cat._id,
            })),
          ]: 
          filteredCategories.map((cat: any) => ({
            label: cat.name,
            value: cat._id,
          })),

          value: parent?._id || "",
        },   {
          type: "file",
          label: "Image",
          name: "imageUpload",
          value: SelectedCategory?.image || "",
        },
      ];
  };
  // Function to generate input data including filtering parent options
  const addData = () => {

      return [
        {
          type: "text",
          label: "Name",
          placeholder: "Enter category name",
          name: "name",
          value:"",
          required: true,
        },
        {
          type: "select",
          label: "Select Area",
          name: "area",
          options: [
            { label: "admin", value: "admin" },
            { label: "client", value: "client" },
          ],
          value: "client",
        },
        {
          type: "select",
          label: "Select Parent",
          name: "parentId",
          disabled: categories.length < 1,
          options: [
            { label: "Select...", value: null }, // Default option
            ...categories.map((cat) => ({
              label: cat.name,
              value: cat._id,
            })),
          ],
          value: null,
        },
        {
          type: "file",
          label: "Image",
          placeholder: "Enter category Image",
          name: "image",
        },
      ];
  };
  if(loading) return <Loader status={'partial'}/>
  return (
    <div>
      {categories && (
        <DataTable
        addFeature={true}
        isAddModalOpen={isAddModalOpen} 
        onAddModalOpen = {setisAddModalOpen}
        data={categories}
        columns={columns}
        pageSizeOptions={pageSizeOptions}
      />
      )}

      {
        isAddModalOpen && (
          <Modal action="add" modalLabel={'Category'} isOpen={isAddModalOpen} onClose={() => setisAddModalOpen(false)} input={addData} onSubmit={addCategory}/>
        )
      }

      {isEditModalOpen && (
        <Modal action="update" modalLabel={'Category'} isOpen={isEditModalOpen} onClose={() => setisEditModalOpen(false)} input={inputData} onSubmit={updateCategory} data={SelectedCategory}/> 
      )}
{isDeleteModalOpen && (
  <Modal action="delete" modalLabel={'Category'} isOpen={isDeleteModalOpen} onClose={() => setisDeleteModalOpen(false)} onSubmit={deleteCategory} data={SelectedCategory}/>

)}
    </div>
  );
};

export default Category;
