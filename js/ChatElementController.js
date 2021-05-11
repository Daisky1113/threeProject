class ChatElementController {
    constructor() {
        this.wrapperElement = document.querySelector('#js-cahtContents')
        this.chatsWrapper = this.wrapperElement.querySelector('#js-chatTextsArea')
        this.chatInput = this.wrapperElement.querySelector('#js-chatInput')
        this.chatSendBtn = this.wrapperElement.querySelector('#js-chatSendBtn')
        this.isScrollEnd = false
        this.scrollVal = 0
    }

    get inputVal() {
        return this.chatInput.value
    }

    show() {
        this.wrapperElement.classList.remove('inVisible')
    }

    hide() {
        this.wrapperElement.classList.add('inVisible')
    }

    clearInputArea() {
        this.chatInput.value = ''
    }

    setScrollVal() {
        this.scrollVal = this.chatsWrapper.scrollTop + this.chatsWrapper.clientHeight
    }

    setIsScrollEnd() {
        this.isScrollEnd = this.scrollVal == this.chatsWrapper.scrollHeight
    }

    scrollToEnd(type) {
        setTimeout(() => {
            this.chatsWrapper.scrollTo({
                top: this.chatsWrapper.scrollHeight,
                left: 0,
                behavior: type
            })
        }, 100)
    }

    _createChat(data) {
        const chatWrapper = document.createElement('div')
        chatWrapper.id = data.id
        chatWrapper.classList.add('chat-text-wrapper')

        const chatText = document.createElement('div')
        chatText.classList.add('chat-text')
        chatText.classList.add('parent')
        data.myChat && chatText.classList.add('my-chat')

        const chatHeader = document.createElement('div')
        chatHeader.classList.add('chat-header')

        const avator = document.createElement('img')
        avator.classList.add('avator')
        avator.src = `img/${data.avator}`

        const userName = document.createElement('div')
        userName.classList.add('user-name')
        userName.textContent = data.name

        const chatBody = document.createElement('div')
        chatBody.classList.add('chat-body')

        const userComment = document.createElement('div')
        userComment.classList.add('user-comment')
        userComment.textContent = data.msg

        const chatActions = document.createElement('div')
        chatActions.classList.add('chat-actions')

        const likeBtn = document.createElement('span')
        likeBtn.classList.add('btn-wrapper')
        const likeIcon = document.createElement('i')
        likeIcon.classList.add('lar', 'la-heart')

        const commentBtn = document.createElement('span')
        commentBtn.classList.add('btn-wrapper')
        const commentIcon = document.createElement('i')
        commentIcon.classList.add('lar', 'la-comment')

        likeBtn.insertAdjacentElement('beforeend', likeIcon)

        commentBtn.insertAdjacentElement('beforeend', commentIcon)

        chatActions.insertAdjacentElement('beforeend', likeBtn)
        chatActions.insertAdjacentElement('beforeend', commentIcon)

        chatBody.insertAdjacentElement('beforeend', userComment)
        chatBody.insertAdjacentElement('beforeend', chatActions)

        chatHeader.insertAdjacentElement('beforeend', avator)
        chatHeader.insertAdjacentElement('beforeend', userName)

        chatText.insertAdjacentElement('beforeend', chatHeader)
        chatText.insertAdjacentElement('beforeend', chatBody)

        chatWrapper.insertAdjacentElement('beforeend', chatText)

        return chatWrapper
    }

    addChat(data) {
        const chat = this._createChat(data)
        console.log(this.wrapperElement.clientHeight)
        this.chatsWrapper.insertAdjacentElement('beforeend', chat)
    }
}