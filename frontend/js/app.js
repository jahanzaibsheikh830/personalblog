var request = new XMLHttpRequest();
var url =  "https://personal-blog-jahan.herokuapp.com/"
functionaries  loginDash() {
    var adminEmail = document.getElementById('adminEmail').value
    var adminPass = document.getElementById('adminPass').value

    var admin = {
        email: adminEmail,
        password: adminPass
    }
    request.open("POST", url+"/login");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(admin))
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            var jsonRes = JSON.parse(request.responseText);

            if (jsonRes.status === 200) {
                alert(jsonRes.message);
                location.href = "./dashboard.html"
            }
            else {
                alert(jsonRes.message)
            }
        }
    }
    return false
}
function addPost() {
    var addTitle = document.getElementById('addTitle').value;
    var addDescription = document.getElementById('addDescription').value;
    var post = {
        title: addTitle,
        description: addDescription
    }
    document.getElementById('addTitle').value = "";
    document.getElementById('addDescription').value = "";

    // var url = "http://localhost:5000/dashboard";
    request.open("POST", url+"/dashboard");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(post));
    request.onreadystatechange = (e) => {
        if (request.readyState === 4) {

            let jsonRes = JSON.parse(request.responseText)
            alert(jsonRes.message)
            let html = "";
            jsonRes.post.forEach(function (element, index) {
                html += `<div class="card border my-3 col-md-12" >
            <div class="card-body mr-5">
            <h2 id="title">${element.title}</h2>
            <span id="date">${element.date}</span>
            <p id="descrip">${element.description}</p>
            <button class="btn btn-primary" style="background-color: #c18f59; border-color: #c18f59;" id="index" onclic="del(this.id)">Delete
            Post</button>
            </div>
            </div>`
            });
            var posts = document.getElementById('posts');
            posts.innerHTML = html;
        }
    }
    return false
}
const loadPost = () => {
    // var url = "http://localhost:5000/getPosts";
    request.open("GET", url+"/getPosts");
    request.send();

    request.onreadystatechange = (e) => {

        let jsonRes = JSON.parse(request.responseText)
        console.log(jsonRes);
        let html = "";

        jsonRes.forEach(function (element, index) {
            html += `<div class="card border my-3 col-md-12 text-white " style="background-color: #c18f59;">
            <div class="card-body mr-5" >
            <h1 id="title">${element.title}</h1>
            <span id="date">${element.date}</span>
            <p id="descrip">${element.description}</p>
            </div>
            </div>`
        });
        var blogposts = document.getElementById('blogposts');
        blogposts.innerHTML = html;
    }
}

const admin = () => {

    // var url = "http://localhost:5000/getPosts";
    request.open("GET", url+"/getPosts");
    request.send();

    request.onreadystatechange = (e) => {
        let jsonRes = JSON.parse(request.responseText)
        console.log(jsonRes);
        let html = "";
        jsonRes.forEach(function (element, index) {
            html += `<div class="card border my-3 col-md-12">
        <div class="card-body mr-5">
        <h2 id="title">${element.title}</h2>
        <span id="date">${element.date}</span>
        <p id="descrip">${element.description}</p>
        <button class="btn btn-primary" style="background-color: #c18f59;
        border-color: #c18f59;" id="${index}" onclick="del(this.id)">Delete
        Post</button>
        </div>
        </div>`
        });
        var posts = document.getElementById('posts');
        posts.innerHTML = html;
    }
}

function del(index) {
    console.log(index)
    // var url = "http://localhost:5000/del";
    request.open("POST", url+"/del");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({
        i: index
    }));
    request.onreadystatechange = (e) => {
        let jsonRes = JSON.parse(request.responseText)
        console.log(jsonRes)
        // console.warn(xhr.responseText)
    }
    admin();
}


