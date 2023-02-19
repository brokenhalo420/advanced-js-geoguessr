import initializeGame from "./play"

const baseUrl = process.env.SERVER_BASE_URL

const initializeLogin = (root) => {
    const userName = document.createElement('input')
    userName.placeholder = 'Username'
    const password = document.createElement('input')
    password.setAttribute('type','password')
    password.placeholder = 'Password'

    const submitButton = document.createElement('button')
    submitButton.innerHTML = 'Log in'
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
    root.appendChild(userName)
    root.appendChild(password)
    root.appendChild(submitButton)


}

export default initializeLogin