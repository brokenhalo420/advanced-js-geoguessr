import initializeGame from "./play"

const baseUrl = process.env.SERVER_BASE_URL

const initializeLogin = (root) => {

    const overlay = document.createElement('div')
    overlay.setAttribute('class','overlay')

    const container = document.createElement('div')
    container.setAttribute('class','login-container')

    const header = document.createElement('h1')
    header.innerHTML = "Login"
    header.setAttribute('class',"login-header")

    const userName = document.createElement('input')
    userName.placeholder = 'Username'
    userName.setAttribute('class', 'login-username-field')

    const password = document.createElement('input')
    password.setAttribute('type','password')
    password.placeholder = 'Password'
    password.setAttribute('class','login-password-field')

    const submitButton = document.createElement('button')
    submitButton.innerHTML = 'Log in'
    submitButton.setAttribute('class','login-submit-button')
    submitButton.addEventListener('click', () => {
        console.log(userName.value, password.value)
        const payload = {userName: userName.value, password: password.value}
        fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((res) => {
                if(res.userId) {
                    sessionStorage.setItem("userId", res.userId)
                    initializeGame(root,1)
                }
            })
    })
    
    root.appendChild(overlay)
    container.appendChild(header)
    container.appendChild(userName)
    container.appendChild(password)
    container.appendChild(submitButton)
    root.appendChild(container)


}

export default initializeLogin