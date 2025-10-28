class Connection {
  constructor(url, socket) {
    this.url = url;
    this.socket = socket;
  }

  catchMessage() {
    this.socket.onmessage = (event) => {
      const now = new Date();
      const payload = JSON.parse(event.data);
      const chatMessage = document.createElement("p");
      chatMessage.innerHTML = `${now.toDateString()} -> ${payload.user}: ${
        payload.message
      }`;
      document.getElementById("chat").appendChild(chatMessage);
    };
  }
}

const connection = new Connection(
  "wss://8029bgs248.execute-api.eu-north-1.amazonaws.com/prod/",
  null
);

const connect = () => {
  const userName = document.querySelector("input[name=username]").value;

  if (userName.length === 0) {
    alert("please enter a value");
  } else {
    const webSocket = new WebSocket(`${connection.url}?user=${userName}`);
    connection.socket = webSocket;

    connection.socket.onopen = () => {
      document.getElementById("details").disabled = true;
      document.getElementById("controls").disabled = false;
      alert(`you are now connected ${userName}`);
    };

    connection.catchMessage();
  }
};

const sendMessage = () => {
  const message = document.querySelector("input[name=message]").value;
  if (message.length === 0) {
    alert("please enter a value");
  } else {
    connection.socket.send(
      JSON.stringify({
        action: "update",
        message: message,
      })
    );
  }
};
