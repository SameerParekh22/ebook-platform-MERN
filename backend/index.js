const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
const mongoose = require('mongoose');
const cors = require('cors')
//middleware
app.use(cors());
app.use(express.json());

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
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const uri = `mongodb+srv://ebook-store:${mongo_password}@cluster0.3tcvnlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //Creating a collection of documents
    //const bookCollections = client.db("BookInventory").collection("books");

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


//MULTER CONFIGURATION
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'files/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

// app.post("/upload-book",upload.single("file"),async(req, res) => {
//     console.log(req.file);
//   })

//Book Schema is defined here
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    coverImage: String,
    pdfUrl: String
  });
const Book = mongoose.model('BookInventory', bookSchema);

// Route for uploading a new book
app.post('/upload-book', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), async (req, res) => {
    const { title, author, category } = req.body;
    const coverImage = req.files['coverImage'][0].path;
    const pdf = req.files['pdf'][0].path;
  
    try {
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