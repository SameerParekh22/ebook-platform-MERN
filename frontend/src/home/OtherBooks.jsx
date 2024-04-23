import React, { useEffect, useState } from 'react'
//using slice to show only those specific books from the database
const OtherBooks = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/test1").then(res=>res.json()).then(data => setBooks(data.slice(4,8)))
    })

    return (
    <div>
        <BookCards books = {books} headline="Other Books" />
    </div>
  )
}

export default OtherBooks