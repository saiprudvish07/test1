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
 
//add to cart
userApi.post("/add-to-cart", expressErrorHandler(async (req, res, next) => {

  let userCartCollectionObject = req.app.get("userCartCollectionObject")

  let newProdObject = req.body;
//console.log(newProdObject)

  //find usercartcollection 
  let userCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
// console.log(userCartObj)
  //if userCartObj is not existed
  if (userCartObj === null) {

      //create new object
      let products = [];
     // let name=[];
     
      products.push(newProdObject.productObject)
     
  
      //names.push(newProdObject.productObject.name)
      //console.log(newProdObject.productObject.name)
      //console.log(names)
      // for( var i = 0; i < products.length; i++){ 
  
      //     if ( products[i].pr=== ) { 
      
      //         arr.splice(i, 1); 
      //     }
      
      // }

      let newUserCartObject = { username: newProdObject.username, products }

      //insert it

      await userCartCollectionObject.insertOne(newUserCartObject)

      let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
      res.send({ message: "New product Added", latestCartObj: latestCartObj })

  }
  //if existed
  else {
// console.log(newProdObject.productObject.name)
           //console.log(userCartObj.products)
           
       
         userCartObj.products.push(newProdObject.productObject)
         await userCartCollectionObject.updateOne({ username: newProdObject.username }, { $set: { ...userCartObj } })
         let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
         res.send({ message: "New product Added", latestCartObj: latestCartObj })
         
           
    
    
  }




}))


//get products from user cart

userApi.get("/getproducts/:username", expressErrorHandler(async (req, res, next) => {

  let userCartCollectionObject = req.app.get("userCartCollectionObject")

  let un = req.params.username;
   //console.log(un)
  let userProdObj = await userCartCollectionObject.findOne({ username: un })
  console.log(userProdObj)
  if (userProdObj.products.length() === 0) {
      res.send({ message: "Cart-empty" })
  }
  else {
      res.send({ message: userProdObj })
  }

}))











//export userApi
module.exports=userApi; 