#!/usr/bin/env node

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>> '
})

function Person(name, role, wantsaccomodation, room) {
  this.name = name;
  this.role = role;
  this.wantsaccomodation = wantsaccomodation;
  this.room = room;
  this.allocate = function() {
    this.room = roomsList[Math.floor((Math.random() * roomsList.length))];

  };
}

function Fellow() {

};

function Staff() {

}

function Amity() {

};

function Room(name) {
  this.name = name;
};

function Office() {

};

function LivingSpace() {};

var roomsList = []
var roomObject = []
var personList = []
var personObject = []

rl.prompt()

rl.on('line', function(line) {
    var args = line.split(' ')
    switch (args[0]) {
      // create_room <room_name>
      case 'create_room':
        for (i = 1; i < 11; i++) {
          roomObject[i] = new Room(args[i]);
          roomsList.push(roomObject[i].name);
          if (roomObject[i].name != null) {
            console.log(`Room "${roomObject[i].name}" has been added!`)
          }
        };
        break
        // list_rooms
      case 'list_rooms':
        console.log('Printing out all rooms')
        roomsList.forEach(function(room, idx) {
          console.log(`${idx} - ${room}`)
        })
        break
        //add_person
      case 'add_person':

        if (args[1] != null && args[2] != null && args[3] == null) {
          args[3] = false
          room = "Jupiter"
          personObject.push(new Person(args[1], args[2], args[3], room))
          console.log(personObject[0].name);
          console.log(personObject[0].role);
          console.log(personObject[0].wantsaccomodation);
          console.log(personObject[0].room);
        } else if (args[1] != null && args[2] != null && args[3] != null) {
          room = "Jupiter"
          personObject.push(new Person(args[1], args[2], args[3], room))
          personObject[0].allocate();
          console.log(personObject[0].name);
          console.log(personObject[0].role);
          console.log(personObject[0].wantsaccomodation);
          console.log(personObject[0].room);

        }
        //To do:  
        break
      case 'reallocate_person':
        break
      case 'load_people':
        break
      case 'print_allocations':
        break
      case 'print_unallocated':
        break
      case 'print_room':
        break
      case 'save_state':
        break
      case 'load_state':
        break
      default:
        console.log('You must enter a valid command')
    }
    rl.prompt()
  })
  .on('close', function() {
    console.log('Thank you for using Room Allocator')
  })
