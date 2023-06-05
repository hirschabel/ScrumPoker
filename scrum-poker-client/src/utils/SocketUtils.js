export function createRoomSocket(
  socket,
  resolve,
  roomName,
  voteOptions,
  apiKey
) {
  socket.emit("createRoom", roomName, voteOptions, apiKey, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
    }
    resolve(response.roomId);
  });
}

export function joinRoomSocket(socket, resolve, roomId, username) {
  socket.emit("joinRoom", roomId, username, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
    }
    resolve(response.roomName);
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

export function updatedVotesSocket(socket, navigate, roomId) {
  socket.emit("updateVotes", roomId, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function updateVoteOptionsSocket(socket, navigate, roomId) {
  socket.emit("updateVoteOptions", roomId, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function updateUserListSocket(socket, navigate, roomId) {
  socket.emit("updateUserList", roomId, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function setVotesVisibilitySocket(socket, navigate, roomId, visibility) {
  socket.emit("setVotesVisibility", roomId, visibility, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function updateVotesVisibilitySocket(socket, navigate, roomId) {
  socket.emit("updateVotesVisibility", roomId, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function setProjectsSocket(socket, navigate, roomId) {
  socket.emit("setProjects", roomId, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function setIssuesSocket(socket, navigate, roomId, projectId, queryId) {
  socket.emit("setIssues", roomId, projectId, queryId, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function setIssueSocket(socket, navigate, roomId, id) {
  socket.emit("setIssue", roomId, id, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function updateIssueSocket(socket, navigate, roomId) {
  socket.emit("updateIssue", roomId, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}

export function setQueriesSocket(socket, navigate, roomId, projectId) {
  socket.emit("setQueries", roomId, projectId, (response) => {
    if (response.status !== "success") {
      console.error(response.message);
      navigate("/");
    }
  });
}
