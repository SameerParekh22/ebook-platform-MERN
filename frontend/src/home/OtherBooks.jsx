import React, { useEffect, useState } from 'react'
import BookCards from '../components/BookCards';
//using slice to show only those specific books from the database
const OtherBooks = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/all-books").then(res=>res.json()).then(data => setBooks(data)) //data.slice(4,8)
    })

    return (
    <div>
        <BookCards books = {books} headline="Other Books" />
    </div>
  )
}

export default OtherBooks