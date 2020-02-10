const socket = io();

socket.on("message", message => console.log(message));

const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");

const chatSubmit = e => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message);
};

form.addEventListener("submit", chatSubmit);
