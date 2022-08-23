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

let idd=newProdObject.productObject.foodid;
  //find usercartcollection 
  let userCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
    //console.log(userCartObj)
   
  //if userCartObj is not existed
  if (userCartObj === null) {
      

    let cntarray = [];


    obj={
        fid:idd,
        details:{
        product:newProdObject.productObject
        },
        cnt:1
    }

     cntarray.push(obj)
    
      
   
            let products = [];
  


      products.push(newProdObject.productObject)

      let newUserCartObject = { username: newProdObject.username, products }
     
      //insert it
        // console.log(newUserCartObject)
      await userCartCollectionObject.insertOne(newUserCartObject)

      let latestCartObj = await userCartCollectionObject.findOne({ username: newProdObject.username })
      res.send({ message: "New product Added", latestCartObj: latestCartObj })

  }
  //if existed
  else {

  
         
 

const index = userCartObj.products.findIndex(object => {
 return object.foodid === idd;
});

if (index !== -1) {

  userCartObj.products[index].foodcount ++ ;
}
else{
//console.log(userCartObj)
//userCartObj.cntarray.push(obj);
userCartObj.products.push(newProdObject.productObject)
}
console.log(userCartObj)
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
  //console.log(userProdObj.products)
  if (userProdObj.products.length === 0) {
      res.send({ message: "Cart-empty" })
  }
  else {
      res.send({ message: userProdObj })
  }

}))




//del from cart
userApi.post("/del-from-cart", expressErrorHandler(async (req, res, next) => {

  let userCartCollectionObject = req.app.get("userCartCollectionObject")
  let j=req.body.username
  let  i= req.body.item;
 let userCartObj = await userCartCollectionObject.findOne({ username: j })
 const index = userCartObj.products.findIndex(object => {
  return object.foodid === i;
 });
//console.log(userCartObj)
 if (index !== -1) {
  if(userCartObj.products[index].foodcount > 0){
  userCartObj.products[index].foodcount -- ;
  await userCartCollectionObject.updateOne({ username: j }, { $set: { ...userCartObj } })
  }
  if(userCartObj.products[index].foodcount === 0){
    let c= await userCartCollectionObject.updateOne( { "username": j }, { $pull: { "products": { "foodid": i } } } )
  
  }
}

else{
  res.send({message:"no item to delete"})
}


     res.send({message:"item removed"})

}))






//export userApi
module.exports=userApi; 