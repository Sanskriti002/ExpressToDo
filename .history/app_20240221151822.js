const express=require("express")
const app=express()
const path=require("path")
const PORT=4444;
const hbs = require('hbs');
const { v4: uuidv4 } = require('uuid');
const mongoose=require('mongoose');
const { Schema } = mongoose;

const blogSchema=new Schema({
    name:String,
    class:String,
    blog:String,
    blogId:String

})

const Blog = mongoose.model('Blog', blogSchema);

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
// let namearr=["saksham","abhishek","suyash"]
let blogs=[]

app.use("/",(req,res,next)=>{
    // console.log("yeh hamra middleware hai!");
    // res.send("yeh hamar response!")
    next()
})

app.get("/",(req,res)=>{
    res.send("Response through get method!")
})

// app.get("/random",(req,res)=>{
//     res.render("random",{
//         firstname:"saksham",
//         lastname:"mishra"
//     })
// })



app.get("/random2",(req,res)=>{
    res.render("array")
})

app.get("/getblogs",async(req,res)=>{
    let blogs=await Blog.find()
    res.render("blogpage",{
        blogs:blogs
    })
})


app.post("/addblog",async(req,res)=>{
    console.log(req.body);
    const {name,Class,blog}=req.body

    const obj={
        name:name,
        Class:Class,
        blog:blog,
        blogId:uuidv4()
    }
     
   await Blog.create(obj)

   res.redirect("/getblogs")
})


app.get("/delete/:blogId",async(req,res)=>{
    console.log(req.params);
    let blogId=req.params.blogId
    await Blog.deleteOne({blogId})
    blogs=blogs.filter((item)=>item.blogId!=req.params.blogId)
    res.redirect("/getblogs")
})

app.get("/update/:blogId",(req,res)=>{
    const updateBlog=blogs.filter((item)=>item.blogId==req.params.blogId)
    let blog=Blog.updateOne(blog)
    res.render("updateblog",{
        updateBlog:updateBlog[0]
    })
})


app.post("/updateblog",(req,res)=>{
    // console.log(req.body);
    const {name,Class,blog,blogId}=req.body
    const newObj={
        name,
        Class,
        blog,
        blogId
    }

    blogs=blogs.map((item)=>{
        if(item.blogId==blogId){
            return newObj
        }
        return item
    })

    res.redirect("/getblogs")
})

mongoose.connect('mongodb://127.0.0.1:27017/BlogPage')
.then(()=>{

app.listen(PORT,()=>{
    console.log("http://localhost:"+PORT);
})
})