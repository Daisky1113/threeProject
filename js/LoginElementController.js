class LoginElementController {
    constructor() {
        this.wrapperElement = document.querySelector('#js-loginContents')
        this.loginBtn = document.querySelector('#js-loginBtn')
        this.mailInput = document.querySelector('#js-mail')
        this.passInput = document.querySelector('#js-pass')
        this.logoutBtn = document.querySelector('#js-logoutBtn')
        this.userInfoElement = document.querySelector('#js-userInfo')
        this.userNameElement = this.userInfoElement.querySelector('.user-name')
        this.userAvatorElement = this.userInfoElement.querySelector('img')
    }

    get mailVal() {
        return this.mailInput.value
    }
    get pwVal() {
        return this.passInput.value
    }

    setUserInfo(name, src) {
        this._setUserName(name)
        this._setUserAvator(src)
    }

    showUserInfo() {
        this.userInfoElement.classList.remove('opacity-zero')
    }

    hideUserInfo() {
        this.userInfoElement.classList.add('opacity-zero')
    }

    hide() {
        this.wrapperElement.classList.add('inVisible')
    }

    show() {
        this.wrapperElement.classList.remove('inVisible')
    }

    _setUserName(name) {
        this.userNameElement.textContent = name
    }

    _setUserAvator(src) {
        this.userAvatorElement.setAttribute('src', `img/${src}`)
    }

}