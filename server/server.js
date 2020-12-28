var admin = {
    email: "admin@gmail.com",
    password: "admin123"
}
var post = [
    // {
    //     title: "First Post",
    //     date: "5-3-2019",
    //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis ipsum dolor odio quae sequi maiores molestias explicabo. Rerum cum ipsam, asperiores, labore possimus rem facere ab, dolores placeat dicta inventore."
    // },
    // {
    //     title: "Second Post",
    //     date: "5-3-2019",
    //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis ipsum dolor odio quae sequi maiores molestias explicabo. Rerum cum ipsam, asperiores, labore possimus rem facere ab, dolores placeat dicta inventore."
    // },
    // {
    //     title: "Third Post",
    //     date: "5-3-2019",
    //     description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis ipsum dolor odio quae sequi maiores molestias explicabo. Rerum cum ipsam, asperiores, labore possimus rem facere ab, dolores placeat dicta inventore."
    // }
]
var express = require("express");
var cors = require('cors')
var morgan = require('morgan')
const PORT = process.env.PORT || 5000
var bodyParser = require('body-parser')
var app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json())

app.get("/", (req, res, next) => {
    res.send("Running");
});
app.post("/login", (req, res, next) => {
    var adEmail = req.body.email;
    var adPass = req.body.password;

    if (admin.email === adEmail && admin.password === adPass) {
        res.send({
            message: "Login",
            status: 200,
        });
    }
    else {
        res.send({
            message: "Wrong",
        });
    }
});

app.post("/del", (req, res, next) => {
    var index = req.body.i
    post.splice(index,1);
    console.log(post);
    res.send(post)
});
app.post("/dashboard", (req, res, next) => {
    let newDate = new Date();
    newDate.toLocaleDateString();
    post.push({
        title: req.body.title,
        date: newDate,
        description: req.body.description
    })
    res.send({
        post: post,
        message: "Post Successfully Created"
    })
});
app.get("/getPosts", (req, res, next) => {
    res.send(post)
});

app.listen(PORT, function () {
    console.log("server is running");
})