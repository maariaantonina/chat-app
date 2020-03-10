const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('join', ({ name }) =>
  addMessage('Chat Bot', `${name} has joined the chat`)
);
socket.on('removeUser', ({ name }) =>
  addMessage('Chat Bot', `${name} has left the chat`)
);

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

const login = event => {
  event.preventDefault();
  if (userNameInput.value == '') {
    window.alert('UserName is missing :(');
  } else {
    userName = userNameInput.value;
    loginForm.classList.toggle('show');
    messagesSection.classList.toggle('show');
    socket.emit('join', {
      name: userName,
      id: socket.id
    });
  }
};

const addMessage = (author, content) => {
  let message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author == userName) {
    message.classList.add('message--self');
  } else if (author == 'Chat Bot') {
    message.classList.add('message--info');
  }
  message.innerHTML = `<h3 class="message__author">${
    userName === author ? 'You' : author
  }</h3>
    <div class="message__content">
      ${content}
    </div>`;
  messagesList.appendChild(message);
};

const sendMessage = event => {
  event.preventDefault();
  if (messageContentInput.value == '') {
    window.alert('No message :(');
  } else {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', {
      author: userName,
      content: messageContentInput.value
    });
    messageContentInput.value = '';
  }
};

loginForm.addEventListener('submit', login);
addMessageForm.addEventListener('submit', sendMessage);
