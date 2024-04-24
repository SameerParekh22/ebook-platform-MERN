import React, { useState } from 'react'
import Select from 'react-select';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
const UploadBook = () => {
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
  }

  return (
  
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>
      <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First Row is here */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" 
              value="Book Title" />
            </div>
          <TextInput id="bookTitle" 
          name='bookTitle'
          placeholder="Enter Title Of Your Piece Of Work" 
          required
          type="text" />
          </div>

          {/* Author Name Field Here */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="authorName" 
              value="Author Name" />
            </div>
          <TextInput id="authorName" 
          name='authorName'
          placeholder="Enter Author Name" 
          required
          type="text" />
          </div>
        </div>
        {/* Second row of fields are under here */}
        {/* Iamge URL Field Here, have to change it */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="imageURL" 
                value="Book Image URL" />
              </div>
            <TextInput id="imageURL" 
            name='imageURL'
            placeholder="Book Image URL" 
            required
            type="text" />
          </div>

            {/* Category */}
            <div className='lg:w-1/2'>
              <div className="mb-2 block">
                <Label htmlFor="inputState" 
                value="Book Category" />
              </div>
            <Select id = 'inputState' name = 'categoryName' className='w-full rounded' value={selectedBookCaterogy} onChange={handleChangeSelectedValue}>
            {
              bookCategories.map(
                (option) => <option key = {option} value = {option}>{option}</option>
              )
            }
            </Select>
        </div>
      </div>
    </form>
    </div>
  )
}
export default UploadBook