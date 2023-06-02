import { createRoomSocket, joinRoomSocket } from "./SocketUtils";

export function joinRoom(socket, navigate, roomId, username) {
  new Promise((resolve, _) => {
    joinRoomSocket(socket, resolve, roomId, username);
  }).then((roomName) => {
    if (roomName) {
      navigate("/room", {
        state: {
          username: username,
          roomId: roomId,
          roomName: roomName,
        },
      });
    }
  });
}

export function createRoom(
  socket,
  roomName,
  username,
  apiKey,
  navigate,
  voteOptions
) {
  new Promise((resolve, _) => {
    createRoomSocket(socket, resolve, roomName, voteOptions, apiKey);
  }).then((roomId) => {
    if (!roomId) return;
    joinRoom(socket, navigate, roomId, username);
  });
}
