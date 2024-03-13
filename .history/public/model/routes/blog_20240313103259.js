const express=require("express")
const route=express.Router()
const { v4: uuidv4 } = require('uuid');
route.post("/addblog",async(req,res)=>{
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


route.get("/delete/:blogId",async(req,res)=>{
    console.log(req.params);
    let blogId=req.params.blogId
    await Blog.deleteOne({blogId})
    blogs=blogs.filter((item)=>item.blogId!=req.params.blogId)
    res.redirect("/getblogs")
})

route.get("/update/:blogId",async(req,res)=>{
    
    let blogId=req.params.blogId
    let updateBlog = await Blog.findOne({blogId})
    res.render("updateblog",{
        updateBlog
    })
})


route.post("/updateblog",async(req,res)=>{
   
    const {name,Class,blog,blogId}=req.body
    const newObj={
        name,
        Class,
        blog,
        blogId
    }

   await Blog.updateOne({blogId},newObj)

    res.redirect("/getblogs")
})

module.export=routes;