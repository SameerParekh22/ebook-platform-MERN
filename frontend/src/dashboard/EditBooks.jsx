import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react";
const EditBooks = () => {
  const {id} = useParams();
  const {title,author,category,description,coverImage,pdfUrl,price} = useLoaderData();
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Poem",
    "ShortStory",
    "Fantasy",
    "Horror",
    "History",
    "Self-Help",
    "Bussiness",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design",
    "Other"
  ]
  const [selectedBookCaterogy,setSelectedBookCategory] = useState(bookCategories[0]);

  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };

  // handling book submission in following function
  const handleUpdate = async (event) => {
    event.preventDefault();
    const form = event.target;

    const formData = new FormData(form);
    

    const updateBookObj = {
      title: formData.get('title'),
      author: formData.get('author'),
      category: formData.get('category'),
      description: formData.get('description'),
      // Handling coverImage file upload
      coverImage: formData.get('coverImage'),
      // Handling PDF file upload
      pdfUrl: formData.get('pdf'),
      price: formData.get('price')
  };
  console.log(updateBookObj)
  try {
    const response = await fetch(`http://localhost:8000/book/${id}`, {
      method: "PATCH",
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Book Updated Successfully!");
    } else {
      const errorMessage = await response.text();
      console.error("Failed to update book: ", errorMessage);
      alert("Failed to update book");
    }
  } catch (error) {
    console.error("Failed to update book:", error);
    alert('Failed to update book');
  }
};

  return (
  
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>
      <form enctype="multipart/form-data" onSubmit = {handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First Row is here */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" 
              value="Book Title" />
            </div>
          <TextInput id="title" 
          name='title'
          placeholder="Enter Title Of Your Writing" 
          required
          type="text" 
          defaultValue={title}/>
          </div>

          {/* Author Name Field Here */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" 
              value="Author Name" />
            </div>
          <TextInput id="author" 
          name='author'
          placeholder="Enter Author Name" 
          required
          type="text" 
          defaultValue={author}/>
          </div>
        </div>
        {/* Second row of fields are under here */}

        {/* Image URL Field Here, have to change it */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload Cover Photo Of Your Book</label>
            <input 
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id = "cover_image"
              type = "file"
              name = "coverImage" // Set the name attribute to match the key used in FormData
              accept = ".jpg, .jpeg, .png"
              required
            >
            </input>
            
          </div>

            {/* Category */}
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="inputState" 
                value="Book Category" />
              </div>
            <Select id = 'inputState' name = 'category' className='w-full rounded' value={selectedBookCaterogy} onChange={handleChangeSelectedValue}>
            {
              bookCategories.map(
                (option) => <option key={option} value={option}>{option}</option>
              )
            }
          
            </Select>
        </div>
      
      </div>

      {/*Book Description Goes Here*/}
      <div>
        <div className='mb-2 block'>
          <Label
          htmlFor="description"
          value = "Book Description"
          />
        </div>
        <Textarea
        id="description"
        name="description"
        placeholder="Describe Your Writing In Few Words..."
        required
        className='w-full'
        rows={6}
        defaultValue={description}
        />
      </div>

      {/* Book PDF Upload */}
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">PDF of your Book</label>
        <input 
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        id="book_pdf" 
        type="file"
        name="pdf" // Set the name attribute to match the key used in FormData
        accept = ".pdf"
        required>
        </input>      
      </div>
       {/* Price */}
       <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput id="price" name='price' placeholder="Enter Price" required type="number" />
        </div>
      </div>
      <Button type="submit" className='mt-5'>
        Update Book
      </Button>
    </form>
    </div>
  )
}

export default EditBooks