const express=require("express") 

const app=express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

// 设置 默认采用的模板引擎名称
app.set("view engine",'ejs')
app.set('views','./views')
app.use("/node_modules",express.static('./node_modules'))
app.get("/",(req,res) =>{

    res.render('index.ejs',{})
})
//在这里./是相对路径，相对于views
//请求注册页面
app.get("/register",(req,res) =>{

    res.render("./user/register.ejs",{})
})
//请求登录页面
app.get("/login",(req,res) => {

    res.render("./user/login.ejs",{})
})
//注册新用户
app.post("/register",(req,res) =>{
  res.send({status:200,msg:"注册成功"})
})
app.listen(3000,() =>{


    console.log("my_blog server running at http://127.0.0.1:3000")
})