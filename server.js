const exp = require('express');

const path=require("path")
const app=exp();
app.use(exp.static(path.join(__dirname,"./dist/vnrcanteen/")))




const userApi=require("./APIS/userApi")
app.use('/user',userApi)















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
