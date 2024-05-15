const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const path = require('path');
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
const cors = require('cors')

const fs = require('fs');
const pdf = require('pdf-lib');
//middleware
app.use(cors());
app.use(express.json());
//To make files accessible from anywhere we use the following line of code
app.use("/uploaded",express.static('uploaded'))



app.get('/',(req,res) => {
    res.send("Hello World!")
})

app.listen(port, (err) => {
    if(err){
        console.log(err)
    }
    else{
    console.log(`Example app listening on port ${port}`)
    }
})

//mongoDB Configuration
const mongo_password = process.env.MONGO_PASSWORD
mongoose.connect(`mongodb+srv://ebook-store:${mongo_password}@cluster0.3tcvnlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{
    //useNewUrlParser: true,
    //useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => console.error('Error connecting to MongoDB:', err));


//MULTER CONFIGURATION
const multer = require('multer');
const { ObjectId } = require('mongodb');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploaded/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

// app.post("/upload-book",upload.single("file"),async(req, res) => {
//     console.log(req.file);
//   }

//Book Schema is defined here
const bookSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  author: String,
  category: String,
  description: String,
  coverImage: String,
  pdfUrl: String,
  price: Number
});
const Book = mongoose.model('books', bookSchema);

// Route for uploading a new book
app.post('/upload-book', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
// const { title, author, category } = req.body;
// const coverImage = req.files['coverImage'][0].path
// const pdf = req.files['pdf'][0].path;
//const pdf = req.file.fieldname;

try {
  const { title, author, category, description, price } = req.body;
  const coverImage = req.files['coverImage'][0].path
  const pdf = req.files['pdf'][0].path;
  const newBook = new Book({
    title,
    author,
    category,
    description,
    coverImage,
    pdfUrl: pdf,
    price
  });
  await newBook.save();
  res.status(201).json({ message: 'Book uploaded successfully' });
} catch (error) {
  console.error('Error uploading book:', error);
  res.status(500).json({ message: 'Failed to upload book' });
}
});

app.get("/all-books",async(req,res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

//following patch method is to update a book using its ID
app.patch("/book/:id", upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async(req, res) => {
  const id = req.params.id;
  const updateBookData = req.body;
  const filter = { _id: new ObjectId(id) };

  if (req.body.price) {
    updateBookData.price = req.body.price;
  }
  
  if (req.files['coverImage']) {
    updateBookData.coverImage = req.files['coverImage'][0].path;
  }
  
  if (req.files['pdf']) {
    updateBookData.pdfUrl = req.files['pdf'][0].path;
  }

  try {
    const updateDoc = {
      $set: {
        ...updateBookData
      }
    };

    const result = await Book.updateOne(filter, updateDoc);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ message: 'Failed to update book' });
  }
  })


  //for deleting a book data
  app.delete("/book/:id", async(req,res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const result = await Book.deleteOne(filter);
    res.send(result);
  })

  //finding book by category
  app.get("",async(req,res)=>{
    let query = {};
    if(req.query?.category){
      query = {category: req.query.category}
    }

    const result = await Book.find(query);
    res.send(result);
  })

  //to get single book data
  app.get("/book/:id",async(req,res)=>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const result = await Book.findOne(filter);
    res.send(result)
  })

  //to get a preview pages of uploaded pdf
  // Route to generate preview PDF
app.get('/preview/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingPdfBytes = fs.readFileSync(path.join(__dirname, book.pdfUrl));
    const pdfDoc = await pdf.PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const totalPages = pages.length;

    const previewDoc = await pdf.PDFDocument.create();
    const previewPageCount = Math.min(30, totalPages);

    for (let i = 0; i < previewPageCount; i++) {
      const [copiedPage] = await previewDoc.copyPages(pdfDoc, [i]);
      previewDoc.addPage(copiedPage);
    }

    const previewPdfBytes = await previewDoc.save();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=preview.pdf');
    res.send(Buffer.from(previewPdfBytes));
  } catch (error) {
    console.error('Error generating preview:', error);
    res.status(500).json({ message: 'Failed to generate preview' });
  }
});
