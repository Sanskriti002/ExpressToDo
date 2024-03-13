const express=require("express")
const app=express()
const path=require("path")
const PORT=4444;
const hbs = require('hbs');
const mongoose=require('mongoose');

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

let blogs=[]

app.use("/",(req,res,next)=>{
    next()
})

app.get("/",(req,res)=>{
    res.send("Response through get method!")
})

app.get("/random2",(req,res)=>{
    res.render("array")
})

app.get("/getblogs",async(req,res)=>{
    let blogs=await Blog.find()
    res.render("blogpage",{
        blogs:blogs
    })
})

app.use("/",require("./routes/blog"))

mongoose.connect('mongodb://127.0.0.1:27017/BlogPage')
.then(()=>{

app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT);
})
})