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

export function updatedVotesSocket(socket, roomName) {
  socket.emit("updateVotes", roomName, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
    }
  });
}

export function updateVoteOptionsSocket(socket, roomName) {
  socket.emit("updateVoteOptions", roomName, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
    }
  });
}

export function updateUserListSocket(socket, roomName) {
  socket.emit("updateUserList", roomName, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
    }
  });
}
