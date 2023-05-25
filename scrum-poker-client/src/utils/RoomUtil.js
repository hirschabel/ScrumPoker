export function joinRoom(socket, navigate, roomName, username) {
  new Promise((resolve, _) => {
    socket.emit("joinRoom", roomName, username, (response) => {
      const isSucces = response.status === "success";
      if (!isSucces) {
        console.error(response.message);
      }
      resolve(isSucces);
    });
  }).then((result) => {
    if (result) {
      navigate("/room", {
        state: {
          username: username,
          roomName: roomName,
        },
      });
    }
  });
}

export function createRoomSocket(socket, roomName, voteOptions) {
  return new Promise((resolve, _) => {
    socket.emit("createRoom", roomName, voteOptions, (response) => {
      const isSucces = response.status === "success";
      if (!isSucces) {
        console.error(response.message);
      }
      resolve(isSucces);
    });
  });
}
