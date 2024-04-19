// const express = require('express')
// const app = express()
// const port = process.env.PORT || 5000

// //middleware
// app.use(cors());
// app.use(express.json());

// app.get('/',(req,res) => {
//     res.send("Hello World!")
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

const express = require("express")
var mysql = require("mysql")
var app = express()
const port = process.env.PORT || 5000
app.use(express.json())

const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test1'

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

    con.query('insert into db values(?,?,?)',[id,name,rollnumber],(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            console.log(`Example app listening on port ${port}`)
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

app.listen(port, (err) => {
    if(err){
        console.log(err)
    }
    else{
    console.log(`Example app listening on port ${port}`)
    }
})