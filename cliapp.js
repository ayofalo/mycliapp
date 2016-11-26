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

function Room(name, resident) {
  this.name = name;
  this.resident = resident
};

function Office() {

};

function LivingSpace() {};

var roomsList = []
var roomObject = []
var personList = []
var loom = []

rl.prompt()

rl.on('line', function(line) {
    var args = line.split(' ')
    switch (args[0]) {
      
      // create_room <room_name>
      case 'create_room':
        
        var i = 1;
        while (i <= 11) {
          //Created a Room object for each room. The name of the room is the object.

          args[i] = new Room(args[i]);

          roomsList.push(args[i].name);

          if (args[i].name != null) {
            console.log(`Room "${args[i].name}" has been added!`)
          }
          i++
        };
        for (i in roomsList) {
          loom[i] = args[i]
        }
        for (i = 1; i < 11; i++) {
          console.log(loom[i]);
        }
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

        for (i = 1; i < 10; i++) {
          console.log(loom[i]);
        }
        if (args[1] != null && args[2] != null && args[3] == null) {
          args[3] = false
          room = "Jupiter";
          var personObject = new Person(args[1], args[2], args[3], room)
          personObject.allocate();

          //pair the room to the object
          //loom = new Room(room, args[1]);

          console.log(personObject.name);
          console.log(personObject.role);
          console.log(personObject.wantsaccomodation);
          console.log(personObject.room);
          //console.log(loom.resident);
        } else if (args[1] != null && args[2] != null && args[3] != null) {
          room = "Jupiter" // create a room object here
          var personObject = new Person(args[1], args[2], args[3], room)
          personObject.allocate();
          room.resident = args[1];
          console.log(personObject.name);
          console.log(personObject.role);
          console.log(personObject.wantsaccomodation);
          console.log(personObject.room);

        }

        //To do:  
        break
      case 'reallocate_person':
        
        for (i = 1; i < 11; i++) {
          if (loom[i].name == args[2]) {
            loom[i].resident = args[1]
            console.log(loom[i].resident)
          }
          console.log(loom[i]);
        }
        
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
