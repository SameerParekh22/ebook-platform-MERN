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


app.listen(port, (err) => {
    if(err){
        console.log(err)
    }
    else{
    console.log(`Example app listening on port ${port}`)
    }
})