document.addEventListener("DOMContentLoaded", function() {
    const bookList = document.getElementById("list-panel")
    const books = document.getElementById("list")
    const details = document.getElementById("show-panel")

    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(data => {
        data.forEach((book) => {
            let li = document.createElement("li")
            li.innerText = book.title
            books.appendChild(li)
            li.addEventListener('click', ()=>{
                details.innerHTML=''
                displaydetails(book)
            })
        })
    })
    function displaydetails(book){
        let div = document.createElement('div')
        let img = document.createElement('img')
        let name = document.createElement('h2')
        let auth = document.createElement('h3')
        let desc = document.createElement('p') 
        let ul = document.createElement('ul')
        let btn = document.createElement('button')

        img.src = book.img_url
        name.innerText = book.title
        auth.innerText = book.author
        desc.innerText = book.description
        book.users.forEach(user => {
            let userList = document.createElement('li')
            userList.innerText = user.username
            ul.appendChild(userList)
        })
        btn.innerText = 'Like'
        div.appendChild(img)
        div.appendChild(name)
        div.appendChild(auth)
        div.appendChild(desc)
        div.appendChild(ul)
        div.appendChild(btn)
        details.appendChild(div)

        btn.addEventListener('click', () =>{
            likeFnctn(book.id, book.users)
        })
    }
    function likeFnctn(id, users){
        let userInfo = {
            users:[
                ...users,
                {
                    id: (users.length++),
                    username: "new guy"
                }
            ]
        }
        fetch(`http://localhost:3000/books/${id}`, {
            method: 'PATCH', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
});
