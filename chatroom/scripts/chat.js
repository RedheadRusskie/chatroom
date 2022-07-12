class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chat = db.collection('chat');
        this.ubsub;
    }

    async addChat(message) {
        // format chat object
        const now = new Date();
        const chat = {
            created_at: firebase.firestore.Timestamp.fromDate(now),
            message,
            username: this.username,
            room: this.room
        }

        // save chat document
        const response = await this.chat.add(chat);
        return response;
    }

    getChats(callback) {
        this.unsub = this.chat.where('room', '==', this.room).orderBy('created_at').onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type === 'added') {
                    //updates ui
                    callback(change.doc.data());
                }
            });
        });
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room) {
        this.room = room;
        
        if(this.unsub) 
            this.unsub();
    }
}





