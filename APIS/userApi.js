//create mini express application
const exp=require("express")

const expressErrorHandler = require("express-async-handler")
const userApi=exp.Router();

userApi.use(exp.json())





//to read all products
userApi.get("/getitems", expressErrorHandler(async (req, res, next) => {

  let itemsCollectionObj = req.app.get("itemsCollectionObj")

  let products = await itemsCollectionObj.find().toArray()
 
  res.send({ message: products })

}))
 
 











//export userApi
module.exports=userApi; 