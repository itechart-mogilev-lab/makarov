import "./style.css"

let div = document.createElement("input")
div.classList = ["container"]

let btn = document.createElement("button")
btn.innerText = "click me"
btn.addEventListener("click", () => {
    document.body.style.backgroundImage = "url(https://avatars.mds.yandex.net/get-pdb/1566774/56103e3e-d845-4baa-b2f2-9c8362616811/orig)"
})
document.body.appendChild(div)
document.body.appendChild(btn)