const exp = require('express');

const path=require("path")
const app=exp();
app.use(exp.static(path.join(__dirname,"./dist/vnrcanteen/")))




const userApi=require("./APIS/userApi")
app.use('/user',userApi)


const mc=require("mongodb").MongoClient

//connection string

//const databaseUrl = process.env.DATABASE_URL;
 const databaseUrl="mongodb+srv://prudvish_database:sai1234@cluster1.bxt0f.mongodb.net/vnrcanteen?retryWrites=true&w=majority"


//connect to DB
mc.connect(databaseUrl, {useNewUrlParser:true,  useUnifiedTopology: true}, (err, client) => {

    if (err) {
        console.log("err in db connection", err);
    }
    else {
        //get database object
        let databaseObj = client.db("vnrcanteen")
        //create collection object
    let  itemsCollectionObj= databaseObj.collection("itemscollection")


    app.set("itemsCollectionObj",itemsCollectionObj)


        console.log("connected to database")

    }
})










//handle invalid path
app.use((req, res, next) => {
  res.send({ message: `path ${req.url} is invalid` })
})

//handle errors
app.use((err, req, res, next) => {
  console.log(err)
  res.send({ message: err.message })

})

  //assign port
const port=3333
app.listen(port,()=>console.log(`server is listening on port ${port}`))
