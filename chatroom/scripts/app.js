// const { format } = require("date-fns");

// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const label = document.querySelector('.name');
const chatrooms = document.querySelector('.chat-rooms');

// add new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => {
            newChatForm.reset();
        }).catch(err => console.log(err));
})

// update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    let newUsername = newNameForm.name.value.trim();
    chatroom.updateName(newUsername);

    label.classList.add('updated');
    label.innerText = 'Updated.';
  
    setTimeout(() => {
        label.classList.remove('updated');
        label.innerText = 'Update name:';
    }, 1500);

    newNameForm.reset();
})

// check local storage for existing name
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatroom = new Chatroom('general', username);
const chatUI = new ChatUI(chatList);

// get chats and renders
chatroom.getChats(data => chatUI.render(data));

// update chat rooms
chatrooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})


