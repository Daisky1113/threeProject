class ChatElementController {
    constructor() {
        this.wrapperElement = document.querySelector('#js-cahtContents')
        this.chatsWrapper = this.wrapperElement.querySelector('#js-chatTextsArea')
        this.chatInput = this.wrapperElement.querySelector('#js-chatInput')
        this.chatSendBtn = this.wrapperElement.querySelector('#js-chatSendBtn')
        this.isScrollEnd = false
        this.scrollVal = 0
        this.likeCallback = () => { }
        this.commentCallback = () => { }
        this.replyCallback = () => { }
        this.editCallback = () => { }
        this.deleteCallback = () => { }
    }

    get inputVal() {
        return this.chatInput.value
    }

    setCallbacks(callback) {
        this.likeCallback = callback.likeCallback
        this.commentCallback = callback.commentCallback
        this.replyCallback = callback.replyCallback
        this.editCallback = callback.editCallback
        this.deleteCallback = callback.deleteCallback
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
        chatWrapper.classList.add('chat-text-wrapper', 'js-chat-text-wrapper')

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
        const likeCount = document.createElement('span')
        likeCount.classList.add('js-likeCount', 'like-count')
        if (data.likedUsers && data.likedUsers.includes(data.uid)) {
            likeIcon.classList.add('my-like')
            likeCount.textContent = data.likedUsers.length
        }
        likeBtn.insertAdjacentElement('beforeend', likeIcon)
        likeBtn.insertAdjacentElement('beforeend', likeCount)

        const commentBtn = document.createElement('span')
        commentBtn.classList.add('btn-wrapper')
        const commentIcon = document.createElement('i')
        commentIcon.classList.add('lar', 'la-comment')
        commentBtn.insertAdjacentElement('beforeend', commentIcon)

        const replyBtn = document.createElement('span')
        replyBtn.classList.add('btn-wrapper')
        const replyIcon = document.createElement('i')
        replyIcon.classList.add('las', 'la-reply')
        replyBtn.insertAdjacentElement('beforeend', replyIcon)

        chatActions.insertAdjacentElement('beforeend', likeBtn)
        chatActions.insertAdjacentElement('beforeend', commentBtn)
        chatActions.insertAdjacentElement('beforeend', replyBtn)



        if (data.myChat) {
            const editBtn = document.createElement('span')
            editBtn.classList.add('btn-wrapper')
            const editIcon = document.createElement('i')
            editIcon.classList.add('lar', 'la-edit')

            editBtn.insertAdjacentElement('beforeend', editIcon)


            const deleteBtn = document.createElement('span')
            deleteBtn.classList.add('btn-wrapper')
            const deleteIcon = document.createElement('i')
            deleteIcon.classList.add('lar', 'la-trash-alt')
            deleteBtn.insertAdjacentElement('beforeend', deleteIcon)

            chatActions.insertAdjacentElement('beforeend', deleteBtn)
            chatActions.insertAdjacentElement('beforeend', editBtn)
            chatActions.insertAdjacentElement('beforeend', replyBtn)
            chatActions.insertAdjacentElement('beforeend', commentBtn)
            chatActions.insertAdjacentElement('beforeend', likeBtn)
        } else {
            chatActions.insertAdjacentElement('beforeend', likeBtn)
            chatActions.insertAdjacentElement('beforeend', commentBtn)
            chatActions.insertAdjacentElement('beforeend', replyBtn)
        }



        chatBody.insertAdjacentElement('beforeend', userComment)
        chatBody.insertAdjacentElement('beforeend', chatActions)

        chatHeader.insertAdjacentElement('beforeend', avator)
        chatHeader.insertAdjacentElement('beforeend', userName)

        chatText.insertAdjacentElement('beforeend', chatHeader)
        chatText.insertAdjacentElement('beforeend', chatBody)

        chatWrapper.insertAdjacentElement('beforeend', chatText)
        chatWrapper.addEventListener('click', e => {
            const id = chatWrapper.id
            const classList = e.target.classList
            console.log(classList.contains('my-like'))
            if (classList.contains('la-heart')) {
                const like = likeIcon.classList.contains('my-like')

                if (like) {
                    likeIcon.classList.remove('my-like')
                    this.likeCallback(id, like)
                } else {
                    likeIcon.classList.add('my-like')
                    this.likeCallback(id, like)
                }

            } else if (classList.contains('la-comment')) {
                console.log('comment')
            } else if (classList.contains('la-reply')) {
                console.log('reply')
            } else if (classList.contains('la-edit')) {
                const target = this._getTargetElementById(id)
                this._replaceTextToEditArea(target, id)
            } else if (classList.contains('la-trash-alt')) {
                this.deleteCallback(id)
                this.deleteChat(id)
            }
        })
        return chatWrapper
    }

    _getTargetElementById(id) {
        return this.chatsWrapper.querySelector('#' + id)
    }

    _replaceTextToEditArea(target, id) {
        const textArea = target.querySelector('.user-comment')
        const prevVal = textArea.textContent
        const editArea = this._createEditInput(prevVal, textArea, id)
        textArea.innerHTML = ''
        textArea.appendChild(editArea)

        console.log(prevVal)
    }

    _createEditInput(placeholder, target, id) {
        const editWrapper = document.createElement('div')
        editWrapper.classList.add('chat-input-wrapper')
        const editInput = document.createElement('input')
        const sendBtn = document.createElement('i')
        sendBtn.classList.add('lab', 'la-telegram-plane')
        editInput.type = 'text'
        editInput.placeholder = placeholder

        editInput.addEventListener('keyup', e => {
            if (e.key == 'Escape') {
                target.innerHTML = placeholder
            }
        })

        sendBtn.addEventListener('click', e => {
            const editVal = editInput.value
            if (!editVal) target.innerHTML = placeholder
            this.editCallback(id, editVal)
            target.innerHTML = editVal
        })

        editWrapper.insertAdjacentElement('beforeend', editInput)
        editWrapper.insertAdjacentElement('beforeend', sendBtn)
        return editWrapper
    }

    _deleteEditInput(target) {

    }
    addChat(data) {
        const chat = this._createChat(data)
        this.chatsWrapper.insertAdjacentElement('beforeend', chat)
    }

    deleteChat(id) {
        this.chatsWrapper.removeChild(this.chatsWrapper.querySelector('#' + id))
    }

    addLike(id) {

    }

    addEditArea(id) {

    }
    editChat(id) {

    }
}