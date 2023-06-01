import {
  createRoomSocket,
  joinRoomSocket,
  leaveRoomSocket,
} from "./SocketUtils";

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

export function createRoom(socket, roomName, username, navigate, voteOptions) {
  new Promise((resolve, _) => {
    createRoomSocket(socket, resolve, roomName, voteOptions);
  }).then((roomId) => {
    if (!roomId) return;
    joinRoom(socket, navigate, roomId, username);
  });
}
