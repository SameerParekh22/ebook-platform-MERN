/*MYSQL CONFIGURATION

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ebook'

})

con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log(`Connection successfull`)
    }
})

app.post('/upload-book', async(req,res)=>{
    const id = req.body.id;
    const name = req.body.name;
    const rollnumber= req.body.rollnumber;

    con.query('insert into book values(?,?,?)',[id,name,rollnumber],(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(`Successfully created customer with id:${id}`)
        } 
    })
})

app.post('/upload-book', async(req,res)=>{
    var data = {
        id: id,
        authorName: req.body.authorName,
        category: req.body.category,
        description: req.body.description,
        title: req.body.title,
        image: req.file.imagename,
        bookPDF: req.file.filename,
    }
    con.query('insert into book values ? ',[data],(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
             console.log(`Successfully created book with id:${id}`)
            } 
        })
    })

//below code is to fetch data by particular ID

app.get('/fetchbyid/:id', async(req,res)=>{
    const fetchid = req.params.id;
    con.query('select * from db where id = ?',fetchid,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            if(result.length==0)
            {
                console.log("id not present")
            }
            else{
                var value=JSON.parse(JSON.stringify(result))
                res.send(result)
                //for converting to JSON format
                //console.log(JSON.parse(JSON.stringify(result)))
            }
            
        } 
    })  
})

//The below code is to fetch all the data from database

app.get("/fetchall",async(req,res)=>{
    con.query("select * from db", function(err,result,fields){
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.send(result)
        }

    })
})
*/


//mongoDB Configuration
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const mongo_username = process.env.MONGO_USERNAME;
// const mongo_password = process.env.MONGO_PASSWORD;
// const uri = `mongodb+srv://ebook-store:${mongo_password}@cluster0.3tcvnlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     //Creating a collection of documents
//     const bookCollections = client.db("BookInventory").collection("books");
    
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);







