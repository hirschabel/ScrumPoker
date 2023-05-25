export function createRoomSocket(socket, resolve, roomName, voteOptions) {
  socket.emit("createRoom", roomName, voteOptions, (response) => {
    const isSucces = response.status === "success";
    if (!isSucces) {
      console.error(response.message);
    }
    resolve(isSucces);
  });
}

export function joinRoomSocket(socket, resolve, roomName, username) {
  socket.emit("joinRoom", roomName, username, (response) => {
    const isSucces = response.status === "success";
    if (!isSucces) {
      console.error(response.message);
    }
    resolve(isSucces);
  });
}

export function clearVotesSocket(socket, room) {
  socket.emit("clearVotes", room, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
    }
  });
}

export function voteSocket(socket, room, value) {
  socket.emit("vote", room, value, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
    }
  });
}

export function updatedVotesSocket(socket, navigate, roomName) {
  socket.emit("updateVotes", roomName, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function updateVoteOptionsSocket(socket, navigate, roomName) {
  socket.emit("updateVoteOptions", roomName, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function updateUserListSocket(socket, navigate, roomName) {
  socket.emit("updateUserList", roomName, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function setVotesVisibilitySocket(
  socket,
  navigate,
  roomName,
  visibility
) {
  socket.emit("setVotesVisibility", roomName, visibility, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function updateVotesVisibilitySocket(socket, navigate, roomName) {
  socket.emit("updateVotesVisibility", roomName, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}
