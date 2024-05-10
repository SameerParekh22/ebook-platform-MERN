const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
const cors = require('cors')
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
    useNewUrlParser: true,
    useUnifiedTopology: true
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
  title: String,
  author: String,
  category: String,
  coverImage: String,
  pdfUrl: String
});
const Book = mongoose.model('books', bookSchema);

// Route for uploading a new book
app.post('/upload-book', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
// const { title, author, category } = req.body;
// const coverImage = req.files['coverImage'][0].path
// const pdf = req.files['pdf'][0].path;
//const pdf = req.file.fieldname;

try {
  const { title, author, category } = req.body;
  const coverImage = req.files['coverImage'][0].path
  const pdf = req.files['pdf'][0].path;
  const newBook = new Book({
    title,
    author,
    category,
    coverImage,
    pdfUrl: pdf
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

app.patch("/book/:id", async(req,res) =>{
  const id = req.params.id;
  const updateBookData = req.body;
  const filter = {_id: new ObjectId(id)};
  const options = {upsert: true};

  const updateDoc = {
    $set: {
      ...updateBookData
    }
  }

  //update 
  const result = await Book.updateOne(filter, updateDoc, options);
  res.send(result)

})

