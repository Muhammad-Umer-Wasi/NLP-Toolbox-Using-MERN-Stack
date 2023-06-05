const express = require("express")
const app = express()
const routes = require("./Routes/routes")

app.set("view engine", "ejs")
app.use("/",routes)
app.listen(5000, function(){
    console.log("Listening at port 5000")
})