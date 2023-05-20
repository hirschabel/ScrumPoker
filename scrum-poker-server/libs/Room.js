const uuidv4 = require('uuid').v4;

function Room(name) {
    this.name = name;
    this.id = uuidv4();
    this.players = [];
}

/*
class Room {
    Room (name) {
        this.id =  uuidv4();
        this.name = name;
        this.players = [];
    }
}*/