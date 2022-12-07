
console.log('client running');

let heading = document.createElement('h1')
fetch('http://localhost:8080/api').then(res => res.json()).then(res => {
    console.log(document.getElementById("root"))
    heading.textContent = res.message
    document.getElementById("root")?.appendChild(heading)
})
