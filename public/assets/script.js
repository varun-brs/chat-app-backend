const url = "";
const socket = io.connect(url);
const chat = [];

document.getElementById("setUsername").addEventListener("click", () => {
  if (document.getElementById("username").value) {
    socket.emit("username", {
      username: document.getElementById("username").value,
    });

    alert(
      document.getElementById("username").value + " is your current username!"
    );
    document.getElementById("user-info").style.visibility = "hidden";
  } else {
    alert("Set your username...");
  }
});

document.getElementById("sendMessage").addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("chat", {
    txt: document.getElementById("txt").value,
  });
  document.getElementById("txt").value = "";
});

socket.on("chat response", (res) => {
  document.getElementById("container").innerHTML +=
    "<li><span><b>" +
    res.sender +
    ": </b>" +
    moment(res.createdAt).format("h:mm a") +
    " </span><br/>" +
    res.response +
    "</li>";
  scrollBottom();
});

function scrollBottom() {
  const messageBlk = document.querySelector("ul.container");
  messageBlk.scrollTo(0, messageBlk.scrollHeight);
}
