const express = require("express")

const app = express()
const moment = require("moment")
const conn = require('./db/index.js')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
// 设置 默认采用的模板引擎名称
app.set("view engine", 'ejs')
app.set('views', './views')
app.use("/node_modules", express.static('./node_modules'))
app.get("/", (req, res) => {

    res.render('index.ejs', {})
})
//在这里./是相对路径，相对于views
//请求注册页面
app.get("/register", (req, res) => {

    res.render("./user/register.ejs", {})
})
//请求登录页面
app.get("/login", (req, res) => {

    res.render("./user/login.ejs", {})
})
//注册新用户
app.post("/register", (req, res) => {
    const body = req.body
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 ||
        body.nickname.trim().length <= 0) {
        res.send({
            status: 501,
            msg: "请填写正确的表单格式数据在进行注册"
        })
    }
    const sqlregister = "select count(*) as count from my_blog where username=? "
    conn.query(sqlregister, body.username, (err, result) => {
        if (err) return res.send({
            static: 400,
            msg: '用户名查重失败'
        })
    })
    body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
    const sql1 = "insert into my_blog set ?"
    conn.query(sql1, body, (err, result) => {
        if (err) return res.send({
            status: 400,
            msg: "注册失败"
        })
        if (result.affectedRows !== 1) return res.send({
            status: 401,
            msg: "注册失败"
        })
        res.send({
            status: 200,
            msg: "注册成功"
        })
    })

})
// 登录页面监听
app.post("/login", (req, res) => {
    const body = req.body
    // console.log(body)
    const sqlLogin = "select * from my_blog where username=? and password=?"
    conn.query(sqlLogin, [body.username, body.password], (err, result) => {
        if (err) return res.send({
            status: 500,
            msg: "用户名或密码错误"
        })
        if (result.length !== 1) return res.send({
            msg: '用户登录失败',
            status: 502
        })
        res.send({
            status: 200,
            msg: "登录成功"
        })
    })
})
app.listen(3000, () => {


    console.log("my_blog server running at http://127.0.0.1:3000")
})