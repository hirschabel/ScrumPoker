import { createRoomSocket, joinRoomSocket } from "./SocketUtils";

export function joinRoom(socket, navigate, roomName, username) {
  new Promise((resolve, _) => {
    joinRoomSocket(socket, resolve, roomName, username);
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

export function createRoom(socket, roomName, voteOptions) {
  return new Promise((resolve, _) => {
    createRoomSocket(socket, resolve, roomName, voteOptions);
  });
}
