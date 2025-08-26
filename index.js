const exampleSocket = new WebSocket(
  "wss://cyt3pug7nd.execute-api.eu-north-1.amazonaws.com/prod"
);

console.log(exampleSocket);

const msg = {
  action: "update",
  message: "hello, everyone!",
};

exampleSocket.onopen = () => {
  exampleSocket.send(JSON.stringify(msg));
};

exampleSocket.onmessage = (event) => {
  console.log(event.data);
};
