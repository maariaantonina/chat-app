const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-section__list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

loginForm.addEventListener('submit', login);

const login = event => {
  event.preventDefault();
  if (userNameInput.innerHTML == '') {
    window.alert('UserName is missing :(');
  } else {
    userName = userNameInput.innerHTML;
    console.log(userName);
    userNameInput.classList.toggle('show');
    messagesSection.classList.toggle('show');
  }
};

addMessageForm.addEventListener('submit', sendMessage);

const sendMessage = event => {
  event.preventDefault();
  if (messageContentInput.value == '') {
    window.alert('No message :(');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};

const addMessage = (author, content) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author == userName) {
    message.classList.add('message--self');
    message.innerHTML = `<h3 class="message__author">${
      userName === author ? 'You' : author
    }</h3>
  <div class="message__content">
    ${content}
  </div>`;
  }
  messagesList.appendChild(message);
};
