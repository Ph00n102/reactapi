var Express = require("express")
var Mogoclient = require("mongodb").MongoClient
var cors = require("cors")
const multer = require("multer")

var app = Express()
app.use(cors())

var CONNECTION_STRING="mongodb://localhost:27017"

var DATABASENAME = "todoappdb"
var database
app.listen(5038,() => {
    Mogoclient.connect(CONNECTION_STRING,(error,client)=>{
        database = client.db(DATABASENAME)
        console.log("Mongo DB Connection Successful")
    })
})

app.get('/api/todoapp/GetNotes',(request,response)=>{
    database.collection("todoappcollection").find({}).toArray((error,result)=>{
        response.send(result)
    })
})

app.post('/api/todoapp/AddNotes' ,multer().none(),(request,response)=>{
    database.collection("todoappcollection").count({},function(error,numOfDocs){
        database.collection("todoappcollection").insertOne({
            id:(numOfDocs+1).toString(),
            doscription:request.body.newNotes
        })
        response.json("Added Succesfully")
    })
})

app.delete('/api/todoapp/DeleteNotes',(request,response)=>{
    atabase.collection("todoappcollection").deleteOne({
        id:request.query.id
    })
    response.json("Delete Succesfully")
})