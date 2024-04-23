import React from 'react'
import {useLoaderData} from 'react-route-dom'

//The useLoaderData hook in React Router 6 is a powerful tool that allows you to fetch data for your routes and 
//make it available to your components before they are rendered. This can be useful for a number of reasons, 
//such as improving performance, preventing empty states, and providing a better user experience.

const SingleBook = () => {
    const {_id} = useLoaderData();


  return (
    <div className='mt-28 px-4 lg:px-24'>
        <img src={imageURL} alt="" className='h-96'/>
        <h2>{bookTitle}</h2>
    </div>
  )
}

export default SingleBook