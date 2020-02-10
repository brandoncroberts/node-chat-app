const socket = io();

socket.on("message", message => console.log(message));

const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const sendLocation = document.getElementById("send-location");

const chatSubmit = e => {
  e.preventDefault();

  const message = e.target.elements.message.value;

  socket.emit("sendMessage", message, error => {
    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });
};

form.addEventListener("submit", chatSubmit);

sendLocation.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(position => {
    console.log();
    const coordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };

    socket.emit("sendLocation", coordinates, ackknowledgement => {
      console.log("Location Shared!", ackknowledgement);
    });
  });
});
