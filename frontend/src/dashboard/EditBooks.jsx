import React, { useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import { Button, Checkbox, Label, Select, TextInput, Textarea } from "flowbite-react";
const EditBooks = () => {
  const {id} = useParams();
  const {bookTitle,authorName,imageURL,category,bookDescription,bookPDFURL} = useLoaderData();
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

  const handleUpdate = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };

  //handling book submission in following function
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    //console.log(bookTitle)
    const authorName = form.authorName.value;
    //const authorEmail = form.authorEmail.value;
    const imageURL = form.imageURL.value; //changes required here
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value; //changes required here

    const bookObj = {
      bookTitle,authorName,imageURL,category,bookDescription,bookPDFURL
    }
    console.log(bookObj)
  }

  //sending data to databse
  // fetch("http://localhost:5000/upload-book",{
  //   method: "POST",
  //   headers:{
  //     "Content-type": "application/json",
  //   },
  //   body: JSON.stringify(bookObj)
  // }).then(res=>res.json()).then(data=>{
  //   console.log(data)
  //   alert("Book uploaded successfully!!!")
  // })

  return (
  
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>
      <form onSubmit = {handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        {/* First Row is here */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" 
              value="Book Title" />
            </div>
          <TextInput id="bookTitle" 
          name='bookTitle'
          placeholder="Enter Title Of Your Writing" 
          required
          type="text"
          defaultValue={bookTitle} />
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
          type="text" 
          defaultValue={authorName}/>
          </div>
        </div>
        {/* Second row of fields are under here */}
        {/* Image URL Field Here, have to change it */}
        
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            {/*here*/}
              {/* <div className="mb-2 block"> 
                <Label htmlFor="imageURL" 
                value="Book Image URL" />
              </div>
            <TextInput id="imageURL" 
            name='imageURL'
            placeholder="Book Image URL" 
            required
            type="text" /> */}
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload Cover Photo Of Your Book</label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"></input>
            
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
          htmlFor="bookDescription"
          value = "Book Description"
          />
        </div>
        <Textarea
        id="bookDescription"
        name="bookDescription"
        placeholder="Describe Your Writing In Few Words..."
        required
        className='w-full'
        rows={6}
        defaultValue={bookDescription}
        />
      </div>

      {/* Book PDF Upload */}
      <div className='flex gap-8'>
      <div className='lg:w-1/2'>
      {/* <Label
          htmlFor="bookPDFURL"
          value = "bookPDFURL"
        /> */}
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">PDF of your Book</label>
        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"></input>      
      </div>
      </div>
      {/* Here */}
       {/* <div className='mb-2 block'>
          <Label
          htmlFor="bookPDFURL"
          value = "Book PDF URL"
          />
        </div>
        <TextInput
        id="bookPDFURL"
        name="bookPDFURL"
        placeholder="Describe Your Writing In Few Words..."
        required
        type = "text"/> */}
      <Button type="submit" className='mt-5'>
        Upload Book
      </Button>
    </form>
    </div>
  )

}

export default EditBooks