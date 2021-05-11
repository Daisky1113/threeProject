class FirebaseController {
    constructor(props) {
        this.config = {
            apiKey: "AIzaSyAHeKlK2bBu4_9yiCdFGjLECl9bYIkUeZM",
            authDomain: "lab11-55901.firebaseapp.com",
            projectId: "lab11-55901",
            storageBucket: "lab11-55901.appspot.com",
            messagingSenderId: "1011576861441",
            appId: "1:1011576861441:web:5fcde8e0da18f8605da100"
        }
        this.auth = null
        this.uid = null
        this.userName = ''
        this.userAvator = ''
        this.globalChatRef = null
        this.userDocRef = null
        this.userChatRef = null
        this.loginElment = props.loginElment
        this.chatElement = props.chatElement
        this.isScrollEnd = false
        this._init()
    }

    _init() {
        firebase.initializeApp(this.config);
        this.auth = firebase.auth()
        this._handleDomEvents()
        this._handleAuthStateChange()
    }

    login(mail, pw) {
        this.auth.signInWithEmailAndPassword(mail, pw)
    }

    logOut() {
        this.auth.signOut()
    }

    _handleDomEvents() {
        this.loginElment.loginBtn.addEventListener('click', () => {
            this.login(this.loginElment.mailVal, this.loginElment.pwVal)
        })

        this.loginElment.logoutBtn.addEventListener('click', () => {
            this.logOut()
        })

        this.chatElement.chatSendBtn.addEventListener('click', () => {
            this.sendChat(this.chatElement.inputVal)
        })

        this.chatElement.chatInput.addEventListener('keyup', e => {
            if (e.key !== 'Enter') return
            this.sendChat(this.chatElement.inputVal)
        })

        this.chatElement.chatsWrapper.addEventListener('scroll', e => {
            this.chatElement.setScrollVal(e)
            this.chatElement.setIsScrollEnd()
        })
    }

    _handleAuthStateChange() {
        this.auth.onAuthStateChanged(async user => {
            if (user) {
                this.uid = await user.uid
                this._userInit()
                this._chatInit()
            } else {
                this.auth.signOut()
                this.loginElment.hideUserInfo()
                this.chatElement.hide()
                this.loginElment.show()
            }
        })
    }

    async _userInit() {
        await this._setUserDocRef(this.uid)
        this._setUserData(this.uid)
        this.loginElment.setUserInfo(this.userName, this.userAvator)
        this.loginElment.showUserInfo()
        this.loginElment.hide()
    }

    async _setUserChatRef() {
        this.userChatRef = await this.userDocRef.collection('cats/')
    }

    async _setUserDocRef(uid) {
        this.userDocRef = await firebase.firestore().doc(`users/${uid}`).get()
    }


    _setUserData() {
        const userData = this.userDocRef.data()
        this.userName = userData.name
        this.userAvator = userData.img
        // this.userName = user.userName
    }


    async _chatInit() {
        this.globalChatRef = await firebase.firestore().collection('chats/')
        await this._handleGlobalChat()
        this.chatElement.show()
        // this.globalChatRef.orderBy('createdAt').limit(30).get().then(snap => {
        //     const docLength = snap.docs.length
        //     let dataCount = 0
        //     snap.forEach((doc) => {
        //         dataCount++
        //         const data = doc.data()
        //         data.id = doc.id
        //         data.myChat = data.uid == this.uid
        //         this.chatElement.addChat(data)
        //         if (dataCount == docLength - 1) {
        //             this.chatElement.scrollToEnd('instant')
        //         }
        //     })
        // })
        // this.chatElement.scrollToEnd()
        // this.userChatRef = firebase.fireStore().ref(`users/${this.uid}/chats/`)
    }

    async _handleGlobalChat() {
        await this.globalChatRef.orderBy('createdAt').onSnapshot(snap => {
            const docLength = snap.docs.length
            let docCount = 0
            snap.docChanges().forEach((change, i) => {
                docCount++
                switch (change.type) {
                    case 'added':
                        const doc = change.doc
                        const data = doc.data()
                        data.id = doc.id
                        data.img = this.userAvator
                        data.myChat = data.uid === this.uid
                        this.chatElement.addChat(data)
                        if (this.chatElement.isScrollEnd) {
                            this.chatElement.scrollToEnd('smooth')
                        }
                        this.chatElement.clearInputArea()
                        break;
                }
                if (docCount == docLength) {
                    this.chatElement.scrollToEnd('smooth')
                }
            })
        })
        this.chatElement.scrollToEnd('smooth')
    }

    sendChat(msg) {
        this.globalChatRef.add({
            uid: this.uid,
            name: this.userName.split(' ')[1],
            avator: this.userAvator,
            msg: msg,
            createdAt: new Date()
        })
    }

}